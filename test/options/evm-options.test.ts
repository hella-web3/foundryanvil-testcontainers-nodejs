import { AnvilOptions, Hardfork } from "../../src";

describe("EvmOptions", () => {
  let options: AnvilOptions;

  beforeEach(() => {
    options = new AnvilOptions();
  });

  it("withHardfork should set --hardfork flag", () => {
    options.evm.withHardfork(Hardfork.London);
    expect(options.entryPoint).toContain("--hardfork");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--hardfork") + 1],
    ).toBe(Hardfork.London);
  });

  it("autoImpersonate should toggle --auto-impersonate flag", () => {
    options.evm.autoImpersonate(true);
    expect(options.entryPoint).toContain("--auto-impersonate");
    options.evm.autoImpersonate(false);
    expect(options.entryPoint).not.toContain("--auto-impersonate");
  });

  it("withBlockBaseFeePerGas should set --block-base-fee-per-gas flag", () => {
    options.evm.withBlockBaseFeePerGas(1000000000n);
    expect(options.entryPoint).toContain("--block-base-fee-per-gas");
    expect(
      options.entryPoint[
        options.entryPoint.indexOf("--block-base-fee-per-gas") + 1
      ],
    ).toBe("1000000000");
  });

  it("withChainId should set --chain-id flag", () => {
    options.evm.withChainId(1337);
    expect(options.entryPoint).toContain("--chain-id");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--chain-id") + 1],
    ).toBe("1337");
  });

  it("withCodeSizeLimit should set --code-size-limit flag", () => {
    options.evm.withCodeSizeLimit(32128);
    expect(options.entryPoint).toContain("--code-size-limit");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--code-size-limit") + 1],
    ).toBe("32128");
  });

  it("disableBlockGasLimit should toggle --disable-block-gas-limit flag", () => {
    options.evm.disableBlockGasLimit(true);
    expect(options.entryPoint).toContain("--disable-block-gas-limit");
    options.evm.disableBlockGasLimit(false);
    expect(options.entryPoint).not.toContain("--disable-block-gas-limit");
  });

  it("disableCodeSizeLimit should toggle --disable-code-size-limit flag", () => {
    options.evm.disableCodeSizeLimit(true);
    expect(options.entryPoint).toContain("--disable-code-size-limit");
    options.evm.disableCodeSizeLimit(false);
    expect(options.entryPoint).not.toContain("--disable-code-size-limit");
  });

  it("disableMinPriorityFee should toggle --disable-min-priority-fee flag", () => {
    options.evm.disableMinPriorityFee(true);
    expect(options.entryPoint).toContain("--disable-min-priority-fee");
    options.evm.disableMinPriorityFee(false);
    expect(options.entryPoint).not.toContain("--disable-min-priority-fee");
  });

  it("withGasLimit should set --gas-limit flag", () => {
    options.evm.withGasLimit(30000000n);
    expect(options.entryPoint).toContain("--gas-limit");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--gas-limit") + 1],
    ).toBe("30000000");
  });

  it("withGasPrice should set --gas-price flag", () => {
    options.evm.withGasPrice(20000000000n);
    expect(options.entryPoint).toContain("--gas-price");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--gas-price") + 1],
    ).toBe("20000000000");
  });

  it("disableDefaultCreate2Deployer should toggle --disable-default-create2-deployer flag", () => {
    options.evm.disableDefaultCreate2Deployer(true);
    expect(options.entryPoint).toContain("--disable-default-create2-deployer");
    options.evm.disableDefaultCreate2Deployer(false);
    expect(options.entryPoint).not.toContain(
      "--disable-default-create2-deployer",
    );
  });

  it("disablePoolBalanceChecks should toggle --disable-pool-balance-checks flag", () => {
    options.evm.disablePoolBalanceChecks(true);
    expect(options.entryPoint).toContain("--disable-pool-balance-checks");
    options.evm.disablePoolBalanceChecks(false);
    expect(options.entryPoint).not.toContain("--disable-pool-balance-checks");
  });

  it("withMemoryLimit should set --memory-limit flag", () => {
    options.evm.withMemoryLimit(128 * 1024 * 1024);
    expect(options.entryPoint).toContain("--memory-limit");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--memory-limit") + 1],
    ).toBe((128 * 1024 * 1024).toString());
  });

  it("withPrintTraces should toggle --print-traces flag", () => {
    options.evm.withPrintTraces(true);
    expect(options.entryPoint).toContain("--print-traces");
    options.evm.withPrintTraces(false);
    expect(options.entryPoint).not.toContain("--print-traces");
  });

  it("withStepsTracing should toggle --steps-tracing flag", () => {
    options.evm.withStepsTracing(true);
    expect(options.entryPoint).toContain("--steps-tracing");
    options.evm.withStepsTracing(false);
    expect(options.entryPoint).not.toContain("--steps-tracing");
  });
});
