import { AnvilOptions } from "./AnvilOptions";

export class MiningOptions {
  constructor(private readonly container: AnvilOptions) {}

  /**
   * Sets the block time in seconds for interval mining.
   * @param seconds Block time in seconds.
   */
  public withBlockTime(seconds: number): this {
    this.container.setCliFlag("--block-time", seconds.toString());
    return this;
  }

  /**
   * Enable mixed mining.
   */
  public withMixedMining(enabled: boolean = true): this {
    this.container.setCliToggle("--mixed-mining", enabled);
    return this;
  }

  /**
   * Disable auto and interval mining, and mine on demand instead.
   */
  public withNoMining(enabled: boolean = true): this {
    this.container.setCliToggle("--no-mining", enabled);
    return this;
  }

  /**
   * Sets the number of the genesis block.
   * @param number Block number.
   */
  public withBlockNumber(number: number): this {
    this.container.setCliFlag("--number", number.toString());
    return this;
  }

  /**
   * Slots in an epoch.
   * @param slots Number of slots. Defaults to 32.
   */
  public withSlotsInAnEpoch(slots: number): this {
    this.container.setCliFlag("--slots-in-an-epoch", slots.toString());
    return this;
  }
}
