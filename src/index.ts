#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { buildServer, VERSION } from "./server.js";
import { runCli, exitCodeFor } from "./cli.js";
import { runDoctor } from "./doctor.js";
import { basename } from "node:path";
const HELP = `ScrapeCreators MCP server and CLI ${VERSION}

scrapecreators-mcp                         Start local stdio MCP
scrapecreators-cli                         List task commands
scrapecreators-cli <command> --help        Current arguments
scrapecreators-cli schema <command>        Full JSON input schema
scrapecreators-cli doctor [--network]      Local configuration / account read
scrapecreators-cli login                   Private token setup instructions
scrapecreators-cli --version               Package version

SCRAPECREATORS_API_KEY                   Private ScrapeCreators x-api-key credential
SCRAPECREATORS_TOKEN_FILE                  Regular private token-only file, max 64 KB
SCRAPECREATORS_ACCOUNTS / _DEFAULT_ACCOUNT Named private credentials
SCRAPECREATORS_READ_ONLY=1                 Hide/refuse potentially paid research
SCRAPECREATORS_ALLOW_SPENDING=0         Block potentially paid research
SCRAPECREATORS_AUDIT_LOG                   Private guard-decision log
SCRAPECREATORS_REQUEST_TIMEOUT_MS=30000; SCRAPECREATORS_MAX_RETRIES=2 (account metadata GET 429 only)
SCRAPECREATORS_MIN_REQUEST_INTERVAL_MS=150 Conservative per-account process pacing

https://github.com/thenavidm/scrapecreators-mcp-cli
`;
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];
  if (["--version", "-v"].includes(command ?? "")) {
    console.log(VERSION);
    return;
  }
  if (["--help", "-h", "help"].includes(command ?? "")) {
    process.stdout.write(HELP);
    return;
  }
  if (command === "doctor") {
    if (args.slice(1).some((a) => a !== "--network")) {
      process.exitCode = 2;
      console.error(JSON.stringify({ error: "doctor accepts only --network" }));
      return;
    }
    process.exitCode = await runDoctor(args.includes("--network"));
    return;
  }
  if (command === "login") {
    console.log("Create or retrieve the ScrapeCreators API key in your own account at app.scrapecreators.com. Store it privately as SCRAPECREATORS_API_KEY or an owner-only token-only file through SCRAPECREATORS_TOKEN_FILE. login prints instructions; it does not create an account, save keys or perform OAuth. Never send gh auth tokens to the service. See INSTALL.md and doctor.");
    return;
  }
  if (args.length || basename(process.argv[1] ?? "").startsWith("scrapecreators-cli")) {
    process.exitCode = await runCli(args);
    return;
  }
  const server = buildServer();
  await server.connect(new StdioServerTransport());
  const close = async () => {
    await server.close();
    process.exit(0);
  };
  process.on("SIGTERM", () => void close());
  process.on("SIGINT", () => void close());
}
main().catch((e) => {
  console.error(JSON.stringify({ error: e.message }));
  process.exitCode = exitCodeFor(e.message);
});
