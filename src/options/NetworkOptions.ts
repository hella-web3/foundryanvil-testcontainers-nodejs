import { AnvilOptions } from "./AnvilOptions";

export class NetworkOptions {
  constructor(private readonly container: AnvilOptions) {}

  /**
   * Enable Celo network features.
   */
  public withCelo(enabled: boolean = true): this {
    this.container.setCliToggle("--celo", enabled);
    return this;
  }

  /**
   * Enable Optimism network features.
   */
  public withOptimism(enabled: boolean = true): this {
    this.container.setCliToggle("--optimism", enabled);
    return this;
  }
}
