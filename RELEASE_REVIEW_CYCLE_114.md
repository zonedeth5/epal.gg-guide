# Cycle 114 — Independent Alpha Release Review
**Project:** EPAL-ALT-BUNNY-001  
**Reviewed branch:** `epal-alt-bunny-profile-optimization-cycle-01-2026-11-16`  
**Reviewed head before this review commit:** `153b102afa46ac18e244e2987ed8ce2a3cea8aa4`  
**Disposition:** REVIEW COMPLETE — ALPHA PREVIEW ONLY; NOT PUBLIC-RELEASE CLEARED

## Executive result

The candidate package is materially improved by carrying its own Apache-2.0 license text and an accurate third-party notice. The notice now acknowledges that selected Reddit excerpts remain in the guides, distinguishes them from project-owned material, and states that they are not relicensed under Apache-2.0. As instructed by the project owner, the Reddit excerpts were not edited or separately evaluated for legal exceptions in this cycle.

The package is not ready for unrestricted public release. The remaining reasons are chiefly evidence/bibliography closure, explicit adult-character identity approval, generated-asset review, and browser/mobile/accessibility QA. No public repository was changed.

## 1. Scope and method

Read-only review covered:
- The six files in `public-release-candidates/alpha-v1.0/` before the notice/license update.
- The current app entry point, schema, tests, app README, and GitHub Actions workflow.
- The current Visual Identity System v1.6 status and alpha image-staging README.
- The private repository metadata, branch head, candidate blob readbacks, and prior GitHub Actions run.
- Current official ePal help pages for order flow, disputes, exposure, and the community safety notice.
- Official Apache-2.0 and Creative Commons CC BY 4.0 license texts.

This was a source/document review. It was not a legal opinion, penetration test, browser/device test, or exhaustive validation of every external URL or every academic reference.

## 2. Rights and attribution review

### 2.1 Apache-2.0 package completeness — addressed

The candidate folder now contains a complete copy of the Apache-2.0 license text from the confirmed public destination repository. The license file is intended to cover only original project material the owner is authorized to license. The README links to it and to this notice.

The notice distinguishes third-party content and makes clear that Apache-2.0 does not convey ownership or permissions over Reddit posts, ePal marks/policy material, or academic content. Apache-2.0 itself requires recipients to receive a copy of the license and preserves relevant attribution notices; it does not grant trademark rights.

### 2.2 Reddit excerpts — retained by owner instruction

Selected excerpts remain in the Master Guide and related guides. They have not been modified in this review. The revised notice accurately states that:
- Reddit posts/comments remain attributable to their authors or applicable rights holders.
- Excerpts are not project-owned and are not relicensed under Apache-2.0.
- Source links are retained where available.
- No permission or endorsement is represented.
- This notice does not decide whether any specific quotation is permitted under a legal exception.

No quote-level legal analysis was performed, per the owner's instruction.

### 2.3 Bixin study — attribution improved

The worker-experience document identifies Chen and Ke (2026), the article title, journal, article number, DOI, publisher page, Bixin research context, and CC BY 4.0 status. The third-party notice now includes the canonical license link and explains that the summary is paraphrased and that no figures/tables are reproduced. The Bixin sample is explicitly described as adjacent-platform evidence, not ePal evidence.

### 2.4 ePal marks and policy material — disclosed

The candidate package contains links and descriptive references to ePal help/policy pages, but no ePal logo, screenshot, or other platform image asset. The notice disclaims ownership, affiliation, endorsement, and any implied license over ePal marks or policy text.

### 2.5 Visual assets and app dependencies — no assets bundled

No approved character image, logo, screenshot, font, or icon asset is included in the six-file candidate package. The reviewed app source references a local `schema.js` file; no remote script, CDN, external import, or third-party runtime library was found in the inspected entry point and app folder. Recheck any new asset or dependency before adding it.

## 3. Application review

### Verified source and CI evidence

