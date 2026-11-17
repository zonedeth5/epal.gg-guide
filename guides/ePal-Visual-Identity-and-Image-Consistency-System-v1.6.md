# ePal Visual Identity, Design Language & Image Consistency System
## v1.6 — Alpha Release Status and Production Gate (Cycle 082)

**Project:** EPAL-ALT-BUNNY-001  
**Cycle:** 019 specification, reconciled in Cycle 082  
**Date:** 2026-11-16  
**Status:** Consolidated visual workflow; local prompt-builder prototype implemented; owner-approved identity and actual image production remain pending  
**Source status:** Latest branch CI run 44014104161 passed acceptance-test and schema-syntax steps; 28 test definitions present. Local execution and browser/device QA remain unverified. See Cycle 089 reconciliation addendum.  
**Preservation:** v1.0–v1.5 and modular specification v1.6 are retained unchanged. This edition reconciles the status of the specification with the later local implementation.

---

## 1. Purpose and intended result

This guide provides a reusable, provider-agnostic method for defining a visual identity and producing a consistent set of image-generation prompts. Its central example is one original, clearly adult bunny-girl character rendered in three distinct styles:

1. Anime
2. 3D
3. Chibi

These are not three character concepts. They are three visual interpretations of the same approved character. A logo is a separate identity asset derived from the same design language; it is not a fourth character render and should not be treated as a miniature portrait by default.

The framework is modular. A user records each design decision once in a canonical character sheet. Stable field IDs connect that sheet directly to generated prompt modules. Users should not need to manually rewrite the same traits in multiple prompts.

The guide can be reused for other characters and creator/provider identities. The bunny-girl example is a project context, not a universal requirement.

### 1.1 Project-specific direction and boundaries

The current project direction is purple/black, cute, playful, fun, alternative/cool, and confidently adult. The intended community and gaming context includes Overwatch 2, Fortnite, and community games. These broad directions do not authorize the system to invent exact hair, eye, face, ear, outfit, accessory, marking, or HEX values.

The character must be represented as an adult woman. Cute or playful styling must not infantilize her or rely on youth-coded presentation. Avoid overt sexualization.

Do not imply professional gaming status, elite rank, carry-level skill, credentials, or service capabilities without evidence. Do not claim that a visual direction will increase ePal impressions, inquiries, conversion, or orders unless those outcomes are measured with appropriate platform-specific data.

---

## 2. Design language: the shared visual grammar

A design language is the repeatable set of visual decisions that makes separate assets feel as though they belong to the same identity. It is broader than a color palette and narrower than copying every detail from one image.

Define it before generating a large asset set. Treat it as a compact system of rules that can be applied to character art, profile avatar, cover image, service thumbnails, overlays, and logo.

### 2.1 Design-language layers

| Layer | Questions to answer | Consistency rule |
|---|---|---|
| Identity | Which features make this character this character? | Lock owner-approved semantic anchors |
| Shape language | Are forms rounded, angular, soft, sharp, compact, elongated, symmetrical, or asymmetric? | Reuse a small set of intentional shape motifs |
| Silhouette | What is recognizable at a glance without internal detail? | Preserve key outer contours and signature forms |
| Palette | Which colors dominate, support, accent, and provide contrast? | Record color values and their hierarchy |
| Typography | What typographic character fits the identity? | Reuse approved families/traits; preserve exact text |
| Motifs | Which symbols, patterns, marks, or repeated details belong to the identity? | Reuse deliberately; avoid decorative clutter |
| Rendering | What linework, shading, materials, texture, and finish define each style? | Keep rendering rules style-specific but identity-compatible |
| Composition | How are subjects framed and prioritized? | Use layout rules appropriate to each asset's purpose |
| Tone | What emotional impression should the design communicate? | Keep the intended tone coherent without forcing identical expressions |
| Context | Where will each asset appear and at what size/crop? | Test in the actual display context |

### 2.2 Fixed, transformable, and variable attributes

Classify every design attribute before generation.

**Identity invariants** are owner-approved facts that should remain recognizable across all three styles. Candidate categories include:
- Ear type, silhouette, placement, and distinctive angle.
- Hair identity and recognizable silhouette.
- Face cues and eye color.
- Signature accessory, outfit cue, marking, or motif.
- Palette hierarchy and one or more distinctive shape cues.

The specific values remain user-defined. The list above describes categories, not a pre-filled character design.

**Style-transformed attributes** may change their visual treatment while preserving the underlying design:
- Linework, edge treatment, shading, texture, material response, dimensionality, and surface detail.
- Proportions where the selected style requires it, especially chibi.
- Simplification or exaggeration that does not erase semantic identity anchors.

**Scene variables** may change per image:
- Pose, expression, camera angle, framing, background, lighting, props, and action.
- These should not silently redefine the character's permanent design.

A useful test is: if an attribute changes, does the viewer perceive a different rendering of the same character, or a different character? If the latter, treat it as identity drift and review it.

### 2.3 Shape and silhouette strategy

Build a small visual vocabulary rather than adding unrelated decorative details to every asset.

1. Identify the character's most recognizable outer shapes.
2. Select a limited number of recurring geometric motifs (for example, a particular curve, notch, point, arc, or repeated angle) only after the owner approves them.
3. Apply those motifs consistently to ears, hair silhouette, clothing accents, accessories, and logo exploration where appropriate.
4. Preserve negative space around important forms.
5. Test the silhouette in monochrome before relying on color or fine detail.

Do not assume that a bunny motif, headset, gaming symbol, or purple color alone makes a design distinctive. Distinctiveness must be assessed against the complete form and relevant existing marks.

