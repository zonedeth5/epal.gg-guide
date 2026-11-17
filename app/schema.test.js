const test=require("node:test");
const fs=require("node:fs");
const path=require("node:path");
const assert=require("node:assert/strict");
const B=require("./schema.js");
test("registry has unique stable IDs",()=>{
 const ids=B.fields.map(f=>f.id);
 assert.equal(ids.length,new Set(ids).size);
 assert.ok(ids.includes("logo.wordmark_text"));
});
test("exact confirmed values transfer without paraphrase",()=>{
 const v=B.initialValues();
 v["character.name"]={value:"Zed & Violet / 07",status:"user_confirmed"};
 const p=B.buildPrompts(v,"character",["anime"])[0].prompt;
 assert.ok(p.includes("Character name: Zed & Violet / 07"));
});
test("undecided and not-applicable values are not inserted",()=>{
 const v=B.initialValues();
 v["hair.color"]={value:"should not appear",status:"undecided"};
 v["face.eye_color"]={value:"also omitted",status:"not_applicable"};
 const p=B.buildPrompts(v,"character",["3d"])[0].prompt;
 assert.ok(!p.includes("should not appear"));
 assert.ok(!p.includes("also omitted"));
 assert.match(p,/do not invent missing character traits/i);
});
test("project defaults are visibly marked",()=>{
 const v=B.initialValues();
 v["palette.primary"]={value:"Violet",status:"project_default"};
 const p=B.buildPrompts(v,"character",["anime"])[0].prompt;
 assert.match(p,/Violet \[project default/);
});
test("anime, 3d, and chibi share identity but differ in style header",()=>{
 const v=B.initialValues();
 v["character.name"]={value:"Test Character",status:"user_confirmed"};
 const ps=B.buildPrompts(v,"character",["anime","3d","chibi"]);
 assert.deepEqual(ps.map(x=>x.style),["anime","3d","chibi"]);
 for(const p of ps)assert.ok(p.prompt.includes("Character name: Test Character"));
 assert.notEqual(ps[0].prompt,ps[1].prompt);
});
test("logo prompts isolate logo fields from character scene fields",()=>{
 const v=B.initialValues();
 v["logo.wordmark_text"]={value:"Exact Name",status:"user_confirmed"};
 v["scene.pose"]={value:"running",status:"user_confirmed"};
 const p=B.buildPrompts(v,"logo",[])[0].prompt;
 assert.ok(p.includes("Exact wordmark text: Exact Name"));
 assert.ok(!p.includes("Pose: running"));
});
test("canonical validation requires every core identity field to be explicitly user-confirmed",()=>{
 const v=B.initialValues();
 assert.equal(B.validate(v,"canonical").valid,false);
 for(const id of B.requiredIds)v[id]={value:"default "+id,status:"project_default"};
 assert.equal(B.validate(v,"canonical").valid,false,"project defaults must not qualify as canonical approval");
 v["character.name"]={value:"confirmed name",status:"user_confirmed"};
 assert.equal(B.validate(v,"canonical").valid,false,"one confirmed field is not enough");
 for(const id of B.requiredIds)v[id]={value:id==="character.age_presentation"?"Clearly adult woman, age 25":"confirmed "+id,status:"user_confirmed"};
 assert.equal(B.validate(v,"canonical").valid,true);
 v["character.age_presentation"]={value:"adult",status:"project_default"};
 assert.equal(B.validate(v,"canonical").valid,false,"a defaulted age-presentation field must remain unapproved");
});
test("JSON import restores the exported task and known field values",()=>{
 const v=B.initialValues();
 v["palette.primary"]={value:"Purple #7A33CC",status:"user_confirmed"};
 const record=B.exportRecord(v,"logo");
 const inspected=B.inspectImportRecord(record);
 assert.equal(inspected.valid,true);
 assert.equal(inspected.task,"logo");
 assert.deepEqual(inspected.values["palette.primary"],v["palette.primary"]);
 assert.deepEqual(inspected.warnings,[]);
});
test("unknown field entries survive import and re-export",()=>{
 const record=B.exportRecord(B.initialValues(),"character");
 record.values["future.render_profile"]={value:"cinematic matte",status:"user_confirmed"};
 record.values["future.experimental"]={value:"keep this",status:"project_default"};
 const inspected=B.inspectImportRecord(record);
 assert.equal(inspected.valid,true);
 assert.equal(inspected.values["future.render_profile"].value,"cinematic matte");
 assert.deepEqual(inspected.preservedUnknown,["future.render_profile","future.experimental"]);
 const exported=B.exportRecord(inspected.values,inspected.task);
 assert.deepEqual(exported.values["future.render_profile"],record.values["future.render_profile"]);
 assert.deepEqual(exported.values["future.experimental"],record.values["future.experimental"]);
 assert.ok(inspected.warnings.some(w=>w.includes("unrecognized field")));
});
test("per-field extension metadata survives normalization and re-export",()=>{
 const record=B.exportRecord(B.initialValues(),"character");
 record.values["character.name"]={value:"Forward-safe",status:"user_confirmed",vendor_meta:{revision:7,labels:["a","b"]}};
 record.values["future.render_profile"]={value:"cinematic matte",status:"project_default",future_flag:true};
 const inspected=B.inspectImportRecord(record);
 assert.deepEqual(inspected.values["character.name"].vendor_meta,{revision:7,labels:["a","b"]});
 const exported=B.exportRecord(inspected.values,inspected.task);
 assert.deepEqual(exported.values["character.name"],record.values["character.name"]);
 assert.deepEqual(exported.values["future.render_profile"],record.values["future.render_profile"]);
});

test("unrecognized schema versions warn but preserve recoverable values",()=>{
 const record=B.exportRecord(B.initialValues(),"canonical");
 record.schema_version="2.0.0";
 record.values["character.name"]={value:"Future-safe name",status:"user_confirmed"};
 const inspected=B.inspectImportRecord(record);
 assert.equal(inspected.valid,true);
 assert.equal(inspected.task,"canonical");
 assert.equal(inspected.values["character.name"].value,"Future-safe name");
 assert.ok(inspected.warnings.some(w=>w.includes("supports "+B.schemaVersion)));
});
test("missing schema version and unsupported task produce explicit warnings",()=>{
 const record={values:{},task:"unknown-task"};
 const inspected=B.inspectImportRecord(record);
 assert.equal(inspected.valid,true);
 assert.equal(inspected.task,null);
 assert.equal(inspected.schemaVersion,null);
 assert.equal(inspected.warnings.length,2);
});
test("malformed imports are rejected without throwing",()=>{
 assert.equal(B.inspectImportRecord(null).valid,false);
 assert.equal(B.inspectImportRecord({values:[]}).valid,false);
 assert.equal(B.inspectImportRecord({values:"bad"}).valid,false);
});
test("unknown prototype-sensitive field names are ignored",()=>{
 const record={schema_version:B.schemaVersion,task:"character",values:JSON.parse('{"__proto__":{"value":"unsafe","status":"user_confirmed"},"constructor":{"value":"unsafe","status":"user_confirmed"},"future.safe":{"value":"preserved","status":"user_confirmed"}}')};
 const inspected=B.inspectImportRecord(record);
 assert.equal(inspected.valid,true);
 assert.equal(Object.prototype.hasOwnProperty.call(inspected.values,"__proto__"),false);
 assert.equal(Object.prototype.hasOwnProperty.call(inspected.values,"constructor"),false);
 assert.equal(inspected.values["future.safe"].value,"preserved");
});


test("logo prompts inherit only owner-confirmed identity, palette, and canonical reference",()=>{
 const v=B.initialValues();
 v["character.name"]={value:"Violet Hare",status:"user_confirmed"};
 v["character.identity_summary"]={value:"Adult playful alternative bunny woman",status:"user_confirmed"};
 v["hair.color"]={value:"Silver",status:"project_default"};
 v["palette.primary"]={value:"Purple #7138A8",status:"user_confirmed"};
 v["palette.secondary"]={value:"Black #17131F",status:"project_default"};
 v["palette.hierarchy"]={value:"Purple dominant, black secondary",status:"user_confirmed"};
 v["reference.canonical_identity_id"]={value:"approved-sheet.png",status:"user_confirmed"};
 v["scene.pose"]={value:"running",status:"user_confirmed"};
 v["logo.mark_direction"]={value:"minimal crescent-and-ear monogram",status:"user_confirmed"};
 const p=B.buildPrompts(v,"logo",[])[0].prompt;
 assert.ok(p.includes("Character name: Violet Hare"));
 assert.ok(p.includes("Identity summary: Adult playful alternative bunny woman"));
 assert.ok(p.includes("Primary color (name / HEX): Purple #7138A8"));
 assert.ok(p.includes("Color hierarchy / proportions: Purple dominant, black secondary"));
 assert.ok(p.includes("Canonical identity reference ID / filename: approved-sheet.png"));
 assert.ok(p.includes("minimal crescent-and-ear monogram"));
 assert.ok(!p.includes("Hair color: Silver"),"project-default identity traits must not be treated as approved");
 assert.ok(!p.includes("Black #17131F"),"project-default palette must not be treated as approved");
 assert.ok(!p.includes("Pose: running"),"scene composition must not leak into logo design");
 assert.match(p,/not a character portrait/i);
 assert.match(p,/Do not invent unconfirmed hair/i);
});
test("logo prompt remains generic when no identity fields are confirmed",()=>{
 const p=B.buildPrompts(B.initialValues(),"logo",[])[0].prompt;
 assert.match(p,/APPROVED CHARACTER IDENTITY/);
 assert.match(p,/APPROVED PALETTE/);
 assert.ok(!p.includes("Character name:"));
 assert.ok(!p.includes("Primary color"));
});


test("anime, 3D, and chibi prompts use isolated rendering profiles",()=>{
 const v=B.initialValues();
 v["character.name"]={value:"Shared Identity",status:"user_confirmed"};
 v["style.anime.linework"]={value:"clean tapered ink contours",status:"user_confirmed"};
 v["style.anime.shading"]={value:"cel shading with two shadow bands",status:"user_confirmed"};
 v["style.3d.materials"]={value:"soft satin polymer and realistic fabric",status:"user_confirmed"};
 v["style.3d.shading"]={value:"physically based softbox lighting",status:"user_confirmed"};
 v["style.chibi.proportions"]={value:"large head, compact adult-coded body proportions",status:"user_confirmed"};
 v["style.chibi.detail"]={value:"simplified readable details",status:"user_confirmed"};
 v["reference.style_anime_id"]={value:"anime-style.png",status:"user_confirmed"};
 v["reference.style_3d_id"]={value:"3d-style.png",status:"user_confirmed"};
 v["reference.style_chibi_id"]={value:"chibi-style.png",status:"user_confirmed"};
 v["style.linework"]={value:"legacy shared style must not leak",status:"user_confirmed"};
 const ps=B.buildPrompts(v,"character",["anime","3d","chibi"]);
 const byStyle=Object.fromEntries(ps.map(p=>[p.style,p.prompt]));
 assert.ok(byStyle.anime.includes("clean tapered ink contours"));
 assert.ok(byStyle.anime.includes("anime-style.png"));
 assert.ok(!byStyle.anime.includes("physically based softbox lighting"));
 assert.ok(!byStyle.anime.includes("large head, compact adult-coded body proportions"));
 assert.ok(byStyle["3d"].includes("soft satin polymer and realistic fabric"));
 assert.ok(byStyle["3d"].includes("3d-style.png"));
 assert.ok(!byStyle["3d"].includes("clean tapered ink contours"));
 assert.ok(!byStyle["3d"].includes("chibi-style.png"));
 assert.ok(byStyle.chibi.includes("large head, compact adult-coded body proportions"));
 assert.ok(byStyle.chibi.includes("chibi-style.png"));
 assert.ok(!byStyle.chibi.includes("soft satin polymer and realistic fabric"));
 for(const p of ps)assert.ok(p.prompt.includes("Character name: Shared Identity"));
 for(const p of ps)assert.ok(!p.prompt.includes("legacy shared style must not leak"));
});
test("canonical identity sheet excludes all style-specific rendering profiles",()=>{
 const v=B.initialValues();
 for(const [id,value] of [
  ["character.name","Shared Identity"],
  ["character.species_type","Bunny woman"],
  ["character.age_presentation","Clearly adult"],
  ["character.identity_summary","Adult original character"]
 ])v[id]={value,status:"user_confirmed"};
 v["style.anime.linework"]={value:"anime-only linework",status:"user_confirmed"};
 v["style.3d.materials"]={value:"3D-only materials",status:"user_confirmed"};
 v["style.chibi.proportions"]={value:"chibi-only proportions",status:"user_confirmed"};
 const p=B.buildPrompts(v,"canonical",[])[0].prompt;
 assert.ok(p.includes("Character name: Shared Identity"));
 assert.ok(!p.includes("anime-only linework"));
 assert.ok(!p.includes("3D-only materials"));
 assert.ok(!p.includes("chibi-only proportions"));
});


test("character prompts require a user-confirmed clearly adult presentation",()=>{
 const v=B.initialValues();
 assert.equal(B.validate(v,"character").valid,false);
 v["character.age_presentation"]={value:"Adult woman, age 25",status:"user_confirmed"};
 assert.equal(B.adultPresentationCheck(v).valid,true);
 assert.equal(B.validate(v,"character").valid,true);
 v["character.age_presentation"]={value:"Adult-coded but age ambiguous",status:"user_confirmed"};
 assert.equal(B.adultPresentationCheck(v).valid,false);
 v["character.age_presentation"]={value:"Adult woman, age 25",status:"project_default"};
 assert.equal(B.adultPresentationCheck(v).valid,false);
});
test("minor and youth-coded age cues block character prompt validation",()=>{
 const v=B.initialValues();
 for(const phrase of ["teenage girl","underage character","young girl","schoolgirl styling","childlike age presentation"]){
  v["character.age_presentation"]={value:phrase,status:"user_confirmed"};
  assert.equal(B.adultPresentationCheck(v).valid,false,phrase+" must be blocked");
 }
});
test("gender labels alone do not satisfy explicit adult presentation",()=>{
 const v=B.initialValues();
 for(const phrase of ["woman","man","young woman","adult-coded but age ambiguous","not adult","non-adult"]){
  v["character.age_presentation"]={value:phrase,status:"user_confirmed"};
  assert.equal(B.adultPresentationCheck(v).valid,false,phrase+" must not substitute for an explicit adult/18+ marker");
 }
 v["character.age_presentation"]={value:"Clearly adult woman",status:"user_confirmed"};
 assert.equal(B.adultPresentationCheck(v).valid,true);
});
test("numeric age must be at least 18 to satisfy the adult presentation gate",()=>{
 const v=B.initialValues();
 for(const phrase of ["Age 17","Age 17 adult","under 18","17-year-old adult"]){
  v["character.age_presentation"]={value:phrase,status:"user_confirmed"};
  assert.equal(B.adultPresentationCheck(v).valid,false,phrase+" must be rejected");
 }
 for(const phrase of ["Age 18","18-year-old adult","Age 25"]){
  v["character.age_presentation"]={value:phrase,status:"user_confirmed"};
  assert.equal(B.adultPresentationCheck(v).valid,true,phrase+" should satisfy the explicit age check");
 }
});
test("adult presentation safeguard is explicit in all three style prompts",()=>{
 const v=B.initialValues();
 v["character.age_presentation"]={value:"Clearly adult woman, age 25",status:"user_confirmed"};
 const prompts=B.buildPrompts(v,"character",["anime","3d","chibi"]);
 for(const p of prompts){
  assert.match(p.prompt,/clearly adult/i);
  assert.match(p.prompt,/must not imply a minor, child, or teenager/i);
  assert.match(p.prompt,/treat the prompt as blocked/i);
 }
});
test("project metadata is included without changing canonical identity",()=>{
 const v=B.initialValues();
 v["project.name"]={value:"Violet Arcade",status:"user_confirmed"};
 v["project.platform"]={value:"ePal",status:"user_confirmed"};
 v["project.audience"]={value:"Adult gaming community",status:"user_confirmed"};
 v["character.age_presentation"]={value:"Adult woman, age 25",status:"user_confirmed"};
 const p=B.buildPrompts(v,"character",["anime"])[0].prompt;
 assert.ok(p.includes("Project / brand name: Violet Arcade"));
 assert.ok(p.includes("Target platform: ePal"));
 assert.ok(p.includes("Intended audience: Adult gaming community"));
});

test("wizard metadata assigns every editable field to a progressive step with help text",()=>{
 assert.ok(B.wizardSteps.some(s=>s.id==="foundation"));
 for(const f of B.fields){assert.ok(f.step,"missing step for "+f.id);assert.ok(f.help&&f.help.length>10,"missing help for "+f.id);}
});
test("task workflow exposes distinct logo and rendering steps",()=>{
 assert.ok(B.wizardSteps.find(s=>s.id==="rendering").groups.includes("Anime rendering profile"));
 assert.ok(B.wizardSteps.find(s=>s.id==="logo").groups.includes("Logo only"));
});
test("export metadata records prompt engine, timestamp, and project revision",()=>{
 const v=B.initialValues();
 v["project.version"]={value:"design-r07",status:"user_confirmed"};
 const record=B.exportRecord(v,"character");
 assert.equal(record.schema_version,B.schemaVersion,"export must write the declared schema version");
 assert.equal(record.generation.prompt_engine_version,B.promptEngineVersion);
 assert.equal(record.generation.project_revision,"design-r07");
 assert.ok(!Number.isNaN(Date.parse(record.generation.exported_at)));
 assert.equal(record.values["project.version"].value,"design-r07");
});
test("export metadata leaves prompt text deterministic and timestamp-free",()=>{
 const v=B.initialValues();
 v["character.age_presentation"]={value:"Clearly adult woman, age 25",status:"user_confirmed"};
 const first=B.buildPrompts(v,"character",["anime"])[0].prompt;
 const exported=B.exportRecord(v,"character");
 const second=B.buildPrompts(v,"character",["anime"])[0].prompt;
 assert.equal(first,second);
 assert.ok(!first.includes(exported.generation.exported_at));
});


test("successful JSON import requests wizard-heading focus restoration",()=>{
 const html=fs.readFileSync(path.join(__dirname,"index.html"),"utf8");
 const importHandler=html.match(/getElementById\("importFile"\)[\s\S]*?\n\}\);/);
 assert.ok(importHandler,"import handler must remain present");
 assert.match(importHandler[0],/values=inspected\.values;[\s\S]*?renderForm\(true\);renderPrompts\(\);/);
 assert.doesNotMatch(importHandler[0],/values=inspected\.values;[\s\S]*?renderForm\(\);renderPrompts\(\);/);
});