- App: local, provider-agnostic browser prototype; schema/prompt engine v1.4.1.
- Registry: 51 fields.
- Test inventory: 28 test definitions.
- Entry point loads local `schema.js`; no remote script/CDN or network request was identified in the inspected source.
- The app creates prompt text and JSON exports. It does not call an image provider, upload images, or generate image files.
- GitHub Actions run [44014104161](https://github.com/zonedeth5/AI_workspace/actions/runs/44014104161) completed successfully on commit `81656b69c651faf32e4c2be9cb421becc001b971`. The Node acceptance-test and schema-syntax steps both passed.
- The tested blobs for `index.html`, `schema.js`, and `schema.test.js` match the current branch blobs recorded in the app README. The later documentation-only branch head was not itself the tested commit.

### Runtime and security boundaries

Not verified in this cycle:
- Browser or mobile runtime behavior.
- Keyboard-only and screen-reader accessibility.
- Clipboard behavior across browsers.
- JSON import/export behavior across devices and browser versions.
- Small-screen layout and touch targets.
- Real generated-image fidelity or provider handoff.

The adult-presentation validator is a text-field check on the age/presentation field. It does not scan every field for youth-coded cues, classify an image, verify a person's age, or replace owner review. The app README correctly discloses this limitation. Chibi must remain a style choice for a clearly adult character, not a child-coded character.

## 4. Guide and evidence review

### Master Guide v2.8

The guide is comprehensive but long (approximately 2,115 lines) and retains extensive historical cycle material. Its own text records unresolved bibliography and evidence tasks, including source corrections/clarifications involving Béal & Grégoire, Lin et al., the Bixin interview-date inconsistency, OECD metadata, and Cao (2026) reporting. It also explicitly says full bibliography repair and full-text review remain pending.

**Finding:** suitable as a detailed alpha research/reference document, not as a fully evidence-closed authoritative handbook. Before final release, separate current actionable guidance from historical audit chronology and close the named citation issues.

### Alt Bunny Formal Guide v1.1

The guide remains marked as an alpha release candidate with profile-specific implementation pending. It contains bracketed placeholders and a profile audit table with unknown fields. The account-specific URL has been removed from the candidate copy. The dedication and Alt Bunny identity remain intact.

**Finding:** publish only as a reusable template/alpha guide, not as a completed diagnosis of a specific live profile. Clearly label every placeholder as requiring owner input.

### Risk, Security & Worker Safety Playbook v2.2

The current active v2.2 metadata is distinguished from inherited historical material. The Playbook provides practical recording, bystander, evidence-minimization, privacy, and escalation guidance. Some legal duties are correctly left conditional rather than stated as universal rules.

**Finding:** useful operational guidance, but not legal advice. Recording and evidence handling remain jurisdiction- and platform-dependent; the document appropriately advises checking applicable law and current platform rules.

### Worker Experience and Boundary Management v1.0

The section distinguishes separate participants in the same Reddit thread, limits claims from self-selected anecdotes, and explicitly separates Bixin research from ePal evidence.

**Finding:** acceptable as an anecdotal/context section with its limitations retained. Repeated use of a thread across documents must not be counted as independent observations.

### Visual identity and image staging

The latest Visual Identity System v1.6 states that the canonical character sheet is blank/unapproved, exact palette values remain owner decisions, and image generation remains on hold. The alpha staging README also correctly describes the three prompts as templates rather than generated/approved assets.

**Finding:** do not generate or publish character images, logo, avatar, or cover assets until the canonical adult identity and exact palette are approved and outputs receive a separate visual review. The Visual Identity System is not included as a file in the current six-document candidate folder; include it only if the package is intended to provide the full design specification, and label its production hold clearly.

## 5. Current platform-source cross-check

The current official [Dispute Orders FAQ](https://www.epal.gg/help/faq/31) states that acceptance starts the client's 72-hour refund-request countdown and automatically marks the order completed; it separately advises a client who cannot receive service or contact the ePal within 36 hours to submit a dispute. The current [ordering FAQ](https://www.epal.gg/help/faq/17) describes the 72-hour period as after order completion. The guide's cautious reconciliation—treating acceptance/completion as the trigger and checking the live order state—is consistent with those pages.

The current [Introduction to ePal FAQ](https://www.epal.gg/help/faq/16) describes service setup, levels/exposure, random variation in list position, responsiveness, and subscriptions. The [Community Safety Notice](https://www.epal.gg/lobby/moments/1236267) addresses reports of competing-platform promotion and coercive signup/review pressure.

The linked [Terms of Service](https://policies.epal.gg/terms) displays a June 1, 2020 date. Treat it as an older published terms page, not as proof that every current platform rule has been captured. Recheck current in-app/help-center terms before relying on any clause. Official help content may change without the guide changing.

## 6. Release gate matrix

| Gate | Result | Notes |
|---|---|---|
| Candidate folder has standalone Apache license | PASS | Full LICENSE copy added |
| Third-party notice accurately scopes rights | PASS | Reddit excerpts, Bixin, ePal marks/assets disclosed |
| Profile-specific URL removed from candidate copies | PASS | Confirmed absent in candidate scan |
| Original source documents preserved | PASS | No source-file edits/deletions in this review |
| App source/test CI evidence | PASS WITH SCOPE LIMIT | Prior successful run; exact source/test blobs match |
| Dependency/runtime security review | PARTIAL | Static source inspection only; no runtime penetration test |
| Browser/mobile/accessibility QA | OPEN | Not performed |
| Full bibliography and evidence closure | OPEN | Master Guide itself records unresolved items |
| Canonical character identity approval | OPEN | Blank/unapproved |
| Generated visual asset QA | OPEN | No assets generated or approved |
| Current platform policy recheck | PARTIAL | Key FAQ pages checked; 2020 Terms page is dated |
| Public staging and final owner approval | OPEN | No public changes authorized or made |

## 7. Final disposition and next actions

**Disposition: ALPHA PREVIEW ONLY — NOT PUBLIC-RELEASE CLEARED.**

This is a usable private review bundle with corrected license/rights disclosure. It is not yet a polished public handbook or a finished character package.

Recommended next actions:
1. Run a browser/device/accessibility QA pass on the local app and record exact browser/device versions and observed results.
2. Close the Master Guide bibliography/source issues or clearly quarantine unresolved citations from any claims presented as settled.
3. Decide whether to include the Visual Identity System v1.6 in the candidate package; if included, retain the explicit image-generation hold.
4. Recheck the live ePal help/terms sources immediately before public release.
5. Perform a final independent scan of the exact staged package, then obtain explicit owner approval before any public-repository change.

No public repository files, branches, releases, or deployment settings were modified in this review.