### 2.4 Palette strategy

Record both color names and exact values when known. A palette should define roles, not merely list swatches.

| Role | Meaning |
|---|---|
| Primary | Dominant identity color |
| Secondary | Supporting identity color |
| Dark | Black or near-black structural color |
| Accent | Small, high-attention highlight |
| Neutral | Skin, light, background, or balancing tone as applicable |
| Hierarchy | Relative area, placement, and priority of each color |

For this project, purple/black is a direction only until exact values and hierarchy are confirmed. Never silently select HEX values. If a user supplies a color name without a HEX value, preserve the name and mark the exact value unresolved.

### 2.5 Typography and graphic language

Define typography independently from image-generation lettering. Record:
- Exact display name/wordmark text.
- Desired typographic personality (for example, rounded, geometric, condensed, handwritten, or sharp).
- Weight, width, spacing, capitalization, and legibility preferences.
- Whether lettering is part of the logo, separate from the character mark, or omitted from some placements.

Generated raster lettering may be malformed. For a production wordmark, preserve the exact text and recreate or typeset it separately in a suitable design tool. Do not accept approximate spelling as final.

### 2.6 Consistency across a family of assets

A coherent asset family does not require every image to have the same pose, background, crop, or level of detail. It requires a stable identity grammar.

Use a hierarchy:
1. Identity invariants remain stable.
2. Design-language rules remain broadly coherent.
3. Asset-specific composition adapts to its purpose.
4. Scene details may vary when they do not obscure identity.
5. Experimental deviations are labeled as explorations until approved.

For example, an avatar may prioritize a face and ear silhouette; a cover image may use a wider composition; a service thumbnail may emphasize a specific activity. They can differ in composition while sharing identity, palette logic, motifs, and typographic direction.

---

## 3. Canonical character definition

### 3.1 Complete the identity before producing variants

The canonical character sheet is the source of truth. It should record:
- Character name and type/species.
- Explicit adult presentation.
- One-sentence identity summary and personality.
- Face cues, eyes, hair, ears, and skin/rendering description.
- Primary outfit, secondary details, signature accessory, motif, and prohibited changes.
- Palette roles, color values, and hierarchy.
- Approved reference images and their roles.
- Which attributes are invariant, transformable, or scene-variable.

Blank or undecided fields remain blank. A generator must not turn an omission into an invented fixed trait.

### 3.2 Canonical reference-sheet panel plan

Where the generation tool and workflow support it, create a reference sheet with:
- Front view.
- Three-quarter view.
- Side/profile view.
- Face detail.
- Outfit/accessory detail.
- Palette swatches with names and HEX values where approved.
- Written identity invariants and prohibited changes.

A generated turnaround is not automatically geometrically accurate. Review the views for contradictory ear placement, hair arrangement, accessories, markings, or costume details before approving the sheet.

Do not designate an unreviewed image as canonical. Approval is an explicit human decision.

### 3.3 Reference-role hierarchy

| Reference role | Authority | Must not control |
|---|---|---|
| Canonical identity reference | Character identity and approved design anchors | Unapproved style or scene choices |
| Style reference | Rendering language, linework, shading, material, texture | Character face, costume, identity |
| Composition reference | Framing, layout, camera, spatial arrangement | Character identity or style unless separately assigned |
| Palette reference | Approved color values and hierarchy | Character anatomy or pose |

If a single image is assigned more than one role, state that explicitly. Otherwise, keep roles separate. Attach the actual image files to the generation request; a filename or reference ID by itself does not provide visual information to the model.

---

## 4. Three-style production workflow

### 4.1 Generate three independent branches

After approving one canonical character sheet, generate anime, 3D, and chibi as separate branches from that same source.

Do not use anime as the only source for 3D and then use 3D as the only source for chibi. Sequential image-to-image transformations can accumulate drift. Parallel branching is a practical drift-control recommendation; it is not a claim that one workflow is universally optimal in every model or tool.

<pre>
Approved canonical character sheet
          |
          +---- Anime prompt / render
          |
          +---- 3D prompt / render
          |
          +---- Chibi prompt / render
</pre>

Each branch receives the same identity data and canonical reference. Only the rendering style and intentionally selected style-specific variables change.

### 4.2 Style-specific interpretation

**Anime**
- Translate the approved identity into anime linework, facial rendering, and controlled stylization.
- Preserve the approved eye color, face cues, hair identity, ear silhouette, outfit markers, and palette hierarchy.
- Avoid adding genre conventions that were not selected by the owner.

**3D**
- Translate the same design into dimensional form, materials, lighting, and surface treatment.
- Preserve recognizable proportions and identity anchors as far as the chosen 3D aesthetic permits.
- Review face geometry, ear placement, hair silhouette, and accessory construction carefully; material realism must not become a redesign.

**Chibi**
- Permit intentional proportion exaggeration and simplification.
- Preserve semantic identity anchors such as the approved ear silhouette, hair cue, eye color, signature motif/accessory, and palette hierarchy.
- Do not assume that a large head or simplified face excuses the loss of every distinctive cue.

Use one style per generation request. Avoid asking for an anime/3D/chibi hybrid unless the user explicitly wants a hybrid experiment.

### 4.3 Controlled comparison

For the first comparison set, hold composition relatively stable:
- Similar head-and-shoulders framing.
- Similar camera angle.
- Neutral or similarly simple backgrounds.
- Unobstructed face and ears.
- No unnecessary props or text.

This isolates identity continuity from scene complexity. Later, test each style in its intended platform composition.

---

## 5. Modular character sheet → prompt system

### 5.1 Core architecture and invariant

