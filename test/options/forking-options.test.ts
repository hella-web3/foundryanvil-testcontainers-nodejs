import { AnvilOptions } from "../../src";

describe("ForkingOptions", () => {
  let options: AnvilOptions;

  beforeEach(() => {
    options = new AnvilOptions();
  });

  it("withComputeUnitsPerSecond should set --compute-units-per-second flag", () => {
    options.fork.withComputeUnitsPerSecond(600);
    expect(options.entryPoint).toContain("--compute-units-per-second");
    expect(
      options.entryPoint[
        options.entryPoint.indexOf("--compute-units-per-second") + 1
      ],
    ).toBe("600");
  });

  it("withForkUrl should set --fork-url flag", () => {
    const url = "https://mainnet.infura.io/v3/YOUR_KEY";
    options.fork.withForkUrl(url);
    expect(options.entryPoint).toContain("--fork-url");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--fork-url") + 1],
    ).toBe(url);
  });

  it("withForkBlockNumber should set --fork-block-number flag", () => {
    options.fork.withForkBlockNumber(18000000);
    expect(options.entryPoint).toContain("--fork-block-number");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--fork-block-number") + 1],
    ).toBe("18000000");
  });

  it("withForkChainId should set --fork-chain-id flag", () => {
    options.fork.withForkChainId(1);
    expect(options.entryPoint).toContain("--fork-chain-id");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--fork-chain-id") + 1],
    ).toBe("1");
  });

  it("withForkHeader should set --fork-header flag", () => {
    const header = "User-Agent: test-agent";
    options.fork.withForkHeader(header);
    expect(options.entryPoint).toContain("--fork-header");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--fork-header") + 1],
    ).toBe(header);
  });

  it("withForkRetryBackoff should set --fork-retry-backoff flag", () => {
    options.fork.withForkRetryBackoff(1000);
    expect(options.entryPoint).toContain("--fork-retry-backoff");
    expect(
      options.entryPoint[
        options.entryPoint.indexOf("--fork-retry-backoff") + 1
      ],
    ).toBe("1000");
  });

  it("withForkTransactionHash should set --fork-transaction-hash flag", () => {
    options.fork.withForkTransactionHash("0x123");
    expect(options.entryPoint).toContain("--fork-transaction-hash");
    expect(
      options.entryPoint[
        options.entryPoint.indexOf("--fork-transaction-hash") + 1
      ],
    ).toBe("0x123");
  });

  it("noRateLimit should toggle --no-rate-limit flag", () => {
    options.fork.noRateLimit(true);
    expect(options.entryPoint).toContain("--no-rate-limit");
    options.fork.noRateLimit(false);
    expect(options.entryPoint).not.toContain("--no-rate-limit");
  });

  it("noStorageCaching should toggle --no-storage-caching flag", () => {
    options.fork.noStorageCaching(true);
    expect(options.entryPoint).toContain("--no-storage-caching");
    options.fork.noStorageCaching(false);
    expect(options.entryPoint).not.toContain("--no-storage-caching");
  });

  it("withRetries should set --retries flag", () => {
    options.fork.withRetries(10);
    expect(options.entryPoint).toContain("--retries");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--retries") + 1],
    ).toBe("10");
  });

  it("withTimeout should set --timeout flag", () => {
    options.fork.withTimeout(60000);
    expect(options.entryPoint).toContain("--timeout");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--timeout") + 1],
    ).toBe("60000");
  });
});
