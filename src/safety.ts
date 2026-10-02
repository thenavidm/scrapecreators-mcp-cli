/**
 * Shared spending guard, following the current Midjourney implementation.
 * Research requests can consume ScrapeCreators API credits and need confirmation.
 * Account metadata reads remain available. Research calls can spend even when they use GET.
 * Read-only mode hides potentially paid research and also refuses direct calls to hidden tools.
 */

import { appendFileSync } from "node:fs";

import { WriteBlockedError } from "./api/errors.js";
import type { Config } from "./config.js";

export type Risk = "read" | "write" | "spend" | "destructive";

/**
 * How the caller reached us, so a refusal names what they can actually type.
 * A model reads `confirm: true`; a person at a terminal reads `--confirm`.
 */
export type Surface = "mcp" | "cli";

export function needsConfirm(risk: Risk): boolean {
  return risk === "spend" || risk === "destructive";
}

export class WriteGuard {
  private readonly config: Config;
  private readonly surface: Surface;

  constructor(config: Config, surface: Surface = "mcp") {
    this.config = config;
    this.surface = surface;
  }

  private get confirmFlag(): string {
    return this.surface === "cli" ? "--confirm" : "confirm: true";
  }

  get readOnly(): boolean {
    return this.config.readOnly;
  }

  check(tool: string, risk: Risk, confirm: boolean | undefined, summary: string): void {
    if (risk === "read") return;

    if (this.config.readOnly) {
      this.audit(tool, risk, summary, "blocked: read-only");
      throw new WriteBlockedError(
        `${tool} is unavailable: this server is running with SCRAPECREATORS_READ_ONLY=1.`,
      );
    }

    if (needsConfirm(risk)) {
      if (!this.config.allowDestructive) {
        this.audit(tool, risk, summary, "blocked: spending disabled");
        throw new WriteBlockedError(
          `${tool} is unavailable: this server is running with SCRAPECREATORS_ALLOW_SPENDING=0.`,
        );
      }
      if (confirm !== true) {
        this.audit(tool, risk, summary, "blocked: no confirm");
        const why =
          risk === "spend"
            ? "may consume ScrapeCreators API credits"
            : "cannot be undone";
        throw new WriteBlockedError(
          `${tool} ${why}, so it will not run without ${this.confirmFlag}. About to: ${summary}. Call again with ${this.confirmFlag} if that is what was asked for.`,
        );
      }
    }

    this.audit(tool, risk, summary, "allowed");
  }

  /** Append-only record of write guard decisions, when SCRAPECREATORS_AUDIT_LOG is set. */
  private audit(tool: string, risk: Risk, summary: string, outcome: string): void {
    if (!this.config.auditPath) return;
    const line = JSON.stringify({
      at: new Date().toISOString(),
      surface: this.surface,
      tool,
      risk,
      summary,
      outcome,
    });
    try {
      appendFileSync(this.config.auditPath, `${line}\n`, { mode: 0o600 });
    } catch {
      // A failing audit log must never take the tool call down with it.
    }
  }
}

/**
 * MCP annotations for a risk level.
 *
 * Clients use these to decide what to auto-approve, so they have to be honest.
 * `openWorldHint` is true throughout because every call leaves the machine, and
 * research is conservatively treated as non-idempotent: a repeat can consume
 * credits again; provider caching can change the actual cost.
 */
export function annotationsFor(
  risk: Risk,
  options: { idempotent?: boolean } = {},
): Record<string, boolean> {
  return {
    readOnlyHint: risk === "read",
    destructiveHint: risk === "destructive",
    idempotentHint: options.idempotent ?? risk === "read",
    openWorldHint: true,
  };
}