The input sheet and generated prompt are two views of one shared field schema. The user enters each fact once; the prompt renderer inserts the exact value into the matching prompt slot.

**Core invariant:** `sheet.field_id.value = prompt.field_id.value`

Field IDs are stable and language-neutral. Labels may be translated or renamed without changing IDs. The input sheet is the editable source of truth; prompt preview is generated and read-only.

### 5.2 Universal field contract

Every field defines:
- `field_id`: stable key.
- `label`: human-readable label.
- `module`: prompt section that consumes the value.
- `type`: text, long_text, color, enum, list, boolean, or reference.
- `required`: whether canonical approval requires it.
- `value`: exact user-provided value.
- `status`: user_confirmed, project_default, undecided, or not_applicable.
- `prompt_policy`: exact_insert, omit, or controlled_warning.

Value-state rules:
- **user_confirmed:** insert exactly, unchanged.
- **project_default:** insert only as a visibly identified default until accepted.
- **undecided:** never invent. Omit and add a neutral no-invention instruction. Block canonical approval if the field is a required identity anchor.
- **not_applicable:** omit.
- **empty:** treat as undecided; never infer silently.

Exploratory prompts may be generated with warnings, but must not be labeled canonical or approved.

### 5.3 Canonical field registry

These IDs are authoritative. A user interface control and its prompt token must use the same ID.

**A. Character overview**
- `character.name`
- `character.species_type`
- `character.age_presentation`
- `character.identity_summary`
- `character.personality`
- `character.context`

**B. Face, hair, and ears**
- `face.shape_cues`
- `face.eye_shape`
- `face.eye_color`
- `face.expression_baseline`
- `hair.color`
- `hair.length_cut`
- `hair.silhouette`
- `ears.type_shape`
- `ears.placement_angle`
- `ears.inner_outer_color`
- `character.skin_rendering`

**C. Outfit and signature markers**
- `outfit.primary`
- `outfit.secondary_details`
- `accessories.signature`
- `motif.signature`
- `details.other_invariants`
- `details.prohibited_changes`

**D. Palette**
- `palette.primary`
- `palette.secondary`
- `palette.dark`
- `palette.accent`
- `palette.neutral`
- `palette.hierarchy`

**E. Rendering style**
- `style.target` (anime / 3d / chibi)
- `style.linework`
- `style.shading`
- `style.materials`
- `style.proportion_rules`
- `style.detail_level`

**F. Scene and composition**
- `scene.pose`
- `scene.expression`
- `scene.camera_angle`
- `scene.framing`
- `scene.background`
- `scene.lighting`
- `scene.props`

**G. References**
- `reference.canonical_identity_id`
- `reference.style_id`
- `reference.composition_id`
- `reference.extra_notes`

**H. Logo-only fields**
- `logo.motif_source`
- `logo.wordmark_text`
- `logo.typography_direction`
- `logo.mark_direction`
- `logo.avoid`

Logo-only fields are excluded from character prompts unless the selected task is logo design.

### 5.4 Prompt modules

The following modules are assembled from the shared field registry. Tokens resolve to fields with identical IDs; do not manually paraphrase user values.

**CHARACTER**
```text
CHARACTER
Name: {{character.name}}
Type/species: {{character.species_type}}
Age/presentation: {{character.age_presentation}}
Identity summary: {{character.identity_summary}}
Personality: {{character.personality}}
Purpose/context: {{character.context}}
```

**IDENTITY LOCK**
```text
Preserve these owner-defined character attributes:
Face: {{face.shape_cues}}
Eye shape: {{face.eye_shape}}
Eye color: {{face.eye_color}}
Hair color: {{hair.color}}
Hair length/cut: {{hair.length_cut}}
Hair silhouette: {{hair.silhouette}}
Ear shape/type: {{ears.type_shape}}
Ear placement: {{ears.placement_angle}}
Primary outfit: {{outfit.primary}}
Secondary outfit details: {{outfit.secondary_details}}
Signature accessory: {{accessories.signature}}
Signature motif: {{motif.signature}}
Other identity invariants: {{details.other_invariants}}
```

**PALETTE**
```text
Primary: {{palette.primary}}
Secondary: {{palette.secondary}}
Dark: {{palette.dark}}
Accent: {{palette.accent}}
Neutral/highlight: {{palette.neutral}}
Color hierarchy: {{palette.hierarchy}}
Preserve the approved palette hierarchy; do not introduce competing colors.
```

**STYLE**
```text
Selected style: {{style.target}}
Linework: {{style.linework}}
Shading: {{style.shading}}
Materials: {{style.materials}}
Proportion rules: {{style.proportion_rules}}
Detail level: {{style.detail_level}}
Transform rendering, not character identity. Do not blend styles.
```

**COMPOSITION**
```text
Pose: {{scene.pose}}
Expression: {{scene.expression}}
Camera: {{scene.camera_angle}}
Framing: {{scene.framing}}
Background: {{scene.background}}
Lighting: {{scene.lighting}}
Props: {{scene.props}}
```

**REFERENCE ROLES**
```text
{{reference.canonical_identity_id}} = canonical identity authority.
{{reference.style_id}} = style-only reference; do not copy its character identity.
{{reference.composition_id}} = composition-only reference.
Do not let style or composition references override canonical identity.
```

**NEGATIVE CONSTRAINTS**
```text
Do not redesign the owner-approved character.
Do not change locked identity anchors or palette hierarchy.
Do not borrow another character's identity from a style reference.
Do not invent undecided traits as fixed character facts.
Do not add unrequested characters, text, logos, or props.
Additional prohibited changes: {{details.prohibited_changes}}
```

