# Alt Bunny — ePal Profile, Safety & Visual Identity Guide

This release candidate brings together practical guidance for presenting an adult gaming-companion service, defining clear service boundaries, communicating accurately, protecting privacy, and maintaining a consistent visual identity.

**Project:** EPAL-ALT-BUNNY-001  
**Release candidate:** Alpha v1.0  
**Status:** Review candidate — not an official ePal publication and not a guarantee of platform approval.

## Included guides

- **Visual Identity & Image Consistency System v1.6:** canonical design language, identity-lock rules, style branches, prompt governance, and production gates.
- **Character Sheet → Prompt Builder:** local browser app and source files in `app/`; it creates prompts and JSON records but does not generate images or upload data.

- **Alt Bunny Formal Optimization Guide:** positioning, service design, communication, pricing considerations, screening, retention, and evidence limitations.
- **Master Guide:** research-backed profile and workflow guidance, with platform-policy caveats and worker-experience context.
- **Risk, Security & Worker Safety Playbook:** privacy practices, boundary management, scam response, and operational safeguards.
- **Worker Experience and Boundary Management:** attributed community examples and adjacent-platform research, with limitations clearly stated.
- **Third-Party Notices:** license scope, attribution, and excluded material.

## Important limitations

This material is informational, not legal advice or a promise of earnings, visibility, bookings, or outcomes. Platform rules and interfaces can change; verify current official ePal guidance before acting. Community posts are self-selected anecdotes and do not establish prevalence or typical worker experiences. Research about other platforms is labeled as adjacent-platform evidence, not ePal evidence.

The visual identity guide remains a production specification, not approval of a canonical character image. No unapproved character artwork, screenshots, platform logos, or third-party figures are included in this candidate package.

## Privacy and rights

The profile-specific account URL is intentionally omitted. Do not infer account identity from this guide. The accompanying [Apache License 2.0](LICENSE) applies only to original material the project owner is entitled to license; see [Third-Party Notices](THIRD_PARTY_NOTICES.md) for third-party exclusions and attribution requirements.

“ePal” is referenced descriptively. No affiliation, sponsorship, or endorsement by ePal is implied.

## Application verification boundary

The app's current source files match [GitHub Actions run 44054936580](https://github.com/zonedeth5/AI_workspace/actions/runs/44054936580): 39 Node acceptance tests passed, 0 failed, 0 skipped; schema and inline application-script syntax checks passed.


Cycle 130 adds import-integrity warnings for skipped malformed entries and normalized values/statuses; browser/device import and resource-limit testing remains open.

The importer also warns when field objects omit `value` or `status` properties and normalization supplies defaults.


Cycle 131 adds a 2 MiB pre-read JSON import limit and regression checks for the limit and validation-before-state-assignment. This is still not browser/device runtime verification.


## Current alpha verification snapshot — Cycle 139

The latest hosted Chromium runtime run [44064916418](https://github.com/zonedeth5/AI_workspace/actions/runs/44064916418) tested exact commit `2f1846e8b17ef42de0c66cdb66ac4b05aca10d78` and passed **16/16 browser tests, 0 failures**. The suite includes a hostile imported-text regression: HTML, SVG, script, and iframe payloads imported through JSON remained literal text in form controls and generated prompt previews; no injected elements or script execution were detected by the test. Environment: Linux hosted runner, Node.js 22, Playwright 1.64.1, Chromium 156.0.8078.4, local `file://` app origin.

This is automated Chromium evidence, not comprehensive security certification, native Android/iOS validation, cross-browser verification, or assistive-technology certification. Physical-device, Safari/Firefox, screen-reader, full clipboard-permission, and other deferred checks remain listed in the Alpha Patch Backlog. The profile-specific account URL remains omitted. The package contains no approved canonical character artwork; the visual identity guide is a production specification, not approval of a canonical image.

The owner has elected to retain short attributed community excerpts in this release candidate. The Third-Party Notices remain in force: no author permission is represented, the excerpts are not relicensed under Apache-2.0, and no legal determination is made about any particular quotation. Readers should evaluate applicable rights independently.
