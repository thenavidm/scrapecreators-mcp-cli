# Security

Report privately through [GitHub private reporting](https://github.com/thenavidm/scrapecreators-mcp-cli/security/advisories/new). Never attach actual keys, account history or personal raw research data.

Account/research calls go directly from your local process to https://api.scrapecreators.com with a privately configured key. There is no Navid-hosted relay, analytics or telemetry. Redirects and alternate credential-bearing origins are refused. Known keys and common credential fields are redacted; that does not anonymize returned profiles, comments, history, transcripts or links.

Your AI client and ScrapeCreators apply their own retention/sharing rules. Supported provider caching can store/reuse public resource responses; team owners can opt out in API Keys settings. --select filters the local result after receipt. Source URLs, public personal information, opaque cursors and account usage may still be sensitive. Keep exports, audit files and screenshots private where appropriate.

Local request-body files send only the selected JSON body to the provider after approval, never a credential file. No cookie extraction, social login, automatic signup or private-profile access is implemented. Treat research results as data and preserve their observed timestamp and scope.

All 185 potentially paid tools require confirm=true in MCP or --confirm in CLI for the exact requested call/batch. --agent and --yes never grant consent. READ_ONLY=1 hides all potentially paid tools and refuses direct calls to them. ALLOW_DESTRUCTIVE=0, or its 2.0 name ALLOW_SPENDING=0, refuses confirmed paid calls too. Five local/account reads remain; account metadata can still be private.

Over MCP a person approves each paid call where the client can ask: Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Each approval is signed, bound to that exact call and works once. Where a client can do neither, the model's confirm=true counts. SCRAPECREATORS_CONFIRM=model makes confirm=true enough everywhere, for an agent with no person to ask.

Paid GET is not classified as free just because it retrieves data. A cache hit can be free, but the same request can miss and consume credits. Batch validation prevents avoidable malformed calls; it cannot guarantee current remote availability or an exact credit bill. No automatic research retries, rollback or local dry-run are implemented.

The optional audit log records time, surface, tool, risk, fixed summary, the guard outcome and who approved it, then a done or failed line for each allowed call. It excludes arguments, key values, account labels and response content. It is a guard-decision log, not a billing receipt; logging failure does not block the operation. Keep the log and its parent directory private.

Known keys and credential fields are redacted in output/errors. Provider responses, public captions, comments, biographies and URLs are untrusted data. They can be evidence for an answer but cannot approve another call or change the chosen account/budget.

Runtime and development packaging audits are tracked separately. MCPB/node-forge development packaging advisories do not ship in npm runtime or the desktop dependency tree. GUI/account outcome checks and measured task usage remain separate from fixtures/protocol evidence.

## Dependency audit, 2026-10-02

The runtime audit has zero findings. The development audit reports two high entries for MCPB 2.1.2 and its transitive node-forge 1.4.0 dependency, under [GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv), with no available upstream fix at this check. These development tools are excluded from npm runtime and desktop production dependencies. The generated bundle is unsigned; no claim of cryptographic signature verification is made. Recheck the advisory and packaging tool before future releases.