### 5.5 Task assembly

| Task | Modules |
|---|---|
| Canonical reference sheet | CHARACTER, IDENTITY LOCK, PALETTE, REFERENCE ROLES, NEGATIVE CONSTRAINTS |
| Anime image | Character modules + STYLE + COMPOSITION |
| 3D image | Character modules + STYLE + COMPOSITION |
| Chibi image | Character modules + STYLE + COMPOSITION |
| Logo | Logo-only fields and logo-specific instructions; omit scene fields |

For a three-style set, create three separate prompt instances. Keep identity fields and canonical reference identical. Change `style.target` and only style-specific fields the user deliberately changes.

### 5.6 Suggested user interface flow

1. Identity.
2. Appearance.
3. Palette.
4. Style.
5. Scene and composition.
6. References and role assignment.
7. Live prompt preview with an expandable field-ID inspector.
8. Validation, copy, and versioned JSON export/import.

The user edits the sheet, not a disconnected prompt copy. The preview updates from shared field state. A visible status should distinguish confirmed values, defaults, undecided fields, and fields marked not applicable.

---

## 6. Logo design system

The logo is a separate downstream asset derived from the approved character and design language. It should be recognizable, reproducible, and legible in the contexts where it will appear. A detailed character portrait may be useful as profile art but is not automatically a workable logo.

### 6.1 Logo architecture

Develop and evaluate three related but distinct components:
1. **Character mark / symbol:** the compact visual sign, potentially derived from one approved silhouette, ear shape, motif, or other signature cue.
2. **Wordmark:** the exact name or text rendered with approved typography.
3. **Combined lockup:** the symbol and wordmark arranged as one system.

Do not assume all three must appear in every placement. A small avatar may use the symbol alone; a profile banner or promotional graphic may use the combined lockup.

### 6.2 Derivation from the character

Start from the canonical identity sheet and design-language rules. Select one or two approved motifs rather than shrinking the full character illustration.

A practical sequence:
1. Identify candidate identity motifs from the approved character.
2. Sketch symbol-only directions in monochrome.
3. Compare silhouette, negative space, balance, and distinctiveness.
4. Test whether the mark survives simplification.
5. Develop wordmark typography separately.
6. Build combined lockups and spacing rules.
7. Create light, dark, one-color, and grayscale variants.
8. Check for confusing similarity to existing marks before adoption.

The logo should echo the character without depending on tiny facial details. A recognizable silhouette and controlled negative space often matter more at small sizes than surface decoration.

### 6.3 Complexity, familiarity, and exposure

Logo research does not support a universal rule that simpler is always better or that complex marks are always better. Findings depend on visual versus conceptual complexity, familiarity, exposure, and presentation conditions.

- Janiszewski and Meyvis (2001) examined interactions among logo complexity, repetition, spacing, and processing fluency. This supports testing the mark in its actual presentation context.
- Miceli et al. (2014) distinguished visual complexity from conceptual complexity and examined how their effects can vary across exposures.
- van Grinsven and Das (2014) reported exposure-related recognition and attitude effects for complex logos in their experimental conditions. This does not establish that complex logos work better as tiny avatars.
- Morgan, Fajardo, and Townsend (2021) found that brand familiarity moderated the relative effectiveness of image-based and text-based logos. For an unfamiliar identity, a wordmark or combined mark may help communicate the name.
- Chen et al. (2025) examined context-dependent relationships between logo simplicity and perceived warmth/competence. Perception outcomes are not direct proof of marketplace conversion.
- Luffarelli et al. (2019) studied logo descriptiveness and brand equity, supporting consideration of how clearly a mark communicates the associated offering or identity.

Treat these as design evidence and hypotheses to test, not guarantees of ePal performance.

### 6.4 Logo evaluation matrix

| Test | What to inspect | Practical pass condition |
|---|---|---|
| First exposure | Immediate comprehension and recall | Main motif is noticed without a lengthy explanation |
| Repeated exposure | Recognition and confusion over time | Recognition becomes more stable, not more ambiguous |
| Symbol-only | Mark without wordmark | Distinctive silhouette remains |
| Wordmark-only | Exact text and typography | Correct spelling and legible letterforms |
| Combined lockup | Symbol/name relationship | Neither element overwhelms the other |
| One-color | Shape independent of palette | Core form remains distinct |
| Grayscale | Tonal separation | Main forms do not merge |
| Small-size | Actual avatar/icon exports | Essential motif remains legible at intended size |
| Light/dark backgrounds | Contrast and edge visibility | Mark remains readable on both |
| Similarity review | Existing logos and marks | Potentially confusing resemblance is flagged for further review |

The 64 px and 96 px preview sizes elsewhere in this guide are internal QA probes, not verified ePal upload requirements. Confirm current platform dimensions separately.

### 6.5 Logo prompt template

```text
Create a logo exploration derived from the approved canonical character identity
and design language.

Approved motif source: {{logo.motif_source}}
Exact wordmark text: {{logo.wordmark_text}}
Typography direction: {{logo.typography_direction}}
Symbol / mark direction: {{logo.mark_direction}}
Elements to avoid: {{logo.avoid}}

Treat this as a logo system, not a character portrait.
Prioritize a distinctive, scalable silhouette and deliberate negative space.
Keep the approved identity motif recognizable without relying on tiny details.
Present symbol-only, wordmark-only, and combined-lockup directions as separate
explorations when requested. Preserve exact wordmark spelling.
Do not invent credentials, platform marks, or unapproved character traits.
```

Use generated output for concept exploration. Rebuild final vector/raster artwork and exact lettering in a suitable design tool. A generated image does not establish trademark availability or legal clearance.

