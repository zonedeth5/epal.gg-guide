# Character Sheet → Prompt Builder

**Alpha implementation:** schema/prompt engine v1.4.1. The current schema registry has **76 field definitions** (including six retained legacy shared-style fields hidden from the progressive editor). The Node suite contains **39 test definitions**; latest passing Node CI is [44054936580](https://github.com/zonedeth5/AI_workspace/actions/runs/44054936580), with **39 passed, 0 failed, 0 skipped**. A separate Playwright Chromium runtime suite now has **12 passed, 0 failed** in [run 44059876221](https://github.com/zonedeth5/AI_workspace/actions/runs/44059876221), including keyboard navigation and a six-size mobile/touch viewport matrix.

Current source blobs at Cycle 135:
- `index.html`: `622cd628cdc0d4814a7263eed5ed7f3d71d091fa`
- `schema.js`: `654e0e7a20e9dd884063ac7e0dfa7b668e89d993`
- `schema.test.js`: `a33e13a1f4c71e40002edc3abf1480903aef0ded`
- `browser-tests.mjs`: `b52187102bd1cd9650108e1386913e892c2a13c9`
- `.github/workflows/epal-browser-tests.yml`: `823d68c76f63b453372e3b8b637fd0dfc3efe4ab`

The in-session source fixes include a keyboard-focusable native import control with visible focus styling, focus return after successful JSON import, focus restoration for the canonical approval checkbox, and suppression of redundant unchanged validation-region DOM updates. Regression tests verify these source patterns; they do not prove the behavior in an actual browser or screen reader.

The Playwright suite now provides real headless Chromium runtime evidence: [run 44056172091](https://github.com/zonedeth5/AI_workspace/actions/runs/44056172091), **10 passed, 0 failed**. It covers core flows, import/export, one hostile HTML payload, and two responsive widths. This is not mobile-device, cross-browser, screen-reader, full keyboard-only, or comprehensive security certification; see the [Alpha Patch Backlog](../operations/ALPHA_PATCH_BACKLOG.md). Earlier run 44049569686 failed before test execution because of malformed regular-expression syntax in a new test; the assertion was corrected. Follow-up CI runs 44050073169 (32 tests) and 44051064476 (33 tests) passed.

This is a local, provider-agnostic browser application for the EPAL-ALT-BUNNY-001 visual-identity workflow.

## Run

1. Download the complete `app` folder and keep `index.html` and `schema.js` together.
2. Open `index.html` in a modern desktop or mobile browser.
3. Choose an output task: character set, canonical reference sheet, or logo exploration.
4. Follow the progressive steps. You can move backward, jump to another step, or leave undecided fields blank.
5. Enter only traits and decisions you have actually chosen. Field help explains the purpose of each input.
6. Change a field's status to **User confirmed** only after reviewing it. Project defaults are suggestions, not approved identity.
7. Review the live prompts. Character and canonical prompt copying remains blocked until adult presentation is explicitly confirmed; canonical copying also requires the separate review checkbox.
8. Export JSON before substantial changes or moving to another device. Import an earlier export to continue.

The app uses no server, account, external library, or network connection. It does not upload data or generate images. Attach actual reference images separately in the image-generation tool; reference IDs and filenames are labels only.

## Progressive workflow

- **Foundation:** core character identity, project metadata, and adult-presentation safeguards.
- **Appearance:** face, hair, ears, outfit, signature markers, and palette.
- **Rendering styles:** independent anime, 3D, and chibi settings. This step is omitted for canonical-sheet and logo tasks.
- **Composition:** temporary pose, expression, camera, framing, background, lighting, and props. Omitted for canonical-sheet and logo tasks.
- **References:** canonical identity, per-style rendering, and composition references.
- **Logo:** a separate mark/wordmark workflow, shown only for the logo task.

Each step shows a count of fields with a value and a status other than **Undecided**. This is a completion aid, not an approval score: optional fields may remain blank, and required checks are enforced separately. Navigation does not require completing every field.

## Data and prompt rules

- `schema.js` is the single field registry, help-text source, step definition, validator, and prompt engine.
- Character identity remains shared; anime, 3D, and chibi rendering settings remain independent.
- Scene/composition settings are per-image instructions, not permanent identity facts.
- Project metadata (name, revision, platform, audience, deliverable notes) is separate from canonical character identity.
- The project revision is shown with the prompt preview and included in export metadata.
- Export metadata records the schema version, prompt-engine version, export timestamp, and project revision. The timestamp is metadata only; it is not inserted into the prompt text, so it does not change prompt reproducibility.
- Exported records preserve unknown field entries for forward compatibility. Keep the original export as a backup when moving between app versions.
- Legacy shared-style fields remain import-compatible but are hidden from the progressive editor; use the independent style-profile fields for new work.
- Character and canonical-sheet prompts require a non-empty, explicitly user-confirmed adult presentation. The age field must contain an explicit adult marker or a numeric age of at least 18; gender labels such as “woman” or “man” alone do not pass; ambiguous/unclear age wording, negated adult wording, under-18 cues, and ages below 18 are rejected. This text check examines the age-presentation field only. It does not inspect every other field for youth-coded cues, classify an image, or replace owner review of the full prompt and generated output.
- Chibi is a rendering style, not an age category. Do not use youth-coded cues or age-ambiguous presentation.
- Logo mode inherits only explicitly confirmed identity and palette decisions; it excludes scene/composition fields.
- Reference IDs/filenames do not embed images. Attach actual reference assets separately.
- No automatic local persistence is provided. Export JSON to keep a backup.

## Tests

From this folder, with Node.js installed:

```sh
node --test schema.test.js
```

An automated GitHub Actions workflow (`.github/workflows/epal-app-tests.yml`) runs the Node 22 acceptance suite and schema/inline-script syntax checks.

The separate browser suite uses Playwright 1.64.1 and Chromium:

```sh
npm install --no-save playwright@1.64.1
npx playwright install chromium
node browser-tests.mjs
```

The dedicated workflow is `.github/workflows/epal-browser-tests.yml`. Latest run [44058440646](https://github.com/zonedeth5/AI_workspace/actions/runs/44058440646) passed **12 browser tests**, including sequential keyboard focus traversal and Pixel-sized touch emulation at 412×915 with 44×44 px minimum wizard navigation controls. This is desktop Chromium touch emulation, not an Android OS/device run. Automated checks do not replace Android/iOS device testing, Safari/Firefox coverage, assistive-technology checks, or manual keyboard/clipboard testing.

## Current limitations

- No reference image is embedded in JSON.
- The app does not automatically save data between browser sessions.
- Automated headless Chromium checks now cover key runtime flows at 1280×900, 390×844, and Pixel-sized touch emulation at 412×915. Actual Android/iOS devices and operating systems, Safari/Firefox, screen readers, clipboard permission failures, full keyboard-only operation, and the full 320/375/768 px viewport matrix remain untested.
- The app has no image-generation provider integration.
- No claim is made that using the app improves ePal impressions, inquiries, conversion, orders, or earnings.

## Historical Cycle 089 alpha status snapshot (superseded by Cycle 128)

- Historical code snapshot: schema/prompt engine v1.4.1; 51-field registry at that point.
- Historical test inventory: 28 test definitions in schema.test.js at that point.
- Historical CI snapshot: run 44014104161 tested commit 81656b69c651faf32e4c2be9cb421becc001b971.
- Historical source SHAs are retained for audit history and are not the current source identities.
- Not verified: local execution, browser/mobile rendering, accessibility, clipboard, import/export behavior across devices, and image-provider integration.

This is CI evidence, not a claim that the app was executed locally in this cycle.


Cycle 129 added a source-level regression test covering all three dynamic HTML sinks and their escaping requirements. This guards the reviewed output paths but is not a dynamic XSS/browser security test. See [Cycle 129 security audit](../../../../EPAL-ALT-BUNNY-001/research/cycle-129-static-html-output-safety-audit-2026-11-17.md).


Cycle 130 adds explicit import warnings when malformed field entries are skipped, missing/non-string field values are replaced with empty strings, or missing/unsupported statuses are reset to Undecided. Regression tests confirm warnings are emitted and the source import object is not mutated.

Cycle 131 enforces a **2 MiB maximum JSON import size before reading file contents**. Oversized files are rejected with an explicit message. Import assignment occurs only after JSON parsing and record validation. CI source tests cover the size guard and assignment ordering; actual browser file-picker, memory, and mobile behavior remain untested.

The follow-up regression test also covers missing `value` and `status` properties, which are now reported when normalized to empty/Undecided defaults.


Cycles 132–134 added a dedicated Playwright runtime suite. It verifies app startup and initial network behavior, wizard navigation/focus, keyboard-only toolbar and wizard navigation, Pixel-sized touch emulation, adult-presentation gating, inert hostile field text, canonical approval gating, invalid/oversized import state preservation, near-limit import and unknown-field round-trip, export/re-import fidelity, responsive layout, and task-switch retention. The latest GitHub Actions run [44058440646](https://github.com/zonedeth5/AI_workspace/actions/runs/44058440646) completed successfully with **12 passed, 0 failed**. This is Linux desktop Chromium headless evidence with emulated mobile viewport/touch properties, not an Android OS/device run or assistive-technology certification. Cycle 134 adds 44×44 CSS-pixel minimum dimensions to wizard Back/Next controls.

Cycle 135 expanded the mobile/touch emulation bench to six CSS viewport sizes: 320×740, 360×800, 375×812, 390×844, 412×915, and 768×1024, with device-scale factors 2–3, `isMobile=true`, and `hasTouch=true`. At every size it checks horizontal overflow, single-column layout, 44×44 px Back/Next targets, actual touch taps through Next and Back, expected wizard headings, and absence of page runtime errors. GitHub Actions run [44059876221](https://github.com/zonedeth5/AI_workspace/actions/runs/44059876221) passed **12/12 browser tests**. This is accepted as provisional alpha mobile-emulation evidence at the owner's direction; it remains desktop Chromium emulation, not native Android OS/device, Chrome for Android, WebView, TalkBack, or native file-picker evidence.


Cycle 136 adds a mobile/touch JSON round-trip test at 360×800 @3x and 412×915 @2.625x. It exports confirmed field values, reloads the page, imports the downloaded JSON, verifies exact values and statuses are restored, then attempts a malformed import and verifies the restored profile remains unchanged. This validates the documented manual export/import persistence workflow; it does not add automatic browser storage or prove native mobile download/file-picker behavior. The test passed in hosted Chromium run [44061172860](https://github.com/zonedeth5/AI_workspace/actions/runs/44061172860): **13 passed, 0 failed**. See the Cycle 136 QA report.


Cycle 137 hardens JSON import preflight: the selected filename must end in a .json extension, and a declared MIME type must be application/json or an application/*+json media type. Empty JSON files are rejected by parsing without changing current profile data. Browser tests also cover malformed field entries: invalid entries are reported as warnings while valid sibling entries are retained. This is a file-selection sanity check, not cryptographic/content-type authentication; filenames and MIME declarations can be spoofed, so JSON parsing and schema inspection remain authoritative.


## Current alpha verification snapshot — Cycle 137

The latest source commit for this snapshot is `1b5e3edd7a7242d47a29a58461691c486e237bb7`. Hosted GitHub Actions Chromium run [44062365332](https://github.com/zonedeth5/AI_workspace/actions/runs/44062365332) tested that exact commit and passed **15/15 browser tests, 0 failures**. The run used Linux headless Chromium 156.0.8078.4, Playwright 1.64.1, Node.js 22, and a local `file://` app origin. Its tests include empty/non-JSON import rejection, malformed-entry warning and valid-sibling preservation, invalid-import state preservation, mobile emulation, export/re-import, keyboard smoke coverage, and the previously established core flows.

The latest Node acceptance workflow [44062179383](https://github.com/zonedeth5/AI_workspace/actions/runs/44062179383) tested parent commit `e1d80bcca9665a016ac2890d46e167f0474640cd` and passed **39/39 tests**, with schema and extracted inline-script syntax checks. That Node run predates the final test-assertion-only commit; the exact final commit has Chromium runtime evidence, but no separate Node workflow run was triggered for it. Do not describe the Node suite as having run on `1b5e3ed`.

Cycle 138 records checks that require physical devices, native operating systems, assistive technology, account-specific access, or external human/legal review as **DELAYED UNTIL AFTER ALPHA**. This is a scheduling disposition, not a pass or a waiver. See the [Alpha Patch Backlog](../operations/ALPHA_PATCH_BACKLOG.md) for the authoritative deferral register. Rights clearance, canonical identity approval, and explicit owner publication approval remain pre-publication gates and are not deferred.


## Current verification snapshot — Cycle 139

The latest hosted Chromium runtime run [44064916418](https://github.com/zonedeth5/AI_workspace/actions/runs/44064916418) tested exact commit `2f1846e8b17ef42de0c66cdb66ac4b05aca10d78` and passed **16/16 browser tests, 0 failures**. This includes JSON-imported hostile HTML/SVG/script/iframe strings remaining literal in form controls and generated previews, with no injected elements or script execution detected. Environment: Linux hosted runner, Node.js 22, Playwright 1.64.1, Chromium 156.0.8078.4, local `file://` origin.

This is automated Chromium regression evidence only; it is not comprehensive security certification or proof of native mobile, Safari/Firefox, screen-reader, or assistive-technology behavior. See the Alpha Patch Backlog for deferred checks. The latest 39-test Node acceptance result is a separate historical run and must not be represented as having run on Cycle 139's exact commit.