test("field registry and generated field IDs are unique; wizard groups are mapped",()=>{
 const ids=B.fields.map(f=>f.id);
 assert.equal(ids.length,new Set(ids).size,"field IDs must be unique");
 const domIds=ids.map(id=>"field-"+id.replace(/[^a-z0-9_-]/gi,"-"));
 assert.equal(domIds.length,new Set(domIds).size,"generated DOM IDs must be unique");
 const stepGroups=new Set(B.wizardSteps.flatMap(step=>step.groups));
 const archived="Legacy shared style — not applied to independent profiles";
 for(const field of B.fields){
  if(field.group===archived)assert.equal(field.step,"advanced");
  else assert.ok(stepGroups.has(field.group),"field group missing from wizard: "+field.group);
 }
 assert.ok(!stepGroups.has(archived),"legacy shared-style group remains intentionally hidden");
});

test("JSON import uses a keyboard-focusable native file input with a visible label focus treatment",()=>{
 const html=fs.readFileSync(path.join(__dirname,"index.html"),"utf8");
 assert.ok(html.includes('<input class="visually-hidden" type="file" id="importFile" accept=".json,application/json"><label class="file-button" for="importFile">Import JSON</label>'));
 assert.ok(html.includes(".visually-hidden{position:absolute!important;"));
 assert.ok(html.includes("#importFile:focus-visible + .file-button{outline:2px solid var(--accent);"));
 assert.ok(!html.includes('id="importFile" class="hidden"'));
});

