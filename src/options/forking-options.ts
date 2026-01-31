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
   * @param cups Compute units per second. Defaults to 330.
   */
  public withComputeUnitsPerSecond(cups: number): AnvilOptions {
    this.setCliFlag("--compute-units-per-second", cups.toString());
    return this.getAnvilOptions();
  }

  /**
   * Fetch state over a remote endpoint instead of starting from an empty state.
   * @param url Remote endpoint URL.
   */
  public withForkUrl(url: string): AnvilOptions {
    this.setCliFlag("--fork-url", url);
    return this.getAnvilOptions();
  }

  /**
   * Fetch state from a specific block number over a remote endpoint.
   * @param blockNumber Block number.
   */
  public withForkBlockNumber(blockNumber: number): AnvilOptions {
    this.setCliFlag("--fork-block-number", blockNumber.toString());
    return this.getAnvilOptions();
  }

  /**
   * Specify chain id to skip fetching it from remote endpoint.
   * @param chainId Chain ID.
   */
  public withForkChainId(chainId: number): AnvilOptions {
    this.setCliFlag("--fork-chain-id", chainId.toString());
    return this.getAnvilOptions();
  }

  /**
   * Headers to use for the rpc client, e.g. "User-Agent: test-agent".
   * @param header Header string.
   */
  public withForkHeader(header: string): AnvilOptions {
    this.setCliFlag("--fork-header", header);
    return this.getAnvilOptions();
  }

  /**
   * Initial retry backoff on encountering errors.
   * @param backoff Backoff in milliseconds.
   */
  public withForkRetryBackoff(backoff: number): AnvilOptions {
    this.setCliFlag("--fork-retry-backoff", backoff.toString());
    return this.getAnvilOptions();
  }

  /**
   * Fetch state from after a specific transaction hash has been applied over a remote endpoint.
   * @param hash Transaction hash.
   */
  public withForkTransactionHash(hash: string): AnvilOptions {
    this.setCliFlag("--fork-transaction-hash", hash);
    return this.getAnvilOptions();
  }

  /**
   * Disables rate limiting for this node's provider.
   */
  public noRateLimit(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--no-rate-limit", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Explicitly disables the use of RPC caching.
   */
  public noStorageCaching(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--no-storage-caching", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Number of retry requests for spurious networks (timed out requests).
   * @param retries Number of retries. Defaults to 5.
   */
  public withRetries(retries: number): AnvilOptions {
    this.setCliFlag("--retries", retries.toString());
    return this.getAnvilOptions();
  }

  /**
   * Timeout in ms for requests sent to remote JSON-RPC server in forking mode.
   * @param timeout Timeout in ms. Defaults to 45000.
   */
  public withTimeout(timeout: number): AnvilOptions {
    this.setCliFlag("--timeout", timeout.toString());
    return this.getAnvilOptions();
  }
}
