import {
  AnvilOptions,
  GetAnvilOptions,
  SetFlagFunction,
  ToggleFlagFunction,
} from "./anvil-options";

export class NetworkOptions {
  // @ts-ignore
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
   * Enable Celo network features.
   * Sets the `--celo` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().network.withCelo();
   * ```
   */
  public withCelo(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--celo", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Enable Optimism network features.
   * Sets the `--optimism` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().network.withOptimism();
   * ```
   */
  public withOptimism(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--optimism", enabled);
    return this.getAnvilOptions();
  }
}
