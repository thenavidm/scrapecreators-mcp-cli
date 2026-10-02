export type Account = {
  name: string;
  apiToken: string;
  tokenFile: string;
};
export type Config = {
  accounts: Account[];
  defaultAccount: string;
  readOnly: boolean;
  allowDestructive: boolean;
  auditPath: string;
  timeoutMs: number;
  maxRetries: number;
  minIntervalMs: number;
};
function integer(
  v: string | undefined,
  defaultValue: number,
  min: number,
  max: number,
): number {
  const n = v ? Number(v) : defaultValue;
  if (!Number.isInteger(n) || n < min || n > max)
    throw new Error("Invalid request timeout, retry or pacing settings.");
  return n;
}
export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  let entries: Record<string, unknown>[] = [];
  if (env.SCRAPECREATORS_ACCOUNTS)
    try {
      const x = JSON.parse(env.SCRAPECREATORS_ACCOUNTS);
      if (!Array.isArray(x)) throw new Error();
      entries = x;
    } catch {
      throw new Error(
        "SCRAPECREATORS_ACCOUNTS must be a private JSON array of named accounts.",
      );
    }
  else if (env.SCRAPECREATORS_API_KEY || env.SCRAPECREATORS_TOKEN_FILE)
    entries = [
      {
        name: "default",
        api_key: env.SCRAPECREATORS_API_KEY,
        token_file: env.SCRAPECREATORS_TOKEN_FILE,
      },
    ];
  const accounts = entries.map((x) => {
    if (
      !x ||
      typeof x !== "object" ||
      typeof x.name !== "string" ||
      !x.name.trim()
    )
      throw new Error("Every ScrapeCreators account requires a unique nonempty name.");
    return {
      name: x.name.trim(),
      apiToken: typeof x.api_key === "string" ? x.api_key : "",
      tokenFile: typeof x.token_file === "string" ? x.token_file : "",
    };
  });
  if (new Set(accounts.map((a) => a.name)).size !== accounts.length)
    throw new Error("ScrapeCreators account names must be unique.");
  return {
    accounts,
    defaultAccount: env.SCRAPECREATORS_DEFAULT_ACCOUNT ?? accounts[0]?.name ?? "",
    readOnly: /^(1|true)$/i.test(env.SCRAPECREATORS_READ_ONLY ?? ""),
    allowDestructive: !/^(0|false)$/i.test(env.SCRAPECREATORS_ALLOW_SPENDING ?? ""),
    auditPath: env.SCRAPECREATORS_AUDIT_LOG ?? "",
    timeoutMs: integer(env.SCRAPECREATORS_REQUEST_TIMEOUT_MS, 30000, 100, 300000),
    maxRetries: integer(env.SCRAPECREATORS_MAX_RETRIES, 2, 0, 5),
    minIntervalMs: integer(env.SCRAPECREATORS_MIN_REQUEST_INTERVAL_MS, 150, 0, 10000),
  };
}
export function selectAccount(config: Config, hint?: string): Account {
  const account = config.accounts.find(
    (a) => a.name === (hint ?? config.defaultAccount),
  );
  if (!account)
    throw new Error(
      config.accounts.length
        ? "Unknown account. Run list_accounts and use its exact name."
        : "No credentials configured. Set SCRAPECREATORS_API_KEY or SCRAPECREATORS_TOKEN_FILE privately; run scrapecreators-cli login.",
    );
  return account;
}
