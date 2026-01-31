import {
  AnvilOptions,
  GetAnvilOptions,
  SetFlagFunction,
  ToggleFlagFunction,
} from "./anvil-options";
import { Order } from "../types";

export class StateOptions {
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
   * Writes output of `anvil` as json to user-specified file.
   * @param path File path.
   */
  public withConfigOut(path: string): AnvilOptions {
    this.setCliFlag("--config-out", path);
    return this.getAnvilOptions();
  }

  /**
   * Dump the state and block environment of chain on exit to the given file.
   * @param path File path or directory.
   */
  public withDumpState(path: string): AnvilOptions {
    this.setCliFlag("--dump-state", path);
    return this.getAnvilOptions();
  }

  /**
   * Initialize the genesis block with the given `genesis.json` file.
   * @param path Path to genesis.json.
   */
  public withInit(path: string): AnvilOptions {
    this.setCliFlag("--init", path);
    return this.getAnvilOptions();
  }

  /**
   * Initialize the chain from a previously saved state snapshot.
   * @param path Path to state file.
   */
  public withLoadState(path: string): AnvilOptions {
    this.setCliFlag("--load-state", path);
    return this.getAnvilOptions();
  }

  /**
   * Max number of states to persist on disk.
   * @param count Max states.
   */
  public withMaxPersistedStates(count: number): AnvilOptions {
    this.setCliFlag("--max-persisted-states", count.toString());
    return this.getAnvilOptions();
  }

  /**
   * How transactions are sorted in the mempool.
   * @param order Sorting order. Defaults to fees.
   */
  public withOrder(order: Order): AnvilOptions {
    this.setCliFlag("--order", order);
    return this.getAnvilOptions();
  }

  /**
   * Preserve historical state snapshots when dumping the state.
   */
  public withPreserveHistoricalStates(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--preserve-historical-states", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Don't keep full chain history.
   * @param count Optional max number of states to keep in memory.
   */
  public withPruneHistory(count?: number): AnvilOptions {
    if (count !== undefined) {
      this.setCliFlag("--prune-history", count.toString());
    } else {
      this.toggleCliFlag("--prune-history", true);
    }
    return this.getAnvilOptions();
  }

  /**
   * Interval in seconds at which the state and block environment is to be dumped to disk.
   * @param seconds Interval in seconds.
   */
  public withStateInterval(seconds: number): AnvilOptions {
    this.setCliFlag("--state-interval", seconds.toString());
    return this.getAnvilOptions();
  }

  /**
   * This is an alias for both --load-state and --dump-state.
   * @param path State file path.
   */
  public withState(path: string): AnvilOptions {
    this.setCliFlag("--state", path);
    return this.getAnvilOptions();
  }

  /**
   * The timestamp of the genesis block.
   * @param timestamp Genesis timestamp.
   */
  public withTimestamp(timestamp: number): AnvilOptions {
    this.setCliFlag("--timestamp", timestamp.toString());
    return this.getAnvilOptions();
  }

  /**
   * Number of blocks with transactions to keep in memory.
   * @param count Number of blocks.
   */
  public withTransactionBlockKeeper(count: number): AnvilOptions {
    this.setCliFlag("--transaction-block-keeper", count.toString());
    return this.getAnvilOptions();
  }
}