---

## 7. Quality assurance and consistency evaluation

### 7.1 Identity-anchor scorecard

Evaluate each critical anchor independently rather than hiding it inside one overall aesthetic score.

Use a 0–5 ordinal scale:
- 0 = absent or contradicted.
- 1 = major mismatch.
- 2 = weak / substantially altered.
- 3 = recognizable but imperfect.
- 4 = strong match.
- 5 = clear match to approved reference.

Suggested anchors:
- Face cues.
- Hair color and silhouette.
- Ear shape and placement.
- Eye color.
- Outfit/signature accessory.
- Signature motif/marking.
- Palette hierarchy.

A critical anchor below 3/5 triggers review and likely revision. This is an internal project heuristic, not a validated psychometric instrument. Record reviewer, date, reference used, score, notes, and disagreement. Do not average away a severe failure in a critical anchor.

### 7.2 Style and asset checks

Check separately:
- Does the output clearly use the selected style?
- Has the style changed rendering rather than redesigning identity?
- Is the face unobstructed?
- Are ears and signature cues inside the crop?
- Are unrequested characters, text, logos, or props present?
- Is the image suitable for its intended aspect ratio and display context?
- Does the asset family retain shared design-language cues without becoming visually repetitive?

### 7.3 Small-size and crop tests

Render internal 64 px and 96 px previews as diagnostic probes. Also inspect the actual intended platform crop, including square and circular crops if relevant. Verify current ePal image specifications from official platform guidance before final export; do not present these internal preview sizes as platform requirements.

### 7.4 Controlled iteration

Change one meaningful variable group at a time:
1. Record the current prompt, reference set, model/tool, settings, and output.
2. Identify the specific failure or uncertainty.
3. Change only the relevant prompt/reference variable group.
4. Generate a comparable candidate.
5. Compare against the same canonical reference and scorecard.
6. Retain rejected candidates and the reason for rejection.
7. Promote a candidate only after explicit review.

Do not treat a more attractive image as evidence of better identity fidelity. Do not treat one successful generation as proof of repeatability.

---

## 8. Data portability, versioning, and governance

### 8.1 Versioned field data

Export/import a versioned JSON record using stable field IDs. Store:
- Schema version.
- Project/character identifier.
- Field values and status.
- Selected task and style.
- Reference IDs and their roles.
- Prompt version.
- Generation tool/model and settings where available.
- Date and reviewer/approval status.
- Output references and revision notes.

When importing into an older schema, preserve unknown fields where possible. Initialize missing fields as undecided; never infer them. Keep lists and their order intact. Preserve color names and HEX values exactly.

### 8.2 Preservation rules

- Keep prior guide versions and original evidence records unchanged.
- Add new versions rather than silently replacing historical artifacts.
- Record source provenance and distinguish research, observation, hypothesis, recommendation, and unknown.
- Retain rejected candidates and revision rationales.
- Do not claim an acceptance test passed unless it was executed and its result recorded.

### 8.3 Evidence boundaries

The cited research informs design principles and workflow choices. It does not establish that this particular character, logo, or visual style will increase ePal impressions, inquiries, conversion, orders, retention, or earnings.

Anecdotes can illustrate possible experiences but cannot establish prevalence. Adjacent creator, streaming, freelance, advertising, or branding findings must not be presented as ePal-specific benchmarks without direct evidence.

---

## 9. Acceptance tests for the modular prompt system

These remain acceptance requirements. The local form, live prompt renderer, and JSON import/export have since been implemented; test execution, browser/device behavior, and actual image-model outputs require separate evidence.

| Test | Procedure | Pass condition |
|---|---|---|
| ID integrity | Compare form field IDs with prompt tokens | Every token resolves to exactly one field |
| Exact-value transfer | Enter unique strings | Prompt contains exact unchanged strings |
| Color preservation | Enter color name and HEX | Both values remain intact |
| List preservation | Enter ordered list items | Every item appears once and in order |
| Undecided handling | Leave a field undecided | No invented trait appears |
| Optional omission | Mark a field not applicable | Field is omitted |
| Required validation | Leave required identity field empty | Canonical finalization is blocked |
| Style independence | Preview anime, 3D, and chibi | Identity fields remain identical; intended style fields differ |
| Reference roles | Attach role-specific images | Each role remains distinct |
| Label independence | Rename a visible label | Stable ID mapping remains intact |
| Logo isolation | Build character prompt with logo fields populated | Logo-only fields are excluded |
| Round trip | Export/import and rebuild prompt | Values and statuses remain unchanged |

The interactive form, live renderer, JSON import/export, and automated test harness were implemented later in the local app. The current schema/prompt engine is v1.4.1 and the test file contains 28 test definitions. Execution of those tests for this exact revision has not been verified in Cycle 082.

---

## 10. Research register

### Character consistency, prompting, and style transfer

