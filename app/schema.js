/* EPAL-ALT-BUNNY-001 modular prompt schema and pure prompt engine.
 * One registry drives field rendering, validation, prompt assembly, and export.
 * Browser global: EpalBuilder. Node-compatible for the acceptance tests.
 */
(function(root){
"use strict";
const groupSteps={
 "Character overview":"foundation","Project metadata":"foundation","Safety & presentation":"foundation",
 "Face, hair & ears":"appearance","Outfit & signature markers":"appearance","Palette":"appearance",
 "Anime rendering profile":"rendering","3D rendering profile":"rendering","Chibi rendering profile":"rendering",
 "Scene & composition":"composition","References":"references","Logo only":"logo",
 "Legacy shared style — not applied to independent profiles":"advanced"
};
const groupHelp={
 "Character overview":"Start with the few facts that define the character. Required identity fields must be owner-confirmed before canonical approval.",
 "Project metadata":"Project context describes this deliverable; it is not part of the character's permanent identity.",
 "Safety & presentation":"Use explicit, owner-confirmed adult presentation. This safeguard does not replace human review.",
 "Face, hair & ears":"Describe visible identity traits only when decided. Leave unknown traits undecided rather than guessing.",
 "Outfit & signature markers":"Record stable signature details separately from temporary scene or costume variations.",
 "Palette":"Use color names or HEX values only when chosen. Describe hierarchy if proportions matter.",
 "Anime rendering profile":"Anime-only rendering choices. These settings do not change canonical character identity.",
 "3D rendering profile":"3D-only rendering choices. These settings do not change canonical character identity.",
 "Chibi rendering profile":"Chibi-only rendering choices. Chibi is a rendering treatment, not an age category.",
 "Scene & composition":"These are per-image choices, not permanent character traits.",
 "References":"IDs and filenames are reminders only. Attach the actual reference files separately when generating.",
 "Logo only":"Logo-specific choices. The logo is a separate identity asset, not a character portrait."
};
const fieldHelp={
 "character.name":"Use the character's approved name. Keep spelling and punctuation stable.",
 "character.species_type":"State the character type without adding traits you have not approved.",
 "character.age_presentation":"Explicitly confirm an adult presentation (18+). Avoid age ambiguity and youth-coded cues.",
 "character.identity_summary":"A concise summary of stable identity anchors. Do not include temporary pose or scene details.",
 "character.personality":"Describe intended personality, not an unverified audience or sales claim.",
 "character.context":"Explain the intended use of this character or asset family.",
 "project.version":"Use a revision label you control (for example, 1.0 or design-r03).",
 "palette.primary":"Optional color name or HEX value. Do not assume the project's example palette is approved.",
 "palette.hierarchy":"Explain which colors dominate and their approximate visual roles.",
 "reference.canonical_identity_id":"A filename or ID helps you track a file; it does not attach the image.",
 "reference.style_anime_id":"Attach this actual image separately as an anime rendering reference.",
 "reference.style_3d_id":"Attach this actual image separately as a 3D rendering reference.",
 "reference.style_chibi_id":"Attach this actual image separately as a chibi rendering reference.",
 "reference.composition_id":"Attach separately; use for framing only, not character identity.",
 "logo.wordmark_text":"Enter exact spelling, capitalization, spacing, and punctuation.",
 "logo.avoid":"List symbols, shapes, or treatments that should not appear."
};
const wizardSteps=[
 {id:"foundation",title:"Foundation",description:"Set the character's core identity, project context, and adult-presentation requirements.",groups:["Character overview","Project metadata","Safety & presentation"]},
 {id:"appearance",title:"Appearance",description:"Add only the stable visual traits and palette decisions you have actually chosen.",groups:["Face, hair & ears","Outfit & signature markers","Palette"]},
 {id:"rendering",title:"Rendering styles",description:"Tune anime, 3D, and chibi independently while keeping the character identity shared.",groups:["Anime rendering profile","3D rendering profile","Chibi rendering profile"]},
 {id:"composition",title:"Composition",description:"Set temporary pose, framing, background, and lighting for this image.",groups:["Scene & composition"]},
 {id:"references",title:"References",description:"Assign reference roles. Attach the actual image files separately when generating.",groups:["References"]},
 {id:"logo",title:"Logo",description:"Create a separate mark or wordmark using only confirmed identity anchors.",groups:["Logo only"]}
];
const fields = [
["character.name","Character name","Character overview","text",true],
["character.species_type","Character type / species","Character overview","text",true],
["character.age_presentation","Age presentation (must be clearly adult)","Character overview","text",true],
["character.identity_summary","Identity summary","Character overview","textarea",true],
["character.personality","Personality","Character overview","textarea",false],
["character.context","Purpose / context","Character overview","textarea",false],
["project.name","Project / brand name","Project metadata","text",false],
["project.version","Project revision / version","Project metadata","text",false],
["project.platform","Target platform","Project metadata","text",false],
["project.audience","Intended audience","Project metadata","textarea",false],
["project.deliverable_notes","Deliverable scope / campaign notes","Project metadata","textarea",false],
["safety.adult_presentation_notes","Adult presentation requirements","Safety & presentation","textarea",false],
["safety.prohibited_age_cues","Age-presentation elements to prohibit","Safety & presentation","textarea",false],
["face.shape_cues","Face shape cues","Face, hair & ears","textarea",false],
["face.eye_shape","Eye shape","Face, hair & ears","text",false],
["face.eye_color","Eye color","Face, hair & ears","text",false],
["face.expression_baseline","Baseline expression","Face, hair & ears","text",false],
["hair.color","Hair color","Face, hair & ears","text",false],
["hair.length_cut","Hair length / cut","Face, hair & ears","text",false],
["hair.silhouette","Hair silhouette","Face, hair & ears","textarea",false],
["ears.type_shape","Ear type / shape","Face, hair & ears","text",false],
["ears.placement_angle","Ear placement / angle","Face, hair & ears","text",false],
["ears.inner_outer_color","Inner / outer ear colors","Face, hair & ears","text",false],
["character.skin_rendering","Skin / surface rendering notes","Face, hair & ears","textarea",false],
["outfit.primary","Primary outfit","Outfit & signature markers","textarea",false],
["outfit.secondary_details","Secondary outfit details","Outfit & signature markers","textarea",false],
["accessories.signature","Signature accessories","Outfit & signature markers","textarea",false],
["motif.signature","Signature motif","Outfit & signature markers","textarea",false],
["details.other_invariants","Other identity invariants","Outfit & signature markers","textarea",false],
["details.prohibited_changes","Prohibited changes","Outfit & signature markers","textarea",false],
["palette.primary","Primary color (name / HEX)","Palette","text",false],
["palette.secondary","Secondary color (name / HEX)","Palette","text",false],
["palette.dark","Dark color (name / HEX)","Palette","text",false],
["palette.accent","Accent color (name / HEX)","Palette","text",false],
["palette.neutral","Neutral color (name / HEX)","Palette","text",false],
["palette.hierarchy","Color hierarchy / proportions","Palette","textarea",false],
["style.target","Target rendering style (legacy shared setting)","Legacy shared style — not applied to independent profiles","select",false],
["style.linework","Legacy shared linework (archived)","Legacy shared style — not applied to independent profiles","textarea",false],
["style.shading","Legacy shared shading (archived)","Legacy shared style — not applied to independent profiles","textarea",false],
["style.materials","Legacy shared materials (archived)","Legacy shared style — not applied to independent profiles","textarea",false],
["style.proportion_rules","Legacy shared proportion rules (archived)","Legacy shared style — not applied to independent profiles","textarea",false],
["style.detail_level","Legacy shared detail level (archived)","Legacy shared style — not applied to independent profiles","text",false],
["style.anime.linework","Anime linework","Anime rendering profile","textarea",false],
["style.anime.shading","Anime shading","Anime rendering profile","textarea",false],
["style.anime.materials","Anime surface / material treatment","Anime rendering profile","textarea",false],
["style.anime.proportions","Anime proportion rules","Anime rendering profile","textarea",false],
["style.anime.detail","Anime detail level","Anime rendering profile","text",false],
["style.3d.linework","3D edge / contour treatment","3D rendering profile","textarea",false],
["style.3d.shading","3D lighting and shading model","3D rendering profile","textarea",false],
["style.3d.materials","3D materials / surface response","3D rendering profile","textarea",false],
["style.3d.proportions","3D proportion rules","3D rendering profile","textarea",false],
["style.3d.detail","3D detail level","3D rendering profile","text",false],
["style.chibi.linework","Chibi linework","Chibi rendering profile","textarea",false],
["style.chibi.shading","Chibi shading","Chibi rendering profile","textarea",false],
["style.chibi.materials","Chibi surface / material treatment","Chibi rendering profile","textarea",false],
["style.chibi.proportions","Chibi proportion rules","Chibi rendering profile","textarea",false],
["style.chibi.detail","Chibi detail level","Chibi rendering profile","text",false],
["scene.pose","Pose","Scene & composition","text",false],
["scene.expression","Expression","Scene & composition","text",false],
["scene.camera_angle","Camera angle","Scene & composition","text",false],
["scene.framing","Framing","Scene & composition","text",false],
["scene.background","Background","Scene & composition","text",false],
["scene.lighting","Lighting","Scene & composition","text",false],
["scene.props","Props","Scene & composition","textarea",false],
["reference.canonical_identity_id","Canonical identity reference ID / filename","References","text",false],
["reference.style_id","Legacy shared style reference ID / filename (archived)","References","text",false],
["reference.style_anime_id","Anime rendering reference ID / filename","Anime rendering profile","text",false],
["reference.style_3d_id","3D rendering reference ID / filename","3D rendering profile","text",false],
["reference.style_chibi_id","Chibi rendering reference ID / filename","Chibi rendering profile","text",false],
["reference.composition_id","Composition reference ID / filename","References","text",false],
["reference.extra_notes","Reference attachment notes","References","textarea",false],
["logo.motif_source","Approved motif source","Logo only","textarea",false],
["logo.wordmark_text","Exact wordmark text","Logo only","text",false],
["logo.typography_direction","Typography direction","Logo only","textarea",false],
["logo.mark_direction","Symbol / mark direction","Logo only","textarea",false],
["logo.avoid","Logo elements to avoid","Logo only","textarea",false]
].map(([id,label,group,type,required])=>({id,label,group,type,required,step:groupSteps[group]||"advanced",help:fieldHelp[id]||groupHelp[group]||"Optional detail. Leave undecided until you have made this design decision."}));
const requiredIds=fields.filter(f=>f.required).map(f=>f.id);
const styleOptions=["anime","3d","chibi"];
const initialValues=()=>Object.fromEntries(fields.map(f=>[f.id,{value:"",status:"undecided"}]));
const supportedTasks=["character","canonical","logo"];
const schemaVersion="1.4.1";
const promptEngineVersion="1.4.1";
function normalizeEntry(v){
 if(!v||typeof v!=="object"||Array.isArray(v))return null;
 const value=typeof v.value==="string"?v.value:"";
 const status=["user_confirmed","project_default","undecided","not_applicable"].includes(v.status)?v.status:"undecided";
 // Preserve forward-compatible per-field metadata while excluding prototype-sensitive keys.
 const extra=Object.fromEntries(Object.entries(v).filter(([key])=>!["value","status","__proto__","constructor","prototype"].includes(key)));
 return {...extra,value,status};
}
function normalizeRecord(record){
 const values=initialValues();
 if(record && record.values && typeof record.values==="object"&&!Array.isArray(record.values)){
  for(const [id,v] of Object.entries(record.values)){
   if(id==="__proto__"||id==="constructor"||id==="prototype")continue;
   const normalized=normalizeEntry(v);
   if(normalized)values[id]=normalized;
  }
 }
 return values;
}
function inspectImportRecord(record){
 if(!record||typeof record!=="object"||Array.isArray(record))return {valid:false,error:"The file must contain a JSON object."};
 if(!record.values||typeof record.values!=="object"||Array.isArray(record.values))return {valid:false,error:"The file must contain a values object."};
 const warnings=[];
 if(typeof record.schema_version!=="string"||!record.schema_version.trim())warnings.push("This file has no recognized schema version. Known fields were imported using compatibility defaults.");
 else if(record.schema_version!==schemaVersion)warnings.push("This file uses schema version "+record.schema_version+"; this app supports "+schemaVersion+". Known fields were normalized and unknown field entries were preserved where possible.");
 const task=supportedTasks.includes(record.task)?record.task:null;
 if(!task)warnings.push("The saved output task is missing or unsupported. The current task selection was kept.");
 const entries=Object.entries(record.values);
 const validStatuses=["user_confirmed","project_default","undecided","not_applicable"];
 const skippedEntries=entries.filter(([id,v])=>!["__proto__","constructor","prototype"].includes(id)&&(!v||typeof v!=="object"||Array.isArray(v))).length;
 const coercedValues=entries.filter(([id,v])=>!["__proto__","constructor","prototype"].includes(id)&&v&&typeof v==="object"&&!Array.isArray(v)&&(!Object.prototype.hasOwnProperty.call(v,"value")||typeof v.value!=="string")).length;
 const coercedStatuses=entries.filter(([id,v])=>!["__proto__","constructor","prototype"].includes(id)&&v&&typeof v==="object"&&!Array.isArray(v)&&(!Object.prototype.hasOwnProperty.call(v,"status")||!validStatuses.includes(v.status))).length;
 if(skippedEntries)warnings.push("Skipped "+skippedEntries+" field entr"+(skippedEntries===1?"y":"ies")+" that were not JSON objects; those entries could not be imported.");
 if(coercedValues)warnings.push("Replaced "+coercedValues+" non-string field value"+(coercedValues===1?"":"s")+" with empty strings during normalization (including missing values).");
 if(coercedStatuses)warnings.push("Reset "+coercedStatuses+" unsupported field status"+(coercedStatuses===1?"":"es")+" to Undecided during normalization (including missing statuses).");
 const values=normalizeRecord(record);
 const knownIds=new Set(fields.map(f=>f.id));
 const preservedUnknown=Object.keys(values).filter(id=>!knownIds.has(id));
 if(preservedUnknown.length)warnings.push("Preserved "+preservedUnknown.length+" unrecognized field entr"+(preservedUnknown.length===1?"y":"ies")+" for a future-compatible export.");
 return {valid:true,values,task,schemaVersion:record.schema_version||null,warnings,preservedUnknown};
}
function fieldValue(values,id){
 const entry=values[id]||{value:"",status:"undecided"};
 return {value:String(entry.value??""),status:entry.status||"undecided"};
}
function adultPresentationCheck(values){
 const entry=fieldValue(values,"character.age_presentation");
 const text=entry.value.trim();
 const minorCue=/\b(minor|underage|under\s*[- ]?18|age\s*[:=]?\s*(?:[0-9]|1[0-7])|child|children|childlike|kid|kids|teen|teenage|teenager|juvenile|youthful|schoolgirl|schoolboy|loli|shota|young girl|young boy|1[0-7]\s*[- ]?year[- ]?old)\b/i;
 const adultCue=/\b(adult|18\s*\+|21\s*\+|eighteen|nineteen|twenty|thirty|forty)\b/i;
 const ambiguousCue=/\b(age[- ]ambiguous|ambiguous age|age[- ]unclear|unclear age|unknown age|age unknown|unspecified age|age unspecified)\b/i;
 const negatedAdultCue=/\b(?:not\s+(?:clearly\s+)?adult|non[- ]adult)\b/i;
 const numericAge=/(?:age\s*[:=]?\s*|\b)(1[89]|[2-9]\d)\b/i;
 const issues=[];
 if(!text||entry.status!=="user_confirmed")issues.push("character.age_presentation must be explicitly completed and user-confirmed");
 if(minorCue.test(text))issues.push("age-presentation text contains a prohibited minor/underage cue");
 if(ambiguousCue.test(text))issues.push("age-presentation text explicitly describes age as ambiguous or unclear");
 if(negatedAdultCue.test(text))issues.push("age-presentation text explicitly negates adult presentation");
 if(text&&!adultCue.test(text)&&!numericAge.test(text))issues.push("age-presentation text must explicitly establish an adult (18+) presentation");
 return {valid:issues.length===0,issues};
}
function validate(values,task){
 const errors=[];
 if(task==="canonical"){
  for(const id of requiredIds){
   const v=fieldValue(values,id);
   if(!v.value.trim()||v.status!=="user_confirmed") errors.push(id);
  }
 }
 if(task==="character"||task==="canonical"){
  const adult=adultPresentationCheck(values);
  if(!adult.valid)errors.push("adult_presentation: "+adult.issues.join("; "));
 }
 return {valid:errors.length===0,errors};
}
function included(entry){
 return entry.value.trim()!=="" && (entry.status==="user_confirmed"||entry.status==="project_default");
}
function valueLine(field,entry){
 if(!included(entry)) return "";
 const suffix=entry.status==="project_default"?" [project default — confirm before canonical approval]":"";
 return field.label+": "+entry.value+suffix;
}
function promptFor(values,task,style){
 const lines=[];
 if(task==="logo"){
  lines.push("LOGO EXPLORATION","Create a logo system derived only from owner-confirmed character identity and shared design language.","This is a logo asset, not a character portrait, character sheet, scene, or full-body illustration.");
  lines.push("APPROVED CHARACTER IDENTITY — preserve these confirmed anchors as source material for the mark; do not depict every detail literally:");
  const identityGroups=new Set(["Character overview","Face, hair & ears","Outfit & signature markers"]);
  for(const f of fields.filter(x=>identityGroups.has(x.group))){
   const entry=fieldValue(values,f.id);
   if(entry.status!=="user_confirmed")continue;
   const line=valueLine(f,entry);if(line)lines.push(line);
  }
  lines.push("APPROVED PALETTE — use only explicitly user-confirmed palette decisions; preserve the stated hierarchy and proportions:");
  for(const f of fields.filter(x=>x.group==="Palette")){
   const entry=fieldValue(values,f.id);
   if(entry.status!=="user_confirmed")continue;
   const line=valueLine(f,entry);if(line)lines.push(line);
  }
  lines.push("CANONICAL REFERENCE — use the attached canonical identity image as the authority for visual identity when supplied. Reference IDs and filenames are labels only; attach the actual image separately.");
  for(const id of ["reference.canonical_identity_id","reference.extra_notes"]){
   const entry=fieldValue(values,id);
   if(entry.status==="user_confirmed"){const f=fields.find(x=>x.id===id);const line=valueLine(f,entry);if(line)lines.push(line);}
  }
  for(const f of fields.filter(x=>x.group==="Logo only")){const line=valueLine(f,fieldValue(values,f.id));if(line)lines.push(line);}
  lines.push("Translate identity into a simplified, recognizable motif, silhouette, negative-space system, and restrained palette. Do not turn the character into a portrait or reproduce the entire outfit.");
  lines.push("Do not invent unconfirmed hair, eyes, face, ears, outfit, accessories, markings, colors, or typography. Unconfirmed identity details are not logo requirements.");
  lines.push("Prioritize a distinctive scalable silhouette, deliberate negative space, monochrome legibility, and exact wordmark spelling. Explore symbol-only, wordmark-only, and combined lockup separately when requested.");
 }else{
  lines.push(task==="canonical"?"CANONICAL CHARACTER REFERENCE SHEET":"CHARACTER IMAGE — "+style.toUpperCase());
  for(const id of ["project.name","project.version","project.platform","project.audience","project.deliverable_notes"]){
   const entry=fieldValue(values,id);
   if(included(entry)){const f=fields.find(x=>x.id===id);const line=valueLine(f,entry);if(line)lines.push(line);}
  }
  lines.push("AGE-PRESENTATION SAFEGUARD: depict the character as clearly adult. Preserve adult facial and body presentation in every rendering style. Chibi proportions are a visual simplification only and must not imply a minor, child, or teenager. Do not use schoolchild cues, childlike framing, or age-ambiguous presentation.");
  lines.push("If the age-presentation field is missing, undecided, ambiguous, or contains a minor/underage cue, treat the prompt as blocked and resolve that field before image generation.");
  const profileGroup=style==="anime"?"Anime rendering profile":style==="3d"?"3D rendering profile":style==="chibi"?"Chibi rendering profile":null;
  for(const f of fields){
   if(f.group==="Logo only"||f.group==="Legacy shared style — not applied to independent profiles") continue;
   if(f.group==="Anime rendering profile"||f.group==="3D rendering profile"||f.group==="Chibi rendering profile"){
    if(task==="canonical"||f.group!==profileGroup)continue;
   }
   if(f.id==="style.target"){
    if(task!=="canonical")continue;
    const target=fieldValue(values,f.id);
    if(included(target))lines.push(valueLine(f,target));
    continue;
   }
   if(f.group==="Scene & composition"&&task==="canonical") continue;
   if(f.group==="References"&&f.id==="reference.style_id"&&task!=="canonical")continue;
   const entry=fieldValue(values,f.id),line=valueLine(f,entry);
   if(line)lines.push(line);
  }
  if(task!=="canonical"){
   lines.push("RENDERING PROFILE: apply only the "+String(style).toUpperCase()+" profile fields below. Do not borrow linework, shading, materials, proportions, detail settings, or style references from another profile.");
   lines.push("STYLE REFERENCE: use only the reference assigned to this rendering profile for rendering language. Attach the actual image separately; its ID or filename is a label only.");
  }
  lines.push("IDENTITY LOCK: preserve owner-confirmed character attributes exactly. Change rendering style, not character identity.");
  lines.push("REFERENCE ROLES: canonical identity reference controls identity; the selected style-profile reference controls rendering language only; composition reference controls framing only. Attach actual reference images to the image-generation request; IDs or filenames alone do not supply image content.");
  lines.push("UNDECIDED FIELDS: do not invent missing character traits or silently promote suggestions into fixed identity facts.");
  lines.push("Do not introduce unrequested characters, text, logos, props, credentials, or claims.");
 }
 return lines.join("\n");
}
function buildPrompts(values,task,styles){
 if(task==="logo") return [{style:"logo",prompt:promptFor(values,"logo","")}];
 if(task==="canonical") return [{style:"canonical",prompt:promptFor(values,"canonical","")}];
 return (styles&&styles.length?styles:styleOptions).map(style=>({style,prompt:promptFor(values,"character",style)}));
}
function exportRecord(values,task){
 const revision=fieldValue(values,"project.version").value.trim()||null;
 return {
  schema_version:schemaVersion,
  project:"EPAL-ALT-BUNNY-001",
  task,
  generation:{
   prompt_engine_version:promptEngineVersion,
   exported_at:new Date().toISOString(),
   project_revision:revision
  },
  values
 };
}
const api={fields,requiredIds,styleOptions,supportedTasks,schemaVersion,promptEngineVersion,wizardSteps,initialValues,normalizeRecord,inspectImportRecord,adultPresentationCheck,validate,buildPrompts,exportRecord};
if(typeof module!=="undefined"&&module.exports) module.exports=api;
root.EpalBuilder=api;
})(typeof globalThis!=="undefined"?globalThis:this);
