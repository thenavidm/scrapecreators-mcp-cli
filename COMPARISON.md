# ScrapeCreators comparisons

| Offering | Surface | Capabilities and tradeoff |
| --- | --- | --- |
| [Official ScrapeCreators CLI](https://github.com/ScrapeCreators/scrapecreators-cli) | @scrapecreators/cli 1.0.44; scrapecreators | 188 registry endpoint variants, JSON/CSV/table/Markdown, clean output, file output, interactive key setup, signup and agent-config helpers |
| [Official hosted MCP](https://docs.scrapecreators.com/integrations/mcp/) | https://api.scrapecreators.com/mcp | Provider-hosted public research with OAuth or x-api-key authentication; client approvals and provider maintenance apply |
| [Official research skills](https://github.com/ScrapeCreators/social-media-research-skills) | Agent workflows | Provider-authored research guidance; compare the relevant workflow before installing another wrapper |
| This owned package | Local stdio MCP, shared CLI, .mcpb | Mandatory approval for potentially paid research, private named accounts and prevalidated sequential batches capped at 20, stopping on first failure |
| [Pipeworx MCP](https://github.com/pipeworx-io/mcp-scrapecreators) | Local stdio or hosted gateway | Its README documents four focused social/ad tools and gateway routing; hosted and standalone tool sets differ |
| [Printing Press integration](https://github.com/mvanhorn/printing-press-library/tree/main/library/developer-tools/scrape-creators) | Go CLI/MCP and local workflows | Its source documents transcript research and local workflow/configuration; no authenticated performance comparison was performed |

Checked October 2, 2026. The installed official 1.0.44 binary and source were reviewed. Its registry has the same 188 endpoint variants represented by the current OpenAPI snapshot. Headline platform/endpoint numbers in introductory docs are older; our two local helpers are not extra provider API coverage. Official CSV/table/Markdown, --clean, --output and signup are useful advantages and are not claimed here.

A network-free fixture against the official CLI's real handler submits its 26-credit audience endpoint without a confirmation flag in noninteractive mode. Its extra-credit warning is TTY-only. Our equivalent schema refuses before fetch until confirm=true, and a disabled/read-only policy still refuses confirmed calls. This is evidence about that CLI version, not a claim that official hosted MCP clients lack approval controls.

The official agent-config source writes Codex setup to ~/.codex/mcp.json; our instructions use the verified Codex config.toml/stdio registration. The official balance helper references /v1/credit-balance, while the reviewed current schema uses /v1/account/credit-balance. Compatibility of the older balance route was not tested with an account; no unsupported broken-route claim is made.

Named credential isolation and bounded batch validation give this owned implementation a useful case. Neither 190 versus 188 tool names nor SEO demonstrates greater coverage, task quality or token efficiency. Official hosted setup may be easier for remote-only clients. Community README capabilities above were inspected, not authenticated or benchmarked. No overall winner is declared.


MCP and CLI use the same schemas, validation and HTTP handlers: [Slipway](https://github.com/thenavidm/slipway) builds the MCP server, over stdio or `--http`, and the CLI from each tool's one definition; there is no second API implementation.

README section 7 has this package's measured Claude Code and Codex costs against 2.0.1. No other offering was measured, so no comparison with one is claimed.
