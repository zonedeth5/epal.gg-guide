# Risk, Security, and Worker-Safety Playbook for ePal Providers

## v2.2 — Cycle 082 Order-Timing and Privacy-Source Update

**Prepared:** 2026-11-16  
**Source recheck:** 2026-11-16  
**Active edition:** v2.2 — Cycle 082 Order-Timing and Privacy-Source Update.  
**Previous edition:** v2.1 (Cycle 075), preserved unchanged.  
**Status:** Additive operational clarification; not legal advice or a guarantee of platform outcomes.

**Historical inherited edition metadata — v2.1 (Cycle 075):** Recording incident handling, evidence-copy safeguards, and competitor-pressure thresholds. This is retained as provenance for material carried forward; it is not the active edition. The v2.1 edition was derived from v2.0, and earlier editions remain preserved.
**Companion guide:** [ePal Master Guide v2.8](../guides/ePal-Master-Guide-v2.8.md)
**Revision scope:** Implements exactly three items: A02 post-capture bystander handling, A08 original-versus-submission-copy workflow, and A09 competitor-promotion threshold. Earlier A06/A07 safeguards are carried forward.

**Historical inherited edition metadata — v1.6 (Cycle 066):** Section 7 order-workflow harmonization. This is retained as provenance for inherited material; it is not the active edition.  
**Historical predecessor reference (retained from the Cycle 066 source block; not the active edition declaration):** `risk-security-and-worker-safety-playbook-v1.9-Cycle-072-Complete-Discord-Screenshots-and-Evidence-Priority.md` (preserved unchanged)  
**Revision scope:** Harmonizes Section 7 order acceptance/deadline guidance, minimum-necessary third-party identity evidence, competitor-promotion safeguards, factual closeout, and safety-exit escalation with Master Guide v2.8. All earlier identity, data-minimization, account-security, and worker-safety controls are retained.

**Historical inherited source-record metadata — Cycle 066 (the following project/cycle/date/scope lines are retained as source provenance, not as the active project cycle, edition date, or revision scope):**  
**Project:** EPAL-ALT-BUNNY-001  
**Cycle:** 066  
**Date:** 2026-11-16  
**Scope:** Practical safety and security guidance for a solo ePal provider. This is not legal advice, a guarantee of platform protection, or a substitute for current ePal policy.

## How to use this playbook

The [ePal Master Guide v2.8](../guides/ePal-Master-Guide-v2.8.md) is the broader profile, service, and safety guide. Within it, §5 is the short account/device starting checklist, §38 is the incident-escalation quick reference, and §39 is the compact account/device companion checklist. This playbook is the detailed operational reference: it expands setup, recovery, shared-device use, carrier safeguards, response steps, and private templates. Use current official service instructions for the exact controls available on a particular account or device.

## 1. Why safety belongs in the business model