test("page copy accurately warns that unsaved field values are lost on reload or close",()=>{
 const html=fs.readFileSync(path.join(__dirname,"index.html"),"utf8");
 assert.match(html,/reloading or closing it loses unsaved entries/i);
});


test("canonical approval preserves checkbox focus and unchanged validation markup is not rebuilt",()=>{
 const html=fs.readFileSync(path.join(__dirname,"index.html"),"utf8");
 const render=html.match(/function renderPrompts\(\)\{[\s\S]*?\n\}/);
 assert.ok(render,"renderPrompts function must exist");
 assert.ok(html.includes("let validationMarkup=null;"),"validation markup cache must be initialized");
 assert.ok(render[0].includes("validationMarkup!==statusMarkup"),"unchanged live-region content must not be replaced");
 assert.ok(render[0].includes('document.activeElement.id==="canonicalReview"'),"canonical checkbox focus must be detected before replacement");
 assert.ok(render[0].includes('document.getElementById("canonicalReview")'),"replacement canonical checkbox must be reacquired");
 assert.ok(render[0].includes("nextReview.focus()"),"focus must be restored to the replacement checkbox");
});


test("all dynamic HTML sinks escape user-controlled and schema-controlled text",()=>{
 const html=fs.readFileSync(path.join(__dirname,"index.html"),"utf8");
 assert.equal((html.match(/\.innerHTML\s*=/g)||[]).length,3,"only the reviewed form, validation, and prompt HTML sinks should exist");
 assert.ok(html.includes("esc(entry.value)"),"field values must be escaped");
 assert.ok(html.includes("esc(f.id)"),"field identifiers in data attributes must be escaped");
 assert.ok(html.includes("esc(f.label)"),"field labels and status labels must be escaped");
 assert.ok(html.includes("esc(f.help)"),"field help text must be escaped");
 assert.ok(html.includes("esc(step.title)")&&html.includes("esc(step.description)")&&html.includes("esc(g)"),"wizard text must be escaped");
 assert.ok(html.includes("esc(requiredText)")&&html.includes('esc(validation.errors.join("; "))'),"validation text must be escaped");
 assert.ok(html.includes("esc(p.style.toUpperCase())")&&html.includes("esc(revision)")&&html.includes("esc(p.prompt)"),"generated prompt content and revision must be escaped");
});


