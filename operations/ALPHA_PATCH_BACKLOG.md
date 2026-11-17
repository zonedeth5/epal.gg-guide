# Alpha Patch Backlog — Browser, Device, and Release Validation

**Project:** EPAL-ALT-BUNNY-001  
**Candidate:** Alpha v1.0  
**Owner status:** Private working candidate; not release-cleared  
**Updated:** 2026-11-17  
**Source:** Cycle 128 static review, CI run 44051064476, and current standards/research scan

## Definition of done

Each item needs an actual result from the named browser/device or a supported automation runtime, with browser/version, OS/device, viewport, date, steps, expected result, observed result, screenshots/logs where relevant, and pass/fail/blocker. A source-level assertion or Node syntax check is not a substitute.

## P0 — Required before any “browser-tested” or production-ready claim

### AP-001 — Real browser flow and responsive layout
- Run the app from a supported local origin in at least one desktop browser and one Android browser.
- Test viewports around 320 px, 375 px, 768 px, and desktop width.
- Check page overflow, clipped controls, preview position, step-navigation wrapping, labels, touch targets, scrolling, and visible focus.
- Record a screenshot for each key state.
- Status: **PARTIAL RUNTIME PASS — headless Chromium CI checked 1280×900 desktop and 390×844 narrow layout; Android browser, 320/375/768 px, screenshots, and manual touch-target review remain pending.**

### AP-002 — Keyboard-only end-to-end flow
- Use Tab, Shift+Tab, Enter, and Space without a pointer.
- Cover task selection, wizard jumps, Back/Next, field edits/status changes, individual prompt copy, Copy All, file import, reset confirmation, and post-transition focus.
- Specifically verify import moves focus to the step heading and that the file picker can be reached and opened from the keyboard. Cycle 128 keeps the native file input focusable and styles its adjacent label on focus. Canonical approval also preserves focus after checkbox state changes and avoids rebuilding unchanged validation markup; both are guarded by source-level CI assertions, not runtime evidence.
- Check focus is not hidden behind sticky content or offscreen after step changes.
- Status: **PARTIAL RUNTIME PASS — Playwright verified Next/Back navigation, heading focus restoration, and canonical-review checkbox focus. Full keyboard-only operation, native file-picker keyboard access, clipboard, and reset flow remain pending.**

### AP-003 — Clipboard behavior and failure paths
- Run from HTTPS or localhost in supported browsers.
- Test successful individual copy and Copy All.
- Test denied clipboard permission, absent Clipboard API, lost transient user activation, and fallback failure.
- Confirm the live status message announces success/failure without stealing focus.
- Current implementation retains `document.execCommand("copy")` as a fallback; MDN classifies it deprecated and non-standard. Decide whether to retain with limited support disclosure or replace with a clearly explained manual-select fallback after browser matrix testing.
- Status: **NOT RUN — clipboard permissions, denied/absent API, and fallback behavior still require browser QA.**

### AP-004 — JSON export and object-URL lifecycle
- Verify downloaded filename, valid JSON content, expected values/statuses, schema and prompt-engine versions, timestamp, and project revision.
- Exercise repeated downloads, large but realistic records, cancellation, and mobile browser download handling.
- Observe whether 1,000 ms object-URL revocation is reliable across the supported browsers; adjust lifecycle only against observed results.
- Status: **PARTIAL RUNTIME PASS — Playwright verified a JSON download and re-import. Repeated downloads, cancellation, mobile download behavior, and cross-browser object-URL revocation timing remain pending.**

### AP-005 — JSON import end-to-end
- Import an export produced by the app; verify all known values, unknown fields, task selection, status values, and forward-compatible metadata.
- Test malformed JSON, wrong root type, unsupported schema version, unsupported task, prototype-sensitive keys, empty values, very large files, and repeat import of the same file.
- Check that invalid imports preserve existing values and that warnings/errors are understandable and announced.
- Implemented a 2 MiB file-size bound checked before `file.text()`; oversized input receives a clear error. The limit is a pragmatic alpha default and should be revisited if real user records approach it.
- Status: **PARTIAL RUNTIME PASS — Playwright verified malformed JSON rejection, >2 MiB rejection, valid 1.9 MB import, unknown-field preservation, export/re-import, and unchanged form state after invalid/oversized imports. Android file-picker behavior and deeper nested metadata stress remain pending.**