Pew Research Center's 2021 nationally representative U.S. adult survey received 10,348 responses overall. In its analysis of people who had ever earned money through gig platforms, 37% said they had sometimes or often been treated rudely, 35% had at least sometimes felt unsafe, and 19% had experienced an unwanted sexual advance while doing this work. Women gig workers reported unwanted sexual experiences more often than men (22% vs. 15%). These are broad U.S. gig-platform figures, not ePal-specific prevalence rates; the report's full-sample N is 10,348, while the relevant gig-worker subgroup denominator is not stated in the chapter text. The fieldwork was August 23–29, 2021, so it should not be described as a 2026 estimate. Source: Pew Research Center, *The State of Gig Work in 2021*, [worker experience chapter](https://www.pewresearch.org/internet/2021/12/08/how-gig-platform-workers-view-their-jobs/) and [methodology](https://www.pewresearch.org/internet/2021/12/08/gig-work-methodology/).

The same report also found 78% of people who had ever earned through these platforms described their experience as at least somewhat positive, and 17% as negative. That balance matters: the purpose of safeguards is not to portray every customer as dangerous, but to make ordinary good work sustainable and give the provider a plan for the minority of interactions that go wrong.

ePal provider anecdotes in the Cycle 006 scan reinforce the practical relevance. One provider described receiving sexual requests despite marking their profile SFW; another described time spent dealing with unwanted messages and advertising as a drag on hourly earnings. These testimonies do not quantify prevalence, but they identify failure modes that the guide should actively mitigate.

## 2. Risk register

| Risk | Example / signal | Prevention | Response |
|---|---|---|---|
| Boundary violation / sexual harassment | Sexual requests despite SFW profile; pressure to send photos or move into intimate chat | State service scope and SFW limits; do not use ambiguous promotional copy; pre-order fit check | Stop or decline; preserve relevant evidence; block/report through current platform tools |
| Doxxing / identity exposure | Requests for real name, address, workplace, school, phone, personal social accounts | Separate creator identity; avoid identifying background details and location metadata | Stop sharing; secure accounts; document threats; report; seek local support/law enforcement for credible threats |
| Account takeover | Fake support messages, credential links, reused passwords, verification-code requests | Unique password, password manager, MFA/passkey if offered, secure recovery email | Change credentials from trusted device; revoke sessions/tokens; contact official support |
| Payment fraud / off-platform pressure | Requests for direct payment, chargeback manipulation, fake receipts, competing-platform coercion | Use platform-supported payment/order flow; verify policy and order status inside account | Do not deliver outside verified order; report suspicious solicitation or coercion |
| Recording / content misuse | Customer records voice/video/screenshare or redistributes content | Agree boundaries before session; share only what is necessary; do not expose private notifications or files | End session; preserve evidence; report content misuse and seek support |
| Scam / social engineering | Urgent requests, suspicious links, QR codes, files, “verification” or payout claims | Do not open unsolicited files/links; independently navigate to official site/app | Capture details; report; run device security checks if clicked/downloaded |
| Unpaid labor / scope creep | Endless pre-order chat, extra time, unpriced Discord/social contact | Define included messaging, session duration, extension and follow-up rules | Calmly restate scope; stop at booked endpoint; direct additional work to a new supported order |
| Emotional exhaustion / coercion | Feeling obliged to accept rude or sexualized behavior for reviews/tips | Set availability and capacity; schedule breaks; define no-go conditions | Decline, pause, block/report; do not negotiate personal boundaries under pressure |
| Reputation manipulation | Threats of negative reviews for refusing off-platform sign-up or prohibited service | Keep interactions and scope documented in platform | Do not retaliate or trade reviews; submit a platform ticket with evidence |
| Privacy leakage through streaming | Desktop notifications, DMs, account email, tabs, location, or files visible on stream/share | Use a separate browser profile for organization only—not device isolation; hide notifications; close private apps; test the actual screen capture | Stop broadcast/share immediately; assess exposed data; rotate credentials if needed |

## 3. Account and device security baseline

### Account access
1. Use a unique password for ePal; never reuse an email, gaming, Discord, or payment password.
2. Store it in a reputable password manager. Do not save it in public notes, shared screenshots, or a stream overlay.
3. Enable multi-factor authentication or passkeys if the platform currently offers them. Do not assume a feature exists; verify in current account settings.
4. Secure the associated email first: unique password, MFA, recovery methods, and alerts for new sign-ins.
5. Never share login credentials, one-time codes, backup codes, or remote-access control with a customer or anyone claiming to be support.
6. Navigate to ePal by typing the known address or using a trusted bookmark. Treat unsolicited “support,” payout, verification, appeal, and collaboration links as untrusted until independently confirmed.
7. Review active sessions and connected social logins where available. Remove anything unfamiliar.
8. Keep operating system, browser, mobile app, antivirus/endpoint protection, and router firmware reasonably current.

### Device separation
- Use a separate browser profile for provider work where practical; treat it as an organizational convenience, not an isolation boundary.
- On a shared computer, use a separate standard (non-administrator) operating-system account for everyday provider work where practical. Reserve administrator privileges for tasks that genuinely require them, such as installing approved updates. A standard account reduces routine privileges; it does not prevent the device owner or administrator from accessing or managing the device.
- A phone can be the only work device; a second device is not required. Keep its screen lock strong, enable supported updates, and hide notification previews. Avoid leaving provider sessions open when another person may use the phone.
- Keep personal email, banking, government accounts, family photos, and private messaging out of the work profile and screen-share environment.
- Turn on OS notification focus/do-not-disturb before streaming, recording, or sharing a screen.
- Close password managers, password-reset pages, payment apps, private DMs, cloud drives, and personal tabs before screen sharing. Check browser password-autofill suggestions, saved-password popovers, passkey chooser windows, and unexpected sign-in or approval prompts; preview the actual audience view, including notifications and menus that may appear after sharing starts. Never display a password-manager vault or reveal passwords, sign-in codes, or recovery secrets.
- Do not open unexpected attachments or enable macros or other active content in customer-supplied files. If a file is genuinely needed, verify its purpose independently and use a safer supported format or viewer; do not run embedded code just to view it. Never install customer-supplied executables, certificates, remote-access tools, or unofficial clients.
- Avoid unknown browser extensions and unofficial ePal clients.
- If separate OS accounts are unavailable on a shared phone or computer, do not save provider passwords in the browser; sign out after the work session; close provider apps and pages; lock the device; and avoid storing customer files or recovery secrets on the shared profile. Private-browsing mode or a separate browser profile may reduce some local mix-ups/history but is not a security boundary and does not protect against the device owner, administrator, monitoring software, or another person using the same OS account. If you cannot control who can view or access the device, do not use it for sensitive account recovery or screen sharing; wait for a trusted private device.

### Account recovery
Keep recovery email and phone current, but do not publish them. Store backup codes offline in a secure place if the service supplies them, and ensure the storage remains accessible if the primary phone is lost. If access is lost, use the official recovery path from a known domain—not a link sent by a stranger.

If a phone number is used for account recovery or SMS sign-in, protect the mobile-carrier account too:
- Use a unique carrier-account password and set a strong, non-obvious account PIN/passcode where offered. Do not reuse a device unlock PIN or an account password.
- Enable carrier-account MFA and security/change alerts where offered.
- Ask the carrier about SIM-change locks and number-port-out locks/freezes, and enable the available protections that fit your circumstances. A PIN/passcode and an account lock are complementary controls, not interchangeable guarantees.
- Keep the carrier account's recovery email and contact information current and protected. Do not disclose carrier PINs or one-time codes to callers or people claiming to be support; independently contact the carrier using a known official channel.
- Treat an unexpected loss of cellular service, an unrequested SIM-change notice, or an unexpected port-out alert as a possible account compromise. Contact the carrier immediately through a known official channel and ask it to secure the account and restore control of the number. Then review important accounts that rely on the number for recovery or SMS codes, secure affected email/accounts from a trusted device, and move to phishing-resistant sign-in where supported.

Carrier features and names differ. These steps reduce risk but do not guarantee protection from SIM swapping or port-out fraud, and a carrier PIN does not make SMS authentication phishing-resistant. Do not assume a particular carrier control is enabled without checking the current account settings or asking the carrier.

## 4. Identity and privacy boundaries

### Public profile minimization and official verification
- Use the chosen public-facing creator identity or pseudonym; do not publish a legal name, home address, personal phone, private email, workplace, school, family names, daily routine, or predictable real-time location merely to appear authentic.
- Public pseudonymity does not override legitimate platform, payment-provider, tax, age, or legal verification. Submit only information actually required, through the official channel reached independently; do not send verification documents or payment details to customers or unsolicited links/accounts.
- Avoid showing mail, packages, vehicle plates, street signs, window views, workplace badges, school logos, or unique local landmarks in photos/video. Remember that several ordinary clues can combine to identify a person or routine.
- Remove image metadata/location tags before posting if the platform does not strip them; inspect the actual file and do not assume platform behavior.
- Use separate creator email and, if needed, separate social accounts with privacy settings. Do not link personal accounts that expose friends/family, private photos, location history, or unrelated identity details.
- Voice, image, handle, timestamps, distinctive quotations, and contextual details can identify someone even after a name is removed. A pseudonym reduces casual linkage but does not guarantee anonymity.

### Voice, video, and calls
- Voice is identifying information. Share a voice clip only if comfortable; it is optional unless current platform rules require otherwise.
- A video call should not reveal the home layout, windows, mail, family members, or personal documents.
- Use neutral backgrounds and appropriate lighting; check what is visible in the camera preview.
- State recording boundaries before a call. Do not secretly record customers; understand local law and platform rules before any recording.
- Recheck boundaries when participants, spectators, voice channels, or audiences change. If someone joins after recording/streaming begins, pause capture or disable their audio/video before continuing; explain the scope and obtain any consent required by law and platform rules. If you discover that a bystander or late joiner was captured before you noticed, stop/pause capture immediately and withhold the affected segment from publication or distribution while assessing it. Restrict access to the raw segment; remove or edit identifiable portions from provider-controlled drafts or publications where appropriate and technically possible. If the segment is genuinely needed for an active safety report or dispute, retain only the minimum necessary portion privately and access-restricted under the evidence-retention controls; never reuse it promotionally. Do not promise removal of copies already downloaded, reposted, or held by third parties.
- Do not assume public-matchmaking participants or mixed-lobby bystanders have agreed to be recorded. Use a private lobby, disable public voice/chat capture, mute/exclude the relevant feed, or stop recording/streaming if incidental capture cannot be prevented safely and lawfully.
- If a person cannot be appropriately informed or required consent cannot be obtained, do not capture their identifiable voice, image, handle, messages, or account information; use a permitted non-recording alternative.
- Do not promise that a customer will not record. If recording is a concern, choose an audio/text-only service or decline video.
- Never move to video or share personal photos because a customer says it is required for a tip, review, exposure, or verification.

### Customer data handling and retention
- Before collecting data, identify the exact service purpose, why each field is needed, who needs access, where it will be stored/protected, and the event that ends the need to retain it. If there is no clear service-related purpose, do not collect it.
- Ask only service-relevant details. Do not ask for, accept, use, repeat, or store customer passwords, one-time sign-in codes, account recovery codes, payment-card credentials, remote-access credentials, or unrelated identity documents for ordinary service delivery. Direct customers to official platform/payment-provider flows.
- Keep necessary records in a private location with access limited to people who genuinely need them. Avoid unnecessary copies across chats, screenshots, devices, shared drives, public spreadsheets, or unprotected notes.
- Set a retention trigger, such as order completion, dispute/safety-report resolution, expiry of an applicable platform process, or the end of a legitimate legal/accounting requirement. Keep only the minimum record needed; review and securely dispose of provider-controlled copies when the purpose ends.
- For an active dispute, safety report, or applicable obligation, preserve only relevant evidence, privately and with restricted access. Record why it is retained and review it again when the need ends; do not destroy evidence needed for an active matter.
- Local deletion does not control platform-held records, recipient copies, backups, logs, or records held under another party's policies or legal obligations. Do not promise deletion beyond your control.

### Evidence and promotional reuse
- Evidence retained or prepared for an active dispute, refund, safety incident, or account-security matter—including the unchanged original and any submission copy—must remain private and access-restricted; never publish active-case evidence. Share it only through an authorized support/reporting channel or another legally appropriate channel, and only to the extent needed. The retention trigger and review requirement still apply when the legitimate need ends.
- Separately approved promotional or testimonial material is not active-case evidence. Do not reuse private customer messages, screenshots, voice, images, identity, or service details for promotion, testimonials, portfolio examples, or public posts without specific, informed, voluntary permission for the exact material, audience, channel, and intended use. Permission to provide evidence, participate in a service, or communicate does not authorize public reuse, and the promotional permission process never authorizes publication of active dispute, refund, safety, or account-security evidence.
- Keep promotional permission optional and free of pressure; do not make ordinary service contingent on agreeing. Follow current platform rules and applicable law. Permission does not automatically make a disclosure safe.
- Keep a minimal private record of permission: the exact item/excerpt, approved audience/channel, intended use, date, any agreed time limit, and any benefit or incentive connected to it. Ask again before a materially different use. If permission is withdrawn or the customer asks that future use stop, stop new use and remove material from channels you control where reasonably possible. Explain that copies, screenshots, reposts, and platform-held records outside your control may remain. Do not pressure a customer to grant or maintain permission.
- Removing a username alone may not anonymize content. Distinctive quotes, handles, timestamps, avatars, voice, screenshots, location clues, or contextual combinations may still identify a customer. Prefer fictional/composite examples or remove enough detail to prevent reasonable identification; if meaningful risk remains, do not publish.
- Never treat an evidence-retention exception as permission to publish or indefinitely retain the underlying conversation.

## 5. Safe order workflow: before, during, after

### Before accepting
1. Confirm that you, as the provider, meet ePal's current requirements to become and remain an ePal; the current [Introduction FAQ](https://www.epal.gg/help/faq/16) states that ePals must be 18 or older.
2. For customers/participants, follow the current Terms, in-product eligibility instructions, applicable law, and official support guidance. The publicly accessible [Terms page](https://policies.epal.gg/terms) states that users must be 18 or older but is dated June 1, 2020; recheck the current rule rather than treating the old page as freshly updated. The same page now contains a separately headed Child Safety Standards Policy marked effective January 2026; that separate policy date does not establish that the full Terms of Service text was revised in 2026.
3. Do not infer a customer's age from appearance, voice, or gaming behavior. If credible information raises a concern that a participant may be under an applicable age requirement or otherwise ineligible, pause and contact official ePal support; do not request identity documents or attempt independent age verification. For age-restricted content/services, do not proceed while required age eligibility is uncertain.
4. Confirm game/activity, platform, region/server if relevant, duration, price, time, deliverables, and exclusions; ask only the minimum necessary questions to determine fit.
5. Look for warning signs: pressure to ignore rules, sexual requests outside the stated offer, requests for personal photos/contact details, suspicious links/files, off-platform payment, threats, or attempts to rush.
6. Keep the order and payment in the platform-supported flow. ePal's published violation notices have listed off-site transactions among enforcement actions; verify the latest rules before any change.

Suggested boundary confirmation:
“Just confirming before we start: this booking is for [service] for [duration] on [platform]. It includes [items] and does not include [exclusions]. I keep the interaction [SFW / other confirmed boundary]. If that works for you, we’re good to go.”

### During the order
- Keep the interaction within the purchased scope and platform rules.
- Do not accept requests for passwords, account access, remote control, personal financial details, or prohibited content.
- If conduct changes, state the boundary once if safe to do so; do not debate or bargain.
- End the session if harassment, threats, coercion, stalking, or policy violations continue.
- If streaming or screen-sharing, keep private notifications and account data hidden; pause or disable capture when an unexpected participant or bystander enters the captured space, and resume only after the recording/audience boundary is appropriately resolved.
- Do not click links or download files sent during the session.

### After the order
- Close the interaction politely and on time.
- Do not provide indefinite unpaid access or personal contact details as an assumed part of the service.
- Record only the operational facts needed: order ID, date/time, issue category, platform action, and evidence location.
- Invite honest feedback only without pressure or reward for a positive rating.
- If there was a safety incident, report it promptly. Only if safe and practical, preserve the minimum relevant evidence privately after leaving the unsafe interaction and containing any active exposure. Never remain in an unsafe interaction or delay disengagement or containment to capture evidence; if capture would prolong exposure, leave/contain first and record the factual timeline and a secure evidence reference afterward.

## 6. Escalation and incident-response procedure

**Safety and containment take priority over evidence collection at every level.** End an unsafe interaction, protect physical safety, stop an active disclosure, and restrict exposed access first. Preserve only the minimum relevant evidence if it is safe and practical to do so after disengagement/containment. Never remain in an unsafe interaction, continue a broadcast, or delay blocking, reporting, credential protection, or other urgent containment merely to capture screenshots or messages. If evidence cannot safely be captured, leave first and record the factual timeline and a secure evidence reference afterward.

### Level 1 — unwanted but non-threatening request
1. Do not comply.
2. Give one short boundary response if desired: “That isn't part of my service. I can continue with the booked activity, otherwise I'll end here.”
3. If the user persists, stop responding and use block/report controls.
4. Note date, order ID, and category.

### Level 2 — harassment, repeated boundary pushing, scams, threats to review/reputation
1. End the service or conversation; do not negotiate for a tip or review.
2. Only after disengaging, and only if safe and practical, preserve the minimum relevant screenshots or order/chat details needed for the report, including necessary timestamps and context. Do not remain in the interaction or delay blocking, reporting, or containment to capture evidence. If capture would prolong exposure or risk, leave/contain first and record the factual timeline and a secure evidence reference afterward. Keep evidence private; do not publicly post it.
3. Use ePal's report/block and customer-support process.
4. Keep communication in official channels. Do not accept pressure to join another service or pay off-platform.
5. If the issue involves a review threat, report the coercion and request review through platform support.

### Level 3 — doxxing, credible threats, stalking, account compromise, extortion, or immediate danger
1. Prioritize physical safety; if there is immediate danger, contact local emergency services.
2. Stop sharing personal information and suspend public live activity if necessary; take urgent account/device or access-containment steps without waiting to capture evidence.
3. Only if safe and practical after immediate safety and containment steps, preserve the minimum relevant evidence securely, such as necessary URLs, usernames, timestamps, messages, and order references. Never remain exposed or delay safety/containment to capture it. If capture is unsafe, leave/contain first and record the factual timeline and a secure evidence reference afterward.
4. From a trusted device, secure the associated email first if it may be affected; change the password for the account whose credential was exposed and any passwords reused elsewhere; enable the strongest available sign-in protection; revoke unknown sessions; remove unfamiliar connected-app permissions or authorizations and revoke related tokens where the service allows; review recovery methods; and contact official support if access is lost or suspicious access cannot be revoked.
5. Report to ePal through official support and relevant platform tools.
6. For credible threats or extortion, consider contacting local law enforcement or an appropriate victim-support organization. Do not confront or threaten the person.
7. If personal information has been exposed, review account recovery channels and privacy settings across linked services.
8. If the phone unexpectedly loses service or a SIM-change/port-out request appears without your authorization, contact the mobile carrier immediately through a known official channel. Ask it to secure the carrier account, investigate the SIM change or port request, and restore control of the number. From a trusted device, review important accounts that use the number for recovery or SMS authentication; secure affected email/accounts and use stronger phishing-resistant sign-in where supported. Do not rely on the phone number as the only recovery route.

### Customer-data exposure or accidental disclosure

Use this procedure even when the provider's own account has not been compromised.

1. Stop the disclosure first where safely possible: end the stream/screen share, remove the public post, disable the exposed link, or restrict access to the affected folder/message using controls you can legitimately access. Do not delay these containment steps to capture evidence.
2. After containment, and only if safe and practical, preserve the minimum relevant evidence without destroying or overwriting the only relevant original. Privately record when and where the exposure occurred, the categories of information involved, the likely audience/access if known, and the containment steps taken. If preserving evidence would prolong exposure or delay containment, contain first and record a factual timeline and secure evidence reference afterward.
3. Check for continuing exposure in shared links, public posts, screen recordings, recipient copies, synced folders, backups, and connected services. Request removal from third-party locations through their official channels where appropriate; do not claim removal is guaranteed.
4. Assess whether account access, connected-app permissions, device access, or shared credentials may also be involved. If so, follow Level 3 account-compromise steps as well.
5. Use official platform support/reporting channels when platform-held information, an account, or a platform feature is involved. Determine whether contractual, platform, or applicable legal notification duties apply; do not guess at legal thresholds or deadlines. Seek qualified advice if scope or duties are unclear.
6. If notification is required or appropriate, communicate verified facts, what information may be involved, containment steps, and practical next steps. Do not speculate, minimize, or expose additional customer information publicly.
7. Review the cause and make a proportionate correction before resuming the same workflow. Reassess access and retention; do not retain unrelated customer data in the incident record.

### Evidence log template
- Date/time and timezone:
- ePal order/reference:
- Account handle:
- Incident category:
- What happened (factual, chronological):
- Minimum relevant excerpt or secure evidence reference (avoid copying full conversations unless necessary for an active matter):
- Evidence filenames/locations:
- Actions taken (block/report/support ticket):
- Ticket/reference number:
- Follow-up date/status:

Keep the log private. Do not put customer-identifying details in public marketing material.

## 7. Platform-specific facts to verify before relying on them

The public ePal help pages describe the 72-hour refund-request period using related acceptance/completion wording:
- The [Dispute Orders FAQ](https://www.epal.gg/help/faq/31) says acceptance starts the 72-hour countdown for a client to contact customer service and request a refund; it also says acceptance automatically marks the order completed.
- The [ePals Page FAQ](https://www.epal.gg/help/faq/17) describes the 72-hour period as running after order completion.

Read together, these pages appear to describe the same acceptance/completion trigger rather than establish two different 72-hour deadlines. FAQ31 separately advises a client who cannot receive service or get in touch with the ePal within 36 hours to submit an order dispute. This is a client-directed early-action recommendation, not a second 72-hour countdown, a provider response SLA, or a universal grace period. The public FAQs do not show the live order-specific timer or explain every order type. Do not treat the wording as a guarantee of current policy, an identical process for every order type, or a refund outcome. Check the live order-specific status, deadline, and current support instructions; contact official support promptly if the order state or required sequence is unclear. The Dispute Orders FAQ also says completed paid orders can be disputed, free/gift orders cannot be disputed through the system, each order can be disputed only once, and the appropriate "Order Refund" report theme may be required; verify the current interface before relying on those details.

The Dispute Orders FAQ says ePal cannot access third-party platforms to verify identities and directs users to confirm third-party contact information and in-game IDs/names before ordering. Keep ordinary service matching separate from the FAQ's additional Discord dispute-evidence procedure. That additional procedure applies only when Discord or another third-party platform is involved in evidence for a dispute: if the other party asks for your Discord ID, confirm identity again on Discord and retain the relevant confirmation; if the other party provides a Discord ID, ePal's FAQ says to submit complete screenshots that include the ID information. Preserve complete screenshot(s) of the relevant exchange or screen so the ID and the surrounding context needed to connect it to the disputed interaction remain visible; do not crop away context needed to assess authenticity. 'Complete screenshots' does not mean retaining or submitting unrelated full-chat history. Keep unchanged originals privately and access-restricted. For the original-versus-submission-copy procedure, retain the original unchanged and create a clearly labeled copy only when needed. Redact the copy only if current official support instructions permit it without removing the complete ID/context required to establish authenticity. If unrelated sensitive information cannot be excluded without making the required evidence incomplete, ask ePal support how to submit it; do not silently crop or redact required context, and do not assume an edited copy will be accepted. Do not interpret this as a requirement to use Discord for every service or retain full conversations. When the stated evidence condition applies, retain only the relevant identifier/context privately and securely for a defined purpose; protect unrelated personal information and follow the current official dispute instructions.

ePal's public violation notices have listed suspensions/freezes for examples including harassment, NSFW solicitation/content, scams, impersonation, and off-site transactions. Those notices show enforcement examples, not a complete policy or guaranteed outcome. Sources: [WK7 violations](https://www.epal.gg/help/guideline/1?tab=public) and [WK24 violations](https://www.epal.gg/help/guideline/160?tab=public).

A public ePal community safety notice describes reports of users using an ePal order or interaction to promote a competing platform, pressure ePals to sign up, and threaten negative reviews if they refused. Do not use an ePal order to promote a competing service, pressure someone to sign up or move business elsewhere, or retaliate through reviews. Treat conduct as clear promotional pressure when it includes an unsolicited signup pitch or call to action, referral/link/code, repeated sales solicitation, a request to move booking/payment/business to the competitor, or a threat to withhold service or damage a review unless the person signs up or migrates. A customer-initiated, limited factual explanation of a technical requirement for the agreed service may be different from coercive signup solicitation when it contains no sales pitch, referral, pressure, or transaction redirection. That analytical distinction is not ePal permission or a platform-approved safe harbor for promoting, linking to, recommending, or directing users to a competing platform or unauthorized third-party tool. Do not provide promotional links or referrals, encourage signup or migration, or redirect booking, payment, or business. Keep any necessary explanation strictly limited to the technical requirement for the already-agreed service. A neutral or incidental mention alone may not establish coercive pressure, but it does not establish policy compliance; assess the words, purpose, repetition, requested action, platform context, and current ePal rules. This is an operational risk-assessment distinction, not a definitive ruling on every edge case under ePal's full current policies; when uncertain, avoid the mention or promotion and ask official support. If another party uses an order to pressure a signup, redirect business, or threaten a retaliatory review, preserve only the minimum relevant evidence if safe and report it through official ePal support. Keep commercial transactions in ePal's supported flow. Source: [ePal Community Safety Notice](https://www.epal.gg/lobby/moments/1236267).

For interruption and closeout decisions, record final delivery status separately from interruption events. Use final statuses of fully delivered as agreed, fully delivered under a clearly documented mutually agreed change, partially delivered, not delivered, or unresolved/unknown. Record no-shows, disconnects, outages, safety stops, eligibility pauses, and resumption attempts separately with a factual timeline; an interruption does not by itself establish partial or non-delivery. Compare the record with the live order state. Use current platform-supported cancellation/rescheduling/dispute actions; do not invent grace periods, extra fees, refunds, or completion controls. For unsafe interactions, disengage, stop sharing/streaming, contain any exposed information, preserve only minimum evidence if safe, and use official block/report/support procedures. Follow Master Guide §§7, 38 and this playbook's incident escalation.

### Privacy and chat-record source note

The published [ePal Privacy Policy](https://policies.epal.gg/privacy) describes collection of account, device, IP, possible location, and biometric-related information. Its AI ePal section says chat data for AI ePal training is collected only when the user authorizes it. Separately, the [Terms page](https://policies.epal.gg/terms) currently displays a June 1, 2020 date and states that EPAL.GG may record all user chatlogs on the site. Do not attribute that Terms statement to the Privacy Policy or infer actual implementation, access, or retention from either page's wording. The Terms page is visibly dated 2020; the same page also contains a separate Child Safety Standards Policy marked effective January 2026, which does not date the Terms text as newly revised. Verify current in-product instructions and contact official support if the applicable rule is unclear. This playbook does not independently verify internal implementation or retention/security claims.

**Source recheck note:** The accessible [Explicit Content guideline](https://www.epal.gg/help/guideline/14), displayed with a February 22, 2022 date, prohibits sexual innuendo/provocation, sexual behavior descriptions, sexual role-play, sexual-service advertising, sexual harassment, and sexual transactions. The public [Community Safety Notice](https://www.epal.gg/lobby/moments/1236267) states that off-platform transactions are prohibited and describes reporting competitor-signup pressure and retaliatory-review threats. Recheck the live guideline and support instructions before acting.

## 8. Worker testimony: why the procedures are not theoretical

The Cycle 006 r/ePal scan included multiple threads in which providers described SFW boundary violations or unwanted NSFW requests; the scan found at least five relevant threads in its purposive sample. This is not a prevalence rate.

A provider reported receiving requests for content that their profile said they did not offer ([discussion](https://www.reddit.com/r/ePal/comments/1cj9g1v)). Another described unpaid time spent screening inquiries and advertising services ([discussion](https://www.reddit.com/r/ePal/comments/1jjgpjh/epal_needs_a_reasonable_minimum_price_point/)). A third provider described including Discord contact only when it was expressly part of the purchased service ([discussion](https://www.reddit.com/r/ePal/comments/1j5817s)).

These voices are valuable because they identify concrete friction points, but they are not independently verified incidents or representative statistics. Their role is to help generate safeguards and questions—not to label all customers or the platform.

## 9. Risk-adjusted business metrics

Add a small set of safety and workload measures to the ordinary funnel:
- Qualified inquiry rate = qualified inquiries ÷ all inquiries.
- Boundary-violation rate = inquiries/orders with a boundary violation ÷ all inquiries/orders, with the denominator stated and categories kept private.
- Report/block rate = interactions requiring a platform safety action ÷ total interactions. Interpret cautiously; a higher rate can reflect improved reporting rather than worsening behavior.
- Unpaid labor minutes per completed order = pre-order/admin/promotion/unpaid follow-up minutes ÷ completed orders.
- Effective net hourly earnings = net contribution ÷ all work time, including unpaid labor.
- Cancellation/refund rate = cancelled/refunded orders ÷ accepted orders, with reasons categorized.
- Repeat completed paid-order rate = customers with another completed paid order ÷ eligible first-time customers in a defined cohort.

Do not set a target of zero reports or blocks: that could discourage reporting. The goal is to reduce preventable exposure, respond consistently, and protect the provider's control over work.

## 10. Safety checklist for every work session

- [ ] Device and browser updated; no suspicious downloads/extensions.
- [ ] Work browser/profile separated from personal accounts where practical.
- [ ] MFA/passkey enabled if offered; email account secured.
- [ ] Notifications and private windows hidden before streaming/sharing.
- [ ] Service, duration, price, and boundaries confirmed.
- [ ] Payment/order remains in platform-supported flow.
- [ ] No password, verification code, personal address, or sensitive data shared.
- [ ] Exit/block/report procedure understood.
- [ ] Session ends at the agreed time and scope.
- [ ] Any incident evidence is stored privately and reported promptly.

## Mobile-account protection references

- Cybersecurity and Infrastructure Security Agency (CISA), *Mobile Communications Best Practice Guidance*, December 18, 2024. The document recommends a telco PIN and MFA for mobile-carrier accounts and explains that SMS and authenticator codes have different phishing/interception limitations. Its threat context is highly targeted individuals; this playbook uses the carrier-account safeguards as general risk-reduction options, not as a claim that every person faces that threat profile. https://www.cisa.gov/sites/default/files/2024-12/guidance-mobile-communications-best-practices.pdf
- Federal Communications Commission, *Protecting Consumers from SIM-Swap and Port-Out Fraud*, FCC 23-95 / 88 FR 85794 (2023). The FCC adopted rules requiring wireless providers to offer account locks for SIM changes and number ports and to notify customers about relevant requests; the precise carrier interface and activation steps still need to be checked with the provider. https://docs.fcc.gov/public/attachments/FCC-23-95A1.pdf
- Federal Trade Commission, *SIM Swap Scams: How to Protect Yourself*. Consumer guidance recommends a PIN or password on the cellular account, warns that SMS verification may not stop a SIM swap, and advises contacting the carrier immediately if a swap is suspected. https://consumer.ftc.gov/consumer-alerts/2019/10/sim-swap-scams-how-to-protect-yourself

## Evidence limitations

- Pew figures are U.S. gig-platform findings from 2021, not ePal-specific and not a current 2026 rate.
- Reddit testimonies are self-selected anecdotes; thread counts do not estimate prevalence.
- ePal help, policy, and violation notices are platform-authored and may change.
- Security recommendations are general risk-reduction practices; no control guarantees safety.
- This playbook does not establish that Alt Bunny has experienced any of these incidents.

---

# Cycle 084 addendum — Personal imagery, user-content rights, and privacy-aware uploads

**Source check:** 2026-11-17. Use this checklist before any profile, portfolio, chat, or service upload. It is risk-reduction guidance, not legal advice.

### 1. Pause before upload

Review the current [ePal Terms](https://policies.epal.gg/terms) and [Privacy Policy](https://policies.epal.gg/privacy), not just this summary. The reviewed Terms page displayed June 1, 2020. Section 3(b) describes a broad licence covering use, storage, display, reproduction, saving, modification, derivative works, performance, and distribution of User Content on ePal for service-related purposes. Section 3(c) describes possible reasonable-period retention for backup/archive/audit after removal or account termination/deactivation, and continued use of content that other users stored or shared.

**Operational consequence:** do not assume a public image is fully retractable after upload. Treat platform upload as a rights and persistence decision, not merely a temporary display action.

### 2. Do not conflate privacy-policy statements

The reviewed Privacy Policy describes Amazon Rekognition Face Liveness for face verification during login/registration. It says relevant verification data is stored on AWS and not retained by the ePal platform/local app client, but separately says information abstracted from facial features is stored during account validity until account deletion. These statements refer to distinct data descriptions. The same policy says AI ePal chat-training data is collected for that purpose only if the user authorizes it, and not for that purpose if the user refuses. That chat-training choice is separate from the Terms' User Content licence.

Public policy wording alone does not establish actual implementation, all access paths, backup deletion timing, system-wide retention, or handling of a particular asset. Never promise that an image, biometric-related record, or other content is instantly or completely deleted.

### 3. Safer handling procedure

- Prefer purpose-made character art and public-facing assets over private photos.
- Exclude children, family members, bystanders, private interiors, mail, documents, screens, addresses, geotags, and other incidental identifiers.
- Remove location metadata where practical; visually inspect the image because metadata removal does not hide information depicted in the pixels.
- Confirm rights and permission for every identifiable person and every included artwork/brand asset.
- Keep originals and upload records privately; do not place sensitive originals in public repositories or share them in support tickets unless necessary.
- If the rights grant or retention language is unacceptable, withhold the asset and choose a safer alternative.
- For uncertain interpretation, ask ePal support for written clarification and retain the response. Do not treat support silence as consent or assurance.

### 4. Incident response

If an unintended personal image is uploaded, preserve the minimum necessary evidence privately (for example, the asset identifier, URL, timestamp, and a redacted screenshot), then use the platform's current removal/reporting route. Avoid redistributing the image while documenting the incident. Ask support what removal covers and whether stored/shared copies may remain; do not promise the provider that removal erases all copies.

**Source and limitation record:** [Terms](https://policies.epal.gg/terms) and [Privacy Policy](https://policies.epal.gg/privacy), reviewed 2026-11-17. This is a summary of published wording, not legal advice or an independent technical verification of ePal's systems.

---

## Cycle 086 addendum — Chat-log recording and written privacy-withdrawal requests

**Policy source recheck:** 2026-11-17. This is operational guidance, not legal advice or independent verification of ePal systems.

1. **Terms chatlogs are a separate issue.** The [Terms](https://policies.epal.gg/terms), displayed with a June 1, 2020 date, state in Section 3(a) that EPAL.GG has an unrestricted right to record all user chatlogs on the site without compensation to or restriction by the user. The [Privacy Policy](https://policies.epal.gg/privacy) separately describes AI ePal chat data used for AI training as subject to user authorization/refusal. Do not assume refusing AI training authorization overrides or disables the separate Terms chatlog statement. Do not infer the exact technical scope, access, retention, or downstream handling beyond the published wording.
2. **Written withdrawal route.** The Privacy Policy says users wishing to withdraw consent to collection/use of personal and biometric data may opt out by contacting official channels with a written request. If choosing to do so, use a current official contact route, state the request clearly, retain a dated copy and any response, and ask which data categories and processing are covered. This is a request path described by the policy—not a guarantee of immediate deletion, complete erasure, or a particular outcome. Do not represent it as completed until there is a response or other reliable confirmation.
3. **User Content scope.** The Terms define User Content as material posted or otherwise made available on EPAL.GG. The licence discussion applies to platform-submitted/made-available content; this playbook does not claim that a file kept privately on a user's own device is licensed to ePal merely by existing there.
4. **Operational record.** If an asset or chat record is involved, note the platform location, relevant date, request channel, request reference, and response status. Keep the record private and avoid attaching unrelated sensitive material. Do not promise that removal or a withdrawal request deletes every copy or record.

**Source limitation:** policy pages may change. The Terms page displays June 1, 2020. Recheck both pages before acting; published text is not a technical audit of implementation, access, or retention.

---

## Cycle 088 addendum — Source-date and timezone convention

The Cycle 086 policy-recheck date of 2026-11-17 is retained as originally recorded. The timezone and exact review time were not captured, so do not treat it as a verified local date or retrospectively convert it. For future source checks and repository events, use ISO 8601 timestamps with an explicit UTC `Z` suffix when the exact time is known; add an IANA timezone when separately recording a local date. If the original timezone is unknown, state that limitation rather than infer it. This note is a metadata clarification only and does not change the substantive policy guidance.

## Cycle 089 addendum — Current alpha operational status and evidence boundaries

**Status:** Current operational reconciliation note for Playbook v2.2; prior incident and policy records remain preserved.

### Current CI and app status
The local prompt-builder is schema/prompt engine v1.4.1 with 51 fields and 28 test definitions. GitHub Actions run [44014104161](https://github.com/zonedeth5/AI_workspace/actions/runs/44014104161), created 2026-11-17T04:00:24Z on commit 81656b69c651faf32e4c2be9cb421becc001b971, completed its acceptance-test and schema-syntax steps successfully. The tested app source/test blobs match the current branch. This does not establish local runtime, mobile/browser, accessibility, clipboard, or cross-device import/export behavior.

### Recording and evidence handling — current FAQ wording
The current [Dispute Orders FAQ](https://www.epal.gg/help/faq/31) says screenshots, recordings, and other relevant information may support a dispute and advises informing the other party that the game or conversation will be recorded for security purposes. It also says ePal cannot access third-party platforms to verify identities and recommends confirming relevant third-party contact information and in-game IDs/names. Operationally:
1. Before recording a game or conversation for an order, communicate the recording purpose to the other participant in advance and follow applicable law, platform rules, and the other participant's rights. Do not assume the FAQ is a substitute for legally required consent.
2. Record only what is proportionate to the service and a legitimate safety/order purpose. Avoid unrelated private messages, account data, payment information, or other people not involved.
3. Preserve the minimum relevant excerpt or a secure evidence reference; restrict access and retention; do not publish evidence as marketing material.
4. Keep the ePal Terms Section 3(a) site-chatlog statement distinct from the provider's own game/voice recording. One does not establish the scope or legal status of the other.
5. For third-party game/voice services, confirm identity and the service details through the agreed channel; do not assume ePal can independently verify the third-party account or session.

### Current order timing
The current [FAQ31](https://www.epal.gg/help/faq/31) says acceptance starts a 72-hour refund-request countdown and automatically marks the order completed. It separately recommends a client file a dispute if unable to receive service or contact the ePal within 36 hours. [FAQ17](https://www.epal.gg/help/faq/17) describes the 72-hour refund period after completion. Treat the published wording as a guide, not a guarantee about a live order-specific timer or every exception. Check the order screen and current support instructions when acting.

### Date and source provenance
Cycle 084 and Cycle 086 source-review dates remain 2026-11-17 as originally recorded; exact review time and timezone were not captured. Cycle 088's 22:52:07-05:00 value is a recorded work-session marker, while GitHub records the commit at 03:52:15Z. Do not conflate either repository timestamp with the exact time a policy page was reviewed. The Cycle 089 official-page recheck is date-only (2026-11-16; exact time/timezone not captured).

### Current status
The canonical character sheet is still blank and unapproved. Cycles 090, 092, and 094 are completed historical audits; Cycle 095 completed targeted readback verification of four Cycle 094 corrections, and Cycle 096 identified further cross-document issues. Do not generate or publish the three style branches or logo until owner approval and the final independent audit of all outstanding Cycle 096 findings and release gates. No ePal account, order, support, withdrawal, or upload action was performed as part of this update.


---

## Cycle 099 addendum — Timestamp chronology and provenance disposition

**Scope:** C096-F03 only. This addendum records the repository-side timestamps and preserves the unresolved discrepancy identified during Cycle 096. It does not revise historical source-review dates or claim that the environment clock has been reconciled.

### Repository and CI timestamps verified from GitHub

- Workflow run [44014104161](https://github.com/zonedeth5/AI_workspace/actions/runs/44014104161) is a push-triggered run on `epal-alt-bunny-profile-optimization-cycle-01-2026-11-16`, for tested commit `81656b69c651faf32e4c2be9cb421becc001b971`.
- GitHub records the run's `created_at` and `run_started_at` as `2026-11-17T04:00:24Z`; its `updated_at` is `2026-11-17T04:00:44Z`.
- GitHub records the tested commit timestamp as `2026-11-17T04:00:21Z`.
- The run's recorded conclusion is `success`. This is evidence about that workflow run and tested commit only; it is not a new CI execution and does not prove that the current branch head was tested.
- The current branch head at the time of this Cycle 099 review is recorded in the separate Cycle 099 implementation report. Repository event timestamps are retained in UTC exactly as returned by GitHub.

### Discrepancy and disposition

Cycle 096 recorded a supplied local-clock snapshot of 2026-11-16 13:00 at UTC−05:00. The GitHub run creation timestamp converts to 2026-11-16 23:00:24 at UTC−05:00, which is 10 hours and 24 seconds later than that snapshot. The available records do not establish whether the earlier local-clock snapshot, its date/timezone association, or the environment context was stale or otherwise mismatched.

**Disposition: UNRESOLVED — PRESERVE SOURCE VALUES.** The GitHub UTC event timestamps remain authoritative for the GitHub events they describe. The Cycle 096 local-clock value remains a historical snapshot, not a clock calibration. No correction factor or inferred clock offset is applied. Before making further chronology-sensitive “latest/current” claims, obtain a contemporaneous, independently reliable environment clock/timezone record and compare it with the relevant GitHub event timestamps.

### Date-only source-review records

The Cycle 084 and Cycle 086 source-review dates of 2026-11-17 and the Cycle 089 official-page recheck date of 2026-11-16 remain exactly as originally recorded. Their exact review times and timezones were not captured. Do not convert, reorder, or merge these date-only policy-review records with commit or workflow event timestamps. A repository commit time is not evidence of when a policy page was actually reviewed.

### Evidence boundary

This is a provenance clarification, not proof of clock tampering, fabricated CI, or invalid test results. It does not independently verify the current state of ePal policy pages, rerun CI, or test the application in a browser or on a device. The package remains NOT RELEASE-CLEARED; canonical identity approval and the remaining release gates still apply.


## Cycle 116 addendum — official policy-page dating

A fresh read of the public [ePal Terms page](https://policies.epal.gg/terms) shows the Terms heading followed by the date **June 1, 2020**. Farther down that same page is a separately headed **Child Safety Standards Policy** with an effective date of **January 2026**. These are distinct page elements. Do not describe the full Terms as updated in January 2026, and do not infer that the embedded policy changes the date or wording of every Terms section.

The current [Introduction FAQ](https://www.epal.gg/help/faq/16) says an ePal must be 18 or older. The Terms page separately states that users must be 18 or older but carries the 2020 date. Keep those source statements distinct; do not infer a platform-wide eligibility rule beyond the text verified. If a participant's eligibility is uncertain, pause the service and seek current official support guidance rather than conducting private identity checks or requesting sensitive documents.

This is a summary of published page wording, not legal advice or a technical audit of enforcement, account controls, chat recording, or retention.
