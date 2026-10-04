# Changelog

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