### AP-006 — Screen-reader and assistive-technology checks
- At minimum, test NVDA with a desktop browser and TalkBack with Android Chrome; add VoiceOver/Safari if Safari is a supported target.
- Check labels/help text, status selects, step navigation, progress value, preview changes, live validation messages, copy feedback, import warnings/errors, and focus after navigation/import/reset.
- Confirm live regions do not become noisy or duplicate announcements.
- Status: **NOT RUN — assistive-technology QA required.**

### AP-010 — Dynamic HTML and import resource-safety runtime checks
- Cycle 129 source review found exactly three dynamic `innerHTML` sinks; the shared escaping helper is used for user-controlled/schema-controlled text in each reviewed sink. CI test 34 guards this source pattern.
- This is not a dynamic XSS penetration test. In alpha QA, import strings containing HTML tags, quotes, event-handler payloads, SVG payloads, Unicode edge cases, and prototype-sensitive keys; confirm they display as inert text and do not execute.
- Cycle 131 implements a 2 MiB pre-read size guard and a clear rejection message. CI source tests verify the guard precedes `file.text()` and that state assignment follows validation. Alpha QA must still test large files, nested metadata, mobile memory behavior, and that the live form remains unchanged after an oversized-file rejection.
- Status: **PARTIAL RUNTIME PASS — one hostile HTML/event-handler field payload remained inert in Chromium; the 2 MiB pre-read guard and state preservation passed browser tests. This is not a comprehensive penetration test; SVG payloads, Unicode edge cases, nested metadata, and mobile memory behavior remain pending.**

## P1 — Required for accessibility/release confidence

### AP-007 — Full color and focus-state review
- Cycle 128's sampled color pairs exceeded WCAG AA text contrast thresholds; this is only a partial static contrast calculation.
- Check every normal/hover/disabled/focus/selected combination, focus indicator contrast, gradients, text over preview cards, and mobile high-contrast/zoom behavior.
- Status: **PARTIAL STATIC CHECK PASS; FULL VISUAL CHECK NOT RUN.**

### AP-008 — Real browser network/privacy verification
- Current HTML/schema source inspection found no external script/style dependency and no common outbound network call sites.
- Use browser network tools to confirm no requests leave the local app during editing, preview, copy, export, or import.
- Confirm user values are not persisted after page close/reload and confirm the UI explains this accurately (Cycle 128 footer wording corrected).
- Status: **PARTIAL RUNTIME PASS — browser request capture during initial app boot observed only local `file://` requests. Repeat capture during editing, preview, copy, import, and export remains pending.**

### AP-009 — Import safety and resilience
- Verify very large JSON files, deeply nested unknown extension metadata, invalid Unicode, repeated unknown fields, and corrupt files do not freeze the UI or corrupt the current form.
- Confirm an import failure never partially replaces in-memory values.
- Add limits only after selecting a documented maximum record size from realistic use cases.
- Status: **PARTIAL RUNTIME PASS — near-limit 1.9 MB import, over-limit rejection, malformed import preservation, and extension-data round-trip passed in Chromium. Deeply nested metadata, Unicode stress, and mobile memory behavior remain pending.**

## Release gates outside browser QA

- Canonical character identity sheet must be owner-approved before image generation.
- Third-party quotation rights remain unresolved; attribution is not proof of permission.
- Inherited bibliography/economics/creator-source reconciliation remains open.
- Explicit final owner approval is required before any public publication. The destination repository is public to everyone; no publication occurred.

## Current tested code evidence

