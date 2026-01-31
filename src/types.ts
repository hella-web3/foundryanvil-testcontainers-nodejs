export enum LogVerbosity {
  One = "-v",
  Two = "-vv",
  Three = "-vvv",
  Four = "-vvvv",
  Five = "-vvvvv",
}

export enum Hardfork {
  Frontier = "frontier",
  Homestead = "homestead",
  Dao = "dao",
  Tangerine = "tangerine",
  SpuriousDragon = "spuriousDragon",
  Byzantium = "byzantium",
  Constantinople = "constantinople",
  Petersburg = "petersburg",
  Istanbul = "istanbul",
  MuirGlacier = "muirGlacier",
  Berlin = "berlin",
  London = "london",
  ArrowGlacier = "arrowGlacier",
  GrayGlacier = "grayGlacier",
  Paris = "paris",
  Shanghai = "shanghai",
  Cancun = "cancun",
  Prague = "prague",
  Latest = "latest",
}

export enum Order {
  Fees = "fees",
  Fifo = "fifo",
}

export enum Color {
  Auto = "auto",
  Always = "always",
  Never = "never",
}

export type HexString = `0x${string}`;

export type AnvilFlag =
  | LogVerbosity
  | "-a"
  | "--accounts"
  | "-b"
  | "--block-time"
  | "--blockTime"
  | "--balance"
  | "--config-out"
  | "--derivation-path"
  | "--dump-state"
  | "-h"
  | "--help"
  | "--hardfork"
  | "--init"
  | "--ipc"
  | "--ipcpath"
  | "-j"
  | "--threads"
  | "--jobs"
  | "--load-state"
  | "-m"
  | "--mnemonic"
  | "--max-persisted-states"
  | "--mixed-mining"
  | "--mnemonic-random"
  | "--mnemonic-seed-unsafe"
  | "--no-mining"
  | "--no-mine"
  | "--number"
  | "--order"
  | "-p"
  | "--port"
  | "--preserve-historical-states"
  | "--prune-history"
  | "-s"
  | "--state-interval"
  | "--slots-in-an-epoch"
  | "--state"
  | "--timestamp"
  | "--transaction-block-keeper"
  | "-V"
  | "--version"
  | "--color"
  | "--json"
  | "--md"
  | "-q"
  | "--quiet"
  | "-v"
  | "--verbosity"
  | "--allow-origin"
  | "--cache-path"
  | "--host"
  | "--no-cors"
  | "--no-request-size-limit"
  | "--compute-units-per-second"
  | "-f"
  | "--fork-url"
  | "--rpc-url"
  | "--fork-block-number"
  | "--fork-chain-id"
  | "--fork-header"
  | "--fork-retry-backoff"
  | "--fork-transaction-hash"
  | "--no-rate-limit"
  | "--no-rpc-rate-limit"
  | "--no-storage-caching"
  | "--retries"
  | "--timeout"
  | "--block-base-fee-per-gas"
  | "--base-fee"
  | "--chain-id"
  | "--code-size-limit"
  | "--disable-block-gas-limit"
  | "--disable-code-size-limit"
  | "--disable-min-priority-fee"
  | "--no-priority-fee"
  | "--gas-limit"
  | "--gas-price"
  | "--auto-impersonate"
  | "--auto-unlock"
  | "--disable-console-log"
  | "--no-console-log"
  | "--disable-default-create2-deployer"
  | "--no-create2"
  | "--disable-pool-balance-checks"
  | "--memory-limit"
  | "--print-traces"
  | "--enable-trace-printing"
  | "--steps-tracing"
  | "--tracing"
  | "--celo"
  | "--optimism";
