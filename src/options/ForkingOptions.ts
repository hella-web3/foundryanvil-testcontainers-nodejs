import { AnvilOptions } from "./AnvilOptions";

export class ForkingOptions {
  constructor(private readonly container: AnvilOptions) {}

  /**
   * Sets the number of assumed available compute units per second for this provider.
   * @param cups Compute units per second. Defaults to 330.
   */
  public withComputeUnitsPerSecond(cups: number): this {
    this.container.setCliFlag("--compute-units-per-second", cups.toString());
    return this;
  }

  /**
   * Fetch state over a remote endpoint instead of starting from an empty state.
   * @param url Remote endpoint URL.
   */
  public withForkUrl(url: string): this {
    this.container.setCliFlag("--fork-url", url);
    return this;
  }

  /**
   * Fetch state from a specific block number over a remote endpoint.
   * @param blockNumber Block number.
   */
  public withForkBlockNumber(blockNumber: number): this {
    this.container.setCliFlag("--fork-block-number", blockNumber.toString());
    return this;
  }

  /**
   * Specify chain id to skip fetching it from remote endpoint.
   * @param chainId Chain ID.
   */
  public withForkChainId(chainId: number): this {
    this.container.setCliFlag("--fork-chain-id", chainId.toString());
    return this;
  }

  /**
   * Headers to use for the rpc client, e.g. "User-Agent: test-agent".
   * @param header Header string.
   */
  public withForkHeader(header: string): this {
    this.container.setCliFlag("--fork-header", header);
    return this;
  }

  /**
   * Initial retry backoff on encountering errors.
   * @param backoff Backoff in milliseconds.
   */
  public withForkRetryBackoff(backoff: number): this {
    this.container.setCliFlag("--fork-retry-backoff", backoff.toString());
    return this;
  }

  /**
   * Fetch state from after a specific transaction hash has been applied over a remote endpoint.
   * @param hash Transaction hash.
   */
  public withForkTransactionHash(hash: string): this {
    this.container.setCliFlag("--fork-transaction-hash", hash);
    return this;
  }

  /**
   * Disables rate limiting for this node's provider.
   */
  public noRateLimit(enabled: boolean = true): this {
    this.container.setCliToggle("--no-rate-limit", enabled);
    return this;
  }

  /**
   * Explicitly disables the use of RPC caching.
   */
  public noStorageCaching(enabled: boolean = true): this {
    this.container.setCliToggle("--no-storage-caching", enabled);
    return this;
  }

  /**
   * Number of retry requests for spurious networks (timed out requests).
   * @param retries Number of retries. Defaults to 5.
   */
  public withRetries(retries: number): this {
    this.container.setCliFlag("--retries", retries.toString());
    return this;
  }

  /**
   * Timeout in ms for requests sent to remote JSON-RPC server in forking mode.
   * @param timeout Timeout in ms. Defaults to 45000.
   */
  public withTimeout(timeout: number): this {
    this.container.setCliFlag("--timeout", timeout.toString());
    return this;
  }
}
