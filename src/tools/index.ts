import operationsData from "./operations.json" with { type: "json" };
import { type ValidateFunction } from "ajv";
import { Ajv2020 } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { readFile, lstat } from "node:fs/promises";
import type { Json, ScrapeCreatorsClient, QueryParam } from "../api/client.js";
import { UsageError } from "../api/errors.js";
import type { Config } from "../config.js";
import type { Risk } from "../safety.js";
export type Operation = {
  name: string;
  title: string;
  description: string;
  method: string;
  path: string;
  group: string;
  risk: Risk;
  params: {
    name: string;
    key: string;
    in: string;
    required?: boolean;
    schema: Json;
    style?: string;
    explode?: boolean;
  }[];
  bodySchema: Json;
  bodyRequired: boolean;
  paginated: boolean;
  origin: "api";
  contentType: string;
};
export type ToolSpec = {
  name: string;
  title: string;
  description: string;
  group: string;
  inputSchema: Json;
  risk: Risk;
  handler: (args: Json, client: ScrapeCreatorsClient) => Promise<unknown>;
};
const operations = operationsData as unknown as Operation[];
const ajv = new Ajv2020({ allErrors: true, strict: false });
(addFormats as unknown as (a: typeof ajv) => void)(ajv);
function check(validate: ValidateFunction, args: unknown): void {
  if (!validate(args))
    throw new UsageError(ajv.errorsText(validate.errors, { separator: "; " }));
}
function fieldsFor(op: Operation): Json {
  const properties: Json = Object.fromEntries(
    op.params.map((p) => [p.key, p.schema]),
  );
  Object.assign(properties, op.bodySchema.properties ?? {});
  properties.account = {
    type: "string",
    description:
      "Named private ScrapeCreators account; selects credentials, not a remote account ID.",
  };
  if (op.risk !== "read")
    properties.confirm = {
      type: "boolean",
      description: "Must be true for the specific approved credit-consuming research call.",
    };
  if (Object.keys(op.bodySchema.properties ?? {}).length) {
    properties.payload = {
      ...op.bodySchema,
      description:
        "Complete JSON request body instead of body flags. Preserves current endpoint fields and values.",
    };
    properties.payload_file = {
      type: "string",
      minLength: 1,
      description:
        "Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload.",
    };
  }
  return {
    type: "object",
    properties,
    required: [...op.params.filter((p) => p.required).map((p) => p.key)],
    additionalProperties: false,
  };
}
const bodyValidators = new Map(
  operations.map((op) => [op.name, ajv.compile(op.bodySchema)]),
);
async function execute(
  op: Operation,
  args: Json,
  client: ScrapeCreatorsClient,
): Promise<unknown> {
  if (op.name === "tiktok_profile" && !args.handle && !args.user_id)
    throw new UsageError("Provide handle or user_id for a TikTok profile.");
  const flat = Object.fromEntries(
    Object.keys(op.bodySchema.properties ?? {})
      .filter((k) => args[k] !== undefined)
      .map((k) => [k, args[k]]),
  );
  if (
    (args.payload !== undefined || args.payload_file !== undefined) &&
    Object.keys(flat).length
  )
    throw new UsageError(
      "Use individual body flags or payload/payload_file without mixing them.",
    );
  if (args.payload !== undefined && args.payload_file !== undefined)
    throw new UsageError("Use payload or payload_file, not both.");
  if (op.bodyRequired && !Object.keys(flat).length && args.payload === undefined && args.payload_file === undefined) {
    throw new UsageError('This operation requires a JSON body; inspect schema and provide body flags or payload/payload_file.');
  }
  let body: Json = args.payload ?? flat;
  if (args.payload_file)
    try {
      const stat = await lstat(args.payload_file);
      if (!stat.isFile() || stat.size > 5 * 1024 * 1024) throw new Error();
      body = JSON.parse(await readFile(args.payload_file, "utf8"));
    } catch {
      throw new UsageError(
        "payload_file must be a regular JSON body file, at most 5 MB.",
      );
    }
  check(bodyValidators.get(op.name)!, body);
  if (op.name === "facebook_ad_library_company_ads" && !args.pageId && !args.companyName)
    throw new UsageError("Provide pageId or companyName for company ads.");
  if (op.name === "facebook_ad_library_company_ads_post" && !body.pageId && !body.companyName)
    throw new UsageError("Provide pageId or companyName in the company ads body.");
  if (
    ["PUT", "PATCH"].includes(op.method) &&
    Object.keys(op.bodySchema.properties ?? {}).length &&
    !Object.keys(body).length
  )
    throw new UsageError("Provide at least one field to update.");
  const path = op.params
    .filter((p) => p.in === "path")
    .reduce(
      (path, p) =>
        path.replace(`{${p.name}}`, encodeURIComponent(String(args[p.key]))),
      op.path,
    );
  const query: QueryParam[] = op.params
    .filter((p) => p.in === "query" && args[p.key] !== undefined)
    .map((p) => ({
      name: p.name,
      value: args[p.key],
      style: p.style,
      explode: p.explode,
    }));
  return client.sanitize(await client.request(op.method,path,query,op.bodyRequired || Object.keys(body).length ? body : undefined,args.account));
}

