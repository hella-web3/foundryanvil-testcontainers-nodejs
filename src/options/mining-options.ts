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
   * Sets the `--block-time` flag.
   * @param seconds Block time in seconds.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().mining.withBlockTime(1);
   * ```
   */
  public withBlockTime(seconds: number): AnvilOptions {
    this.setCliFlag("--block-time", seconds.toString());
    return this.getAnvilOptions();
  }

  /**
   * Enable mixed mining.
   * Sets the `--mixed-mining` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().mining.withMixedMining();
   * ```
   */
  public withMixedMining(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--mixed-mining", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Disable auto and interval mining, and mine on demand instead.
   * Sets the `--no-mining` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().mining.withNoMining();
   * ```
   */
  public withNoMining(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--no-mining", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Sets the number of the genesis block.
   * Sets the `--number` flag.
   * @param number Block number.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().mining.withBlockNumber(100);
   * ```
   */
  public withBlockNumber(number: number): AnvilOptions {
    this.setCliFlag("--number", number.toString());
    return this.getAnvilOptions();
  }

  /**
   * Slots in an epoch.
   * Sets the `--slots-in-an-epoch` flag.
   * @param slots Number of slots. Defaults to 32.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().mining.withSlotsInAnEpoch(32);
   * ```
   */
  public withSlotsInAnEpoch(slots: number): AnvilOptions {
    this.setCliFlag("--slots-in-an-epoch", slots.toString());
    return this.getAnvilOptions();
  }
}