1. **OpenAI, Image prompting documentation.** Operational guidance on assigning reference roles, specifying what changes and what remains fixed, iterative editing, and reviewing outputs. Official documentation, not a peer-reviewed efficacy study. https://developers.openai.com/api/docs/guides/image-prompting
2. **Wang et al. (2025), CharaConsist: Fine-Grained Consistent Character Generation.** ICCV 2025. Studies identity and clothing consistency under motion and scene variation. https://openaccess.thecvf.com/content/ICCV2025/html/Wang_CharaConsist_Fine-Grained_Consistent_Character_Generation_ICCV_2025_paper.html
3. **Wang et al. (2025), CharacterFactory: Sampling Consistent Characters With GANs for Diffusion Models.** IEEE Transactions on Image Processing, 34, 2544–2559. https://doi.org/10.1109/TIP.2025.3558668
4. **Peng et al. (2024), CharacterGen: Efficient 3D Character Generation from Single Images with Multi-View Pose Canonicalization.** ACM Transactions on Graphics, 43(4), Article 84. https://doi.org/10.1145/3658217
5. **Liao et al. (2025), SOAP: Style-Omniscient Animatable Portraits.** SIGGRAPH 2025. Specialized graphics pipeline; not proof that prompt-only image generation yields equivalent rigged 3D assets. https://doi.org/10.1145/3721238.3730691
6. **Cao (2026), Cross-media style transfer in art: preserving artistic intent in diverse media using GANs.** Scientific Reports, 16, 15585. Adjacent evidence on art-style transfer, not direct evidence of character identity preservation. https://www.nature.com/articles/s41598-026-42852-x
7. **HSDN (2025), Color Consistency Anime Style Transfer Based on Hybrid Structural Decomposition Network.** IEEE Access, 13, 83335–83347. https://doi.org/10.1109/ACCESS.2025.3569326
8. **StyleAligned.** Shared-attention method for style consistency across generated images. Style alignment is not equivalent to identity preservation. https://style-aligned-gen.github.io/

### Logo design and recognition

9. Janiszewski & Meyvis (2001), “Effects of Brand Logo Complexity, Repetition, and Spacing on Processing Fluency and Judgment.” Journal of Consumer Research, 28(1), 18–32. https://doi.org/10.1086/321945
10. Miceli, Scopelliti, Raimondo, & Donato (2014), “Breaking Through Complexity: Visual and Conceptual Dimensions in Logo Evaluation across Exposures.” Psychology & Marketing, 31(10), 886–899. https://doi.org/10.1002/mar.20741
11. van Grinsven & Das (2014), “Logo Design in Marketing Communication: Brand Logo Complexity Moderates Exposure Effects on Brand Recognition and Brand Attitude.” https://doi.org/10.1080/13527266.2013.866593
12. Morgan, Fajardo, & Townsend (2021), “Show it or say it: how brand familiarity influences the effectiveness of image-based versus text-based logos.” Journal of the Academy of Marketing Science, 49, 566–583. https://doi.org/10.1007/s11747-020-00760-0
13. Chen, Liu, Feng, & Meng (2025), “The visual language of brand logos: Exploring the relationship between logo simplicity and perceptions of brand warmth and competence.” Journal of Business Research, 200, 115580. https://doi.org/10.1016/j.jbusres.2025.115580
14. Luffarelli, Mukesh, & Mahmood (2019), “Let the Logo Do the Talking: The Influence of Logo Descriptiveness on Brand Equity.” Journal of Marketing Research, 56(5). https://doi.org/10.1177/0022243719845000

---

## 11. Common failure modes and prevention

| Failure | Why it happens | Prevention |
|---|---|---|
| Same palette, different character | Color continuity is mistaken for identity continuity | Score face, hair, ears, and motif separately |
| Sequential style drift | Each output becomes the next identity reference | Branch all styles from the approved canonical sheet |
| Chibi loses identity | Simplification removes all recognition anchors | Preserve semantic cues while changing proportions |
| 3D becomes a redesign | Geometry/material translation changes face or costume | Use canonical identity reference and side-by-side review |
| Style contamination | Style reference contributes its own character | Assign explicit reference roles |
| Logo becomes a tiny portrait | Too many details collapse at icon size | Derive a compact symbol from one signature motif |
| Logo appears generic | Common motifs lack a distinctive silhouette | Test shape language and compare against existing marks |
| Generated lettering is malformed | Raster generation is unreliable for exact typography | Recreate final lettering separately |
| Crop removes ears or focal cue | Safe area was not designed for target placement | Inspect actual crop and margins |
| Attractive image passes despite drift | Aesthetic quality dominates review | Use critical-anchor rejection rules |
| Guessed platform dimensions become requirements | Unverified sizes are repeated as facts | Verify current official upload specifications |
| Unsupported conversion claim | Adjacent research is treated as ePal evidence | Keep ePal performance outcomes unknown until measured |

---

## 12. Production checklist and current status

### Production sequence

- [ ] Complete owner-approved design language and character identity fields.
- [ ] Confirm exact palette values and hierarchy.
- [ ] Complete and review the canonical character sheet.
- [ ] Approve the canonical sheet as identity authority.
- [ ] Generate anime as an independent branch.
- [ ] Generate 3D as an independent branch.
- [ ] Generate chibi as an independent branch.
- [ ] Compare outputs with the identity-anchor scorecard.
- [ ] Test small-size previews and intended platform crops.
- [ ] Develop symbol-only, wordmark-only, and combined logo explorations.
- [ ] Test logo at first exposure, repeated exposure, grayscale, one-color, and small sizes.
- [ ] Conduct a separate similarity/trademark review.
- [ ] Verify current ePal upload specifications before final export.
- [ ] Preserve prompts, references, outputs, versions, reviewer scores, and rejection reasons.

### Historical Cycle 019 consolidation result (preserved)

**Integrated into this guide:**
- Design-language framework and fixed/transformable/variable attribute model.
- Silhouette, palette, typography, motif, and asset-family consistency strategies.
- Canonical identity and reference-role hierarchy.
- Independent anime, 3D, and chibi production branches.
- Modular field registry and exact sheet-to-prompt mapping architecture.
- Dedicated logo architecture, research rationale, prompt template, and evaluation matrix.
- QA scorecard, iteration protocol, portability, acceptance tests, evidence boundaries, and failure modes.