export const ALL_TOOLS: ToolSpec[] = operations.map((op) => ({
  name: op.name,
  title: op.title,
  description: op.description,
  group: op.group,
  inputSchema: fieldsFor(op),
  risk: op.risk,
  handler: (args, client) => execute(op, args, client),
}));
ALL_TOOLS.push({
  name: "list_accounts",
  title: "List configured accounts",
  description:
    "List private account labels, default selection and configured token method. No credentials, token paths or account content; no network request.",
  group: "accounts",
  risk: "read",
  inputSchema: { type: "object", properties: {}, additionalProperties: false },
  handler: async (_args, client) => ({
    accounts: client.config.accounts.map((a) => ({
      name: a.name,
      default: a.name === client.config.defaultAccount,
      auth: a.tokenFile
        ? "token_file"
        : a.apiToken
          ? "api_key"
          : "not_configured",
    })),
  }),
});
ALL_TOOLS.push({
  name: "research_batch", title: "Run an approved bounded research batch", group: "workflows", risk: "spend",
  description: "Run up to 20 explicitly supplied research calls sequentially in one selected private account. Validates the whole batch before any network call, refuses account overrides/recursion and stops on the first failure. max_calls is a request bound, never a credit or billing guarantee. No automatic retry; completed outcomes are retained. Requires confirm=true for this exact batch.",
  inputSchema: {type:"object",properties:{requests:{type:"array",minItems:1,maxItems:20,items:{type:"object",properties:{tool:{type:"string",enum:operations.filter(o=>o.risk==="spend").map(o=>o.name)},arguments:{type:"object"}},required:["tool","arguments"],additionalProperties:false}},max_calls:{type:"integer",minimum:1,maximum:20},account:{type:"string"},confirm:{type:"boolean"}},required:["requests","max_calls"],additionalProperties:false},
  handler: async(args,client)=>{
    if(args.requests.length>args.max_calls)throw new UsageError("Batch exceeds max_calls; no requests were sent.");
    const prepared=await Promise.all(args.requests.map(async(r:{tool:string;arguments:Json})=>{
      const tool=ALL_TOOLS.find(t=>t.name===r.tool && t.name!=="research_batch" && t.risk==="spend");
      if(!tool)throw new UsageError("Unknown or disallowed batch tool.");
      if(r.arguments.account!==undefined || r.arguments.confirm!==undefined)throw new UsageError("Only the enclosing batch selects its account and confirmation.");
      const values:Json=structuredClone({...r.arguments,account:args.account,confirm:true});
      if (values.payload_file !== undefined) {
        if (values.payload !== undefined) throw new UsageError("Use payload or payload_file, not both.");
        const stat=await lstat(values.payload_file).catch(()=>null);
        if (!stat?.isFile() || stat.size>5*1024*1024) throw new UsageError("Batch payload_file must be regular, not a symlink, at most 5 MB.");
        try {values.payload=JSON.parse(await readFile(values.payload_file,"utf8"));}catch{throw new UsageError("Batch payload_file must contain JSON.");}
        delete values.payload_file;
      }
      validateArguments(tool,values);
      // Validate JSON body requirements and files before sending any paid request.
      return {tool,values};
    }));
    const preflightClient={config:client.config,sanitize:(x:unknown)=>x,request:async()=>({}),redactText:(x:string)=>x} as unknown as ScrapeCreatorsClient;
    for(const p of prepared)await p.tool.handler(p.values,preflightClient);
    const outcomes:Json[]=[];
    for(const [index,p]of prepared.entries()){
      try{outcomes.push({index,tool:p.tool.name,ok:true,result:await p.tool.handler(p.values,client)});}
      catch(error){outcomes.push({index,tool:p.tool.name,ok:false,error:client.redactText((error as Error).message),provider_outcome_unknown:true});return {completed:outcomes.filter(o=>o.ok).length,attempted:outcomes.length,stopped:true,remaining:prepared.length-outcomes.length,outcomes};}
    }
    return {completed:outcomes.length,attempted:outcomes.length,stopped:false,remaining:0,outcomes};
  },
});
const validators = new Map(
  ALL_TOOLS.map((t) => [t.name, ajv.compile(t.inputSchema)]),
);
export function validateArguments(tool: ToolSpec, args: Json): void {
  check(validators.get(tool.name)!, args);
}
export function visibleTools(config: Config): ToolSpec[] {
  return ALL_TOOLS.filter((t) => !config.readOnly || t.risk === "read");
}
