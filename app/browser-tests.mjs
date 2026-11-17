import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const appUrl = pathToFileURL(path.join(process.cwd(), "index.html")).href;
const browser = await chromium.launch({ headless: true });
let passed = 0;
let failed = 0;

async function openApp(viewport = { width: 1280, height: 900 }) {
  const context = await browser.newContext({ viewport, acceptDownloads: true });
  const page = await context.newPage();
  const pageErrors = [];
  const consoleErrors = [];
  const requests = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  page.on("console", message => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("request", request => requests.push(request.url()));
  await page.goto(appUrl);
  await page.locator("#formRoot .panel").waitFor();
  return { context, page, pageErrors, consoleErrors, requests };
}

async function test(name, run) {
  try {
    await run();
    passed++;
    process.stdout.write("PASS " + name + "\n");
  } catch (error) {
    failed++;
    process.stderr.write("FAIL " + name + "\n" + (error?.stack || String(error)) + "\n");
  }
}

async function acceptAlert(page) {
  const dialog = new Promise(resolve => page.once("dialog", async d => {
    const message = d.message();
    await d.accept();
    resolve(message);
  }));
  return dialog;
}

try {
  await test("application boots without runtime errors or external network requests", async () => {
    const app = await openApp();
    try {
      assert.match(await app.page.title(), /Character Sheet/);
      assert.equal(await app.page.locator("#copyAll").isDisabled(), true);
      assert.deepEqual(app.pageErrors, []);
      assert.deepEqual(app.consoleErrors, []);
      assert.ok(app.requests.every(url => url.startsWith("file://")), "unexpected non-local request: " + app.requests.join(", "));
    } finally {
      await app.context.close();
    }
  });

  await test("wizard navigation updates the step and restores heading focus", async () => {
    const app = await openApp();
    try {
      assert.equal(await app.page.locator("#stepHeading").innerText(), "Foundation");
      await app.page.locator("#stepNext").click();
      assert.equal(await app.page.locator("#stepHeading").innerText(), "Appearance");
      assert.equal(await app.page.evaluate(() => document.activeElement.id), "stepHeading");
      await app.page.locator("#stepBack").click();
      assert.equal(await app.page.locator("#stepHeading").innerText(), "Foundation");
      assert.equal(await app.page.evaluate(() => document.activeElement.id), "stepHeading");
    } finally {
      await app.context.close();
    }
  });

  await test("keyboard-only tab order reaches toolbar controls and activates wizard navigation", async () => {
    const app = await openApp();
    try {
      await app.page.keyboard.press("Tab");
      assert.equal(await app.page.evaluate(() => document.activeElement.id), "task");

      const expectedToolbarOrder = ["export", "importFile", "reset"];
      for (const expectedId of expectedToolbarOrder) {
        await app.page.keyboard.press("Tab");
        assert.equal(
          await app.page.evaluate(() => document.activeElement.id),
          expectedId,
          "unexpected toolbar tab order before " + expectedId
        );
      }

      await app.page.keyboard.press("Tab");
      assert.equal(await app.page.locator('[data-step="0"]').evaluate(el => el === document.activeElement), true);
      await app.page.keyboard.press("Tab");
      assert.equal(await app.page.locator('[data-step="1"]').evaluate(el => el === document.activeElement), true);
      await app.page.keyboard.press("Enter");

      assert.equal(await app.page.locator("#stepHeading").innerText(), "Appearance");
      assert.equal(await app.page.evaluate(() => document.activeElement.id), "stepHeading");
      assert.equal(await app.page.locator('[data-step="1"]').getAttribute("aria-current"), "step");

      await app.page.keyboard.press("Tab");
      assert.ok(
        await app.page.evaluate(() => document.activeElement.hasAttribute("data-status")),
        "The first control after the step heading should be the first field's status selector"
      );
      await app.page.keyboard.press("Tab");
      assert.ok(
        await app.page.evaluate(() => document.activeElement.hasAttribute("data-field")),
        "The next Tab should move from the status selector to its associated field value"
      );
      assert.deepEqual(app.pageErrors, []);
      assert.deepEqual(app.consoleErrors, []);
    } finally {
      await app.context.close();
    }
  });

  await test("adult confirmation unlocks character prompts and hostile field text remains inert", async () => {
    const app = await openApp();
    try {
      const payload = '<img src=x onerror="window.__epalXss=1">';
      await app.page.locator('[data-field="character.name"]').fill(payload);
      await app.page.locator('[data-status="character.name"]').selectOption("user_confirmed");
      await app.page.locator('[data-field="character.age_presentation"]').fill("Clearly adult woman, age 25");
      await app.page.locator('[data-status="character.age_presentation"]').selectOption("user_confirmed");
      assert.equal(await app.page.locator("#copyAll").isDisabled(), false);
      assert.equal(await app.page.locator("#promptRoot img").count(), 0);
      assert.equal(await app.page.evaluate(() => window.__epalXss || null), null);
      assert.ok((await app.page.locator("#promptRoot").innerText()).includes(payload));
      assert.deepEqual(app.pageErrors, []);
    } finally {
      await app.context.close();
    }
  });

  await test("canonical copying remains locked until required identity confirmation and explicit review", async () => {
    const app = await openApp();
    try {
      await app.page.locator("#task").selectOption("canonical");
      assert.equal(await app.page.locator("#copyAll").isDisabled(), true);
      assert.equal(await app.page.locator("#canonicalReview").count(), 0);
      const required = [
        ["character.name", "Approved test character"],
        ["character.species_type", "Original bunny character"],
        ["character.age_presentation", "Clearly adult woman, age 25"],
        ["character.identity_summary", "Original adult character with stable identity anchors"]
      ];
      for (const [id, value] of required) {
        const field = app.page.locator('[data-field="' + id + '"]');
        await field.fill(value);
        await app.page.locator('[data-status="' + id + '"]').selectOption("user_confirmed");
      }
      assert.equal(await app.page.locator("#canonicalReview").count(), 1);
      assert.equal(await app.page.locator("#copyAll").isDisabled(), true);
      await app.page.locator("#canonicalReview").check();
      assert.equal(await app.page.locator("#copyAll").isDisabled(), false);
      assert.equal(await app.page.evaluate(() => document.activeElement.id), "canonicalReview");
    } finally {
      await app.context.close();
    }
  });

  await test("malformed JSON import is rejected without changing existing form state", async () => {
    const app = await openApp();
    try {
      await app.page.locator('[data-field="character.name"]').fill("Keep this value");
      await app.page.locator('[data-status="character.name"]').selectOption("user_confirmed");
      const dialog = acceptAlert(app.page);
      await app.page.locator("#importFile").setInputFiles({
        name: "invalid.json",
        mimeType: "application/json",
        buffer: Buffer.from('{"values":[]}'),
      });
      assert.match(await dialog, /values object/i);
      assert.equal(await app.page.locator('[data-field="character.name"]').inputValue(), "Keep this value");
      assert.equal(await app.page.locator('[data-status="character.name"]').inputValue(), "user_confirmed");
    } finally {
      await app.context.close();
    }
  });

  await test("oversized import is rejected before parsing and leaves form state intact", async () => {
    const app = await openApp();
    try {
      await app.page.locator('[data-field="character.name"]').fill("Preserve after oversized file");
      const dialog = acceptAlert(app.page);
      await app.page.locator("#importFile").setInputFiles({
        name: "oversized.json",
        mimeType: "application/json",
        buffer: Buffer.alloc(2 * 1024 * 1024 + 1, 0x20),
      });
      assert.match(await dialog, /2 MiB import limit/);
      assert.equal(await app.page.locator('[data-field="character.name"]').inputValue(), "Preserve after oversized file");
    } finally {
      await app.context.close();
    }
  });

  await test("near-limit valid import is accepted and unknown extension data survives export", async () => {
    const app = await openApp();
    try {
      const largeText = "x".repeat(1_900_000);
      const record = {
        schema_version: "1.4.1",
        task: "character",
        values: {
          "character.age_presentation": { value: "Clearly adult woman, age 25", status: "user_confirmed" },
          "future.large_payload": { value: largeText, status: "user_confirmed" }
        }
      };
      const buffer = Buffer.from(JSON.stringify(record));
      assert.ok(buffer.length < 2 * 1024 * 1024);
      const dialog = acceptAlert(app.page);
      await app.page.locator("#importFile").setInputFiles({
        name: "near-limit.json",
        mimeType: "application/json",
        buffer,
      });
      assert.match(await dialog, /unrecognized field/i);
      const downloadPromise = app.page.waitForEvent("download");
      await app.page.locator("#export").click();
      const download = await downloadPromise;
      const exported = JSON.parse(await fs.readFile(await download.path(), "utf8"));
      assert.equal(exported.values["future.large_payload"].value.length, 1_900_000);
    } finally {
      await app.context.close();
    }
  });

  await test("export and re-import preserve exact user-entered values and statuses", async () => {
    const app = await openApp();
    try {
      await app.page.locator('[data-field="character.name"]').fill("Exact & preserved / r07");
      await app.page.locator('[data-status="character.name"]').selectOption("user_confirmed");
      const downloadPromise = app.page.waitForEvent("download");
      await app.page.locator("#export").click();
      const download = await downloadPromise;
      const exported = await fs.readFile(await download.path());
      const record = JSON.parse(exported.toString("utf8"));
      assert.equal(record.values["character.name"].value, "Exact & preserved / r07");
      await app.page.locator('[data-field="character.name"]').fill("Temporary replacement");
      await app.page.locator("#importFile").setInputFiles({
        name: "roundtrip.json",
        mimeType: "application/json",
        buffer: exported,
      });
      await app.page.waitForFunction(() => {
        const field = document.querySelector('[data-field="character.name"]');
        const status = document.querySelector('[data-status="character.name"]');
        return field?.value === "Exact & preserved / r07" && status?.value === "user_confirmed";
      });
      assert.equal(await app.page.locator('[data-field="character.name"]').inputValue(), "Exact & preserved / r07");
      assert.equal(await app.page.locator('[data-status="character.name"]').inputValue(), "user_confirmed");
    } finally {
      await app.context.close();
    }
  });

  await test("Android-like mobile viewport matrix preserves layout and touch navigation", async () => {
    const viewports = [
      { width: 320, height: 740, scale: 2 },
      { width: 360, height: 800, scale: 3 },
      { width: 375, height: 812, scale: 3 },
      { width: 390, height: 844, scale: 3 },
      { width: 412, height: 915, scale: 2.625 },
      { width: 768, height: 1024, scale: 2 }
    ];
    for (const size of viewports) {
      const context = await browser.newContext({
        viewport: { width: size.width, height: size.height },
        screen: { width: size.width, height: size.height },
        deviceScaleFactor: size.scale,
        isMobile: true,
        hasTouch: true,
        acceptDownloads: true
      });
      const page = await context.newPage();
      const pageErrors = [];
      page.on("pageerror", error => pageErrors.push(error.message));
      try {
        await page.goto(appUrl);
        await page.locator("#formRoot .panel").waitFor();
        assert.equal(
          await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
          true,
          "horizontal overflow at viewport width " + size.width
        );
        assert.equal(
          await page.locator(".layout").evaluate(el => getComputedStyle(el).gridTemplateColumns.trim().split(/\\s+/).length),
          1,
          "layout should be single-column at viewport width " + size.width
        );

        const next = page.locator("#stepNext");
        const nextBox = await next.boundingBox();
        assert.ok(nextBox && nextBox.width >= 44 && nextBox.height >= 44, "Next target below 44px at width " + size.width);
        await next.tap();
        assert.equal(await page.locator("#stepHeading").innerText(), "Appearance");

        const back = page.locator("#stepBack");
        const backBox = await back.boundingBox();
        assert.ok(backBox && backBox.width >= 44 && backBox.height >= 44, "Back target below 44px at width " + size.width);
        await back.tap();
        assert.equal(await page.locator("#stepHeading").innerText(), "Foundation");
        assert.deepEqual(pageErrors, [], "runtime errors at viewport width " + size.width);
      } finally {
        await context.close();
      }
    }
  });

  await test("mobile JSON export restores profile after reload and invalid import preserves restored data", async () => {
    for (const size of [{ width: 360, height: 800, scale: 3 }, { width: 412, height: 915, scale: 2.625 }]) {
      const context = await browser.newContext({
        viewport: { width: size.width, height: size.height },
        screen: { width: size.width, height: size.height },
        deviceScaleFactor: size.scale,
        isMobile: true,
        hasTouch: true,
        acceptDownloads: true
      });
      const page = await context.newPage();
      const pageErrors = [];
      page.on("pageerror", error => pageErrors.push(error.message));
      try {
        await page.goto(appUrl);
        await page.locator('[data-field="character.name"]').fill("Mobile round-trip & exact value");
        await page.locator('[data-status="character.name"]').selectOption("user_confirmed");
        await page.locator('[data-field="character.identity_summary"]').fill("Preserve this confirmed identity summary across a fresh page load.");
        await page.locator('[data-status="character.identity_summary"]').selectOption("user_confirmed");

        const downloadPromise = page.waitForEvent("download");
        await page.locator("#export").tap();
        const download = await downloadPromise;
        const exportedBytes = await fs.readFile(await download.path());
        const exportedRecord = JSON.parse(exportedBytes.toString("utf8"));
        assert.equal(exportedRecord.values["character.name"].value, "Mobile round-trip & exact value");
        assert.equal(exportedRecord.values["character.name"].status, "user_confirmed");

        await page.reload();
        await page.locator("#formRoot .panel").waitFor();
        await page.locator("#importFile").setInputFiles({
          name: "mobile-round-trip.json",
          mimeType: "application/json",
          buffer: exportedBytes
        });
        await page.waitForFunction(() => {
          const name = document.querySelector('[data-field="character.name"]');
          const nameStatus = document.querySelector('[data-status="character.name"]');
          const summary = document.querySelector('[data-field="character.identity_summary"]');
          const summaryStatus = document.querySelector('[data-status="character.identity_summary"]');
          return name?.value === "Mobile round-trip & exact value"
            && nameStatus?.value === "user_confirmed"
            && summary?.value === "Preserve this confirmed identity summary across a fresh page load."
            && summaryStatus?.value === "user_confirmed";
        });
        assert.equal(await page.locator('[data-field="character.name"]').inputValue(), "Mobile round-trip & exact value");
        assert.equal(await page.locator('[data-status="character.name"]').inputValue(), "user_confirmed");

        const dialog = acceptAlert(page);
        await page.locator("#importFile").setInputFiles({
          name: "malformed-mobile.json",
          mimeType: "application/json",
          buffer: Buffer.from('{"values":[]}'),
        });
        assert.match(await dialog, /values object/i);
        assert.equal(await page.locator('[data-field="character.name"]').inputValue(), "Mobile round-trip & exact value");
        assert.equal(await page.locator('[data-status="character.name"]').inputValue(), "user_confirmed");
        assert.equal(await page.locator('[data-field="character.identity_summary"]').inputValue(), "Preserve this confirmed identity summary across a fresh page load.");
        assert.deepEqual(pageErrors, []);
      } finally {
        await context.close();
      }
    }
  });

  await test("empty and non-JSON imports are rejected without changing existing profile data", async () => {
    const app = await openApp();
    try {
      await app.page.locator('[data-field="character.name"]').fill("Keep this existing profile");
      await app.page.locator('[data-status="character.name"]').selectOption("user_confirmed");
      let dialog = acceptAlert(app.page);
      await app.page.locator("#importFile").setInputFiles({ name: "empty-profile.json", mimeType: "application/json", buffer: Buffer.alloc(0) });
      assert.match(await dialog, /could not import this json/i);
      assert.equal(await app.page.locator('[data-field="character.name"]').inputValue(), "Keep this existing profile");
      assert.equal(await app.page.locator('[data-status="character.name"]').inputValue(), "user_confirmed");
      dialog = acceptAlert(app.page);
      await app.page.locator("#importFile").setInputFiles({ name: "profile.txt", mimeType: "text/plain", buffer: Buffer.from('{"values":{}}') });
      assert.match(await dialog, /json extension/i);
      assert.equal(await app.page.locator('[data-field="character.name"]').inputValue(), "Keep this existing profile");
      assert.equal(await app.page.locator('[data-status="character.name"]').inputValue(), "user_confirmed");
      dialog = acceptAlert(app.page);
      await app.page.locator("#importFile").setInputFiles({ name: "wrong-mime.json", mimeType: "text/plain", buffer: Buffer.from('{"values":{}}') });
      assert.match(await dialog, /not declared as json/i);
      assert.equal(await app.page.locator('[data-field="character.name"]').inputValue(), "Keep this existing profile");
      assert.equal(await app.page.locator('[data-status="character.name"]').inputValue(), "user_confirmed");
      assert.deepEqual(app.pageErrors, []);
    } finally { await app.context.close(); }
  });

  await test("malformed field entries are reported and valid sibling entries import without silent coercion", async () => {
    const app = await openApp();
    try {
      const dialog = acceptAlert(app.page);
      await app.page.locator("#importFile").setInputFiles({
        name: "partially-malformed.json", mimeType: "application/json",
        buffer: Buffer.from(JSON.stringify({
          schema_version: "1.4.1", task: "character",
          values: {
            "character.name": { value: "Valid sibling survives", status: "user_confirmed" },
            "character.species_type": "not-an-entry"
          }
        }))
      });
      assert.match(await dialog, /skipped 1 field entry/i);
      assert.equal(await app.page.locator('[data-field="character.name"]').inputValue(), "Valid sibling survives");
      assert.equal(await app.page.locator('[data-status="character.name"]').inputValue(), "user_confirmed");
      assert.equal(await app.page.locator('[data-field="character.species_type"]').inputValue(), "");
      assert.deepEqual(app.pageErrors, []);
    } finally { await app.context.close(); }
  });

  await test("hostile imported text remains inert in form controls and generated prompt previews", async () => {
    const app = await openApp();
    try {
      const payloads = {
        "character.name": '<img src=x onerror="window.__epalImportedXss=1">',
        "character.species_type": '<svg onload="window.__epalImportedSvgXss=1"></svg>',
        "character.identity_summary": '</pre><script>window.__epalImportedScriptXss=1</script><iframe srcdoc="<script>parent.__epalImportedFrameXss=1<\\/script>"></iframe>'
      };
      const values = Object.fromEntries(Object.entries(payloads).map(([id, value]) => [
        id, { value, status: "user_confirmed" }
      ]));
      await app.page.locator("#importFile").setInputFiles({
        name: "hostile-text-cases.json",
        mimeType: "application/json",
        buffer: Buffer.from(JSON.stringify({
          schema_version: "1.4.1",
          task: "character",
          values
        }))
      });
      await app.page.waitForFunction(() =>
        document.querySelector('[data-field="character.name"]')?.value.includes("<img")
      );
      for (const [id, payload] of Object.entries(payloads)) {
        assert.equal(await app.page.locator('[data-field="' + id + '"]').inputValue(), payload);
      }
      assert.equal(await app.page.locator("#formRoot img, #formRoot svg, #formRoot iframe, #formRoot script").count(), 0);
      assert.equal(await app.page.locator("#promptRoot img, #promptRoot svg, #promptRoot iframe, #promptRoot script").count(), 0);
      assert.equal(await app.page.evaluate(() => [
        window.__epalImportedXss,
        window.__epalImportedSvgXss,
        window.__epalImportedScriptXss,
        window.__epalImportedFrameXss
      ].some(Boolean)), false);
      const preview = await app.page.locator("#promptRoot").innerText();
      for (const payload of Object.values(payloads)) assert.ok(preview.includes(payload));
      assert.deepEqual(app.pageErrors, []);
      assert.deepEqual(app.consoleErrors, []);
      assert.ok(app.requests.every(url => url.startsWith("file://")), "unexpected non-local request: " + app.requests.join(", "));
    } finally {
      await app.context.close();
    }
  });

  await test("responsive layout collapses to one column on a narrow viewport", async () => {
    const app = await openApp();
    try {
      const desktopColumns = await app.page.locator(".layout").evaluate(el => getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length);
      assert.equal(desktopColumns, 2);
      await app.page.setViewportSize({ width: 390, height: 844 });
      const mobileColumns = await app.page.locator(".layout").evaluate(el => getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length);
      assert.equal(mobileColumns, 1);
      assert.equal(await app.page.locator(".preview").evaluate(el => getComputedStyle(el).position), "static");
    } finally {
      await app.context.close();
    }
  });

  await test("task switching retains entered field values", async () => {
    const app = await openApp();
    try {
      await app.page.locator('[data-field="character.name"]').fill("Retained across task switch");
      await app.page.locator("#task").selectOption("logo");
      assert.equal(await app.page.locator('[data-field="character.name"]').inputValue(), "Retained across task switch");
      await app.page.locator("#task").selectOption("character");
      assert.equal(await app.page.locator('[data-field="character.name"]').inputValue(), "Retained across task switch");
    } finally {
      await app.context.close();
    }
  });
} finally {
  await browser.close();
}

process.stdout.write("\nBrowser test summary: " + passed + " passed, " + failed + " failed.\n");
if (failed > 0) process.exitCode = 1;