test("import warns when malformed field entries are skipped or values and statuses are normalized",()=>{
 const record=B.exportRecord(B.initialValues(),"character");
 record.values["character.name"]="not-an-entry";
 record.values["character.species_type"]={value:42,status:"user_confirmed"};
 record.values["future.bad"]={value:"recoverable",status:"unsupported-status"};
 const inspected=B.inspectImportRecord(record);
 assert.equal(inspected.valid,true);
 assert.deepEqual(inspected.values["character.name"],{value:"",status:"undecided"});
 assert.deepEqual(inspected.values["character.species_type"],{value:"",status:"user_confirmed"});
 assert.equal(inspected.values["future.bad"].value,"recoverable");
 assert.ok(inspected.warnings.some(w=>w.includes("field entry")&&w.includes("could not be imported")));
 assert.ok(inspected.warnings.some(w=>w.includes("non-string field value")));
 assert.ok(inspected.warnings.some(w=>w.includes("unsupported field status")));
});

test("import normalization warnings do not mutate the source record",()=>{
 const record=B.exportRecord(B.initialValues(),"character");
 record.values["character.name"]={value:17,status:"invalid"};
 const before=JSON.stringify(record);
 const inspected=B.inspectImportRecord(record);
 assert.equal(inspected.valid,true);
 assert.equal(JSON.stringify(record),before);
 assert.equal(inspected.values["character.name"].value,"");
 assert.ok(inspected.warnings.length>0);
});