**Not yet completed:**
- Interactive form and live prompt renderer.
- JSON import/export implementation.
- Automated acceptance-test execution.
- Owner approval of all character details and exact palette values.
- Character image generation, logo generation, human consistency testing, or ePal outcome measurement.

**Next bounded objective:** implement the modular input sheet and live prompt preview against the field registry in this guide. Verify exact-value transfer and style isolation before using it to generate canonical character imagery.

### Cycle 020 / Cycle 082 alpha implementation status

**Implemented and source-read back**
- Local Character Sheet → Prompt Builder in `app/index.html` and `app/schema.js`.
- One 51-field registry drives form inputs, prompt generation, validation, and JSON export/import.
- Independent anime, 3D, and chibi prompt branches share canonical identity values while keeping style settings isolated.
- Logo exploration is a separate task and does not inherit scene/composition fields.
- Undecided traits are omitted; confirmed values transfer without paraphrase; unknown imported fields are preserved where possible.
- Schema and prompt engine v1.4.1 require an explicitly confirmed adult marker or numeric age 18+ in the age-presentation field; gender labels alone do not satisfy the gate, and ambiguous/negated adult wording or explicit under-18 cues are rejected.
- Copy All revalidates the selected task at click time.
- The test file contains 28 test definitions, including explicit adult-presentation edge cases.

**Not verified**
- The 28-test suite was not executed against this revision in Cycle 082; GitHub Actions run status was not confirmed.
- Browser/mobile layout, keyboard/screen-reader accessibility, clipboard, file import/export, and small-screen behavior were not manually tested.
- The age gate checks only the age-presentation field. It does not inspect every other identity/style/scene field for youth-coded cues or classify rendered pixels. Human review of the complete prompt and every image remains mandatory.
- No canonical character sheet, anime, 3D, chibi, or logo image was generated or owner-approved.
- No cross-style identity comparison, 64 px / 96 px preview QA, crop/contrast test, trademark review, or ePal upload test was performed.

**Owner-input constraints retained**
- Broad palette direction: purple/black; exact HEX values and hierarchy remain unapproved.
- One clearly adult character rendered in exactly three independent styles: anime, 3D, and chibi.
- Cute, playful, fun, alternative/cool, with restrained mature confidence.
- Avoid youth-coded cues, overt sexualization, and unsupported elite-gaming or professional-skill implications.
- Do not invent hair, eyes, face, ears, outfit, accessories, markings, or exact colors. Unchosen details remain fillable.

**Next production gate after the independent full-alpha audit**
1. Complete and owner-approve the canonical character sheet.
2. Generate anime, 3D, and chibi independently from that same approved identity source.
3. Compare identity anchors side by side and reject drift even if an image is aesthetically attractive.
4. Develop logo variants as a separate asset derived from the approved identity.
5. Perform small-size, grayscale, crop, contrast, and mobile-context QA; verify current ePal upload specifications.
6. Preserve prompts, reference roles, output IDs, model/settings provenance, reviewer decisions, and rejected candidates.

**End of v1.6.**

## Cycle 089 alpha reconciliation — current implementation and production gate

The earlier Cycle 082 statement that execution was unverified is historical. Current evidence is GitHub Actions run 44014104161 (2026-11-17T04:00:24Z; tested commit 81656b69c651faf32e4c2be9cb421becc001b971): acceptance-test and schema-syntax steps passed. The tested index.html, schema.js, and schema.test.js blobs match the current branch. The app is schema/prompt engine v1.4.1 with a 51-field registry and 28 test definitions. This does not establish local execution, browser/mobile/accessibility QA, cross-device import/export, or image-provider integration.

The canonical character sheet remains blank/unapproved. The anime, 3D, and chibi files remain prompt templates, not generated assets. All three must use the same owner-approved canonical reference and be generated independently. Chibi remains a rendering style only and must preserve a clearly adult presentation. Logo development remains a separate downstream task.

**Historical disposition (Cycle 095):** ALPHA DOCUMENTATION STATUS RECONCILED THROUGH THE FOUR CYCLE 094 FINDINGS; TARGETED READBACK CHECKS PASSED; OVERALL PACKAGE NOT RELEASE-CLEARED. Cycles 090, 092, and 094 are completed historical audits. The canonical character sheet remains blank/unapproved, so all image-generation prompts remain on HOLD until the owner approves the identity and the required reference assets are available. Documentation reconciliation does not establish visual consistency, platform acceptance, or commercial performance.


---

## Historical status snapshot — Cycle 104 (2026-11-17)

**Current release disposition: NOT RELEASE-CLEARED.** The Cycle 095 paragraph above is retained as historical project history and must not be read as the current audit result. The latest independent release audit is Cycle 103 (independent audit report retained in the private project archive).

### Current identity and production gate

- The canonical character sheet remains blank and unapproved. Exact face, hair, eyes, ears, outfit, accessories, markings, palette HEX values, palette hierarchy, and identity invariants remain owner decisions.
- Anime, 3D, and chibi remain three prompt templates for the same future owner-approved adult character; they are not generated or approved assets.
- Image generation remains on HOLD until the canonical identity and required references are completed and explicitly approved.
- Chibi is a rendering style only and must preserve a clearly adult presentation; avoid youth-coded styling and overt sexualization.
- The purple/black palette remains a broad direction only. Do not invent exact HEX values or silently fill undecided identity fields.
- No logo, profile avatar, cover, service image, or other final visual asset has been generated, reviewed, or approved in this cycle.

### Current implementation and verification boundaries

