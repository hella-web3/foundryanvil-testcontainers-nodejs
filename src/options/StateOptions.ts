import { AnvilOptions } from "./AnvilOptions";
import { Order } from "../types";

export class StateOptions {
  constructor(private readonly container: AnvilOptions) {}

  /**
   * Writes output of `anvil` as json to user-specified file.
   * @param path File path.
   */
  public withConfigOut(path: string): this {
    this.container.setCliFlag("--config-out", path);
    return this;
  }

  /**
   * Dump the state and block environment of chain on exit to the given file.
   * @param path File path or directory.
   */
  public withDumpState(path: string): this {
    this.container.setCliFlag("--dump-state", path);
    return this;
  }

  /**
   * Initialize the genesis block with the given `genesis.json` file.
   * @param path Path to genesis.json.
   */
  public withInit(path: string): this {
    this.container.setCliFlag("--init", path);
    return this;
  }

  /**
   * Initialize the chain from a previously saved state snapshot.
   * @param path Path to state file.
   */
  public withLoadState(path: string): this {
    this.container.setCliFlag("--load-state", path);
    return this;
  }

  /**
   * Max number of states to persist on disk.
   * @param count Max states.
   */
  public withMaxPersistedStates(count: number): this {
    this.container.setCliFlag("--max-persisted-states", count.toString());
    return this;
  }

  /**
   * How transactions are sorted in the mempool.
   * @param order Sorting order. Defaults to fees.
   */
  public withOrder(order: Order): this {
    this.container.setCliFlag("--order", order);
    return this;
  }

  /**
   * Preserve historical state snapshots when dumping the state.
   */
  public withPreserveHistoricalStates(enabled: boolean = true): this {
    this.container.setCliToggle("--preserve-historical-states", enabled);
    return this;
  }

  /**
   * Don't keep full chain history.
   * @param count Optional max number of states to keep in memory.
   */
  public withPruneHistory(count?: number): this {
    if (count !== undefined) {
      this.container.setCliFlag("--prune-history", count.toString());
    } else {
      this.container.setCliToggle("--prune-history", true);
    }
    return this;
  }

  /**
   * Interval in seconds at which the state and block environment is to be dumped to disk.
   * @param seconds Interval in seconds.
   */
  public withStateInterval(seconds: number): this {
    this.container.setCliFlag("--state-interval", seconds.toString());
    return this;
  }

  /**
   * This is an alias for both --load-state and --dump-state.
   * @param path State file path.
   */
  public withState(path: string): this {
    this.container.setCliFlag("--state", path);
    return this;
  }

  /**
   * The timestamp of the genesis block.
   * @param timestamp Genesis timestamp.
   */
  public withTimestamp(timestamp: number): this {
    this.container.setCliFlag("--timestamp", timestamp.toString());
    return this;
  }

  /**
   * Number of blocks with transactions to keep in memory.
   * @param count Number of blocks.
   */
  public withTransactionBlockKeeper(count: number): this {
    this.container.setCliFlag("--transaction-block-keeper", count.toString());
    return this;
  }
}
