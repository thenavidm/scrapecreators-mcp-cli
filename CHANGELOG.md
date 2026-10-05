# Changelog

## 3.0.0, 2026-10-05

Built on [Slipway](https://github.com/thenavidm/slipway) 0.1.20. The 190 tools keep their names and arguments, and every difference below was measured against 2.0.1, the last version on npm, before release.

- **A person approves each paid operation over MCP.** All 185 still need confirmation. Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Approvals are signed, bound to the exact call and work once. Where a client can do neither, the model's `confirm: true` still counts, and `SCRAPECREATORS_CONFIRM=model` makes it enough everywhere. The refusal and the approval form both say what 2.0 said, that the call , and the audit log records who approved each one.
- **`SCRAPECREATORS_ALLOW_DESTRUCTIVE=0` refuses all 185 paid calls**, confirmed or not, and `SCRAPECREATORS_READ_ONLY=1` still leaves only the 5 reads. `SCRAPECREATORS_ALLOW_SPENDING=0`, 2.0's name for it, still works when the new one is unset.
- **ScrapeCreators' status picks the exit code.** A request ScrapeCreators rejects (400 or 422) exits 2 instead of 5, and a removed resource (410) 3 instead of 5. 401 and 403 still exit 4, 404 3, 429 7, a server error 5, and an unknown profile or nothing configured 10. 1 now means an unexpected error.
- **`which <words>` finds a command**, and `agent-context` describes every command, flag and setting as JSON. In Codex 0.159.3, finding the command that gets a TikTok video's transcript and its flags took a median of 83,060 input tokens over the CLI instead of 86,664 (five runs each): every 2.0.1 run read the general help, the 13,019-character command list and the command's help. Four 3.0.0 runs asked `which` instead, a 478-character answer, and read the help next; the fifth asked `which tiktok transcript`, whose answer carries the help, and stopped there (61,994).
- **`install <client>`** adds the server to Claude Code, Codex, Claude Desktop, Cursor, VS Code or Gemini CLI in each one's own format, and **`scrapecreators-mcp --http`** serves the same tools over Streamable HTTP, on 127.0.0.1:8787 unless told otherwise.
- **The tool list marks the 185 paid tools that need approval.** Each carries `anthropic/requiresUserInteraction`, which Claude Code reads and does not pass to the model, so the list a client receives is 68,331 o200k tokens instead of 65,982. With every tool loaded, Claude Code 2.1.286 spends 88,384 tokens a message on the list instead of 89,024.
- **Less work to start.** Each input and body schema now compiles on its first use rather than at load, and the entry turns on Node's compile cache. The server spends 207 ms of CPU before its first answer where 2.0.1 spent 397, and answers in 145 ms of wall time instead of 232 (median of 21 runs, taking turns on one Mac). npx installs 10 dependencies instead of 94. A test still compiles every schema.
- **`doctor --network` reads the credit balance, which spends nothing**, as 2.0's did.
- **Docs.** README section 7 has the measured Claude Code and Codex costs, where 2.0 said they were pending.

### Upgrading

Over MCP, expect an approval prompt or form before any paid operation; a headless agent that should run them with `confirm: true` alone needs `SCRAPECREATORS_CONFIRM=model`. A script that read exit 5 as a rejected request should read 2, and as a removed resource 3. An error is now one JSON object with `error`, Slipway's `code` (`usage`, `refused`, `auth`, `not_found`, `rate_limited`, `api`, `not_configured`) and a `hint`, plus ScrapeCreators' `status` when it answered; 2.0.1 printed the tool's JSON inside the `error` string. Over MCP, an argument that fails the schema comes back as the MCP SDK's own message, "Input validation error: …", instead of JSON. With `SCRAPECREATORS_READ_ONLY=1`, a client that calls a hidden tool gets "tool not found" instead of a refusal naming `SCRAPECREATORS_READ_ONLY`, and that call is not in the audit log; the CLI still names the setting. The audit log's lines gain `confirmed_by`, and each allowed call is followed by a `done` or `failed` line. A script that pipes JSON-RPC into the server must keep stdin open until it reads the answer: the server now stops when its input ends, as the MCP stdio binding asks. `--http` refuses a page from another site unless `SCRAPECREATORS_HTTP_ALLOWED_ORIGINS` lists it. Some terminal screens grew: the general help by 41 tokens, for `which`, `install`, what each setting is for and the exit codes; the command list by 26; and a missing argument's error by 18, for its code and a hint. `SKILL.md` is 66 tokens longer in Claude Code, because it says how approval works over MCP, and that exit 1 is an unexpected error and 2 also an unknown command or a hidden write.

## 2.0.1, 2026-10-04

- **`npx -y @thenavidm/scrapecreators-mcp-cli` starts the MCP server whatever order npm keeps.** npx starts whichever binary the npm registry lists first when they share one file, and the registry does not keep the published order. For this package that happened to be the server; for 23 others it was the CLI. A third binary named after the package, on its own file, now always starts the server, and npx picks it by name.

Use the native terminal capture at 1040 source pixels with lossless GIF optimization, displayed at 520 pixels, matching the Bluesky/Substack reference. Original assets remain available.

## 2.0.0 - 2026-10-02

- Refresh the reviewed current OpenAPI baseline: 188 endpoint variants across 37 groups, plus local accounts and bounded research_batch, 190 shared tools/CLI commands.
- Require explicit confirmation for all 185 potentially paid calls; preserve five local/account reads and enforce read-only/disabled-spending direct-call refusal.
- Add named private credentials, fixed x-api-key origin, redirect/traversal refusal, bounded body/response sizes and no paid research retries.
- Prevalidate every batch/body before calls, cap 20 explicit requests, execute sequentially and stop on first failure retaining earlier outcomes.
- Preserve native v1/v2/v3 routes and body/cursor names, including current YouTube language/original_audio and provider caching.
- Add the established full client/OS, argument, workflow, comparison, privacy and accordion FAQ docs, desktop packaging, schema regeneration and release checks.
- Preserve AGPL-3.0-or-later and private legacy history. No credentials or invented task/token measurements are published.

### Breaking migration from grouped actions

The legacy MCP-only source offered 12 grouped tools containing 107 action routes. Replace grouped platform/action calls with the specific current underscore tool or its dashed CLI command. Discover tools/help/schema rather than translating a generic argument bag blindly. Every research request now requires per-call confirmation, regardless of HTTP method. SCRAPECREATORS_API_KEY remains supported; no social-platform login is required.

Old Bluesky route declarations lacked the current v1 prefix. Some old TikTok popular-content and Reddit-ad declarations are absent from the reviewed current schema; this release does not advertise those unverified paths. Their absence is not an authenticated 404 claim. Account balance uses the currently documented /v1/account/credit-balance path.

| Component | Version / baseline | Meaning |
| --- | --- | --- |
| This package and desktop manifest | 2.0.0 | Shared release version |
| Node | 22+ | Manual CLI/MCP runtime |
| MCP TypeScript SDK | 1.32.0 | Shared protocol bridge |
| API snapshot | 2026-10-02; info 1.0.0, OpenAPI 3.1.0 | 188 reviewed operations; native route versions preserved |
| Official CLI baseline | 1.0.44 | Reviewed current npm binary/source |
| Legacy source baseline | 1.0.0 | 12 grouped MCP tools, 107 action routes; not a prior public npm claim |

See CHANGELOG.md for the breaking grouped-action migration, source hashes and release history. Full shared API discovery plus local helpers gives 190 tools, five reads and 185 confirmation-gated calls. A tag/release/version is not live-account validation. Fresh Codex task/token evidence and desktop GUI acceptance remain separately pending.

## 1.0.0 - legacy source

12 grouped MCP tools and 107 action declarations. This records source history, not a verified previous public npm release.
