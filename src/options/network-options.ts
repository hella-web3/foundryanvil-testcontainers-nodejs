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
   */
  public withCelo(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--celo", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Enable Optimism network features.
   */
  public withOptimism(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--optimism", enabled);
    return this.getAnvilOptions();
  }
}
