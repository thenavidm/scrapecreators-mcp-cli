// Regenerate only from the checked sanitized snapshot unless --refresh is explicit.
import fs from 'node:fs';import crypto from 'node:crypto';
const source='https://docs.scrapecreators.com/openapi.json';
const snapshot=new URL('./scrapecreators-api.snapshot.json',import.meta.url);
const proofFile=new URL('../src/tools/api-source.json',import.meta.url);
const previous=JSON.parse(fs.readFileSync(proofFile,'utf8'));
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
let api,originalSha256=previous.originalSha256;
const refresh=process.argv.includes('--refresh');
if(refresh){const response=await fetch(source,{redirect:'error',signal:AbortSignal.timeout(30000)});if(!response.ok)throw new Error('Schema fetch HTTP '+response.status);const raw=await response.text();if(Buffer.byteLength(raw)>20*1024*1024)throw new Error('Schema size exceeds reviewed limit');originalSha256=hash(raw);api=JSON.parse(raw);}
else{const raw=fs.readFileSync(snapshot,'utf8');if(hash(raw)!==previous.sanitizedSha256)throw new Error('Snapshot hash mismatch');api=JSON.parse(raw);}
if(api.openapi!=='3.1.0'||!api.info?.version||!api.paths)throw new Error('Review a changed schema format before generation');
function strip(v){if(Array.isArray(v))return v.map(strip);if(v&&typeof v==='object')return Object.fromEntries(Object.entries(v).filter(([k])=>!['example','examples'].includes(k)).map(([k,x])=>[k,strip(x)]));return v;}api=strip(api);
const replacements={tik_tok:'tiktok',you_tube:'youtube',git_hub:'github',linked_in:'linkedin',sound_cloud:'soundcloud',scrape_creators:'scrapecreators'};
const snake=s=>s.replace(/([a-z0-9])([A-Z])/g,'$1_$2').toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');
function names(s){for(const[a,b]of Object.entries(replacements))s=s.replaceAll(a,b);return s.replace('user_s_audience_demographics','audience_demographics').replace('person_s_profile','person_profile');}
const operations=[],used=new Set();
for(const[path,item]of Object.entries(api.paths))for(const[method,o]of Object.entries(item)){
 if(!['get','post','put','patch','delete'].includes(method))continue;
 if(!['get','post'].includes(method))throw new Error('Review new mutating method before classifying: '+method+' '+path);
 const rawGroup=snake(o.tags?.[0]??'other');let name=snake(rawGroup+' '+(o.summary??method+' '+path));name=name.slice(0,59)+(method==='post'?'_post':'');if(used.has(name))name+='_'+operations.length;used.add(name);name=names(name);
 const body=o.requestBody?.content?.['application/json']?.schema??{type:'object',properties:{}};
 if(body.properties)body.additionalProperties=false;
 const params=[...(item.parameters??[]),...(o.parameters??[])].filter(p=>['path','query'].includes(p.in)).map(p=>({...p,key:p.name,schema:{...p.schema,description:p.description??''}}));
 const risk=path.startsWith('/v1/account/')?'read':'spend';
 operations.push({name,title:o.summary??name,description:(o.description??'').trim()+'\n'+(risk==='read'?'Account metadata read.':'Potentially consumes paid API credits; requires confirm=true. Read-like POST requests do not publish to social platforms.'),method:method.toUpperCase(),path,group:names(rawGroup),risk,params,bodySchema:body,bodyRequired:!!o.requestBody?.required,paginated:false,origin:'api',contentType:'application/json'});
}
if(new Set(operations.map(o=>o.name)).size!==operations.length||operations.some(o=>o.name.length>64))throw new Error('Review changed generated names');
const raw=JSON.stringify(api,null,2)+'\n';
if(/"\$ref"\s*:/.test(JSON.stringify(operations)))throw new Error('Resolve new schema references before generation');
fs.writeFileSync(snapshot,raw);fs.writeFileSync(new URL('../src/tools/operations.json',import.meta.url),JSON.stringify(operations,null,2)+'\n');
fs.writeFileSync(proofFile,JSON.stringify({...previous,checked:refresh?new Date().toISOString().slice(0,10):previous.checked,apiVersion:api.info.version,operationCount:operations.length,originalSha256,sanitizedSha256:hash(raw)},null,2)+'\n');
console.log(JSON.stringify({operationCount:operations.length,tools:operations.length+2,reads:operations.filter(o=>o.risk==='read').length+1,source,refresh}));