test("import warns when field value or status properties are missing",()=>{
 const record=B.exportRecord(B.initialValues(),"character");
 record.values["future.missing"]={};
 const inspected=B.inspectImportRecord(record);
 assert.equal(inspected.valid,true);
 assert.deepEqual(inspected.values["future.missing"],{value:"",status:"undecided"});
 assert.ok(inspected.warnings.some(w=>w.includes("non-string field value")));
 assert.ok(inspected.warnings.some(w=>w.includes("unsupported field status")));
});


test("file import enforces the documented size limit before reading or parsing",()=>{
 const html=fs.readFileSync(path.join(__dirname,"index.html"),"utf8");
 assert.match(html,/const MAX_IMPORT_BYTES=2\*1024\*1024;/);
 const handler=html.match(/getElementById\("importFile"\)[\s\S]*?\n\}\);/);
 assert.ok(handler);
 assert.ok(handler[0].indexOf("file.size>MAX_IMPORT_BYTES")<handler[0].indexOf("file.text()"),"size guard must run before reading file contents");
 assert.match(handler[0],/2 MiB import limit/);
 assert.match(handler[0],/e\.target\.value="";/);
});

test("failed file import does not assign new form state before validation",()=>{
 const html=fs.readFileSync(path.join(__dirname,"index.html"),"utf8");
 const handler=html.match(/getElementById\("importFile"\)[\s\S]*?\n\}\);/);
 assert.ok(handler);
 assert.ok(handler[0].indexOf("const inspected=B.inspectImportRecord(data)")<handler[0].indexOf("values=inspected.values;"));
 assert.ok(handler[0].indexOf("if(!inspected.valid)throw")<handler[0].indexOf("values=inspected.values;"));
});
