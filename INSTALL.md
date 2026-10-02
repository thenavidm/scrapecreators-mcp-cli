# Install ScrapeCreators MCP Server & CLI

One npm package includes both binaries and all **190 tools**. Requires Node.js 22 or newer for CLI/manual MCP installs. Discovery works before account authentication. Account operations need eligible ScrapeCreators API access; Public-data availability and provider credit terms apply.

| Route | Program | Use |
| --- | --- | --- |
| Terminal | scrapecreators-cli | Scripts and agents with a shell |
| Local MCP | scrapecreators-mcp | AI clients supporting stdio |
| Desktop archive | scrapecreators-2.0.0.mcpb | Compatible Claude Desktop custom extensions |
| ScrapeCreators-hosted alternative | https://api.scrapecreators.com/mcp/api | Official remote OAuth, owner/manager access |

## Contents

[Requirements](#requirements) · [CLI](#cli) · [Private account setup](#private-account-setup) · [Claude Code](#claude-code) · [Codex](#codex) · [Claude Desktop](#claude-desktop) · [Cursor](#cursor) · [VS Code and Copilot](#vs-code-and-copilot) · [Windsurf](#windsurf) · [Zed](#zed) · [Gemini CLI](#gemini-cli) · [Docker](#docker) · [Verify](#verify) · [Multiple accounts](#multiple-accounts) · [Updates and removal](#updates-and-removal) · [Troubleshooting](#troubleshooting) · [Development](#development)

## Requirements

Install Node from [nodejs.org](https://nodejs.org/en/download). Open a new terminal and check `node --version` and `npm --version`. The desktop host needs a compatible Node runtime; dependencies are bundled. A GUI app may not inherit your terminal's environment. Check your account's current API access and balance with ScrapeCreators instead of assuming npm installation provides it.

## CLI

On macOS/Linux, use Terminal. On Windows, use PowerShell or Command Prompt:

```bash
npm install -g @thenavidm/scrapecreators-mcp-cli@latest
scrapecreators-cli --version
scrapecreators-cli
scrapecreators-cli scrapecreators-get-credit-balance --help
scrapecreators-cli schema research-batch
scrapecreators-cli login
```

If PowerShell blocks npm.ps1, use npm.cmd or Command Prompt according to your policy. If a binary is missing, check `npm prefix -g`, ensure its executable directory is on PATH and open a new terminal. Avoid sudo as a workaround for PATH problems.

For one command without a global install:

```bash
npx -y --package @thenavidm/scrapecreators-mcp-cli@latest scrapecreators-cli tools
```

Make [SKILL.md](./SKILL.md) available in your agent's supported skill location. The installed file is `<npm root -g>/@thenavidm/scrapecreators-mcp-cli/SKILL.md`. npm does not automatically register client skills. Your agent should read the actual schema and use --agent/--select for compact output.

## Private account setup

### Private API key

1. Sign in to the intended account at [app.scrapecreators.com](https://app.scrapecreators.com) and open its API Keys area.
2. Retrieve or create the key for the intended account/team. API access uses your ScrapeCreators key, not social-platform passwords, cookies or a GitHub CLI token.
3. Save the key in a private token-only file outside repositories, then set `SCRAPECREATORS_TOKEN_FILE` to its absolute path. `SCRAPECREATORS_API_KEY` in private local client/shell settings is the alternative.
4. Run `scrapecreators-cli doctor`, then `scrapecreators-cli doctor --network`. Network doctor reads current account credit metadata and prints no account details.
5. Check the required endpoint, available balance and approved task before any potentially paid research call.

Requests use `x-api-key`, with the fixed origin https://api.scrapecreators.com. Routes retain their current v1/v2/v3 prefixes. There is no invented dated-version header. `login` prints instructions; it does not sign up, save credentials or complete OAuth. The official hosted MCP supports its own OAuth/API-key flow, and the official CLI provides interactive key setup and GitHub device signup. Those are separate products, not hidden features of this wrapper.

On macOS/Linux, use an owner-only key file (0600) in a private directory (0700). On Windows, restrict its ACL to your user. Files must be regular, not symlinks, and no larger than 64 KB. A file overrides the environment key and is cached until restart. GUI client settings and terminal environments are separate. Never place actual credentials in chat, command arguments, project config, issues or examples. This package does not automatically load .env files or use an OS keychain.

### Access, pricing and quotas

A ScrapeCreators account with API access and enough credits is required; installing this free AGPL wrapper does not purchase data. The [provider pricing page](https://scrapecreators.com/#pricing), checked October 2, 2026, lists 100 starting credits, $47 for 25,000 credits and $497 for 500,000 credits, with no mandatory subscription and nonexpiring purchased credits. Bonus/device-signup allowances have different conditions; check your actual dashboard. No universal social-platform admin role or OAuth scope list is imposed by this API-key wrapper.

Most live research requests cost one credit, but current endpoint exceptions include TikTok audience demographics (26) and Find Social Profiles (10). A supported cache hit costs zero; a miss can use the normal endpoint charge. Do not treat max_calls as a credit or money limit. Check response credits_charged, cached and cached_at where supplied, and the account request history. Provider pricing can change.

The provider advertises no account-level rate/concurrency cap. Local pacing defaults to 150 ms between calls per account/process as a reliability choice, not a provider quota rule or reservation. Sequential batches cap at 20 explicit calls. Research GET and POST requests never retry automatically; a lost response can still have consumed credits. Only account-metadata GET 429 responses can retry, at most two by default, for Retry-After waits of ten seconds or less. Longer waits return exit 7. No failed-call billing guarantee is invented.

### Provider caching and public-data limits

Only endpoints whose schema includes cache_max_age accept that option here: 1d, 3d, 7d, 14d or 30d. A cache hit is older data, so retain its timestamp. Team owners can disable provider caching on the API Keys page; then the option does not guarantee a hit or zero credits. See the [cache documentation](https://docs.scrapecreators.com/caching/).

This is public-data research, not social-platform publishing or a bypass for private profiles. Availability, geographic results, transcript tracks, cursor validity and upstream platform changes affect results. Account metadata/history can reveal private usage. Choose only the requested public resources and keep returned personal or business data out of public logs.


```bash
export SCRAPECREATORS_TOKEN_FILE='/absolute/private/scrapecreators-key.txt'
scrapecreators-cli doctor --network
```

```powershell
$env:SCRAPECREATORS_TOKEN_FILE = 'C:\Users\YOUR_USER\Private\scrapecreators-key.txt'
scrapecreators-cli doctor --network
```

### Agent-guided installation

> Help me install ScrapeCreators MCP Server & CLI with INSTALL.md. Check Node and the binary, let me configure my account credentials privately, then run discovery and doctor --network. Do not send messages or change members during setup.

## Codex

Codex is the current validation priority. Private token paths must exist in the process or remote environment where the server runs.

~~~bash
codex mcp add scrapecreators -- npx -y @thenavidm/scrapecreators-mcp-cli@latest
codex mcp list
~~~

Account credentials must reach the server through private environment settings. `codex mcp add --env NAME=value` stores values in your local config, so never commit that config or put secrets in a shared command. In TOML, the equivalent server is:

~~~toml
[mcp_servers.scrapecreators]
command = "npx"
args = ["-y", "@thenavidm/scrapecreators-mcp-cli@latest"]
env_vars = ["SCRAPECREATORS_API_KEY", "SCRAPECREATORS_TOKEN_FILE", "SCRAPECREATORS_ACCOUNTS", "SCRAPECREATORS_DEFAULT_ACCOUNT", "SCRAPECREATORS_READ_ONLY", "SCRAPECREATORS_ALLOW_SPENDING"]
~~~

`env_vars` forwards those names from the environment available to Codex. If that environment does not contain them, configure private env settings locally. Codex can also call the CLI directly with SKILL.md and `--agent` output.

## Claude Code

For a user-scoped connection, after privately configuring credentials:

~~~bash
claude mcp add --scope user scrapecreators -- npx -y @thenavidm/scrapecreators-mcp-cli@latest
claude mcp list
~~~

Use the client's private local environment settings for the account variable if they are not inherited. Claude's `-e NAME=value` registration option writes values into its config; only use it locally through your secret manager, with no shared command transcript. Never place credentials in a project .mcp.json. Reconnect and ask Claude to verify credentials.

Alternatively install the CLI, make SKILL.md available to Claude, and use shell commands. Registering both surfaces is optional.

## Claude Desktop

### Install the .mcpb extension

1. Download `scrapecreators-2.0.0.mcpb` from [GitHub Releases](https://github.com/thenavidm/scrapecreators-mcp-cli/releases/latest).
2. In a supported Claude Desktop build, open **Settings > Extensions > Advanced settings > Install Extension…** and select it.
3. Enter a private API key in the sensitive setting, or an absolute private token-file path. Leave the unused credential method empty. ScrapeCreators uses x-api-key authentication.
4. Enable read-only if you want only the five local/account reads. Reconnect and ask for account verification.

The bundle includes production dependencies and no credentials. Use a regular private token-only file if you prefer file-based credentials. The manifest requires Node 22 or newer from a compatible host. Organization policy may restrict custom extensions. Manual bundle updates require installing the new version; no automatic directory updates are promised. GUI installation remains unverified separately from archive/protocol checks.

### Manual config

Open **Settings > Developer > Edit Config**, or use your platform's config file:

| OS | Typical config path |
| --- | --- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json`; confirm the location through Edit Config in your installed build |

~~~json
{
  "mcpServers": {
    "scrapecreators": {
      "command": "npx",
      "args": ["-y", "@thenavidm/scrapecreators-mcp-cli@latest"],
      "env": {
        "SCRAPECREATORS_API_KEY": "YOUR_PRIVATE_API_KEY",
        "SCRAPECREATORS_TOKEN_FILE": ""
      }
    }
  }
}
~~~

Replace the placeholders only in your private file. Merge the server entry into an existing mcpServers object instead of replacing other integrations. Fully quit and reopen Claude Desktop. Do not enable an extension and a manual entry with the same name; choose one route.

If a Windows launcher cannot execute npx directly, use `"command": "cmd"` with `"args": ["/c", "npx", "-y", "@thenavidm/scrapecreators-mcp-cli@latest"]`. An absolute node executable and installed `dist/index.js` path also avoids launcher/PATH problems.

## Cursor

Use private user settings at `~/.cursor/mcp.json`, or **Settings > Tools & MCP**. [Cursor documents environment interpolation and envFile support](https://cursor.com/docs/mcp).

~~~json
{
  "mcpServers": {
    "scrapecreators": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/scrapecreators-mcp-cli@latest"],
      "env": {
        "SCRAPECREATORS_API_KEY": "${env:SCRAPECREATORS_API_KEY}",
        "SCRAPECREATORS_TOKEN_FILE": "${env:SCRAPECREATORS_TOKEN_FILE}"
      }
    }
  }
}
~~~

The environment values must exist for the Cursor process. If you use envFile, keep that file private and outside version control. A project's .cursor/mcp.json must not contain actual credentials. Reconnect the server after saving.

## VS Code and Copilot

Use **MCP: Open User Configuration**. [VS Code uses servers and secure inputs](https://code.visualstudio.com/docs/agent-customization/mcp-servers), rather than a mcpServers root:

~~~json
{
  "inputs": [
    {"type": "promptString", "id": "scrapecreators-api-key", "description": "ScrapeCreators scoped API token (leave empty for a private token file)", "password": true},
    {"type": "promptString", "id": "scrapecreators-token-file", "description": "Optional private token-file path (leave empty for scoped API token)"}
  ],
  "servers": {
    "scrapecreators": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/scrapecreators-mcp-cli@latest"],
      "env": {
        "SCRAPECREATORS_API_KEY": "${input:scrapecreators-api-key}",
        "SCRAPECREATORS_TOKEN_FILE": "${input:scrapecreators-token-file}"
      }
    }
  }
}
~~~

Start ScrapeCreators through the MCP controls, approve trust if prompted, and enter credentials in the private input prompts. Workspace .vscode/mcp.json may contain this placeholder-only structure, but never resolved secret values. Remote development runs the server in the selected remote environment, so local file paths refer to that environment.

## Windsurf

Open Cascade's MCP settings or edit the private user file `~/.codeium/windsurf/mcp_config.json`. Use the Claude Desktop manual mcpServers block above with your locally configured env values. See [Windsurf's current MCP documentation](https://docs.devin.ai/desktop/cascade/mcp). Restart or reconnect ScrapeCreators in Cascade; project files must not contain secrets.

## Zed

Open **Settings > AI > MCP Servers > Add Server > Add Local Server**, or your user settings file. [Zed uses context_servers](https://zed.dev/docs/ai/mcp):

~~~json
{
  "context_servers": {
    "scrapecreators": {
      "command": "npx",
      "args": ["-y", "@thenavidm/scrapecreators-mcp-cli@latest"],
      "env": {
        "SCRAPECREATORS_API_KEY": "YOUR_PRIVATE_API_KEY",
        "SCRAPECREATORS_TOKEN_FILE": ""
      }
    }
  }
}
~~~

Enter actual values only in private user settings. Check the active-server indicator before prompting. Do not wrap command and args inside a nested command object from older Zed examples.

## Gemini CLI

Merge the Claude Desktop manual mcpServers block into your private `~/.gemini/settings.json`. Configure the private credential values locally, then restart Gemini CLI and inspect `/mcp`. See [Gemini CLI's MCP configuration](https://geminicli.com/docs/tools/mcp-server/). Its project settings must not contain real credentials. You can instead use the CLI from an agent shell.

Other local stdio clients use the same command and arguments, adapted to their config format. A client that only accepts a remote MCP URL cannot connect directly: this package does not ship a public HTTP listener. ChatGPT's remote connector setup is not a substitute for local stdio installation.

## Docker

Build locally from the reviewed source; no prebuilt registry image is claimed:

```bash
git clone https://github.com/thenavidm/scrapecreators-mcp-cli.git
cd scrapecreators-mcp-cli
docker build -t scrapecreators-mcp-cli .
docker run --rm -i -e SCRAPECREATORS_API_KEY scrapecreators-mcp-cli
```


## Cline and other local MCP clients

Use the client's **Add MCP server** flow with command `npx`, arguments `-y` and `@thenavidm/scrapecreators-mcp-cli@latest`, stdio transport, and private local SCRAPECREATORS_API_KEY or SCRAPECREATORS_TOKEN_FILE settings. UI names depend on the installed client. Reconnect and discover tools before an account call. Browser-only clients need a remote HTTPS connector; use ScrapeCreators's official server rather than this local stdio command.

## Verify

```bash
scrapecreators-cli doctor
scrapecreators-cli doctor --network
scrapecreators-cli tools
scrapecreators-cli schema scrapecreators-get-request-history
scrapecreators-cli list-accounts --agent
```

The full server discovers 190 tools; read-only discovers 5. Help/schemas/list_accounts are local. The network doctor reads account credit metadata without returning account details. A successful account read does not prove every public research endpoint's availability or credit outcome.

To try read-only, privately set SCRAPECREATORS_READ_ONLY=1, restart/reconnect and inspect discovery. All 185 potentially paid calls must disappear and direct paid calls must refuse. Remove/disable the setting and reconnect only when you need approved research. `SCRAPECREATORS_ALLOW_SPENDING=0` separately blocks all 185 potentially paid calls even when confirmed.

## Multiple accounts

Set private SCRAPECREATORS_ACCOUNTS JSON, which replaces the single-account variables:

```json
[{"name":"work","api_key":"YOUR_PRIVATE_WORK_KEY"},{"name":"personal","token_file":"/absolute/private/path/personal-scrapecreators.txt"}]
```

Set SCRAPECREATORS_DEFAULT_ACCOUNT=work. `scrapecreators-cli list-accounts --agent` lists labels and auth methods; `--account personal` selects another account. Keep the JSON out of public project configs. Separate server instances can provide stronger process-level isolation if needed.

## Updates and removal

```bash
npm install -g @thenavidm/scrapecreators-mcp-cli@latest
scrapecreators-cli --version
claude mcp remove --scope user scrapecreators
codex mcp remove scrapecreators
npm uninstall -g @thenavidm/scrapecreators-mcp-cli
```

Reinstall a newer desktop archive separately and restart affected clients. Remove manual client entries using its own settings. Uninstalling the package does not revoke ScrapeCreators credentials, remove private token files or undo consumed credits. Revoke the API key in the provider API Keys area when appropriate. Inspect and remove your private settings and files separately.

Pin a reviewed version instead of @latest if your automation requires reproducibility. Check [CHANGELOG.md](./CHANGELOG.md) and [GitHub Releases](https://github.com/thenavidm/scrapecreators-mcp-cli/releases) before a major update. Do not roll back by blindly publishing an older version over an existing npm version.

## Troubleshooting

| Problem | Check |
| --- | --- |
| Missing command | Node 22+, global prefix and PATH |
| No configured account | Private SCRAPECREATORS_API_KEY or regular SCRAPECREATORS_TOKEN_FILE |
| GUI authentication fails | Actual private GUI environment; shell env is separate |
| 401/403 | provider API key, account/API status and available balance |
| Invalid/null body | schema; use payload/payload_file for null and nested data |
| First page only | Current endpoint cursor from its prior response; no automatic all-pages |
| Guard refusal | User-requested --confirm, read-only and spending settings |
| Research timeout | Inspect account before repeating; no automatic paid-call retries |
| Desktop host rejects extension | Compatible host/runtime and organization custom-extension policy |

See the README for the complete argument table, safety, 20 FAQs and API snapshot corrections. Secrets must never appear in a troubleshooting transcript.

## Development

```bash
git clone https://github.com/thenavidm/scrapecreators-mcp-cli.git
cd scrapecreators-mcp-cli
npm ci
npm run typecheck
npm run build
npm test
npm run check:counts
npm run build:mcpb
```

Source mode: configure private env, then register `node /absolute/path/scrapecreators-mcp-cli/dist/index.js` as the MCP command. Build before registration and after source changes. No local credentials are packaged. [CONTRIBUTING.md](./CONTRIBUTING.md), [SECURITY.md](./SECURITY.md) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) cover contributions, disclosures and licensing.