- Cycle 127 GitHub Actions run 44047250490: 29 tests passed, 0 failed; schema and inline app-script syntax checks passed.
- Cycle 128 interim GitHub Actions run **44050073169** tested commit `1beb656f3c75f29240f28ca9695daf8022001c03`: **32 tests passed, 0 failed, 0 skipped**; schema and inline app-script syntax checks passed.
- Final Cycle 128 GitHub Actions run **44051064476** tested commit `f914171e32a824549fa410aec9da42e529216c16`: **33 tests passed, 0 failed, 0 skipped**; schema and inline app-script syntax checks passed.
- Cycle 128 regression checks include successful-import focus restoration, unique registry/DOM IDs and wizard-group mapping, keyboard-focusable native file-input markup with visible focus treatment, accurate unsaved-data-loss notice, canonical-review checkbox focus restoration, and avoidance of unchanged live-region DOM rebuilds.
- The earlier run 44049569686 failed before execution because of malformed regex syntax in a new test; it was fixed before runs 44050073169 and 44051064476 passed.
- Runtime/browser/device items above remain not run until actual execution evidence exists.
- The local page now explicitly warns that field data is not persisted and is lost after page reload/close unless exported.



### AP-011 — Import normalization transparency
- Review finding: import normalization previously skipped non-object field entries, replaced non-string values with empty strings, and reset unsupported statuses to Undecided without telling the user. This could make an import appear complete while silently losing or changing individual field data.
- Cycle 130 adds explicit warning counts for skipped entries, missing or non-string values, and missing or unsupported statuses. The original parsed record is not mutated by inspection.
- Regression tests 35–37 cover malformed entries, missing properties, warning emission, and non-mutation.
- Status: **SOURCE PATCH AND CI REGRESSION PASS; browser import UX and resource behavior still require alpha QA.**

