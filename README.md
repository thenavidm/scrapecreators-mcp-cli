<img src="https://cdn.navid.me/tools/scrapecreators-icon.png" alt="ScrapeCreators" width="88">

# ScrapeCreators MCP Server & CLI

[![npm](https://img.shields.io/npm/v/@thenavidm/scrapecreators-mcp-cli?color=orange&label=npm)](https://www.npmjs.com/package/@thenavidm/scrapecreators-mcp-cli)
[![CI](https://github.com/thenavidm/scrapecreators-mcp-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/thenavidm/scrapecreators-mcp-cli/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-AGPL--3.0-green)](./LICENSE)
[![YouTube](https://img.shields.io/badge/YouTube-@thenavidm-red?logo=youtube&logoColor=white)](https://youtube.com/@thenavidm?sub_confirmation=1)
[![X](https://img.shields.io/badge/X-@thenavidm-black?logo=x)](https://x.com/thenavidm)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-thenavidm-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/thenavidm)

ScrapeCreators MCP server and CLI for Codex and AI agents. **190 tools: five local/account reads and 185 potentially paid calls** for public social profiles, posts, transcripts, comments, ads and bounded research.

One package provides local MCP, the same operations as task CLI commands, and a bundled desktop .mcpb extension.

Built and maintained by [Navid Moazzez](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=scrapecreators-mcp-cli&utm_content=readme). Built on [Slipway](https://github.com/thenavidm/slipway), which turns one definition of each tool into the MCP server and the CLI. Complete installation and private account setup are in [INSTALL.md](INSTALL.md).

<img src="https://cdn.navid.me/repos/scrapecreators-mcp-cli-retina.gif" alt="Illustrated ScrapeCreators workflow in the same house terminal used on navid.me" width="520">

The terminal illustrates shipped public research tools with sample data. It is a presentation preview, not a verified live-account request.

You need a private ScrapeCreators API key and sufficient provider access/credits. This community product is maintained by Navid Media and preserves AGPL-3.0-or-later. ScrapeCreators already has an official CLI and hosted MCP; useful differences and limitations are compared below.

## Two ways to use it

### Command line

```bash
npm install -g @thenavidm/scrapecreators-mcp-cli@latest
scrapecreators-cli
scrapecreators-cli instagram-profile --help
scrapecreators-cli schema research-batch
scrapecreators-cli scrapecreators-get-credit-balance --agent
```

Configure private access before account calls. Potentially paid research requires --confirm; --yes and --agent do not authorize it.

### MCP server, for your AI app

```bash
codex mcp add scrapecreators -- npx -y @thenavidm/scrapecreators-mcp-cli@latest
```

Then ask: *Check credit balance, then show the exact public-profile lookup before I approve the paid call.* Full client/OS setup is in INSTALL.md.

### Which one

| Where you work | Surface |
| --- | --- |
| Codex or another shell agent | Local MCP, shared CLI or both |
| Desktop chat | Compatible local MCP/.mcpb host |
| Scripts/CI | Shared task CLI or MCP client |
| Remote-URL-only client | Official provider hosted MCP |

## Features

| Capability | CLI | MCP |
| --- | --- | --- |
| Public profiles | instagram-profile / tiktok-profile | instagram_profile / tiktok_profile |
| Video transcripts | youtube-transcript | youtube_transcript |
| Public ads | facebook-ad-library-search-post | facebook_ad_library_search_post |
| Account credit/history | scrapecreators-get-credit-balance | scrapecreators_get_credit_balance |
| Exact bounded research | research-batch | research_batch |
| Private account labels | list-accounts / --account | list_accounts / account |
| Setup diagnosis | doctor / login | CLI utilities |

## Contents

| Number | Section | Covers |
| --- | --- | --- |
| 1 | [What you can ask it](#1-what-you-can-ask-it) | Practical research |
| 2 | [Quick install](#2-quick-install) | Both binaries and desktop |
| 3 | [Set up ScrapeCreators access](#3-set-up-scrapecreators-access) | Keys, credits and caching |
| 4 | [Connect your client](#4-connect-your-client) | Clients and OS |
| 5 | [Check it works](#5-check-it-works) | Doctor and first account read |
| 6 | [Output, flags and exit codes](#6-output-flags-and-exit-codes) | Schema-derived flags and scripting |
| 7 | [MCP or CLI and token cost](#7-mcp-or-cli-and-token-cost) | Measured evidence requirements |
| 8 | [Every tool and argument](#8-every-tool-and-argument) | All current tools and arguments |
| 9 | [Creator, transcript and ad research workflows](#9-creator-transcript-and-ad-research-workflows) | Profiles, transcripts, ads and batch |
| 10 | [Pagination, credits and request budgets](#10-pagination-credits-and-request-budgets) | Opaque cursors and actual charges |
| 11 | [Several private accounts](#11-several-private-accounts) | Named credentials |
| 12 | [Approving paid research safely](#12-approving-paid-research-safely) | Per-call approval and policies |
| 13 | [How it works](#13-how-it-works) | Shared handlers and schema sync |
| 14 | [Your data](#14-your-data) | Direct API and privacy |
| 15 | [Environment variables](#15-environment-variables) | Private credentials and tuning |
| 16 | [Updates and removal](#16-updates-and-removal) | Upgrade and revoke |
| 17 | [Troubleshooting](#17-troubleshooting) | Errors and remedies |
| 18 | [API coverage and comparisons](#18-api-coverage-and-comparisons) | Official and community choices |
| 19 | [Versions](#19-versions) | Release and migration history |
| 20 | [FAQ](#20-faq) | Accordion answers |


## 1. What you can ask it

- Inspect a selected public creator profile and one page of recent posts.
- Retrieve the specific YouTube transcript I approved, preserving track language.
- Research matching public ads in the chosen country and status.
- Compare a bounded set of public profiles in one named private account.
- Check credit balance and account request history before repeating a failed lookup.

The current schema supplies 188 API operations across 37 groups. list_accounts is local; research_batch is a shared local workflow. Actual discovery gives **190 tools: five local/account reads and 185 potentially paid calls**. Account metadata remains available in read-only mode; paid research requires explicit confirmation, even for GET.

ScrapeCreators already offers official MCP, CLI and research skills. This owned wrapper adds enforced paid-call approval, named private credentials and bounded prevalidated batches. Fixture/protocol validation is separate from live account outcomes, GUI installation and measured token evidence.

## 2. Quick install

```bash
npm install -g @thenavidm/scrapecreators-mcp-cli@latest
scrapecreators-cli --version
scrapecreators-cli login
scrapecreators-cli doctor
scrapecreators-cli tools
```

Node 22+ is required for manual CLI/MCP setup. Discovery, schemas and list_accounts work without a key. The [scrapecreators-3.0.0.mcpb desktop archive](https://github.com/thenavidm/scrapecreators-mcp-cli/releases/download/v3.0.0/scrapecreators-3.0.0.mcpb) bundles production dependencies for a compatible host. Full setup is in [INSTALL.md](INSTALL.md).

After private environment configuration:

```bash
codex mcp add scrapecreators -- npx -y @thenavidm/scrapecreators-mcp-cli@latest
codex mcp list
```

## 3. Set up ScrapeCreators access

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

## 4. Connect your client

[INSTALL.md](INSTALL.md) retains the established client setup for Codex, Claude Code, Claude Desktop extension/manual config, Cursor, VS Code/Copilot, Windsurf, Zed, Gemini CLI, Cline, Docker and other stdio clients on macOS, Windows and Linux. Codex is the current priority; Claude Code is optional.

Use command npx with arguments -y, @thenavidm/scrapecreators-mcp-cli@latest, and private local credential settings. Remote-only clients can use the provider's official https://api.scrapecreators.com/mcp endpoint with its supported OAuth/API-key connection. This local package has no public HTTP relay.

The shipped SKILL.md guides a shell agent. Make it available through the client's supported skills location; npm installation alone does not register it. Client approval and confirm=true are separate: the guard requires approval for this specific paid action, not permission inferred from returned content.

## 5. Check it works

```bash
scrapecreators-cli --version
scrapecreators-cli doctor
scrapecreators-cli doctor --network
scrapecreators-cli list-accounts --agent
scrapecreators-cli scrapecreators-get-credit-balance --agent
```

Network doctor performs GET /v1/account/credit-balance and reports authentication without account content. A successful account read proves that request, not every public-data endpoint. Full discovery exposes 190 tools, read-only exposes five. Missing configuration exits 10; invalid arguments and refused paid research exit 2.

For an approved first research request, use a public handle you selected and an acceptable cache age:

```bash
scrapecreators-cli instagram-profile --handle PUBLIC_HANDLE --cache-max-age 7d --confirm --agent
```

## 6. Output, flags and exit codes

Tool names become dashed commands; underscores are accepted too. Path parameter names follow the discovered schema, such as `continuationToken` → `--continuation-token`. Body tools accept individual top-level flags, complete `--payload` JSON, or `--payload-file` pointing to a regular JSON body file up to 5 MB. Do not mix those body routes. Path/query flags remain separate. Nested objects take JSON and array flags repeat once per item; a whole array is not a single item.

```bash
scrapecreators-cli instagram-profile --help
scrapecreators-cli schema reddit-post-comments-post
scrapecreators-cli youtube-comments --url "https://www.youtube.com/watch?v=VIDEO_ID" --continuation-token OPAQUE_TOKEN --confirm --agent
```

IDs/cursors above are illustrative; use the selected public resource and cursor from its prior response. Nullable fields require an actual JSON null inside payload; `--field null` is a string. Nested values preserve current upstream constraints; unknown top-level body fields are refused. Body-required fields are validated during execution even when the wrapper schema allows an alternative payload route. Operations whose upstream request body is required need body flags or an explicit payload; a deliberately supplied empty object is sent as JSON, never omitted.

| Flag | Behavior |
| --- | --- |
| --help / schema COMMAND | Current argument help / full JSON Schema |
| --json | Structured JSON |
| --compact | One-line JSON |
| --agent | Compact JSON and no prompts; never confirms a write |
| --select a,b.c | Keep selected fields, including nested objects/arrays |
| --no-color / --no-input | Noninteractive switches |
| --yes | Never replaces paid-call confirmation |
| --confirm | Approve only the requested paid research |
| --account NAME | Select private local credentials |
| --payload JSON / --payload-file PATH | Complete request body, mutually exclusive with body flags |

| Exit | Meaning |
| --- | --- |
| 0 | Success |
| 1 | Unexpected error |
| 2 | Invalid arguments or refused paid call, an unknown command or a hidden write |
| 3 | Resource not found |
| 4 | Authentication/permission failure |
| 5 | API/transport failure |
| 7 | Rate limit |
| 10 | Missing or invalid private configuration |

Results go to stdout, errors as JSON to stderr. Selection changes local output, not the original API response or provider charge. API success is not proof that public data is current, exhaustive or complete.

## 7. MCP or CLI and token cost

MCP and CLI use the same schemas, validation and HTTP handlers: [Slipway](https://github.com/thenavidm/slipway) builds the MCP server, over stdio or `--http`, and the CLI from each tool's one definition; there is no second API implementation.

Measured on 2026-10-05 against 2.0.1, with Claude Code 2.1.286 on Claude Opus 5.5 (one short prompt with and without the server connected, the difference read from the API's own usage figures) and Codex 0.159.3 on gpt-6.1-sol:

| Cost | 2.0.1 | 3.0.0 |
| --- | --- | --- |
| Claude Code, every tool loaded, every message | 89,024 | 88,384 |
| Claude Code's default, tool search, every message | 3,223 | 3,224 |
| `SKILL.md`, read once | 1,326 | 1,392 |
| Codex over the CLI, one task, median of five | 86,664 | 83,060 |
| Codex over MCP, the same task, median of five | 76,914 | 48,790 |

The task was "find the command that gets a TikTok video's transcript, and the flags it requires". Every tool loaded costs less, while the list a client receives grows by an approval marker on the 185 paid tools, which Claude Code does not pass to the model. Over the CLI, every 3.0.0 run asked `which`, a 478-character answer, where every 2.0.1 run read the 13,019-character command list. Over MCP, four 3.0.0 runs answered after printing part of the tool list, against two 2.0.1 runs, so the median fell; where both printed the whole list, they read about the same, 76,914 and 77,022. `SKILL.md` costs 66 more because it says how approval works over MCP and what exit codes 1 and 2 cover.

Tool-list bytes or characters divided by four are not API usage, and no other offering was measured.

## 8. Every tool and argument

The full current API catalogue and every argument below derive from actual stdio discovery. The API has 188 endpoint variants; the local helpers bring discovery to 190. Read-like POST requests retrieve data rather than publish social content. Query/body field names preserve the upstream schema, including native camelCase cursors.

| Tool | Route | Mode |
| --- | --- | --- |
| `tiktok_profile` | `GET /v1/tiktok/profile` | Potentially paid; confirm |
| `tiktok_profile_region` | `GET /v1/tiktok/profile/region` | Potentially paid; confirm |
| `tiktok_audience_demographics` | `GET /v1/tiktok/user/audience` | Potentially paid; confirm |
| `tiktok_collection_videos` | `GET /v1/tiktok/collection/videos` | Potentially paid; confirm |
| `tiktok_profile_videos` | `GET /v3/tiktok/profile/videos` | Potentially paid; confirm |
| `tiktok_video_info` | `GET /v2/tiktok/video` | Potentially paid; confirm |
| `tiktok_transcript` | `GET /v1/tiktok/video/transcript` | Potentially paid; confirm |
| `tiktok_live` | `GET /v1/tiktok/user/live` | Potentially paid; confirm |
| `tiktok_live_info` | `GET /v1/tiktok/live` | Potentially paid; confirm |
| `tiktok_comments` | `GET /v1/tiktok/video/comments` | Potentially paid; confirm |
| `tiktok_comment_replies` | `GET /v1/tiktok/video/comment/replies` | Potentially paid; confirm |
| `tiktok_following` | `GET /v1/tiktok/user/following` | Potentially paid; confirm |
| `tiktok_followers` | `GET /v1/tiktok/user/followers` | Potentially paid; confirm |
| `tiktok_search_users` | `GET /v1/tiktok/search/users` | Potentially paid; confirm |
| `tiktok_search_suggestions` | `GET /v1/tiktok/search/suggestions` | Potentially paid; confirm |
| `tiktok_search_by_hashtag` | `GET /v1/tiktok/search/hashtag` | Potentially paid; confirm |
| `tiktok_search_by_keyword` | `GET /v1/tiktok/search/keyword` | Potentially paid; confirm |
| `tiktok_top_search` | `GET /v1/tiktok/search/top` | Potentially paid; confirm |
| `tiktok_get_popular_creators` | `GET /v1/tiktok/creators/popular` | Potentially paid; confirm |
| `tiktok_get_song_details` | `GET /v1/tiktok/song` | Potentially paid; confirm |
| `tiktok_tiktoks_using_song` | `GET /v1/tiktok/song/videos` | Potentially paid; confirm |
| `tiktok_trending_feed` | `GET /v1/tiktok/get-trending-feed` | Potentially paid; confirm |
| `tiktok_shop_shop_search` | `GET /v1/tiktok/shop/search` | Potentially paid; confirm |
| `tiktok_shop_shop_products` | `GET /v1/tiktok/shop/products` | Potentially paid; confirm |
| `tiktok_shop_product_details` | `GET /v1/tiktok/product` | Potentially paid; confirm |
| `tiktok_shop_product_reviews` | `GET /v1/tiktok/shop/product/reviews` | Potentially paid; confirm |
| `tiktok_shop_user_showcase` | `GET /v1/tiktok/user/showcase` | Potentially paid; confirm |
| `instagram_profile` | `GET /v1/instagram/profile` | Potentially paid; confirm |
| `instagram_basic_profile` | `GET /v1/instagram/basic-profile` | Potentially paid; confirm |
| `instagram_posts` | `GET /v2/instagram/user/posts` | Potentially paid; confirm |
| `instagram_user_tagged_posts` | `GET /v1/instagram/user/tagged-posts` | Potentially paid; confirm |
| `instagram_reels` | `GET /v1/instagram/user/reels` | Potentially paid; confirm |
| `instagram_post_reel_info` | `GET /v1/instagram/post` | Potentially paid; confirm |
| `instagram_transcript` | `GET /v2/instagram/media/transcript` | Potentially paid; confirm |
| `instagram_search_instagram` | `GET /v1/instagram/search` | Potentially paid; confirm |
| `instagram_popular_search` | `GET /v1/instagram/search/popular` | Potentially paid; confirm |
| `instagram_search_hashtag_posts` | `GET /v1/instagram/search/hashtag` | Potentially paid; confirm |
| `instagram_search_instagram_profiles` | `GET /v1/instagram/search/profiles` | Potentially paid; confirm |
| `instagram_search_reels` | `GET /v2/instagram/reels/search` | Potentially paid; confirm |
| `instagram_get_reels_by_audio_id` | `GET /v1/instagram/audio/reels` | Potentially paid; confirm |
| `instagram_trending_reels` | `GET /v1/instagram/reels/trending` | Potentially paid; confirm |
| `instagram_comments` | `GET /v2/instagram/post/comments` | Potentially paid; confirm |
| `instagram_comment_replies` | `GET /v1/instagram/post/comment/replies` | Potentially paid; confirm |
| `instagram_story_highlights` | `GET /v1/instagram/user/highlights` | Potentially paid; confirm |
| `instagram_highlights_details` | `GET /v1/instagram/user/highlight/detail` | Potentially paid; confirm |
| `instagram_profile_post_count` | `GET /v1/instagram/profile/post-count` | Potentially paid; confirm |
| `instagram_embed_html` | `GET /v1/instagram/user/embed` | Potentially paid; confirm |
| `telegram_channel_details` | `GET /v1/telegram/channel` | Potentially paid; confirm |
| `telegram_channel_posts` | `GET /v1/telegram/channel/posts` | Potentially paid; confirm |
| `telegram_post_details` | `GET /v1/telegram/post` | Potentially paid; confirm |
| `youtube_channel_details` | `GET /v1/youtube/channel` | Potentially paid; confirm |
| `youtube_channel_videos` | `GET /v1/youtube/channel-videos` | Potentially paid; confirm |
| `youtube_channel_playlists` | `GET /v1/youtube/channel/playlists` | Potentially paid; confirm |
| `youtube_channel_lives` | `GET /v1/youtube/channel/lives` | Potentially paid; confirm |
| `youtube_channel_community_posts` | `GET /v1/youtube/channel/community-posts` | Potentially paid; confirm |
| `youtube_channel_shorts` | `GET /v1/youtube/channel/shorts` | Potentially paid; confirm |
| `youtube_video_short_details` | `GET /v1/youtube/video` | Potentially paid; confirm |
| `youtube_transcript` | `GET /v1/youtube/video/transcript` | Potentially paid; confirm |
| `youtube_video_sponsors` | `GET /v1/youtube/video/sponsors` | Potentially paid; confirm |
| `youtube_search` | `GET /v1/youtube/search` | Potentially paid; confirm |
| `youtube_search_typeahead` | `GET /v1/youtube/search/typeahead` | Potentially paid; confirm |
| `youtube_search_by_hashtag` | `GET /v1/youtube/search/hashtag` | Potentially paid; confirm |
| `youtube_comments` | `GET /v1/youtube/video/comments` | Potentially paid; confirm |
| `youtube_comment_replies` | `GET /v1/youtube/video/comment/replies` | Potentially paid; confirm |
| `youtube_trending_shorts` | `GET /v1/youtube/shorts/trending` | Potentially paid; confirm |
| `youtube_playlist` | `GET /v1/youtube/playlist` | Potentially paid; confirm |
| `youtube_community_post_details` | `GET /v1/youtube/community-post` | Potentially paid; confirm |
| `rumble_search` | `GET /v1/rumble/search` | Potentially paid; confirm |
| `rumble_channel_videos` | `GET /v1/rumble/channel/videos` | Potentially paid; confirm |
| `rumble_video` | `GET /v1/rumble/video` | Potentially paid; confirm |
| `rumble_transcript` | `GET /v1/rumble/video/transcript` | Potentially paid; confirm |
| `rumble_comments` | `GET /v1/rumble/video/comments` | Potentially paid; confirm |
| `linkedin_person_profile` | `GET /v1/linkedin/profile` | Potentially paid; confirm |
| `linkedin_company_page` | `GET /v1/linkedin/company` | Potentially paid; confirm |
| `linkedin_company_posts` | `GET /v1/linkedin/company/posts` | Potentially paid; confirm |
| `linkedin_search_posts` | `GET /v1/linkedin/search/posts` | Potentially paid; confirm |
| `linkedin_post` | `GET /v1/linkedin/post` | Potentially paid; confirm |
| `linkedin_post_transcript` | `GET /v1/linkedin/post/transcript` | Potentially paid; confirm |
| `facebook_profile` | `GET /v1/facebook/profile` | Potentially paid; confirm |
| `facebook_profile_reels` | `GET /v1/facebook/profile/reels` | Potentially paid; confirm |
| `facebook_profile_photos` | `GET /v1/facebook/profile/photos` | Potentially paid; confirm |
| `facebook_profile_posts` | `GET /v1/facebook/profile/posts` | Potentially paid; confirm |
| `facebook_profile_events` | `GET /v1/facebook/profile/events` | Potentially paid; confirm |
| `facebook_post` | `GET /v1/facebook/post` | Potentially paid; confirm |
| `facebook_transcript` | `GET /v1/facebook/post/transcript` | Potentially paid; confirm |
| `facebook_comments` | `GET /v1/facebook/post/comments` | Potentially paid; confirm |
| `facebook_comment_replies` | `GET /v1/facebook/post/comment/replies` | Potentially paid; confirm |
| `facebook_facebook_group_info` | `GET /v1/facebook/group` | Potentially paid; confirm |
| `facebook_facebook_group_posts` | `GET /v1/facebook/group/posts` | Potentially paid; confirm |
| `github_user` | `GET /v1/github/user` | Potentially paid; confirm |
| `github_repositories` | `GET /v1/github/user/repositories` | Potentially paid; confirm |
| `github_pull_requests` | `GET /v1/github/user/pull-requests` | Potentially paid; confirm |
| `github_activity` | `GET /v1/github/user/activity` | Potentially paid; confirm |
| `github_followers` | `GET /v1/github/user/followers` | Potentially paid; confirm |
| `github_following` | `GET /v1/github/user/following` | Potentially paid; confirm |
| `github_contributions` | `GET /v1/github/user/contributions` | Potentially paid; confirm |
| `github_repository` | `GET /v1/github/repository` | Potentially paid; confirm |
| `github_trending_repositories` | `GET /v1/github/trending/repositories` | Potentially paid; confirm |
| `github_trending_developers` | `GET /v1/github/trending/developers` | Potentially paid; confirm |
| `facebook_marketplace_marketplace_location_search` | `GET /v1/facebook/marketplace/location/search` | Potentially paid; confirm |
| `facebook_marketplace_marketplace_search` | `GET /v1/facebook/marketplace/search` | Potentially paid; confirm |
| `facebook_marketplace_marketplace_item` | `GET /v1/facebook/marketplace/item` | Potentially paid; confirm |
| `facebook_events_search_events` | `GET /v1/facebook/events/search` | Potentially paid; confirm |
| `facebook_events_events` | `GET /v1/facebook/events` | Potentially paid; confirm |
| `facebook_events_event_details` | `GET /v1/facebook/event/details` | Potentially paid; confirm |
| `facebook_ad_library_ad_details` | `GET /v1/facebook/adLibrary/ad` | Potentially paid; confirm |
| `facebook_ad_library_ad_transcript` | `GET /v1/facebook/adLibrary/ad/transcript` | Potentially paid; confirm |
| `facebook_ad_library_search` | `GET /v1/facebook/adLibrary/search/ads` | Potentially paid; confirm |
| `facebook_ad_library_search_post` | `POST /v1/facebook/adLibrary/search/ads` | Potentially paid; confirm |
| `facebook_ad_library_company_ads` | `GET /v1/facebook/adLibrary/company/ads` | Potentially paid; confirm |
| `facebook_ad_library_company_ads_post` | `POST /v1/facebook/adLibrary/company/ads` | Potentially paid; confirm |
| `facebook_ad_library_search_for_companies` | `GET /v1/facebook/adLibrary/search/companies` | Potentially paid; confirm |
| `tiktok_ad_library_ad_library_search` | `GET /v1/tiktok/ad-library/search` | Potentially paid; confirm |
| `tiktok_ad_library_ad_library_ad` | `GET /v1/tiktok/ad-library/ad` | Potentially paid; confirm |
| `google_ad_library_company_ads` | `GET /v1/google/company/ads` | Potentially paid; confirm |
| `google_ad_library_ad_details` | `GET /v1/google/ad` | Potentially paid; confirm |
| `google_ad_library_advertiser_search` | `GET /v1/google/adLibrary/advertisers/search` | Potentially paid; confirm |
| `linkedin_ad_library_search_ads` | `GET /v1/linkedin/ads/search` | Potentially paid; confirm |
| `linkedin_ad_library_ad_details` | `GET /v1/linkedin/ad` | Potentially paid; confirm |
| `twitter_profile` | `GET /v1/twitter/profile` | Potentially paid; confirm |
| `twitter_user_tweets` | `GET /v1/twitter/user-tweets` | Potentially paid; confirm |
| `twitter_tweet_details` | `GET /v1/twitter/tweet` | Potentially paid; confirm |
| `twitter_transcript` | `GET /v1/twitter/tweet/transcript` | Potentially paid; confirm |
| `twitter_community` | `GET /v1/twitter/community` | Potentially paid; confirm |
| `twitter_community_tweets` | `GET /v1/twitter/community/tweets` | Potentially paid; confirm |
| `reddit_subreddit_details` | `GET /v1/reddit/subreddit/details` | Potentially paid; confirm |
| `reddit_subreddit_posts` | `GET /v1/reddit/subreddit` | Potentially paid; confirm |
| `reddit_subreddit_search` | `GET /v1/reddit/subreddit/search` | Potentially paid; confirm |
| `reddit_post` | `GET /v1/reddit/post` | Potentially paid; confirm |
| `reddit_post_comments` | `GET /v1/reddit/post/comments` | Potentially paid; confirm |
| `reddit_post_comments_post` | `POST /v1/reddit/post/comments` | Potentially paid; confirm |
| `reddit_post_transcript` | `GET /v1/reddit/post/transcript` | Potentially paid; confirm |
| `reddit_search` | `GET /v1/reddit/search` | Potentially paid; confirm |
| `truth_social_profile` | `GET /v1/truthsocial/profile` | Potentially paid; confirm |
| `truth_social_user_posts` | `GET /v1/truthsocial/user/posts` | Potentially paid; confirm |
| `truth_social_post` | `GET /v1/truthsocial/post` | Potentially paid; confirm |
| `threads_profile` | `GET /v1/threads/profile` | Potentially paid; confirm |
| `threads_posts` | `GET /v1/threads/user/posts` | Potentially paid; confirm |
| `threads_post` | `GET /v1/threads/post` | Potentially paid; confirm |
| `threads_search_by_keyword` | `GET /v1/threads/search` | Potentially paid; confirm |
| `threads_search_users` | `GET /v1/threads/search/users` | Potentially paid; confirm |
| `bluesky_profile` | `GET /v1/bluesky/profile` | Potentially paid; confirm |
| `bluesky_posts` | `GET /v1/bluesky/user/posts` | Potentially paid; confirm |
| `bluesky_post` | `GET /v1/bluesky/post` | Potentially paid; confirm |
| `pinterest_search` | `GET /v1/pinterest/search` | Potentially paid; confirm |
| `pinterest_pin` | `GET /v1/pinterest/pin` | Potentially paid; confirm |
| `pinterest_user_boards` | `GET /v1/pinterest/user/boards` | Potentially paid; confirm |
| `pinterest_board` | `GET /v1/pinterest/board` | Potentially paid; confirm |
| `google_search` | `GET /v1/google/search` | Potentially paid; confirm |
| `twitch_profile` | `GET /v1/twitch/profile` | Potentially paid; confirm |
| `twitch_user_videos` | `GET /v1/twitch/user/videos` | Potentially paid; confirm |
| `twitch_user_schedule` | `GET /v1/twitch/user/schedule` | Potentially paid; confirm |
| `twitch_clip_transcript` | `GET /v1/twitch/clip/transcript` | Potentially paid; confirm |
| `twitch_clip` | `GET /v1/twitch/clip` | Potentially paid; confirm |
| `apple_music_artist` | `GET /v1/apple-music/artist` | Potentially paid; confirm |
| `apple_music_album` | `GET /v1/apple-music/album` | Potentially paid; confirm |
| `apple_music_track` | `GET /v1/apple-music/track` | Potentially paid; confirm |
| `apple_music_search` | `GET /v1/apple-music/search` | Potentially paid; confirm |
| `spotify_artist` | `GET /v1/spotify/artist` | Potentially paid; confirm |
| `spotify_track` | `GET /v1/spotify/track` | Potentially paid; confirm |
| `spotify_album` | `GET /v1/spotify/album` | Potentially paid; confirm |
| `spotify_playlist` | `GET /v1/spotify/playlist` | Potentially paid; confirm |
| `spotify_search` | `GET /v1/spotify/search` | Potentially paid; confirm |
| `spotify_podcast` | `GET /v1/spotify/podcast` | Potentially paid; confirm |
| `spotify_podcast_episodes` | `GET /v1/spotify/podcast/episodes` | Potentially paid; confirm |
| `soundcloud_artist` | `GET /v1/soundcloud/artist` | Potentially paid; confirm |
| `soundcloud_artist_tracks` | `GET /v1/soundcloud/artist/tracks` | Potentially paid; confirm |
| `soundcloud_track` | `GET /v1/soundcloud/track` | Potentially paid; confirm |
| `kwai_profile` | `GET /v1/kwai/profile` | Potentially paid; confirm |
| `kwai_user_posts` | `GET /v1/kwai/user/posts` | Potentially paid; confirm |
| `kwai_post` | `GET /v1/kwai/post` | Potentially paid; confirm |
| `kick_clip_transcript` | `GET /v1/kick/clip/transcript` | Potentially paid; confirm |
| `kick_clip` | `GET /v1/kick/clip` | Potentially paid; confirm |
| `snapchat_user_profile` | `GET /v1/snapchat/profile` | Potentially paid; confirm |
| `snapchat_spotlight_by_link` | `GET /v1/snapchat/spotlight` | Potentially paid; confirm |
| `snapchat_spotlight_comments_by_link` | `GET /v1/snapchat/spotlight/comments` | Potentially paid; confirm |
| `creator_tools_find_social_profiles` | `GET /v1/find-social-profiles` | Potentially paid; confirm |
| `creator_tools_get_age_and_gender` | `GET /v1/detect-age-gender` | Potentially paid; confirm |
| `linktree_linktree_page` | `GET /v1/linktree` | Potentially paid; confirm |
| `komi_komi_page` | `GET /v1/komi` | Potentially paid; confirm |
| `pillar_pillar_page` | `GET /v1/pillar` | Potentially paid; confirm |
| `linkbio_linkbio_page` | `GET /v1/linkbio` | Potentially paid; confirm |
| `amazon_shop_amazon_shop_page` | `GET /v1/amazon/shop` | Potentially paid; confirm |
| `scrapecreators_get_credit_balance` | `GET /v1/account/credit-balance` | Account metadata read |
| `scrapecreators_get_request_history` | `GET /v1/account/get-api-usage` | Account metadata read |
| `scrapecreators_get_daily_usage` | `GET /v1/account/get-daily-usage-count` | Account metadata read |
| `scrapecreators_get_most_used_routes` | `GET /v1/account/get-most-used-routes` | Account metadata read |
| `linkme_profile` | `GET /v1/linkme` | Potentially paid; confirm |
| `list_accounts` | Local, no network | Read |
| `research_batch` | Local sequential workflow | Confirmed paid research |

#### tiktok_profile

`scrapecreators-cli tiktok-profile`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | TikTok handle. You can pass handle or user_id. |
| `user_id` | No; body/guard rules apply | string | TikTok user id. |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

Provide handle or user_id; an empty selector is rejected before a network call.

#### tiktok_profile_region

`scrapecreators-cli tiktok-profile-region`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | TikTok handle |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_audience_demographics

`scrapecreators-cli tiktok-audience-demographics`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | TikTok handle |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_collection_videos

`scrapecreators-cli tiktok-collection-videos`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Public TikTok collection URL |
| `cursor` | No; body/guard rules apply | string | Cursor to get more videos. Use max_cursor from the previous response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_profile_videos

`scrapecreators-cli tiktok-profile-videos`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | TikTok handle |
| `user_id` | No; body/guard rules apply | string | TikTok user id. Use this for faster responses. |
| `sort_by` | No; body/guard rules apply | string | What to sort by Values: `latest`, `popular`. |
| `max_cursor` | No; body/guard rules apply | string | Cursor to get more videos. Get 'max_cursor' from previous response. |
| `region` | No; body/guard rules apply | string | Region (country) for the proxy. Defaults to GB. If a profile should have videos but returns none, try US or another relevant two-letter country code. |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_video_info

`scrapecreators-cli tiktok-video-info`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | TikTok video URL |
| `get_transcript` | No; body/guard rules apply | boolean | Get transcript of the video |
| `region` | No; body/guard rules apply | string | Region of the proxy. Sometimes you'll need to specify the region if you're not getting a response. Commonly for videos from the Phillipines, in which case you'd use 'PH'. Use 2 letter country codes like US, GB, FR, etc |
| `trim` | No; body/guard rules apply | boolean | Set to true to get a trimmed response |
| `download_media` | No; body/guard rules apply | boolean | Set to true to download the video/images and get back permanent Supabase URLs. Costs 10 credits if media is found, 1 credit otherwise. |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_transcript

`scrapecreators-cli tiktok-transcript`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | TikTok video URL |
| `language` | No; body/guard rules apply | string | Language of the transcript. 2 letter language code, ie 'en', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'zh' |
| `use_ai_as_fallback` | No; body/guard rules apply | string | Set to 'true' to use AI when an existing transcript is not found. The AI fallback supports videos up to 2 minutes and costs 10 credits; existing transcripts have no length limit. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_live

`scrapecreators-cli tiktok-live`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | TikTok handle |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_live_info

`scrapecreators-cli tiktok-live-info`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `room_id` | Yes | string | TikTok live room id. Get this from `/v1/tiktok/user/live` in `liveRoomUserInfo.roomId` or `liveRoom.id` when the user is live. |
| `user_id` | Yes | string | TikTok numeric user id for the live owner. Get this from `/v1/tiktok/profile` in `user.id`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_comments

`scrapecreators-cli tiktok-comments`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | TikTok video URL |
| `cursor` | No; body/guard rules apply | number | Cursor to get more comments. Get 'cursor' from previous response. |
| `trim` | No; body/guard rules apply | boolean | Set to true to get a trimmed response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_comment_replies

`scrapecreators-cli tiktok-comment-replies`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `comment_id` | Yes | string | TikTok comment ID. This is the cid from the comments endpoint. |
| `url` | Yes | string | TikTok video URL. This is the url from the comments endpoint. |
| `cursor` | No; body/guard rules apply | number | Cursor to get more replies. Get 'cursor' from previous response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_following

`scrapecreators-cli tiktok-following`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | TikTok handle |
| `min_time` | No; body/guard rules apply | number | Used to paginate. Get 'min_time' from previous response. |
| `trim` | No; body/guard rules apply | boolean | Set to true to get a trimmed response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_followers

`scrapecreators-cli tiktok-followers`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | TikTok handle |
| `user_id` | No; body/guard rules apply | string | User id. Use this for faster response times. |
| `min_time` | No; body/guard rules apply | number | Used to paginate. Get 'min_time' from previous response. |
| `trim` | No; body/guard rules apply | boolean | Set to true to get a trimmed response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_search_users

`scrapecreators-cli tiktok-search-users`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Search query for users |
| `cursor` | No; body/guard rules apply | number | Cursor to get more users. Get 'cursor' from previous response. |
| `trim` | No; body/guard rules apply | boolean | Set to true to get a trimmed response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_search_suggestions

`scrapecreators-cli tiktok-search-suggestions`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Search query to get suggestions for |
| `region` | No; body/guard rules apply | string | Region code for suggestions |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_search_by_hashtag

`scrapecreators-cli tiktok-search-by-hashtag`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `hashtag` | Yes | string | Hashtag to search for (without #) |
| `region` | No; body/guard rules apply | string | Region the proxy will be set to. Note: this isn't going to grab you all tiktoks from this region, you're just setting the proxy there. |
| `cursor` | No; body/guard rules apply | number | Cursor to get more videos. Get 'cursor' from previous response. |
| `trim` | No; body/guard rules apply | boolean | Set to true to get a trimmed response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_search_by_keyword

`scrapecreators-cli tiktok-search-by-keyword`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Keyword to search for |
| `date_posted` | No; body/guard rules apply | string | Time Frame Values: `yesterday`, `this-week`, `this-month`, `last-3-months`, `last-6-months`, `all-time`. |
| `sort_by` | No; body/guard rules apply | string | Sort by Values: `relevance`, `most-liked`, `date-posted`. |
| `region` | No; body/guard rules apply | string | Note, this doesn't filter the tiktoks only in a specfic region, it puts the proxy there. Use it in case you want to scrape posts only available for some country. Use 2 letter country codes like US, GB, FR, etc |
| `cursor` | No; body/guard rules apply | number | Cursor to get more videos. Get 'cursor' from previous response. |
| `trim` | No; body/guard rules apply | boolean | Set to true to get a trimmed response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_top_search

`scrapecreators-cli tiktok-top-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Keyword to search for |
| `publish_time` | No; body/guard rules apply | string | Time Frame TikTok was posted Values: `yesterday`, `this-week`, `this-month`, `last-3-months`, `last-6-months`, `all-time`. |
| `sort_by` | No; body/guard rules apply | string | Sort by Values: `relevance`, `most-liked`, `date-posted`. |
| `region` | No; body/guard rules apply | string | Note, this doesn't filter the tiktoks only in a specfic region, it puts the proxy there. Use it in case you want to scrape posts only available for some country. Use 2 letter country codes like US, GB, FR, etc |
| `cursor` | No; body/guard rules apply | number | Cursor to get more videos. Get 'cursor' from previous response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_get_popular_creators

`scrapecreators-cli tiktok-get-popular-creators`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `page` | No; body/guard rules apply | number | Page number |
| `sortBy` | No; body/guard rules apply | string | Sort creators by engagement, follower count, or average views Values: `engagement`, `follower`, `avg_views`. |
| `followerCount` | No; body/guard rules apply | string | Filter by follower count range Values: `10K-100K`, `100K-1M`, `1M-10M`, `10M+`. |
| `creatorCountry` | No; body/guard rules apply | string | Country code of the creator Values: `AU`, `BR`, `CA`, `EG`, `FR`, `DE`, `ID`, `IL`, `IT`, `JP`, `MY`, `PH`, `RU`, `SA`, `SG`, `KR`, `ES`, `TW`, `TH`, `TR`, `AE`, `GB`, `US`, `VN`. |
| `audienceCountry` | No; body/guard rules apply | string | Country code of the audience/follower Values: `AU`, `BR`, `CA`, `EG`, `FR`, `DE`, `ID`, `IL`, `IT`, `JP`, `MY`, `PH`, `RU`, `SA`, `SG`, `KR`, `ES`, `TW`, `TH`, `TR`, `AE`, `GB`, `US`, `VN`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_get_song_details

`scrapecreators-cli tiktok-get-song-details`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `clipId` | Yes | string | This is a little confusing because this isn't songId like you'd think. It is the clipId. I guess because you can clip different portions of a song 🤷‍♂️ |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_tiktoks_using_song

`scrapecreators-cli tiktok-tiktoks-using-song`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `clipId` | No; body/guard rules apply | string | This is clipId. Can be found on a url like so: https://www.tiktok.com/music/That%27s-Who-I-Praise-7370375686554782506, where 7370375686554782506 is the clipId |
| `cursor` | No; body/guard rules apply | number | The cursor to get the next page of results. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_trending_feed

`scrapecreators-cli tiktok-trending-feed`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `region` | Yes | string | Where you want the proxy to be. This doesn't mean that you will only see TikToks from this region, you will just see the content that isn't banned in that region. |
| `trim` | No; body/guard rules apply | boolean | Set to true to get a trimmed response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_shop_shop_search

`scrapecreators-cli tiktok-shop-shop-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Term you want to search for |
| `page` | No; body/guard rules apply | number | Page number to retrieve |
| `region` | No; body/guard rules apply | string | Region to search shop products in. Non-US TikTok Shop regions are not reliable right now and may return limited or inconsistent results. Sorry for the inconvenience. Values: `US`, `GB`, `DE`, `FR`, `IT`, `ID`, `MY`, `MX`, `PH`, `SG`, `ES`, `TH`, `VN`, `BR`, `JP`, `IE`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_shop_shop_products

`scrapecreators-cli tiktok-shop-shop-products`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The TikTok Shop store URL. |
| `cursor` | No; body/guard rules apply | string | Cursor parameter from the previous response to retrieve the next page of products. Omit for the first page. |
| `sort_by` | No; body/guard rules apply | string | Sort products by best-selling items (`top`) or newest products (`new_releases`). Defaults to `top`. Values: `top`, `new_releases`. |
| `region` | No; body/guard rules apply | string | Region to get shop products from. Defaults to US if not provided. Non-US regions are not reliable right now and may return `not_found` or limited catalog data even when the shop appears in search. Sorry for the inconvenience. Values: `US`, `GB`, `DE`, `FR`, `IT`, `ID`, `MY`, `MX`, `PH`, `SG`, `ES`, `TH`, `VN`, `BR`, `JP`, `IE`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_shop_product_details

`scrapecreators-cli tiktok-shop-product-details`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL of the product to get details for. |
| `region` | No; body/guard rules apply | string | Region for the product details request. US is the reliable region right now; non-US regions should not be considered reliable and may return `bad_request` or missing product data. Sorry for the inconvenience. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_shop_product_reviews

`scrapecreators-cli tiktok-shop-product-reviews`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | No; body/guard rules apply | string | The URL of the product (required if product_id is not provided) |
| `product_id` | No; body/guard rules apply | string | The ID of the product (required if url is not provided) |
| `region` | No; body/guard rules apply | string | The region of the product. US is the reliable region right now; non-US regions should not be considered reliable and may return limited or inconsistent review data. Sorry for the inconvenience. |
| `page` | No; body/guard rules apply | number | The page number of the reviews |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_shop_user_showcase

`scrapecreators-cli tiktok-shop-user-showcase`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | The handle of the user |
| `region` | No; body/guard rules apply | string | Region to put the proxy in. Non-US TikTok Shop regions are not reliable right now and may return limited or inconsistent showcase data. Sorry for the inconvenience. |
| `cursor` | No; body/guard rules apply | string | The cursor to the next page of products |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_profile

`scrapecreators-cli instagram-profile`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Instagram handle |
| `trim` | No; body/guard rules apply | boolean | Set to true to get a trimmed response |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_basic_profile

`scrapecreators-cli instagram-basic-profile`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `userId` | No; body/guard rules apply | string | Instagram user id |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_posts

`scrapecreators-cli instagram-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Instagram handle |
| `next_max_id` | No; body/guard rules apply | string | Cursor to get next page of results. |
| `trim` | No; body/guard rules apply | boolean | Set to true to get a trimmed response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_user_tagged_posts

`scrapecreators-cli instagram-user-tagged-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `user_id` | Yes | string | Numeric Instagram user ID. |
| `cursor` | No; body/guard rules apply | string | Cursor returned by the previous response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_reels

`scrapecreators-cli instagram-reels`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `user_id` | No; body/guard rules apply | string | Instagram user id. Use this for faster response times. |
| `handle` | No; body/guard rules apply | string | Instagram handle. Use user_id for faster response times. |
| `max_id` | No; body/guard rules apply | string | Max id to get more reels. Get 'max_id' from previous response. |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_post_reel_info

`scrapecreators-cli instagram-post-reel-info`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Instagram post or reel URL |
| `region` | No; body/guard rules apply | string | 2 letter country code to set the proxy in |
| `trim` | No; body/guard rules apply | boolean | Set to true to get a trimmed response |
| `download_media` | No; body/guard rules apply | boolean | Set to true to download the video/images and get back permanent Supabase URLs. Costs 10 credits if media is found, 1 credit otherwise. |
| `include_play_count` | No; body/guard rules apply | boolean | Set to false to omit `video_play_count` and skip its additional fetch for a faster response. Defaults to true. |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_transcript

`scrapecreators-cli instagram-transcript`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Instagram post or reel URL |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_search_instagram

`scrapecreators-cli instagram-search-instagram`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | The username, hashtag, place, or keyword to search for. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_popular_search

`scrapecreators-cli instagram-popular-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | The Popular topic to search for. |
| `cursor` | No; body/guard rules apply | string | The opaque cursor returned by the previous response. Use it with the same query to fetch the next page of posts. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_search_hashtag_posts

`scrapecreators-cli instagram-search-hashtag-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `hashtag` | Yes | string | The hashtag to search for. Include or omit the #. |
| `date_posted` | No; body/guard rules apply | string | Only return Google-indexed posts found in this relative window. Values: `last-hour`, `last-day`, `last-week`, `last-month`, `last-year`. |
| `media_type` | No; body/guard rules apply | string | Use all to search public posts and reels, or reels to only return reels. Defaults to all. Values: `all`, `reels`. |
| `cursor` | No; body/guard rules apply | string | The cursor returned by the previous response. It is the next Google results page number and cannot exceed 11; cursor 12 or greater returns a 400 response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_search_instagram_profiles

`scrapecreators-cli instagram-search-instagram-profiles`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | The profile name or username to search for. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_search_reels

`scrapecreators-cli instagram-search-reels`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | The keyword to search for |
| `date_posted` | No; body/guard rules apply | string | Google-indexed date window. Recent hour/day filters are not supported because Google does not index Instagram reels reliably enough in those windows. Values: `last-week`, `last-month`, `last-year`. |
| `page` | No; body/guard rules apply | number | The page number to return. Must be between 1 and 11; page 12 or greater returns a 400 response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_get_reels_by_audio_id

`scrapecreators-cli instagram-get-reels-by-audio-id`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `audio_id` | Yes | string | The audio id from the Instagram audio page URL. |
| `cursor` | No; body/guard rules apply | string | Pagination cursor returned by Instagram from the previous response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_trending_reels

`scrapecreators-cli instagram-trending-reels`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_comments

`scrapecreators-cli instagram-comments`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL of the post or reel to get comments from |
| `cursor` | No; body/guard rules apply | string | The cursor to get more comments. Get 'cursor' from previous response. |
| `include_replies` | No; body/guard rules apply | boolean | Set to true to include replies for every returned comment. This always costs 15 credits because each comment requires a separate Instagram replies request. You will still be charged 15 credits if no replies are returned. This is much slower and may time out at 29 seconds. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_comment_replies

`scrapecreators-cli instagram-comment-replies`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The Instagram post or reel URL |
| `comment_id` | Yes | string | The parent comment ID from the Comments endpoint |
| `cursor` | No; body/guard rules apply | string | The cursor to get more replies. Get `cursor` from the previous response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_story_highlights

`scrapecreators-cli instagram-story-highlights`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `user_id` | No; body/guard rules apply | string | Instagram user id. Use for faster response times. |
| `handle` | No; body/guard rules apply | string | Instagram handle. Use user_id for faster response times. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_highlights_details

`scrapecreators-cli instagram-highlights-details`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard rules apply | string | The ID of the highlight to get details for |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_profile_post_count

`scrapecreators-cli instagram-profile-post-count`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Instagram handle |
| `allow_estimated` | No; body/guard rules apply | boolean | Set to true to return scaled estimates when Instagram abbreviates counts for profiles with more than 10,000 posts. Defaults to false; false or omitted returns an uncharged 422 when only an estimate is available. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### instagram_embed_html

`scrapecreators-cli instagram-embed-html`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Instagram handle |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### telegram_channel_details

`scrapecreators-cli telegram-channel-details`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Public Telegram handle, @handle, or t.me channel URL. |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### telegram_channel_posts

`scrapecreators-cli telegram-channel-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Public Telegram handle, @handle, or t.me channel URL. |
| `cursor` | No; body/guard rules apply | string | Numeric cursor returned by the previous page. Omit it for the latest posts. |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### telegram_post_details

`scrapecreators-cli telegram-post-details`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Public Telegram post URL. |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_channel_details

`scrapecreators-cli youtube-channel-details`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `channelId` | No; body/guard rules apply | string | YouTube channel ID. Can pass a channelId, handle or url |
| `handle` | No; body/guard rules apply | string | YouTube channel handle. Can pass a channelId, handle or url |
| `url` | No; body/guard rules apply | string | YouTube channel URL. Can pass a channelId, handle or url |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_channel_videos

`scrapecreators-cli youtube-channel-videos`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `channelId` | No; body/guard rules apply | string | YouTube channel ID |
| `handle` | No; body/guard rules apply | string | YouTube channel handle |
| `sort` | No; body/guard rules apply | string | Sort by latest or popular Values: `latest`, `popular`. |
| `continuationToken` | No; body/guard rules apply | string | Continuation token to get more videos. Get 'continuationToken' from previous response. |
| `is_paid_promotions` | No; body/guard rules apply | string | Set to 'true' to search YouTube's public paid product placement / sponsorship / endorsement search surface. This returns normal YouTube videos where the creator declared paid promotion. Cannot be combined with filter, uploadDate, sortBy, type, duration, or includeExtras. |
| `includeExtras` | No; body/guard rules apply | string | This will get you the like + comment count and the description. To get the full details of the video, use the /v1/youtube/video endpoint. Honestly, if you use this param, the error rate is higher. We might deprecate this param in the future. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_channel_playlists

`scrapecreators-cli youtube-channel-playlists`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `channelId` | No; body/guard rules apply | string | YouTube channel ID |
| `handle` | No; body/guard rules apply | string | YouTube channel handle |
| `continuationToken` | No; body/guard rules apply | string | Continuation token to get more playlists. Get 'continuationToken' from previous response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_channel_lives

`scrapecreators-cli youtube-channel-lives`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `channelId` | No; body/guard rules apply | string | YouTube channel ID |
| `handle` | No; body/guard rules apply | string | YouTube channel handle |
| `continuationToken` | No; body/guard rules apply | string | Continuation token to get more lives. Get 'continuationToken' from previous response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_channel_community_posts

`scrapecreators-cli youtube-channel-community-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `channelId` | No; body/guard rules apply | string | YouTube channel ID |
| `handle` | No; body/guard rules apply | string | YouTube channel handle |
| `continuationToken` | No; body/guard rules apply | string | Continuation token to get more community posts. Get 'continuationToken' from previous response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_channel_shorts

`scrapecreators-cli youtube-channel-shorts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | Can pass channelId or handle |
| `channelId` | No; body/guard rules apply | string | Can pass channelId or handle |
| `sort` | No; body/guard rules apply | string | Sort by newest or popular Values: `newest`, `popular`. |
| `continuationToken` | No; body/guard rules apply | string | Continuation token to get more videos. Get 'continuationToken' from previous response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_video_short_details

`scrapecreators-cli youtube-video-short-details`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | YouTube video or short URL |
| `language` | No; body/guard rules apply | string | Preferred response language (mapped to Accept-Language header; not guaranteed due to YouTube localization behavior). 2 letter language code, ie 'en', 'es', 'fr' etc. |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_transcript

`scrapecreators-cli youtube-transcript`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | YouTube video or short URL |
| `language` | No; body/guard rules apply | string | Language code, ie 'en', 'es', 'fr' or 'en-US'. Overrides the default track selection unless original_audio=true. If omitted, prefers captions matching the original spoken language when YouTube identifies the original audio. If that metadata is unavailable or ambiguous, prefers an auto-generated caption, otherwise the first caption track. If the requested or identified original language has no matching captions, the transcript will be null and no credits are charged. |
| `original_audio` | No; body/guard rules apply | boolean | Set to true to return captions only in the original spoken language identified by YouTube. Takes precedence over language. If the original audio cannot be reliably identified or has no matching captions, transcript, transcript_only_text, and language are null and no credits are charged. No extra lookup or credit cost; a returned transcript costs the usual 1 credit. Omit or set to false for the existing default selection. |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_video_sponsors

`scrapecreators-cli youtube-video-sponsors`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | YouTube video or short URL |
| `language` | No; body/guard rules apply | string | 2 letter language code used for transcript lookup, ie 'en', 'es', 'fr' etc. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_search

`scrapecreators-cli youtube-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Search query. For stricter title matching, use YouTube's intitle: operator, for example intitle:"Foursquare Swarm". Quoted queries by themselves may still be broadened by YouTube when no fresh exact matches are available. |
| `uploadDate` | No; body/guard rules apply | string | Upload date Values: `today`, `this_week`, `this_month`, `this_year`. |
| `sortBy` | No; body/guard rules apply | string | Sort by Values: `relevance`, `popular`. |
| `type` | No; body/guard rules apply | string | Type of content to search for Values: `videos`, `shorts`, `channels`, `playlists`. |
| `duration` | No; body/guard rules apply | string | Duration of the video. Only applies to videos (not shorts). Values: `under_3_min`, `between_3_and_20_min`, `over_20_min`. |
| `region` | No; body/guard rules apply | string | 2 letter country code of the country to put the proxy in. |
| `continuationToken` | No; body/guard rules apply | string | Continuation token to get more videos. Get 'continuationToken' from previous response. |
| `includeExtras` | No; body/guard rules apply | string | This will get you the like + comment count and the description. To get the full details of the video, use the /v1/youtube/video endpoint. *This will slow down the response slightly.* |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_search_typeahead

`scrapecreators-cli youtube-search-typeahead`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Partial or complete YouTube search query |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_search_by_hashtag

`scrapecreators-cli youtube-search-by-hashtag`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `hashtag` | Yes | string | Hashtag to search for |
| `continuationToken` | No; body/guard rules apply | string | Continuation token to get more videos. Get 'continuationToken' from previous response. |
| `type` | No; body/guard rules apply | string | Search for all types of content or only shorts Values: `all`, `shorts`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_comments

`scrapecreators-cli youtube-comments`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | YouTube video URL |
| `continuationToken` | No; body/guard rules apply | string | Continuation token to get more comments. Get 'continuationToken' from previous response. |
| `order` | No; body/guard rules apply | string | Order of comments Values: `top`, `newest`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_comment_replies

`scrapecreators-cli youtube-comment-replies`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `continuationToken` | Yes | string | Continuation token for the comment replies. Use 'repliesContinuationToken' from the Comments endpoint, or 'continuationToken' from a previous replies response to paginate. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_trending_shorts

`scrapecreators-cli youtube-trending-shorts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_playlist

`scrapecreators-cli youtube-playlist`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `playlist_id` | Yes | string | The ID of the YouTube playlist. In the YouTube URL it will be the 'list' parameter. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### youtube_community_post_details

`scrapecreators-cli youtube-community-post-details`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL of the YouTube community post to get |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### rumble_search

`scrapecreators-cli rumble-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Search query. |
| `cursor` | No; body/guard rules apply | string | Cursor from the previous response. This is the next page number, like 2 or 3. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### rumble_channel_videos

`scrapecreators-cli rumble-channel-videos`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | Rumble channel handle. If you'd prefer to use the URL instead, use the url parameter. |
| `url` | No; body/guard rules apply | string | Rumble channel URL. If you'd prefer to use the handle instead, use the handle parameter. |
| `cursor` | No; body/guard rules apply | string | Cursor from the previous response. This is the next page number, like 2 or 3. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### rumble_video

`scrapecreators-cli rumble-video`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Rumble video URL. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### rumble_transcript

`scrapecreators-cli rumble-transcript`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Rumble video URL. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### rumble_comments

`scrapecreators-cli rumble-comments`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Rumble video URL. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### linkedin_person_profile

`scrapecreators-cli linkedin-person-profile`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL of the LinkedIn profile to get |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### linkedin_company_page

`scrapecreators-cli linkedin-company-page`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL of the LinkedIn company page to get |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### linkedin_company_posts

`scrapecreators-cli linkedin-company-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL of the LinkedIn company page to get |
| `page` | No; body/guard rules apply | number | The page number to get |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### linkedin_search_posts

`scrapecreators-cli linkedin-search-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Keyword or phrase to search for in public LinkedIn posts |
| `date_posted` | No; body/guard rules apply | string | Date posted filter based on Google-indexed results Values: `last-hour`, `last-day`, `last-week`, `last-month`, `last-year`. |
| `cursor` | No; body/guard rules apply | string | The cursor returned from the previous response. The maximum cursor is 11; cursor 12 or greater returns a 400 response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### linkedin_post

`scrapecreators-cli linkedin-post`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL of the LinkedIn post to get |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### linkedin_post_transcript

`scrapecreators-cli linkedin-post-transcript`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL of the LinkedIn post to get the transcript from |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_profile

`scrapecreators-cli facebook-profile`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Facebook profile URL |
| `get_business_hours` | No; body/guard rules apply | string | Get the business's hours |
| `include_gated_profile` | No; body/guard rules apply | string | When true, returns limited public fields for gated or age-restricted profiles. Ignored for normal public profiles — those still return the full response. |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_profile_reels

`scrapecreators-cli facebook-profile-reels`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Facebook page URL |
| `next_page_id` | No; body/guard rules apply | string | To paginate through to the next page |
| `cursor` | No; body/guard rules apply | string | To paginate through to the next page |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_profile_photos

`scrapecreators-cli facebook-profile-photos`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Facebook page URL |
| `next_page_id` | No; body/guard rules apply | string | To paginate through to the next page |
| `cursor` | No; body/guard rules apply | string | To paginate through to the next page |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_profile_posts

`scrapecreators-cli facebook-profile-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | No; body/guard rules apply | string | Facebook profile URL |
| `pageId` | No; body/guard rules apply | string | Facebook profile page id |
| `cursor` | No; body/guard rules apply | string | To paginate through the posts |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_profile_events

`scrapecreators-cli facebook-profile-events`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL of the public Facebook page |
| `cursor` | No; body/guard rules apply | string | The cursor to paginate to get more events |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_post

`scrapecreators-cli facebook-post`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL of the post to get |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_transcript

`scrapecreators-cli facebook-transcript`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Facebook post URL |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_comments

`scrapecreators-cli facebook-comments`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | No; body/guard rules apply | string | Facebook post URL (or reel URL) |
| `feedback_id` | No; body/guard rules apply | string | Using feedback_id (instead of url) will *really* speed up the request. You can get the feedback_id when you make a request to /v1/facebook/post. |
| `cursor` | No; body/guard rules apply | string | Cursor to get more comments. Get 'cursor' from previous response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_comment_replies

`scrapecreators-cli facebook-comment-replies`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `feedback_id` | Yes | string | The *feedback_id* of the comment. Be careful, this is not the comment id. You can get the feedback_id from the /v1/facebook/post/comments endpoint. |
| `expansion_token` | Yes | string | The expansion_token of the comment. You can get the expansion_token from the /v1/facebook/post/comments endpoint. |
| `cursor` | No; body/guard rules apply | string | The cursor to paginate to the next page |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_facebook_group_info

`scrapecreators-cli facebook-facebook-group-info`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | No; body/guard rules apply | string | The Facebook group URL. Group sub-page URLs such as /about work too. |
| `group_id` | No; body/guard rules apply | string | The numeric Facebook group ID. Provide this instead of url if you already have it. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_facebook_group_posts

`scrapecreators-cli facebook-facebook-group-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | No; body/guard rules apply | string | The URL of the group |
| `group_id` | No; body/guard rules apply | string | The ID of the group |
| `sort_by` | No; body/guard rules apply | string | How to sort the posts. Defaults to CHRONOLOGICAL. Values: `TOP_POSTS`, `RECENT_ACTIVITY`, `CHRONOLOGICAL`, `CHRONOLOGICAL_LISTINGS`. |
| `cursor` | No; body/guard rules apply | string | The cursor to paginate to the next page |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### github_user

`scrapecreators-cli github-user`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | GitHub username/handle of the user you want the details for |
| `url` | No; body/guard rules apply | string | GitHub user URL, e.g. https://github.com/torvalds. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### github_repositories

`scrapecreators-cli github-repositories`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | GitHub username/handle of the user you want the repositories for |
| `url` | No; body/guard rules apply | string | GitHub user URL, e.g. https://github.com/kentcdodds. |
| `type` | No; body/guard rules apply | string | Repository type. Defaults to owner. GitHub also supports all and member. Values: `owner`, `all`, `member`. |
| `sort` | No; body/guard rules apply | string | Sort by created, updated, pushed, or full_name. Defaults to updated. Values: `created`, `updated`, `pushed`, `full_name`. |
| `direction` | No; body/guard rules apply | string | Sort direction: ascending or descending. Values: `asc`, `desc`. |
| `cursor` | No; body/guard rules apply | number | Cursor from the previous response. Defaults to 1. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### github_pull_requests

`scrapecreators-cli github-pull-requests`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | GitHub username/handle of the user you want pull requests for |
| `since` | No; body/guard rules apply | string | Only return pull requests created on or after this date. Use YYYY-MM-DD. |
| `until` | No; body/guard rules apply | string | Only return pull requests created on or before this date. Use YYYY-MM-DD. |
| `cursor` | No; body/guard rules apply | number | Cursor from the previous response. Defaults to 1. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### github_activity

`scrapecreators-cli github-activity`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | GitHub handle |
| `url` | No; body/guard rules apply | string | GitHub user URL, e.g. https://github.com/kentcdodds. |
| `year` | No; body/guard rules apply | number | When provided, returns profile contribution activity for that year. Defaults to the current year. |
| `cursor` | No; body/guard rules apply | number | Cursor from the previous response. Pages backward by month through the selected year. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### github_followers

`scrapecreators-cli github-followers`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | GitHub username/handle of the user you want the followers for |
| `url` | No; body/guard rules apply | string | GitHub user URL, e.g. https://github.com/torvalds. |
| `cursor` | No; body/guard rules apply | number | Cursor from the previous response. Defaults to 1. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### github_following

`scrapecreators-cli github-following`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | GitHub handle |
| `url` | No; body/guard rules apply | string | GitHub profile URL |
| `cursor` | No; body/guard rules apply | number | Cursor from the previous response. Defaults to 1. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### github_contributions

`scrapecreators-cli github-contributions`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | GitHub handle |
| `url` | No; body/guard rules apply | string | GitHub profile URL |
| `year` | No; body/guard rules apply | number | Contribution graph year. Defaults to the current year. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### github_repository

`scrapecreators-cli github-repository`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | GitHub repository URL |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### github_trending_repositories

`scrapecreators-cli github-trending-repositories`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `language` | No; body/guard rules apply | string | Optional coding language, e.g. javascript, python, or go. |
| `since` | No; body/guard rules apply | string | Trending range: daily, weekly, or monthly. Defaults to daily. Values: `daily`, `weekly`, `monthly`. |
| `spoken_language_code` | No; body/guard rules apply | string | Optional spoken language code filter, e.g. en. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### github_trending_developers

`scrapecreators-cli github-trending-developers`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `language` | No; body/guard rules apply | string | Optional trending coding language, e.g. javascript, python, or go. |
| `since` | No; body/guard rules apply | string | Trending range: daily, weekly, or monthly. Defaults to daily. Values: `daily`, `weekly`, `monthly`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_marketplace_marketplace_location_search

`scrapecreators-cli facebook-marketplace-marketplace-location-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Location search query |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_marketplace_marketplace_search

`scrapecreators-cli facebook-marketplace-marketplace-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Search keyword |
| `category_id` | No; body/guard rules apply | string | Numeric Facebook Marketplace category ID. Listing results include this value as category_id. |
| `lat` | Yes | number | Latitude for the search location |
| `lng` | Yes | number | Longitude for the search location |
| `radius_km` | No; body/guard rules apply | number | Search radius in kilometers |
| `min_price` | No; body/guard rules apply | number | Minimum listing price |
| `max_price` | No; body/guard rules apply | number | Maximum listing price |
| `sort_by` | No; body/guard rules apply | string | Facebook Marketplace sort option. creation_time_descend usually orders the first pages newest first, but Facebook can insert newer listings on later cursor pages. Values: `suggested`, `distance_ascend`, `creation_time_descend`, `price_ascend`, `price_descend`. |
| `delivery_method` | No; body/guard rules apply | string | Delivery filter Values: `all`, `local_pickup`, `shipping`. |
| `condition` | No; body/guard rules apply | string | Condition filter Values: `new`, `used_like_new`, `used_good`, `used_fair`. |
| `date_listed` | No; body/guard rules apply | string | Facebook Marketplace date filter. Uses the same calendar-day buckets as the UI, so last_24_hours can include listings from the prior calendar day. Values: `all`, `1`, `7`, `30`, `last_24_hours`, `last_7_days`, `last_30_days`. |
| `availability` | No; body/guard rules apply | string | Availability filter Values: `available`, `sold`, `all`. |
| `cursor` | No; body/guard rules apply | string | Opaque pagination cursor returned from the previous response. Pass it back as-is. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_marketplace_marketplace_item

`scrapecreators-cli facebook-marketplace-marketplace-item`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard rules apply | string | Facebook Marketplace item id |
| `url` | No; body/guard rules apply | string | Facebook Marketplace item URL |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_events_search_events

`scrapecreators-cli facebook-events-search-events`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | The query to search for |
| `cursor` | No; body/guard rules apply | string | The cursor to paginate to the next page |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_events_events

`scrapecreators-cli facebook-events-events`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL of the city's Facebook Events page |
| `time` | No; body/guard rules apply | string | The time frame to search for. Defaults to all time Values: `today`, `this_week`, `next_week`. |
| `cursor` | No; body/guard rules apply | string | The cursor to paginate to the next page |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_events_event_details

`scrapecreators-cli facebook-events-event-details`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard rules apply | string | The ID of the event |
| `url` | No; body/guard rules apply | string | The URL of the event |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_ad_library_ad_details

`scrapecreators-cli facebook-ad-library-ad-details`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard rules apply | string | Facebook Ad Id |
| `url` | No; body/guard rules apply | string | Facebook Ad URL |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_ad_library_ad_transcript

`scrapecreators-cli facebook-ad-library-ad-transcript`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard rules apply | string | Facebook Ad Id |
| `url` | No; body/guard rules apply | string | Facebook Ad URL |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_ad_library_search

`scrapecreators-cli facebook-ad-library-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Keyword to search for |
| `sort_by` | No; body/guard rules apply | string | Sort by impressions (high to low), or Most Recent (relevancy_monthly_grouped). Defaults to impressions. Values: `total_impressions`, `relevancy_monthly_grouped`. |
| `search_type` | No; body/guard rules apply | string | If you want to search by exact phrase or not Values: `keyword_unordered`, `keyword_exact_phrase`. |
| `ad_type` | No; body/guard rules apply | string | Search for all ads or only political and issue ads Values: `all`, `political_and_issue_ads`. |
| `country` | No; body/guard rules apply | string | This can only be one country. It has to be the 2 letter code for the country. It defaults to ALL. |
| `language` | No; body/guard rules apply | string | Language to filter ads on. Needs to be a 2 letter language code, such as EN, ES, or FR. |
| `status` | No; body/guard rules apply | string | Status of the ad. Defaults to ACTIVE. Values: `ALL`, `ACTIVE`, `INACTIVE`. |
| `media_type` | No; body/guard rules apply | string | Media type of the ad. Defaults to ALL. Meme just means the ad has text and an image. No clue why they call it meme. Values: `ALL`, `IMAGE`, `VIDEO`, `MEME`, `IMAGE_AND_MEME`, `NONE`. |
| `start_date` | No; body/guard rules apply | string | Impressions start date. Needs to be in YYYY-MM-DD format. |
| `end_date` | No; body/guard rules apply | string | Impressions end date. Needs to be in YYYY-MM-DD format. |
| `cursor` | No; body/guard rules apply | string | Cursor to paginate through results |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### facebook_ad_library_search_post

`scrapecreators-cli facebook-ad-library-search-post`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | No; body/guard rules apply | string | Keyword to search for |
| `sort_by` | No; body/guard rules apply | string | Sort by impressions (high to low), or Most Recent (relevancy_monthly_grouped). Defaults to impressions. Values: `total_impressions`, `relevancy_monthly_grouped`. |
| `search_type` | No; body/guard rules apply | string | If you want to search by exact phrase or not Values: `keyword_unordered`, `keyword_exact_phrase`. |
| `ad_type` | No; body/guard rules apply | string | Search for all ads or only political and issue ads Values: `all`, `political_and_issue_ads`. |
| `country` | No; body/guard rules apply | string | This can only be one country. It has to be the 2 letter code for the country. It defaults to ALL. |
| `language` | No; body/guard rules apply | string | Language to filter ads on. Needs to be a 2 letter language code, such as EN, ES, or FR. |
| `status` | No; body/guard rules apply | string | Status of the ad. Defaults to ACTIVE. Values: `ALL`, `ACTIVE`, `INACTIVE`. |
| `media_type` | No; body/guard rules apply | string | Media type of the ad. Defaults to ALL. Meme just means the ad has text and an image. No clue why they call it meme. Values: `ALL`, `IMAGE`, `VIDEO`, `MEME`, `IMAGE_AND_MEME`, `NONE`. |
| `start_date` | No; body/guard rules apply | string | Impressions start date. Needs to be in YYYY-MM-DD format. |
| `end_date` | No; body/guard rules apply | string | Impressions end date. Needs to be in YYYY-MM-DD format. |
| `cursor` | No; body/guard rules apply | string | Cursor to paginate through results |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body/guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body/guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. |

A JSON body is required; body flags, payload or payload_file are alternatives. Body requires: `query`.

#### facebook_ad_library_company_ads

`scrapecreators-cli facebook-ad-library-company-ads`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `pageId` | No; body/guard rules apply | string | The companies ad library page id. You can get this with my Search For Companies Endpoint. Can either use this or companyName |
| `companyName` | No; body/guard rules apply | string | The name of the company. Can either use this or pageId |
| `country` | No; body/guard rules apply | string | This can only be one country. It has to be the 2 letter code for the country. It defaults to ALL. |
| `status` | No; body/guard rules apply | string | Status of the ad. Defaults to ACTIVE. Values: `ALL`, `ACTIVE`, `INACTIVE`. |
| `media_type` | No; body/guard rules apply | string | Media type of the ad. Defaults to ALL. Meme refers to ads with image and text. Not sure why they call it meme. Values: `ALL`, `IMAGE`, `VIDEO`, `MEME`, `IMAGE_AND_MEME`, `NONE`. |
| `language` | No; body/guard rules apply | string | Language to filter ads on. Needs to be 2 letter language code, ie EN, ES, FR, etc |
| `sort_by` | No; body/guard rules apply | string | Sort by impressions (high to low), or Most Recent (relevancy_monthly_grouped). Defaults to impressions. Values: `total_impressions`, `relevancy_monthly_grouped`. |
| `start_date` | No; body/guard rules apply | string | Start date to search for. Format: YYYY-MM-DD |
| `end_date` | No; body/guard rules apply | string | End date to search for. Format: YYYY-MM-DD |
| `cursor` | No; body/guard rules apply | string | Cursor to paginate through results |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

Provide pageId or companyName in the applicable query/body; an empty selector is rejected locally.

#### facebook_ad_library_company_ads_post

`scrapecreators-cli facebook-ad-library-company-ads-post`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `pageId` | No; body/guard rules apply | string | The companies ad library page id. You can get this with my Search For Companies Endpoint. Can either use this or companyName |
| `companyName` | No; body/guard rules apply | string | The name of the company. Can either use this or pageId |
| `country` | No; body/guard rules apply | string | This can only be one country. It has to be the 2 letter code for the country. It defaults to ALL. |
| `status` | No; body/guard rules apply | string | Status of the ad. Defaults to ACTIVE. Values: `ALL`, `ACTIVE`, `INACTIVE`. |
| `media_type` | No; body/guard rules apply | string | Media type of the ad. Defaults to ALL. Meme refers to ads with image and text. Not sure why they call it meme. Values: `ALL`, `IMAGE`, `VIDEO`, `MEME`, `IMAGE_AND_MEME`, `NONE`. |
| `language` | No; body/guard rules apply | string | Language to filter ads on. Needs to be 2 letter language code, ie EN, ES, FR, etc |
| `sort_by` | No; body/guard rules apply | string | Sort by impressions (high to low), or Most Recent (relevancy_monthly_grouped). Defaults to impressions. Values: `total_impressions`, `relevancy_monthly_grouped`. |
| `start_date` | No; body/guard rules apply | string | Start date to search for. Format: YYYY-MM-DD |
| `end_date` | No; body/guard rules apply | string | End date to search for. Format: YYYY-MM-DD |
| `cursor` | No; body/guard rules apply | string | Cursor to paginate through results |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body/guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body/guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. |

A JSON body is required; body flags, payload or payload_file are alternatives. Body requires: .

Provide pageId or companyName in the applicable query/body; an empty selector is rejected locally.

#### facebook_ad_library_search_for_companies

`scrapecreators-cli facebook-ad-library-search-for-companies`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Keyword to search for |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_ad_library_ad_library_search

`scrapecreators-cli tiktok-ad-library-ad-library-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | No; body/guard rules apply | string | General ad search. Provide either query or advertiser_name, not both. |
| `advertiser_name` | No; body/guard rules apply | string | Advertiser name to resolve through TikTok's typeahead and search by advertiser entity. Falls back to TikTok's name search when no entity matches. Provide either advertiser_name or query, not both. |
| `adv_biz_ids` | No; body/guard rules apply | string | TikTok advertiser business ID from a See all ads link. Use it with advertiser_name to pin the exact advertiser. Required companion: advertiser_name; ID-only searches return 400 because TikTok ignores the ID without the name. |
| `cursor` | No; body/guard rules apply | string | Opaque cursor returned from the previous response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### tiktok_ad_library_ad_library_ad

`scrapecreators-cli tiktok-ad-library-ad-library-ad`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `ad_id` | Yes | string | Creative Center Top Ads material ID or URL, or a public Ads Library ad ID or library.tiktok.com detail URL. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### google_ad_library_company_ads

`scrapecreators-cli google-ad-library-company-ads`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `domain` | No; body/guard rules apply | string | The domain of the company |
| `advertiser_id` | No; body/guard rules apply | string | The advertiser id of the company |
| `topic` | No; body/guard rules apply | string | The topic to search for. If you search for 'political', you will also need to pass a 'region', like 'US' or 'AU' Values: `all`, `political`. |
| `region` | No; body/guard rules apply | string | The region to search for. Defaults to anywhere |
| `start_date` | No; body/guard rules apply | string | Start date to search for. Format: YYYY-MM-DD |
| `end_date` | No; body/guard rules apply | string | End date to search for. Format: YYYY-MM-DD |
| `platform` | No; body/guard rules apply | string | Platform to search for. Values: `google_maps`, `google_play`, `google_search`, `google_shopping`, `youtube`. |
| `format` | No; body/guard rules apply | string | Ad format to search for. Values: `text`, `image`, `video`. |
| `get_ad_details` | No; body/guard rules apply | string | Set to true to get the ad details. Will cost 25 credits. |
| `cursor` | No; body/guard rules apply | string | Cursor to paginate through results |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### google_ad_library_ad_details

`scrapecreators-cli google-ad-library-ad-details`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The url of the ad |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### google_ad_library_advertiser_search

`scrapecreators-cli google-ad-library-advertiser-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | The query to search for |
| `region` | No; body/guard rules apply | string | 2-letter country code to search in. Defaults to US when omitted. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### linkedin_ad_library_search_ads

`scrapecreators-cli linkedin-ad-library-search-ads`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `company` | No; body/guard rules apply | string | The company name to search for. 'Microsoft' for example |
| `keyword` | No; body/guard rules apply | string | The keyword to search for |
| `companyId` | No; body/guard rules apply | string | The company id to search for |
| `countries` | No; body/guard rules apply | string | Comma separated list of countries. Example: US,CA,MX |
| `startDate` | No; body/guard rules apply | string | Start date in YYYY-MM-DD format. Must be used with endDate and cannot be earlier than the date one year ago. |
| `endDate` | No; body/guard rules apply | string | End date in YYYY-MM-DD format. Must be used with startDate and cannot be today or a future date. |
| `paginationToken` | No; body/guard rules apply | string | Pagination token to paginate through results |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### linkedin_ad_library_ad_details

`scrapecreators-cli linkedin-ad-library-ad-details`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The url of the ad |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### twitter_profile

`scrapecreators-cli twitter-profile`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Twitter handle |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### twitter_user_tweets

`scrapecreators-cli twitter-user-tweets`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Twitter handle |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### twitter_tweet_details

`scrapecreators-cli twitter-tweet-details`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Tweet URL |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### twitter_transcript

`scrapecreators-cli twitter-transcript`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Tweet URL |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### twitter_community

`scrapecreators-cli twitter-community`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Community URL |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### twitter_community_tweets

`scrapecreators-cli twitter-community-tweets`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Community URL |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### reddit_subreddit_details

`scrapecreators-cli reddit-subreddit-details`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `subreddit` | No; body/guard rules apply | string | Subreddit name. MUST be case sensitive. So 'AskReddit' not 'askreddit'. |
| `url` | No; body/guard rules apply | string | Subreddit URL |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### reddit_subreddit_posts

`scrapecreators-cli reddit-subreddit-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `subreddit` | Yes | string | Subreddit name |
| `timeframe` | No; body/guard rules apply | string | Timeframe to get posts from Values: `all`, `day`, `week`, `month`, `year`. |
| `sort` | No; body/guard rules apply | string | Sort order Values: `best`, `hot`, `new`, `top`, `rising`. |
| `after` | No; body/guard rules apply | string | After to get more posts. Get 'after' from previous response. |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### reddit_subreddit_search

`scrapecreators-cli reddit-subreddit-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `subreddit` | Yes | string | Subreddit name (e.g. 'Fitness', not 'r/Fitness' or a full URL) |
| `query` | No; body/guard rules apply | string | Search query to find matching content |
| `sort` | No; body/guard rules apply | string | Sort order. For posts/media: relevance, hot, top, new, comments. For comments: relevance, top, new Values: `relevance`, `hot`, `top`, `new`, `comments`. |
| `timeframe` | No; body/guard rules apply | string | Timeframe to filter results Values: `all`, `year`, `month`, `week`, `day`, `hour`. |
| `cursor` | No; body/guard rules apply | string | Cursor to get more results. Get 'cursor' from previous response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### reddit_post

`scrapecreators-cli reddit-post`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Reddit post URL |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### reddit_post_comments

`scrapecreators-cli reddit-post-comments`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Reddit post URL |
| `cursor` | No; body/guard rules apply | string | One opaque cursor returned by the previous response to get more comments or replies. Do not combine multiple cursors. |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### reddit_post_comments_post

`scrapecreators-cli reddit-post-comments-post`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | No; body/guard rules apply | string | Reddit post URL |
| `cursor` | No; body/guard rules apply | string | One opaque cursor returned by the previous response to get more comments or replies. Do not combine multiple cursors. |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body/guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body/guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. |

A JSON body is required; body flags, payload or payload_file are alternatives. Body requires: `url`.

#### reddit_post_transcript

`scrapecreators-cli reddit-post-transcript`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Reddit post URL or direct v.redd.it video URL |
| `language` | No; body/guard rules apply | string | 2 letter language code. Defaults to en. |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### reddit_search

`scrapecreators-cli reddit-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Search query |
| `filter` | No; body/guard rules apply | string | Search posts or comments Values: `posts`, `comments`. |
| `sort` | No; body/guard rules apply | string | Sort by. Comment search supports relevance, new, and top; comment_count is for post search only. Values: `relevance`, `new`, `top`, `comment_count`. |
| `timeframe` | No; body/guard rules apply | string | Post search timeframe Values: `all`, `day`, `week`, `month`, `year`. |
| `after` | No; body/guard rules apply | string | Used to paginate to next page |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### truth_social_profile

`scrapecreators-cli truth-social-profile`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Truth Social username |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### truth_social_user_posts

`scrapecreators-cli truth-social-user-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | Truth Social username |
| `user_id` | No; body/guard rules apply | string | Truth Social user id. Use this for faster response times. Trumps is 107780257626128497. It is the 'id' field in the profile endpoint. |
| `next_max_id` | No; body/guard rules apply | string | Used to paginate to next page |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### truth_social_post

`scrapecreators-cli truth-social-post`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Truth Social post URL |
| `download_media` | No; body/guard rules apply | boolean | Set to true to download the attached video/images and get back permanent Supabase URLs. Costs 10 credits if media is found, 1 credit otherwise. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### threads_profile

`scrapecreators-cli threads-profile`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Threads username |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### threads_posts

`scrapecreators-cli threads-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Threads username |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### threads_post

`scrapecreators-cli threads-post`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL of the post to get |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### threads_search_by_keyword

`scrapecreators-cli threads-search-by-keyword`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Keyword to search for |
| `start_date` | No; body/guard rules apply | string | Start date to search for |
| `end_date` | No; body/guard rules apply | string | End date to search for |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### threads_search_users

`scrapecreators-cli threads-search-users`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Username to search for |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### bluesky_profile

`scrapecreators-cli bluesky-profile`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Bluesky handle |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### bluesky_posts

`scrapecreators-cli bluesky-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | Bluesky handle |
| `user_id` | No; body/guard rules apply | string | Bluesky 'did'. (For some reason Bluesky calls their user ids, 'did' for whatever reason) |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### bluesky_post

`scrapecreators-cli bluesky-post`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Bluesky post URL |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### pinterest_search

`scrapecreators-cli pinterest-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Search query |
| `cursor` | No; body/guard rules apply | string | Cursor |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### pinterest_pin

`scrapecreators-cli pinterest-pin`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Pinterest pin URL |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### pinterest_user_boards

`scrapecreators-cli pinterest-user-boards`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | The username of the user to get boards for. (e.g. broadstbullycom from https://www.pinterest.com/broadstbullycom/) |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### pinterest_board

`scrapecreators-cli pinterest-board`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL of the board to get |
| `cursor` | No; body/guard rules apply | string | The cursor to get the next page of results |
| `trim` | No; body/guard rules apply | boolean | Set to true for a trimmed down version of the response |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### google_search

`scrapecreators-cli google-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Search query |
| `region` | No; body/guard rules apply | string | 2 letter country code, ie US, UK, CA, etc This will show results from that country |
| `date_posted` | No; body/guard rules apply | string | Date posted Values: `last-hour`, `last-day`, `last-week`, `last-month`, `last-year`. |
| `page` | No; body/guard rules apply | number | Page number to retrieve. Must be between 1 and 11; page 12 or greater returns a 400 response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### twitch_profile

`scrapecreators-cli twitch-profile`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Twitch handle |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### twitch_user_videos

`scrapecreators-cli twitch-user-videos`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Twitch handle |
| `filter_by` | No; body/guard rules apply | string | Filter by Values: `HIGHLIGHT`, `ARCHIVE`, `UPLOAD`. |
| `sort_by` | No; body/guard rules apply | string | Sort by Values: `TIME`, `VIEWS`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### twitch_user_schedule

`scrapecreators-cli twitch-user-schedule`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Twitch handle |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### twitch_clip_transcript

`scrapecreators-cli twitch-clip-transcript`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Twitch clip URL |
| `use_ai_as_fallback` | No; body/guard rules apply | boolean | Use AI transcription only when native captions are unavailable. Costs 10 credits when an AI transcript is returned. Defaults to false. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### twitch_clip

`scrapecreators-cli twitch-clip`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Twitch clip URL |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### apple_music_artist

`scrapecreators-cli apple-music-artist`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard rules apply | string | Apple Music artist id. If you'd prefer to use the URL instead, you can use the url parameter instead. |
| `url` | No; body/guard rules apply | string | Apple Music artist URL. If you'd prefer to use the id instead, you can use the id parameter instead. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### apple_music_album

`scrapecreators-cli apple-music-album`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard rules apply | string | Apple Music album id. If you'd prefer to use the URL instead, you can use the url parameter instead. |
| `url` | No; body/guard rules apply | string | Apple Music album URL. If you'd prefer to use the id instead, you can use the id parameter instead. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### apple_music_track

`scrapecreators-cli apple-music-track`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard rules apply | string | Apple Music song id. Some songs have standalone song URLs; for album tracks, use the url parameter. |
| `url` | No; body/guard rules apply | string | Apple Music song URL or album track URL. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### apple_music_search

`scrapecreators-cli apple-music-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Search query |
| `type` | No; body/guard rules apply | string | Result type to return. Use all, song, album, artist, playlist, station, music_video, or radio_episode. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### spotify_artist

`scrapecreators-cli spotify-artist`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard rules apply | string | Spotify artist id. If you'd prefer to use the URL instead, you can use the url parameter instead. |
| `url` | No; body/guard rules apply | string | Spotify artist URL. If you'd prefer to use the id instead, you can use the id parameter instead. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### spotify_track

`scrapecreators-cli spotify-track`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard rules apply | string | Spotify track id. If you'd prefer to use the URL instead, you can use the url parameter instead. |
| `url` | No; body/guard rules apply | string | Spotify song URL. If you'd prefer to use the id instead, you can use the id parameter instead. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### spotify_album

`scrapecreators-cli spotify-album`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard rules apply | string | Spotify album id. If you'd prefer to use the URL instead, you can use the url parameter instead. |
| `url` | No; body/guard rules apply | string | Spotify album URL. If you'd prefer to use the id instead, you can use the id parameter instead. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### spotify_playlist

`scrapecreators-cli spotify-playlist`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard rules apply | string | Spotify playlist id. If you'd prefer to use the URL instead, you can use the url parameter instead. |
| `url` | No; body/guard rules apply | string | Spotify playlist URL. If you'd prefer to use the id instead, you can use the id parameter instead. |
| `cursor` | No; body/guard rules apply | string | Cursor returned by the previous response. Omit it for the first page. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### spotify_search

`scrapecreators-cli spotify-search`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Search query |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### spotify_podcast

`scrapecreators-cli spotify-podcast`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard rules apply | string | Spotify podcast id. If you'd prefer to use the URL instead, you can use the url parameter instead. |
| `url` | No; body/guard rules apply | string | Spotify podcast URL. If you'd prefer to use the id instead, you can use the id parameter instead. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### spotify_podcast_episodes

`scrapecreators-cli spotify-podcast-episodes`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard rules apply | string | Spotify podcast id. If you'd prefer to use the URL instead, you can use the url parameter instead. |
| `url` | No; body/guard rules apply | string | Spotify podcast URL. If you'd prefer to use the id instead, you can use the id parameter instead. |
| `cursor` | No; body/guard rules apply | number | Cursor returned by the previous response. Omit for the first page. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### soundcloud_artist

`scrapecreators-cli soundcloud-artist`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | SoundCloud artist handle. If you'd prefer to use the URL instead, you can use the url parameter instead. |
| `url` | No; body/guard rules apply | string | SoundCloud artist URL. If you'd prefer to use the handle instead, you can use the handle parameter instead. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### soundcloud_artist_tracks

`scrapecreators-cli soundcloud-artist-tracks`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | SoundCloud artist handle. If you'd prefer to use the URL instead, you can use the url parameter instead. |
| `url` | No; body/guard rules apply | string | SoundCloud artist tracks URL. If you'd prefer to use the handle instead, you can use the handle parameter instead. |
| `cursor` | No; body/guard rules apply | string | Cursor to get more tracks. Get 'cursor' from previous response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### soundcloud_track

`scrapecreators-cli soundcloud-track`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | SoundCloud track URL. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### kwai_profile

`scrapecreators-cli kwai-profile`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | Kwai profile handle. Use this or url. |
| `url` | No; body/guard rules apply | string | Kwai profile URL. Use this or handle. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### kwai_user_posts

`scrapecreators-cli kwai-user-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | No; body/guard rules apply | string | Kwai profile handle. Use this or url. |
| `url` | No; body/guard rules apply | string | Kwai profile URL. Use this or handle. |
| `cursor` | No; body/guard rules apply | string | Cursor from the previous response for the next page |
| `count` | No; body/guard rules apply | number | Number of posts to return, max 50 |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### kwai_post

`scrapecreators-cli kwai-post`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | No; body/guard rules apply | string | Kwai post URL |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### kick_clip_transcript

`scrapecreators-cli kick-clip-transcript`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Kick clip URL |
| `use_ai_as_fallback` | No; body/guard rules apply | boolean | Use AI transcription only when native captions are unavailable. Costs 10 credits when an AI transcript is returned. Defaults to false. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### kick_clip

`scrapecreators-cli kick-clip`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Kick clip URL |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### snapchat_user_profile

`scrapecreators-cli snapchat-user-profile`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | Snapchat username |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### snapchat_spotlight_by_link

`scrapecreators-cli snapchat-spotlight-by-link`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Snapchat Spotlight URL. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### snapchat_spotlight_comments_by_link

`scrapecreators-cli snapchat-spotlight-comments-by-link`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Snapchat Spotlight URL. |
| `cursor` | No; body/guard rules apply | string | Pagination cursor from the previous response. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### creator_tools_find_social_profiles

`scrapecreators-cli creator-tools-find-social-profiles`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `platform` | Yes | string | Source social platform Values: `instagram`, `tiktok`, `youtube`, `x`, `twitter`, `facebook`. |
| `handle` | Yes | string | Creator handle without a profile URL. A leading @ is optional. |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### creator_tools_get_age_and_gender

`scrapecreators-cli creator-tools-get-age-and-gender`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | URL to users social profile |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### linktree_linktree_page

`scrapecreators-cli linktree-linktree-page`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | URL to Linktree page |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### komi_komi_page

`scrapecreators-cli komi-komi-page`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | URL to Komi page |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### pillar_pillar_page

`scrapecreators-cli pillar-pillar-page`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | URL to Pillar page |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### linkbio_linkbio_page

`scrapecreators-cli linkbio-linkbio-page`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | URL to Linkbio (lnk.bio) page |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### amazon_shop_amazon_shop_page

`scrapecreators-cli amazon-shop-amazon-shop-page`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | URL to Amazon Shop page |
| `pageToken` | No; body/guard rules apply | string | Opaque page token returned by a previous response for the same shop URL. Pass it back unchanged and do not infer the response type from its prefix. A page can contain lists, videos, or both. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### scrapecreators_get_credit_balance

`scrapecreators-cli scrapecreators-get-credit-balance`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |

#### scrapecreators_get_request_history

`scrapecreators-cli scrapecreators-get-request-history`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `page` | No; body/guard rules apply | string | Page number for pagination (max 100) |
| `endpoint` | No; body/guard rules apply | string | Filter by endpoint name (partial match) |
| `statusCode` | No; body/guard rules apply | string | Filter by HTTP status code |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |

#### scrapecreators_get_daily_usage

`scrapecreators-cli scrapecreators-get-daily-usage`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |

#### scrapecreators_get_most_used_routes

`scrapecreators-cli scrapecreators-get-most-used-routes`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `start_time` | No; body/guard rules apply | string | Start of time range (ISO 8601 format) |
| `end_time` | No; body/guard rules apply | string | End of time range (ISO 8601 format) |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |

#### linkme_profile

`scrapecreators-cli linkme-profile`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Linkme profile URL |
| `cache_max_age` | No; body/guard rules apply | string | Maximum acceptable provider-cache age; a miss may consume the normal endpoint credits. Values: `1d`, `3d`, `7d`, `14d`, `30d`. |
| `account` | No; body/guard rules apply | string | Named private ScrapeCreators account; selects credentials, not a remote account ID. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### list_accounts

`scrapecreators-cli list-accounts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| None | No | None | Local helper, accepts no arguments |

#### research_batch

`scrapecreators-cli research-batch`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `requests` | Yes | array | See the exact schema before calling. minItems: `1`. maxItems: `20`. Items: object. |
| `max_calls` | Yes | integer | See the exact schema before calling. minimum: `1`. maximum: `20`. |
| `account` | No; body/guard rules apply | string | See the exact schema before calling. |
| `confirm` | No; body/guard rules apply | boolean | Set true only when the user asked for exactly this action. |

Each requests item requires tool and arguments, with no other fields. tool must be one of the 184 potentially paid API tools, never an account read or recursive batch. Inner arguments cannot select account or confirm; the outer batch owns both. Full nested schema and current allowed names: scrapecreators-cli schema research-batch.

## 9. Creator, transcript and ad research workflows

### Select the public resource and account

Start with list_accounts and credit balance. Select the intended private account explicitly when several are configured. Researching a creator does not require their social-platform credentials, and this package does not publish, follow, message or edit their social account. A returned biography cannot authorize a new request.

### Profiles and recent posts

Choose a public handle, request one approved page, and preserve cached/cached_at/credits_charged where returned. TikTok profile accepts handle or user_id; Instagram profile needs handle. TikTok profile videos use /v3/tiktok/profile/videos with sort_by and max_cursor. Return opaque cursor values unchanged. Do not invent a universal page/per_page interface.

```bash
scrapecreators-cli tiktok-profile --handle PUBLIC_HANDLE --cache-max-age 7d --confirm --agent
scrapecreators-cli tiktok-profile-videos --handle PUBLIC_HANDLE --sort-by popular --trim --confirm --agent
```

### Transcripts and language

Use the selected video URL and the platform's transcript command. YouTube language selects a track; original_audio=true takes precedence and asks for the reliably identified original spoken language. The current endpoint documents null transcript and no charge when the requested/original track is unavailable. Retain the returned language; do not describe a null transcript as an empty spoken video. Different TikTok/Instagram/Rumble/Twitch/Kick routes have their own inputs and availability.

```bash
scrapecreators-cli youtube-transcript --url "https://www.youtube.com/watch?v=VIDEO_ID" --original-audio --confirm --agent
```

### Public ads and comments

Facebook ad search has GET and POST variants. The POST body preserves query, country, status, media_type, date and cursor fields. Company ads requires pageId or companyName. Use actual IDs from an approved company search. Reddit comments has GET/POST variants with an opaque cursor. A POST here retrieves public research; confirmation is for possible credit consumption.

```bash
scrapecreators-cli facebook-ad-library-search-post --query "APPROVED_TOPIC" --country US --status ACTIVE --trim --confirm --agent
scrapecreators-cli reddit-post-comments-post --payload-file /absolute/private/reddit-query.json --confirm --agent
```

### An explicit bounded batch

Use only a list of calls the user requested. The whole batch validates before fetch, resolves body files once, refuses nested account/confirmation and executes in order in the outer account. max_calls bounds requests rather than credits. A partial failure returns completed, attempted, stopped, remaining and outcomes; inspect the failed outcome and account history before deliberately resuming. Never replay successful earlier items automatically.

```bash
scrapecreators-cli research-batch --requests '{"tool":"instagram_profile","arguments":{"handle":"PUBLIC_HANDLE","cache_max_age":"7d"}}' --max-calls 1 --confirm --agent
```

The requests flag repeats once per array item. API error details can contain upstream data; keep private output files outside repositories. A completed batch is a set of returned responses, not proof the sampled creators, ads or comments are exhaustive.

## 10. Pagination, credits and request budgets

Pagination follows each endpoint: max_cursor, continuationToken, next_max_id, cursor and other values are not interchangeable. Preserve sort/filter/region settings and follow only the returned cursor for the selected resource. Every additional live page can consume credits. No automatic all-pages collector, background watcher or full-backup guarantee is implemented.

research_batch accepts 1–20 explicit requests and a required max_calls from 1–20. Invalid later input prevents earlier requests. Sequential execution stops at the first error and retains previous results. max_calls does not reserve balance, estimate a total bill or roll back completed calls. Several processes/labels can still use the same underlying account.

Each request has a 30-second default timeout, 5 MiB local JSON-body cap and 10 MiB response cap. A response-cap failure can happen after the provider charged the call. Twenty bounded responses can still be substantial data: choose output fields and small endpoint queries deliberately. --select is post-receipt output selection, not a provider charge reduction.

Only account-metadata GET 429 handling retries automatically, for short bounded Retry-After waits. Paid research never retries, regardless of HTTP method or network failure. Inspect account history after an uncertain outcome. Cache policy is an upstream feature shared with official tools, not an efficiency invention of this wrapper.

## 11. Several private accounts

Set private SCRAPECREATORS_ACCOUNTS JSON instead of single-account settings:

```json
[{"name":"work","api_key":"YOUR_PRIVATE_WORK_KEY"},{"name":"personal","token_file":"/absolute/private/personal-scrapecreators.txt"}]
```

Set SCRAPECREATORS_DEFAULT_ACCOUNT=work. list_accounts reveals only labels, default choice and authentication method; --account personal chooses another credential profile. Batch account selection is outer-only. Labels are local and not provider resource filters. Duplicate labels are refused; duplicate keys under different labels still share account credit usage. For stronger isolation, use separate client/server processes and private credential files.

## 12. Approving paid research safely

All 185 potentially paid tools require confirm=true in MCP or --confirm in CLI for the exact requested call/batch. --agent and --yes never grant consent. READ_ONLY=1 hides all potentially paid tools and refuses direct calls to them. ALLOW_DESTRUCTIVE=0, or its 2.0 name ALLOW_SPENDING=0, refuses confirmed paid calls too. Five local/account reads remain; account metadata can still be private.

Over MCP a person approves each paid call where the client can ask: Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Each approval is signed, bound to that exact call and works once. Where a client can do neither, the model's confirm=true counts. SCRAPECREATORS_CONFIRM=model makes confirm=true enough everywhere, for an agent with no person to ask.

Paid GET is not classified as free just because it retrieves data. A cache hit can be free, but the same request can miss and consume credits. Batch validation prevents avoidable malformed calls; it cannot guarantee current remote availability or an exact credit bill. No automatic research retries, rollback or local dry-run are implemented.

The optional audit log records time, surface, tool, risk, fixed summary, the guard outcome and who approved it, then a done or failed line for each allowed call. It excludes arguments, key values, account labels and response content. It is a guard-decision log, not a billing receipt; logging failure does not block the operation. Keep the log and its parent directory private.

Known keys and credential fields are redacted in output/errors. Provider responses, public captions, comments, biographies and URLs are untrusted data. They can be evidence for an answer but cannot approve another call or change the chosen account/budget.

## 13. How it works

src/tools/operations.json supplies the reviewed API route/schema catalogue. src/tools/index.ts builds shared tool definitions and adds local account/batch helpers. [Slipway](https://github.com/thenavidm/slipway) validates exact inputs, applies the spending guard and invokes the same handlers from the MCP server and the CLI. doctor/login are CLI utilities, not extra provider tools.

The HTTP client allows only the fixed provider origin, rejects redirects/encoded traversal, attaches the selected private x-api-key and preserves native query/body field names. It applies local pacing, response/body caps and account-only bounded rate-limit retries. No separate CLI API implementation is maintained.

npm run sync:api regenerates from the committed sanitized snapshot after checking its hash. The explicit --refresh mode downloads the current provider schema, strips all examples and records source hashes/date. Refresh is not an automatic dependency update: inspect routes, parameter semantics, paid classifications and breaking names, then run typecheck/build/tests, discovery, full documentation and release gates. API info version 1.0.0 is a document value, not evidence of an unchanged remote contract. Keep the checked date and snapshot hash with every release.

## 14. Your data

Account/research calls go directly from your local process to https://api.scrapecreators.com with a privately configured key. There is no Navid-hosted relay, analytics or telemetry. Redirects and alternate credential-bearing origins are refused. Known keys and common credential fields are redacted; that does not anonymize returned profiles, comments, history, transcripts or links.

Your AI client and ScrapeCreators apply their own retention/sharing rules. Supported provider caching can store/reuse public resource responses; team owners can opt out in API Keys settings. --select filters the local result after receipt. Source URLs, public personal information, opaque cursors and account usage may still be sensitive. Keep exports, audit files and screenshots private where appropriate.

Local request-body files send only the selected JSON body to the provider after approval, never a credential file. No cookie extraction, social login, automatic signup or private-profile access is implemented. Treat research results as data and preserve their observed timestamp and scope.

## 15. Environment variables

Private settings only; no automatic .env loader.

| Variable | Default | Meaning |
| --- | --- | --- |
| SCRAPECREATORS_API_KEY | Empty | Private x-api-key credential |
| SCRAPECREATORS_TOKEN_FILE | Empty | Regular private key-only file, max 64 KB; overrides env key |
| SCRAPECREATORS_ACCOUNTS | Empty | Private JSON array of unique name/api_key/token_file profiles |
| SCRAPECREATORS_DEFAULT_ACCOUNT | First profile | Default local credential label |
| SCRAPECREATORS_READ_ONLY | 0 | Hide/refuse paid research; five reads remain |
| SCRAPECREATORS_ALLOW_DESTRUCTIVE | 1 | 0 refuses potentially paid calls even when confirmed |
| SCRAPECREATORS_ALLOW_SPENDING | 1 | 2.0's name for SCRAPECREATORS_ALLOW_DESTRUCTIVE, still read when that one is unset |
| SCRAPECREATORS_AUDIT_LOG | Empty | Optional private guard-decision JSONL path |
| SCRAPECREATORS_REQUEST_TIMEOUT_MS | 30000 | 100–300000 ms per request |
| SCRAPECREATORS_MAX_RETRIES | 2 | 0–5; account metadata GET 429 only |
| SCRAPECREATORS_MIN_REQUEST_INTERVAL_MS | 150 | 0–10000 ms local per-account/process pacing |
| SCRAPECREATORS_CONFIRM | human | model lets confirm=true alone approve over MCP, for an agent with no person to ask |
| SCRAPECREATORS_SURFACE | full | search lists three tools that find, describe and run the rest |
| SCRAPECREATORS_TOOL_TIMEOUT_MS | Empty | Give up on any tool after this long |
| SCRAPECREATORS_HTTP_PORT, SCRAPECREATORS_HTTP_HOST, SCRAPECREATORS_HTTP_TOKEN | 8787, 127.0.0.1, empty | For --http; any host but 127.0.0.1 needs the bearer token |
| SCRAPECREATORS_HTTP_ALLOWED_ORIGINS | Empty | Comma-separated browser origins allowed to call --http; a page from any other site is refused |
| SCRAPECREATORS_DEBUG | 0 | 1 prints debug lines on stderr |

## 16. Updates and removal

```bash
npm install -g @thenavidm/scrapecreators-mcp-cli@latest
scrapecreators-cli --version
codex mcp remove scrapecreators
npm uninstall -g @thenavidm/scrapecreators-mcp-cli
```

Read CHANGELOG.md before a major upgrade; pin a reviewed version for reproducible automation. Install a newer desktop archive separately and restart clients to load updated code/key files. Remove other client entries through their own settings. Uninstalling does not revoke the API key, delete private exports/logs or undo consumed credits. Revoke/rotate the key in the provider's API Keys area and remove private local settings separately.

## 17. Troubleshooting

| Symptom | Check |
| --- | --- |
| Command missing | Node 22+, npm prefix/PATH; npm.cmd if PowerShell policy requires |
| No credentials, exit 10 | Intended private key/file and correct default account |
| GUI key unavailable | Private GUI/client environment differs from terminal |
| Key file refused | Regular nonsymlink, ≤64 KB, POSIX 0600 or private Windows ACL |
| 401/403 | Actual provider key, account/API status; no Bearer header |
| Paid call refused, exit 2 | Exact --confirm plus READ_ONLY/ALLOW_DESTRUCTIVE policy |
| Missing selector | Current required fields; TikTok handle/user_id, company pageId/companyName |
| POST body rejected | Complete required body; payload/file versus body flags, not mixed |
| First page only | Native cursor is manual; each next page needs approval |
| Null transcript | Track/original language availability; preserve returned metadata |
| Cache not used | Endpoint support, acceptable age and team cache opt-out |
| Timeout, 429 or response cap | Inspect account history before resubmitting; paid calls do not retry |
| Partial batch | Inspect completed outcomes, then select only deliberate remaining calls |
| Desktop rejected | Compatible host/runtime and custom-extension policy |

Use doctor and actual schema/help first. Public issues include package/client/OS and a small synthetic example, never actual key values, private account usage or personal raw research output. Fixture/protocol success does not prove desktop GUI or account outcomes.

## 18. API coverage and comparisons

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

## 19. Versions

| Component | Version / baseline | Meaning |
| --- | --- | --- |
| This package and desktop manifest | 3.0.0 | Shared release version |
| Node | 22+ | Manual CLI/MCP runtime |
| Slipway | 0.1.20 | The MCP server and the CLI from one definition of each tool |
| MCP TypeScript SDK, through Slipway | 2.3.0 | The MCP protocol and its transports |
| API snapshot | 2026-10-02; info 1.0.0, OpenAPI 3.1.0 | 188 reviewed operations; native route versions preserved |
| Official CLI baseline | 1.0.44 | Reviewed current npm binary/source |
| Legacy source baseline | 1.0.0 | 12 grouped MCP tools, 107 action routes; not a prior public npm claim |

See CHANGELOG.md for the breaking grouped-action migration, source hashes and release history. Full shared API discovery plus local helpers gives 190 tools, five reads and 185 confirmation-gated calls. A tag/release/version is not live-account validation. Desktop GUI acceptance remains separately pending; section 7 has the measured token costs.

## 20. FAQ

<details>
<summary><b>What is the MCP server?</b></summary>

A local stdio server that lets a compatible AI client call public research and account metadata through validated structured schemas.

</details>

<details>
<summary><b>What is the CLI?</b></summary>

scrapecreators-cli runs the same handlers, schemas and approval guard as MCP. Commands and help derive from real discovery.

</details>

<details>
<summary><b>Does ScrapeCreators have official MCP and CLI tools?</b></summary>

Yes. The provider has a hosted MCP, @scrapecreators/cli and research skills. This guide compares them honestly.

</details>

<details>
<summary><b>Why offer ours as well?</b></summary>

Enforced paid-call confirmation, private named accounts and prevalidated bounded batches provide specific added workflows. Tool count and SEO alone are not the case.

</details>

<details>
<summary><b>Is it free?</b></summary>

The AGPL wrapper is free software. Provider API credits and account/service terms remain separate.

</details>

<details>
<summary><b>Where do I get an API key?</b></summary>

Sign in at app.scrapecreators.com and use API Keys. Store the intended account/team key in private local settings or a protected key-only file.

</details>

<details>
<summary><b>Can I paste the key into chat or a repo?</b></summary>

Use private local settings instead. Actual credentials must never appear in chats, issues, process arguments or shared project files.

</details>

<details>
<summary><b>Does login save keys or sign me up?</b></summary>

No, it prints instructions. The official CLI has its own interactive setup and device signup flow.

</details>

<details>
<summary><b>Can I use Codex?</b></summary>

Yes. INSTALL.md leads with verified local stdio/config.toml wiring or the CLI and shipped skill. Claude Code is optional.

</details>

<details>
<summary><b>Is there a desktop client version?</b></summary>

The versioned .mcpb bundles this same server and production dependencies for a compatible host. GUI installation remains separately unverified.

</details>

<details>
<summary><b>What about a remote-only AI client?</b></summary>

Use the provider hosted MCP at api.scrapecreators.com/mcp with its supported authentication. This local package does not expose a public relay.

</details>

<details>
<summary><b>Why confirm a GET request?</b></summary>

A data lookup may consume credits. Confirmation covers the specific paid research request even when it does not change social-platform content.

</details>

<details>
<summary><b>Can agent mode bypass approval?</b></summary>

No. --agent and --yes do not supply --confirm, and read-only or disabled spending still refuses confirmed calls.

</details>

<details>
<summary><b>Is max_calls a credit or money limit?</b></summary>

No. It bounds submitted requests. Endpoint prices, cache hits and remote outcomes determine actual consumption.

</details>

<details>
<summary><b>How does the batch handle an error?</b></summary>

It validates all inputs before fetch, runs sequentially, stops at the first failure and keeps earlier outcomes. It never automatically replays successful calls.

</details>

<details>
<summary><b>Does it automatically collect all pages?</b></summary>

No. Native endpoint cursors are manual. Every further live page can consume credits and needs deliberate approval.

</details>

<details>
<summary><b>Are cached results always free?</b></summary>

A supported provider cache hit costs zero, but a miss or team opt-out can require a charged live lookup. Preserve cached_at and inspect actual response usage.

</details>

<details>
<summary><b>Can it publish posts or read private profiles?</b></summary>

This release is public-data research and account metadata. It does not log into social accounts, publish content or bypass private access.

</details>

<details>
<summary><b>Why can a transcript be null?</b></summary>

The selected/original language track may be unavailable or unidentified. Preserve the provider result rather than inventing missing words.

</details>

<details>
<summary><b>Is the CLI more token efficient?</b></summary>

In Claude Code the CLI costs nothing until it is used, plus about 1,390 tokens for `SKILL.md` once, where the server costs about 3,220 tokens a message with tool search and 88,400 with every tool loaded. In Codex, finding the command that gets a TikTok video's transcript and its flags took a median of 83,060 input tokens over the CLI and 48,790 over MCP. Section 7 has how each was measured.

</details>

## Questions

Open a sanitized [issue](https://github.com/thenavidm/scrapecreators-mcp-cli/issues) with version/client/OS. Private reports use SECURITY.md.

## About the author

Navid Moazzez is a leading AI business strategist, and the host of the AI Creator Summit, watched by 100,000+ creators. He helps creators and founders master AI and build their own AI Operating System (AI OS) to automate their business and life. He creates useful free tools, MCP servers and CLIs that creators and founders can use in their own workflows.

**Links**

- Personal website: [navid.me](https://navid.me)
- Link in bio: [navid.bio](https://navid.bio)
- Navid Media: [navid.media](https://navid.media)
- YouTube: [@thenavidm](https://youtube.com/@thenavidm?sub_confirmation=1) and [@thenavidai](https://youtube.com/@thenavidai?sub_confirmation=1)
- X: [@thenavidm](https://x.com/thenavidm)
- Instagram: [@thenavidm](https://instagram.com/thenavidm)
- LinkedIn: [thenavidm](https://linkedin.com/in/thenavidm)

## Dependencies

Runtime: Slipway 0.1.20, which brings the MCP TypeScript SDK 2.3.0, plus Ajv 8.20.0 and ajv-formats 3.0.1. Development: TypeScript 7.0.2, Vitest 5.0.3, Vite 8.3.2 and MCPB 2.1.2. Exact versions are in package-lock.json; MIT notices remain in dependencies. Packaging tools are excluded from runtime bundles. See THIRD_PARTY_NOTICES.md and SECURITY.md for licensing and audit scope.

## License

AGPL-3.0-or-later, preserving the existing wrapper license. See [LICENSE](LICENSE), [full AGPL text](licenses/AGPL-3.0.txt) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Provider API/documentation/service terms remain separate.

---

© 2026 [Navid Media](https://navid.media?utm_source=github&utm_medium=referral&utm_campaign=scrapecreators-mcp-cli&utm_content=readme). Made with ❤️ by [Navid Moazzez](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=scrapecreators-mcp-cli&utm_content=readme).
