import { AnvilOptions } from "./AnvilOptions";
import { Hardfork } from "../types";

export class EvmOptions {
  constructor(private readonly container: AnvilOptions) {}

  /**
   * Sets the EVM hardfork to use.
   * @param hardfork Hardfork name.
   */
  public withHardfork(hardfork: Hardfork): this {
    this.container.setCliFlag("--hardfork", hardfork);
    return this;
  }

  /**
   * Enables automatic impersonation on startup.
   */
  public autoImpersonate(enabled: boolean = true): this {
    this.container.setCliToggle("--auto-impersonate", enabled);
    return this;
  }

  /**
   * The base fee in a block.
   * @param fee Base fee.
   */
  public withBlockBaseFeePerGas(fee: bigint | number): this {
    this.container.setCliFlag("--block-base-fee-per-gas", fee.toString());
    return this;
  }

  /**
   * The chain ID.
   * @param chainId Chain ID.
   */
  public withChainId(chainId: number): this {
    this.container.setCliFlag("--chain-id", chainId.toString());
    return this;
  }

  /**
   * EIP-170: Contract code size limit in bytes.
   * @param size Size in bytes.
   */
  public withCodeSizeLimit(size: number): this {
    this.container.setCliFlag("--code-size-limit", size.toString());
    return this;
  }

  /**
   * Disable the `call.gas_limit <= block.gas_limit` constraint.
   */
  public disableBlockGasLimit(enabled: boolean = true): this {
    this.container.setCliToggle("--disable-block-gas-limit", enabled);
    return this;
  }

  /**
   * Disable EIP-170: Contract code size limit.
   */
  public disableCodeSizeLimit(enabled: boolean = true): this {
    this.container.setCliToggle("--disable-code-size-limit", enabled);
    return this;
  }

  /**
   * Disable the enforcement of a minimum suggested priority fee.
   */
  public disableMinPriorityFee(enabled: boolean = true): this {
    this.container.setCliToggle("--disable-min-priority-fee", enabled);
    return this;
  }

  /**
   * The block gas limit.
   * @param limit Gas limit.
   */
  public withGasLimit(limit: bigint | number): this {
    this.container.setCliFlag("--gas-limit", limit.toString());
    return this;
  }

  /**
   * The gas price.
   * @param price Gas price.
   */
  public withGasPrice(price: bigint | number): this {
    this.container.setCliFlag("--gas-price", price.toString());
    return this;
  }

  /**
   * Disable the default create2 deployer.
   */
  public disableDefaultCreate2Deployer(enabled: boolean = true): this {
    this.container.setCliToggle("--disable-default-create2-deployer", enabled);
    return this;
  }

  /**
   * Disable pool balance checks.
   */
  public disablePoolBalanceChecks(enabled: boolean = true): this {
    this.container.setCliToggle("--disable-pool-balance-checks", enabled);
    return this;
  }

  /**
   * The memory limit per EVM execution in bytes.
   * @param limit Memory limit.
   */
  public withMemoryLimit(limit: number): this {
    this.container.setCliFlag("--memory-limit", limit.toString());
    return this;
  }

  /**
   * Enable printing of traces for executed transactions and `eth_call` to stdout.
   */
  public withPrintTraces(enabled: boolean = true): this {
    this.container.setCliToggle("--print-traces", enabled);
    return this;
  }

  /**
   * Enable steps tracing used for debug calls returning geth-style traces.
   */
  public withStepsTracing(enabled: boolean = true): this {
    this.container.setCliToggle("--steps-tracing", enabled);
    return this;
  }
}