- Latest Cycle 130 CI run [44054303230](https://github.com/zonedeth5/AI_workspace/actions/runs/44054303230): **37 passed, 0 failed, 0 skipped**; schema and extracted inline application-script syntax checks passed.


### AP-012 — Current platform economics/policy snapshot
- Cycle 131 rechecked official ePal Help Center pages for service categories, application requirements, order/dispute timing, and Wallet/withdrawal mechanics.
- The Wallet FAQ currently states Buff's displayed 1:1 USD conversion, non-withdrawable recharge Buff, 3–15 day withdrawal eligibility based on completed orders, PayPal-only withdrawal, a 20% withdrawal commission, and a 1–500 single-withdrawal range. It also describes payment-channel fees and a 10% platform recharge service fee. These are dynamic platform statements, not guaranteed net earnings; verify the live Wallet and fee schedule before pricing or payout decisions.
- The Terms page still displays June 1, 2020. Do not present it as a freshly revised 2026 terms document; the page contains later policy content but its main terms date is old.
- Status: **OFFICIAL SOURCE RECHECK COMPLETE; LIVE ACCOUNT-SPECIFIC FEES AND TERMS ACCEPTANCE NOT VERIFIED.**

- Latest CI run [44054936580](https://github.com/zonedeth5/AI_workspace/actions/runs/44054936580), tested commit `22d8a27ffc55fb105530ddb3aa961e6f47921853`: **39 passed, 0 failed, 0 skipped**; schema and extracted inline application-script syntax checks passed.


### AP-013 — Automated Chromium runtime regression suite
- Cycle 132 added an isolated Playwright browser suite and a dedicated GitHub Actions workflow; the production app source was not changed for this test addition.
- GitHub Actions run [44056172091](https://github.com/zonedeth5/AI_workspace/actions/runs/44056172091), commit `d38df3c828e35fa9e4f5269bb3c926c1c23bcf29`: **10 passed, 0 failed**.
- Runtime: GitHub-hosted Ubuntu runner, Node.js 22, Playwright 1.64.1, Chromium/Chrome for Testing 156.0.8078.4, headless, app opened from a local `file://` URL.
- Covered startup/runtime errors, initial network requests, wizard navigation/focus, adult-presentation gate, inert hostile HTML text, canonical approval gate/focus, malformed import preservation, oversized-file rejection/preservation, valid near-limit 1.9 MB import and unknown-field round-trip, export/re-import fidelity, desktop/narrow responsive layout, and task-switch value retention.
- The run is real automated browser evidence, but only for headless desktop Chromium on Linux. It is not Android/iOS device testing, screen-reader certification, Safari/Firefox coverage, full keyboard-only QA, clipboard permission testing, or a comprehensive security assessment.
- Status: **10/10 CHROMIUM RUNTIME TESTS PASS; MANUAL/DEVICE AND CROSS-BROWSER QA STILL OPEN.**


### AP-014 — Keyboard-only navigation and focus traversal
- Added one Playwright regression test to `app/browser-tests.mjs`; no production application code changed.
- The test uses actual sequential Tab key presses to verify focus order across the task selector, export action, import file input, reset action, and wizard navigation controls.
- It activates the next wizard step with Enter, verifies the step heading receives focus and `aria-current="step"` updates, then checks that Tab enters the first field's status selector and next reaches its associated value control.
- First run [44056960108](https://github.com/zonedeth5/AI_workspace/actions/runs/44056960108) exposed an incorrect test assumption: it expected the value input immediately after the heading, but the actual field order correctly presents the status selector first. No application defect was established by that failure.
- Corrected test run [44057173870](https://github.com/zonedeth5/AI_workspace/actions/runs/44057173870): **11 passed, 0 failed**. Workflow job and browser step completed successfully.
- Recursive review: confirmed test uses keyboard input rather than click shortcuts for the tested focus path; validates both status and value controls; checks focus restoration and aria-current; asserts no page or console errors.
- Boundaries: this is a focused keyboard navigation smoke test, not full keyboard-only usability certification. It does not cover every field, reverse traversal, dialogs, file-picker interaction, reset confirmation, or assistive-technology announcements. Physical Android/keyboard and TalkBack testing remain separate.
- Status: **AUTOMATED KEYBOARD NAVIGATION SMOKE TEST PASS; FULL ACCESSIBILITY QA OPEN.**


### AP-015 — Mobile touch-target and viewport smoke test
- Cycle 134 added a Playwright context with a 412×915 CSS-pixel viewport, device scale factor 2.625, `isMobile: true`, and `hasTouch: true`. The test checks one-column layout, no horizontal page overflow, visible wizard navigation, minimum 44×44 CSS-pixel Back/Next targets, and actual Playwright touch taps through Next and Back.
- First run [44057817565](https://github.com/zonedeth5/AI_workspace/actions/runs/44057817565) identified that the existing wizard buttons were below the test's 40 px minimum. The app CSS was amended to set `min-width:44px;min-height:44px` on `.step-actions button`.
- Follow-up run [44058119319](https://github.com/zonedeth5/AI_workspace/actions/runs/44058119319) confirmed the touch test passed, but exposed an existing timing-sensitive import/export assertion. Inspection showed the import handler awaits asynchronous `File.text()`; the test asserted before that operation was guaranteed to finish. The test now waits for both restored value and status before asserting. No import implementation change was needed.
- Final browser run [44058440646](https://github.com/zonedeth5/AI_workspace/actions/runs/44058440646): **12 passed, 0 failed**. The Pixel-sized touch emulation test passed, including 44×44 minimum controls and touch taps.
- Node acceptance run [44058119306](https://github.com/zonedeth5/AI_workspace/actions/runs/44058119306): **39 passed, 0 failed, 0 skipped**; schema and inline-script syntax checks passed.
- Recursive review: verified CSS is scoped to wizard navigation only; test asserts both controls meet the 44 px minimum; test uses touch taps, not mouse clicks; page overflow and runtime errors are checked; asynchronous import assertion now waits for actual state restoration.
- Limits: this uses desktop Chromium's mobile/touch emulation only. It does not run Android, Android Chrome, WebView, a physical device, mobile keyboard, screen reader, or native file picker.
- Status: **MOBILE TOUCH EMULATION PASS; REAL ANDROID DEVICE QA STILL OPEN.**


### AP-016 — Six-size Android-like mobile/touch emulation bench
- Cycle 135 expanded the Playwright mobile test to six CSS viewport/device-scale configurations: 320×740 @2x, 360×800 @3x, 375×812 @3x, 390×844 @3x, 412×915 @2.625x, and 768×1024 @2x. Each context enables `isMobile` and `hasTouch`.
- At every size the test checks that document width does not exceed the viewport, the app uses a single-column layout, Back/Next each meet 44×44 CSS px, Playwright touch taps advance to Appearance and return to Foundation, and no page runtime errors occur.
- GitHub Actions run [44059876221](https://github.com/zonedeth5/AI_workspace/actions/runs/44059876221), commit `68d7f60a6016d34da5db03c70976bb461f15f73c`: **12 passed, 0 failed**. All six viewport configurations passed within the new matrix test; all other existing Chromium runtime tests passed as well.
- Recursive review: the test exercises real Playwright touch input rather than click calls for mobile navigation; asserts layout and overflow at each viewport; checks both target dimensions and step state transitions; captures page runtime errors; closes each browser context after each size to avoid state leakage.
- Owner-approved alpha interpretation: this Chromium mobile/touch emulation is accepted as provisional alpha mobile evidence. It must not be described as native Android device or Android Chrome certification.
- Remaining limitations: no Android OS, physical device, Chrome for Android, WebView, TalkBack, native file picker, mobile download manager, low-memory profiling, or iOS Safari execution.
- Status: **SIX-VIEWPORT CHROMIUM MOBILE/TOUCH EMULATION PASS; PROVISIONAL ALPHA MOBILE GATE SATISFIED; NATIVE DEVICE VALIDATION NOT CLAIMED.**


### AP-017 — Mobile JSON export/import round-trip and invalid-import preservation
- Add a Playwright touch-enabled test at 360×800 @3x and 412×915 @2.625x.
- Export a profile containing confirmed values and statuses; reload the page to clear in-memory state; import the downloaded JSON and verify exact value/status restoration.
- Submit malformed JSON and verify the previously restored profile remains unchanged.
- This validates the documented user-managed JSON backup workflow. It does not introduce automatic local/browser persistence or establish native Android download/file-picker compatibility.
- GitHub Actions run [44061172860](https://github.com/zonedeth5/AI_workspace/actions/runs/44061172860), tested commit `6b36dde75084121c8592e636bc44245c6df73be2`: **13 passed, 0 failed**; the new mobile JSON round-trip test passed at both viewport configurations.
- Recursive review: export was read from the actual browser download; reload cleared in-memory state; import restored exact values and confirmation statuses; malformed JSON was rejected without altering restored data; both contexts reported no page errors.
- Status: **MOBILE JSON EXPORT/IMPORT EMULATION PASS; MANUAL BACKUP/RESTORE WORKFLOW VERIFIED IN CHROMIUM.**


### AP-018 — Import file-type and malformed-entry edge cases
- Require a .json filename extension and reject a declared non-JSON MIME type before reading/parsing.
- Verify empty JSON files are rejected without changing the current profile.
- Verify malformed field entries are reported and valid sibling entries remain importable.
- Recursive checks cover unchanged existing profile data after rejected empty/non-JSON files and absence of page errors.
- Status: **IMPLEMENTED; HOSTED CHROMIUM EXECUTION PENDING.**


---

## Cycle 138 — Alpha boundary and post-alpha deferral register

**Disposition date:** 2026-11-17  
**Rule:** Checks that cannot be meaningfully completed in this environment before the provisional alpha handoff are explicitly delayed until after alpha. A delayed item is neither passed nor waived. Do not imply coverage beyond the specific automated evidence listed below.

### Verified alpha evidence

- **AP-018 — Import file-type and malformed-entry edge cases:** PASS. Chromium run [44062365332](https://github.com/zonedeth5/AI_workspace/actions/runs/44062365332), exact tested commit `1b5e3edd7a7242d47a29a58461691c486e237bb7`: **15 passed, 0 failed**. Logs confirm empty and non-JSON files are rejected without changing existing profile data; malformed entries produce warnings while valid siblings import.
- **Core Node acceptance suite:** 39 passed, 0 failed, 0 skipped in [44062179383](https://github.com/zonedeth5/AI_workspace/actions/runs/44062179383), tested parent commit `e1d80bcca9665a016ac2890d46e167f0474640cd`. This run includes the application regex correction but predates the final test-assertion-only commit `1b5e3ed`; do not misattribute its SHA.
- **Mobile emulation:** Cycle 135 six-viewport/touch bench and Cycle 136/137 import-export tests passed in hosted Chromium. This is emulation, not native device validation.
- **Import bounds and state safety:** 2 MiB pre-read guard, parse/schema validation, atomic state assignment, malformed-import preservation, near-limit import, and unknown-field round-trip have automated regression/runtime coverage as cited in the historical entries above.

### Delayed until after alpha — not tested or not supportable here

| Item | Deferred scope | Reason / post-alpha evidence required |
|---|---|---|
| AP-001 | Physical Android/iOS browser rendering, native viewport behavior, screenshots | Requires real devices and supported OS/browser combinations; Chromium emulation is not equivalent. |
| AP-002 | Complete keyboard-only acceptance across every control, native file-picker keyboard interaction, reset confirmation and full reverse traversal | Existing Playwright test is a focused smoke test, not exhaustive manual acceptance. |
| AP-003 | Real clipboard permission denial, transient-activation failures, browser-specific fallback behavior | Requires interactive permission/browser matrix and manual user-gesture testing. |
| AP-004 | Native mobile download manager, cancellation, repeated download behavior, cross-browser object-URL lifecycle | Browser download emulation does not establish OS download-manager behavior or cross-browser timing. |
| AP-005 | Native Android/iOS file picker and deeper real-world metadata stress beyond current tested cases | Requires device/browser file-provider behavior and representative user exports. |
| AP-006 | NVDA, TalkBack, VoiceOver and other assistive-technology announcement/focus validation | Requires actual screen readers and target OS/browser combinations. |
| AP-007 | Full visual review of every focus/hover/disabled/selected state, zoom and high-contrast modes | Static contrast sampling is not a substitute for visual/manual review across real renderers. |
| AP-008 | Full network capture across every edit/preview/copy/import/export action and real-device privacy review | Existing evidence covers initial local boot; full interaction capture and physical-device observation remain outstanding. |
| AP-009 | Deeply nested metadata, large/deep fuzz cases, invalid Unicode stress, low-memory/mobile performance | Existing coverage is bounded; representative stress and device memory profiling require a dedicated post-alpha bench. |
| AP-010 | Comprehensive XSS/security penetration assessment, SVG and broad Unicode payload matrix, mobile-memory security behavior | One hostile HTML payload and source-level sink checks are not a penetration test. |
| Manual compatibility | Safari, Firefox, Android Chrome, iOS Safari, WebView, native browser/file system behavior | No execution evidence for these target runtimes exists in the current test bench. |
| Operational usability | Real user observation of backup/restore, recovery instructions, and data-loss comprehension | Requires external participants and consented usability sessions. |

### Not deferred — pre-publication gates remain open

These are not merely unavailable technical tests and must not be silently moved past release:

1. Owner approval of the canonical character identity sheet/reference before any image generation.
2. Resolution of third-party quotation/reproduction rights; attribution alone is not permission. Preserve existing quotes and attributions, but do not claim rights clearance.
3. Reconciliation of inherited bibliography, economics, and creator-source claims where still unresolved.
4. Explicit final owner approval before any public publication. The public destination remains globally accessible; no public changes or deployment are authorized by this cycle.

### Alpha interpretation

- The owner has accepted the six-size Chromium mobile/touch emulation bench as sufficient for the **provisional alpha mobile-emulation gate**.
- The current browser evidence supports the statement **“15 automated Chromium runtime tests passed on the pinned private-branch commit.”**
- It does not support “fully accessible,” “security certified,” “native Android tested,” “cross-browser verified,” or “production ready.”
- Delayed items are tracked for post-alpha execution. Their status is **DELAYED**, not PASS.
