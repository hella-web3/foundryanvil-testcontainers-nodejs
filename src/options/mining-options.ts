import {
  AnvilOptions,
  GetAnvilOptions,
  SetFlagFunction,
  ToggleFlagFunction,
} from "./anvil-options";

export class MiningOptions {
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
   * Sets the block time in seconds for interval mining.
   * @param seconds Block time in seconds.
   */
  public withBlockTime(seconds: number): AnvilOptions {
    this.setCliFlag("--block-time", seconds.toString());
    return this.getAnvilOptions();
  }

  /**
   * Enable mixed mining.
   */
  public withMixedMining(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--mixed-mining", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Disable auto and interval mining, and mine on demand instead.
   */
  public withNoMining(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--no-mining", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Sets the number of the genesis block.
   * @param number Block number.
   */
  public withBlockNumber(number: number): AnvilOptions {
    this.setCliFlag("--number", number.toString());
    return this.getAnvilOptions();
  }

  /**
   * Slots in an epoch.
   * @param slots Number of slots. Defaults to 32.
   */
  public withSlotsInAnEpoch(slots: number): AnvilOptions {
    this.setCliFlag("--slots-in-an-epoch", slots.toString());
    return this.getAnvilOptions();
  }
}
