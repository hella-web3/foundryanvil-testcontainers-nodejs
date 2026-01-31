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
   * @param hardfork Hardfork name.
   */
  public withHardfork(hardfork: Hardfork): AnvilOptions {
    this.setCliFlag("--hardfork", hardfork);
    return this.getAnvilOptions();
  }

  /**
   * Enables automatic impersonation on startup.
   */
  public autoImpersonate(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--auto-impersonate", enabled);
    return this.getAnvilOptions();
  }

  /**
   * The base fee in a block.
   * @param fee Base fee.
   */
  public withBlockBaseFeePerGas(fee: bigint | number): AnvilOptions {
    this.setCliFlag("--block-base-fee-per-gas", fee.toString());
    return this.getAnvilOptions();
  }

  /**
   * The chain ID.
   * @param chainId Chain ID.
   */
  public withChainId(chainId: number): AnvilOptions {
    this.setCliFlag("--chain-id", chainId.toString());
    return this.getAnvilOptions();
  }

  /**
   * EIP-170: Contract code size limit in bytes.
   * @param size Size in bytes.
   */
  public withCodeSizeLimit(size: number): AnvilOptions {
    this.setCliFlag("--code-size-limit", size.toString());
    return this.getAnvilOptions();
  }

  /**
   * Disable the `call.gas_limit <= block.gas_limit` constraint.
   */
  public disableBlockGasLimit(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--disable-block-gas-limit", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Disable EIP-170: Contract code size limit.
   */
  public disableCodeSizeLimit(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--disable-code-size-limit", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Disable the enforcement of a minimum suggested priority fee.
   */
  public disableMinPriorityFee(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--disable-min-priority-fee", enabled);
    return this.getAnvilOptions();
  }

  /**
   * The block gas limit.
   * @param limit Gas limit.
   */
  public withGasLimit(limit: bigint | number): AnvilOptions {
    this.setCliFlag("--gas-limit", limit.toString());
    return this.getAnvilOptions();
  }

  /**
   * The gas price.
   * @param price Gas price.
   */
  public withGasPrice(price: bigint | number): AnvilOptions {
    this.setCliFlag("--gas-price", price.toString());
    return this.getAnvilOptions();
  }

  /**
   * Disable the default create2 deployer.
   */
  public disableDefaultCreate2Deployer(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--disable-default-create2-deployer", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Disable pool balance checks.
   */
  public disablePoolBalanceChecks(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--disable-pool-balance-checks", enabled);
    return this.getAnvilOptions();
  }

  /**
   * The memory limit per EVM execution in bytes.
   * @param limit Memory limit.
   */
  public withMemoryLimit(limit: number): AnvilOptions {
    this.setCliFlag("--memory-limit", limit.toString());
    return this.getAnvilOptions();
  }

  /**
   * Enable printing of traces for executed transactions and `eth_call` to stdout.
   */
  public withPrintTraces(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--print-traces", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Enable steps tracing used for debug calls returning geth-style traces.
   */
  public withStepsTracing(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--steps-tracing", enabled);
    return this.getAnvilOptions();
  }
}
