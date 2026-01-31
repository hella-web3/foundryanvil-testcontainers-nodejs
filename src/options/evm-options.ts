import {
  AnvilOptions,
  GetAnvilOptions,
  SetFlagFunction,
  ToggleFlagFunction,
} from "./anvil-options";
import { Hardfork } from "../types";

export class EvmOptions {
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
   * Sets the EVM hardfork to use.
   * Sets the `--hardfork` flag.
   * @param hardfork Hardfork name.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().evm.withHardfork(Hardfork.London);
   * ```
   */
  public withHardfork(hardfork: Hardfork): AnvilOptions {
    this.setCliFlag("--hardfork", hardfork);
    return this.getAnvilOptions();
  }

  /**
   * Enables automatic impersonation on startup.
   * Sets the `--auto-impersonate` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().evm.autoImpersonate();
   * ```
   */
  public autoImpersonate(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--auto-impersonate", enabled);
    return this.getAnvilOptions();
  }

  /**
   * The base fee in a block.
   * Sets the `--block-base-fee-per-gas` flag.
   * @param fee Base fee.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().evm.withBlockBaseFeePerGas(1000000000n);
   * ```
   */
  public withBlockBaseFeePerGas(fee: bigint | number): AnvilOptions {
    this.setCliFlag("--block-base-fee-per-gas", fee.toString());
    return this.getAnvilOptions();
  }

  /**
   * The chain ID.
   * Sets the `--chain-id` flag.
   * @param chainId Chain ID.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().evm.withChainId(1337);
   * ```
   */
  public withChainId(chainId: number): AnvilOptions {
    this.setCliFlag("--chain-id", chainId.toString());
    return this.getAnvilOptions();
  }

  /**
   * EIP-170: Contract code size limit in bytes.
   * Sets the `--code-size-limit` flag.
   * @param size Size in bytes.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().evm.withCodeSizeLimit(32128);
   * ```
   */
  public withCodeSizeLimit(size: number): AnvilOptions {
    this.setCliFlag("--code-size-limit", size.toString());
    return this.getAnvilOptions();
  }

  /**
   * Disable the `call.gas_limit <= block.gas_limit` constraint.
   * Sets the `--disable-block-gas-limit` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().evm.disableBlockGasLimit();
   * ```
   */
  public disableBlockGasLimit(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--disable-block-gas-limit", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Disable EIP-170: Contract code size limit.
   * Sets the `--disable-code-size-limit` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().evm.disableCodeSizeLimit();
   * ```
   */
  public disableCodeSizeLimit(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--disable-code-size-limit", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Disable the enforcement of a minimum suggested priority fee.
   * Sets the `--disable-min-priority-fee` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().evm.disableMinPriorityFee();
   * ```
   */
  public disableMinPriorityFee(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--disable-min-priority-fee", enabled);
    return this.getAnvilOptions();
  }

  /**
   * The block gas limit.
   * Sets the `--gas-limit` flag.
   * @param limit Gas limit.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().evm.withGasLimit(30000000n);
   * ```
   */
  public withGasLimit(limit: bigint | number): AnvilOptions {
    this.setCliFlag("--gas-limit", limit.toString());
    return this.getAnvilOptions();
  }

  /**
   * The gas price.
   * Sets the `--gas-price` flag.
   * @param price Gas price.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().evm.withGasPrice(20000000000n);
   * ```
   */
  public withGasPrice(price: bigint | number): AnvilOptions {
    this.setCliFlag("--gas-price", price.toString());
    return this.getAnvilOptions();
  }

  /**
   * Disable the default create2 deployer.
   * Sets the `--disable-default-create2-deployer` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().evm.disableDefaultCreate2Deployer();
   * ```
   */
  public disableDefaultCreate2Deployer(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--disable-default-create2-deployer", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Disable pool balance checks.
   * Sets the `--disable-pool-balance-checks` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().evm.disablePoolBalanceChecks();
   * ```
   */
  public disablePoolBalanceChecks(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--disable-pool-balance-checks", enabled);
    return this.getAnvilOptions();
  }

  /**
   * The memory limit per EVM execution in bytes.
   * Sets the `--memory-limit` flag.
   * @param limit Memory limit.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().evm.withMemoryLimit(128 * 1024 * 1024);
   * ```
   */
  public withMemoryLimit(limit: number): AnvilOptions {
    this.setCliFlag("--memory-limit", limit.toString());
    return this.getAnvilOptions();
  }

  /**
   * Enable printing of traces for executed transactions and `eth_call` to stdout.
   * Sets the `--print-traces` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().evm.withPrintTraces();
   * ```
   */
  public withPrintTraces(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--print-traces", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Enable steps tracing used for debug calls returning geth-style traces.
   * Sets the `--steps-tracing` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().evm.withStepsTracing();
   * ```
   */
  public withStepsTracing(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--steps-tracing", enabled);
    return this.getAnvilOptions();
  }
}
