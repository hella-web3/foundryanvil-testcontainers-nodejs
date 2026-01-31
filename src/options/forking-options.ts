import {
  AnvilOptions,
  GetAnvilOptions,
  SetFlagFunction,
  ToggleFlagFunction,
} from "./anvil-options";

export class ForkingOptions {
  private readonly setCliFlag: SetFlagFunction;
  private readonly toggleCliFlag: ToggleFlagFunction;
  private readonly getAnvilOptions: GetAnvilOptions;
  constructor(
    setFlagFunction: SetFlagFunction,
    toggleFlagFunction: ToggleFlagFunction,
    getAnvilOptions: GetAnvilOptions,
  ) {
    this.setCliFlag = setFlagFunction;
    this.toggleCliFlag = toggleFlagFunction;
    this.getAnvilOptions = getAnvilOptions;
  }

  /**
   * Sets the number of assumed available compute units per second for this provider.
   * Sets the `--compute-units-per-second` flag.
   * @param cups Compute units per second. Defaults to 330.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().fork.withComputeUnitsPerSecond(600);
   * ```
   */
  public withComputeUnitsPerSecond(cups: number): AnvilOptions {
    this.setCliFlag("--compute-units-per-second", cups.toString());
    return this.getAnvilOptions();
  }

  /**
   * Fetch state over a remote endpoint instead of starting from an empty state.
   * Sets the `--fork-url` flag.
   * @param url Remote endpoint URL.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().fork.withForkUrl("https://mainnet.infura.io/v3/YOUR_KEY");
   * ```
   */
  public withForkUrl(url: string): AnvilOptions {
    this.setCliFlag("--fork-url", url);
    return this.getAnvilOptions();
  }

  /**
   * Fetch state from a specific block number over a remote endpoint.
   * Sets the `--fork-block-number` flag.
   * @param blockNumber Block number.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().fork.withForkBlockNumber(18000000);
   * ```
   */
  public withForkBlockNumber(blockNumber: number): AnvilOptions {
    this.setCliFlag("--fork-block-number", blockNumber.toString());
    return this.getAnvilOptions();
  }

  /**
   * Specify chain id to skip fetching it from remote endpoint.
   * Sets the `--fork-chain-id` flag.
   * @param chainId Chain ID.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().fork.withForkChainId(1);
   * ```
   */
  public withForkChainId(chainId: number): AnvilOptions {
    this.setCliFlag("--fork-chain-id", chainId.toString());
    return this.getAnvilOptions();
  }

  /**
   * Headers to use for the rpc client, e.g. "User-Agent: test-agent".
   * Sets the `--fork-header` flag.
   * @param header Header string.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().fork.withForkHeader("User-Agent: test-agent");
   * ```
   */
  public withForkHeader(header: string): AnvilOptions {
    this.setCliFlag("--fork-header", header);
    return this.getAnvilOptions();
  }

  /**
   * Initial retry backoff on encountering errors.
   * Sets the `--fork-retry-backoff` flag.
   * @param backoff Backoff in milliseconds.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().fork.withForkRetryBackoff(1000);
   * ```
   */
  public withForkRetryBackoff(backoff: number): AnvilOptions {
    this.setCliFlag("--fork-retry-backoff", backoff.toString());
    return this.getAnvilOptions();
  }

  /**
   * Fetch state from after a specific transaction hash has been applied over a remote endpoint.
   * Sets the `--fork-transaction-hash` flag.
   * @param hash Transaction hash.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().fork.withForkTransactionHash("0x...");
   * ```
   */
  public withForkTransactionHash(hash: string): AnvilOptions {
    this.setCliFlag("--fork-transaction-hash", hash);
    return this.getAnvilOptions();
  }

  /**
   * Disables rate limiting for this node's provider.
   * Sets the `--no-rate-limit` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().fork.noRateLimit();
   * ```
   */
  public noRateLimit(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--no-rate-limit", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Explicitly disables the use of RPC caching.
   * Sets the `--no-storage-caching` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().fork.noStorageCaching();
   * ```
   */
  public noStorageCaching(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--no-storage-caching", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Number of retry requests for spurious networks (timed out requests).
   * Sets the `--retries` flag.
   * @param retries Number of retries. Defaults to 5.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().fork.withRetries(10);
   * ```
   */
  public withRetries(retries: number): AnvilOptions {
    this.setCliFlag("--retries", retries.toString());
    return this.getAnvilOptions();
  }

  /**
   * Timeout in ms for requests sent to remote JSON-RPC server in forking mode.
   * Sets the `--timeout` flag.
   * @param timeout Timeout in ms. Defaults to 45000.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().fork.withTimeout(60000);
   * ```
   */
  public withTimeout(timeout: number): AnvilOptions {
    this.setCliFlag("--timeout", timeout.toString());
    return this.getAnvilOptions();
  }
}