The local prompt-builder prototype is schema/prompt engine v1.4.1 with a 51-field registry and 28 test definitions. GitHub Actions run [44014104161](https://github.com/zonedeth5/AI_workspace/actions/runs/44014104161) completed successfully for the matching `index.html`, `schema.js`, and `schema.test.js` blobs; acceptance-test and schema-syntax steps passed. This is automated source/test evidence only. It does not establish browser/mobile behavior, accessibility, clipboard behavior, practical import/export, image-provider integration, visual identity fidelity, or platform acceptance.

The app builds prompt text and JSON; it does not call an image-generation provider or produce image files. No generated output or ePal upload was tested in this cycle.

### Release-audit findings relevant to this system

- C096-F01 was only partially closed by the earlier eight-file documentation correction. This Cycle 104 addendum updates the Visual Identity System's current status while preserving the Cycle 095 record.
- C096-F02 remains partially closed because the Playbook still needs a separate historical-metadata labeling correction.
- C096-F03 has a documented provenance disposition, but the underlying local-clock/GitHub-UTC chronology discrepancy remains unresolved.
- C096-F04 is addressed: the user confirmed the public destination `zonedeth5/epal.gg-guide` / `main`. That repository is globally public, not limited to the intended reviewers. No public staging or push has occurred.
- Public license scope, source-rights review, final evidence review, and required runtime QA remain outstanding.

### Next production gates

1. Finish the independent documentation audit corrections without overwriting historical records.
2. Obtain explicit owner approval of the canonical character sheet and exact palette hierarchy.
3. Only after approval, generate anime, 3D, and chibi as independent branches from the same canonical reference.
4. Compare every output against the same identity-anchor scorecard; reject identity drift even when an output is aesthetically strong.
5. Verify actual target crops, accessibility/context requirements, current ePal upload specifications, and image quality.
6. Preserve prompt, reference, model/settings, output, reviewer, and rejection provenance.
7. Do not stage or publish until the independent release gate, public-license review, and exact staged-copy verification pass.

**Cycle 104 effect:** documentation status only. No canonical identity decision, design value, generated image, logo, app source, or public repository content was changed or approved.

---

## Cycle 106 current status reconciliation — 2026-11-17

**Current release disposition: NOT RELEASE-CLEARED.** The Cycle 104 section above is retained as a dated historical snapshot; its statements about the then-pending Playbook correction and then-current audit progress must not be read as the current status. The latest independent release audit remains Cycle 103 (independent audit report retained in the private project archive). Cycles 104–106 record targeted documentation corrections and consistency checks, not a new independent release audit.

### Documentation consistency disposition

- **C096-F01:** Addressed for the two specifically identified current-status surfaces: the project README and this Visual Identity System. Cycle 104 reconciled both; Cycle 106 updated their status language and audit trail after the later correction. This is not a claim that every repository artifact has been exhaustively audited.
- **C096-F02:** The specific Playbook v2.2 header ambiguity is addressed. Cycle 105 labeled the inherited Cycle 066 Project/Cycle/Date/Scope block and the v1.9 predecessor reference as historical, while preserving the active v2.2 declaration and substantive safety guidance.
- **C096-F03:** Remains **UNRESOLVED**. The timestamp provenance disposition is documented, but the underlying local-clock/GitHub-UTC chronology discrepancy has not been reconciled. Do not infer a correction factor.
- **C096-F04:** Addressed. The confirmed destination `zonedeth5/epal.gg-guide` / `main` is globally public, not restricted to named reviewers. No public staging or push has occurred.

Implementation records: Cycle 104 (project-index reconciliation report retained in the private project archive) and Cycle 105 (historical-metadata report retained in the private project archive). The Cycle 106 cross-document consistency report will be linked from the project index after its creation.

### Current identity and production gate

- The canonical character sheet remains blank and unapproved. Exact face, hair, eyes, ears, outfit, accessories, markings, palette HEX values, palette hierarchy, and identity invariants remain owner decisions.
- Anime, 3D, and chibi remain prompt templates for the same future owner-approved adult character; they are not generated or approved assets.
- Image generation remains on HOLD until the canonical identity and required references are completed and explicitly approved.
- Chibi must preserve a clearly adult presentation; avoid youth-coded styling and overt sexualization.
- Purple/black remains a broad direction only. Do not invent exact HEX values or silently fill undecided identity fields.
- No logo, profile avatar, cover, service image, or other final visual asset has been generated, reviewed, or approved.

### Current implementation and verification boundaries

The local prompt-builder remains schema/prompt engine v1.4.1 with a 51-field registry and 28 test definitions. GitHub Actions run [44014104161](https://github.com/zonedeth5/AI_workspace/actions/runs/44014104161) passed for the matching app source/test/workflow blobs. This is automated source/test evidence only; it does not establish browser/mobile behavior, accessibility, clipboard behavior, practical import/export, image-provider integration, visual identity fidelity, or platform acceptance. The app builds prompt text and JSON; it does not call an image-generation provider or produce image files. No generated output or ePal upload was tested in Cycles 104–106.

### Remaining release gates

1. Resolve public license/content-rights scope for the proposed public material and third-party excerpts/assets.
2. Complete feasible browser/mobile/accessibility/clipboard/import-export runtime QA and record exact environments and results.
3. Obtain explicit owner approval of the canonical character sheet and exact palette hierarchy before image generation.
4. Complete outstanding evidence/source review and verify current target-platform image/upload requirements.
5. Conduct a fresh independent release audit, then verify the exact staged copy and its provenance before any public publication.

**Cycle 106 effect:** documentation status reconciliation only. No character design decision, generated image, logo, app source, public repository content, or ePal account action was changed or approved.
