import { AnvilOptions, GetAnvilOptions, SetFlagFunction, ToggleFlagFunction, } from "./anvil-options";
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
   * Sets the `--config-out` flag.
   * @param path File path.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().state.withConfigOut("config.json");
   * ```
   */
  public withConfigOut(path: string): AnvilOptions {
    this.setCliFlag("--config-out", path);
    return this.getAnvilOptions();
  }

  /**
   * Dump the state and block environment of chain on exit to the given file.
   * Sets the `--dump-state` flag.
   * @param path File path or directory.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().state.withDumpState("state.json");
   * ```
   */
  public withDumpState(path: string): AnvilOptions {
    this.setCliFlag("--dump-state", path);
    return this.getAnvilOptions();
  }

  /**
   * Initialize the genesis block with the given `genesis.json` file.
   * Sets the `--init` flag.
   * @param path Path to genesis.json.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().state.withInit("genesis.json");
   * ```
   */
  public withInit(path: string): AnvilOptions {
    this.setCliFlag("--init", path);
    return this.getAnvilOptions();
  }

  /**
   * Initialize the chain from a previously saved state snapshot.
   * Sets the `--load-state` flag.
   * @param path Path to state file.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().state.withLoadState("state.json");
   * ```
   */
  public withLoadState(path: string): AnvilOptions {
    this.setCliFlag("--load-state", path);
    return this.getAnvilOptions();
  }

  /**
   * Max number of states to persist on disk.
   * Sets the `--max-persisted-states` flag.
   * @param count Max states.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().state.withMaxPersistedStates(10);
   * ```
   */
  public withMaxPersistedStates(count: number): AnvilOptions {
    this.setCliFlag("--max-persisted-states", count.toString());
    return this.getAnvilOptions();
  }

  /**
   * How transactions are sorted in the mempool.
   * Sets the `--order` flag.
   * @param order Sorting order. Defaults to fees.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().state.withOrder(Order.Fifo);
   * ```
   */
  public withOrder(order: Order): AnvilOptions {
    this.setCliFlag("--order", order);
    return this.getAnvilOptions();
  }

  /**
   * Preserve historical state snapshots when dumping the state.
   * Sets the `--preserve-historical-states` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().state.withPreserveHistoricalStates();
   * ```
   */
  public withPreserveHistoricalStates(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--preserve-historical-states", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Don't keep full chain history.
   * Sets the `--prune-history` flag.
   * @param count Optional max number of states to keep in memory.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().state.withPruneHistory(100);
   * ```
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
   * Sets the `--state-interval` flag.
   * @param seconds Interval in seconds.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().state.withStateInterval(60);
   * ```
   */
  public withStateInterval(seconds: number): AnvilOptions {
    this.setCliFlag("--state-interval", seconds.toString());
    return this.getAnvilOptions();
  }

  /**
   * This is an alias for both --load-state and --dump-state.
   * Sets the `--state` flag.
   * @param path State file path.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().state.withState("state.json");
   * ```
   */
  public withState(path: string): AnvilOptions {
    this.setCliFlag("--state", path);
    return this.getAnvilOptions();
  }

  /**
   * The timestamp of the genesis block.
   * Sets the `--timestamp` flag.
   * @param timestamp Genesis timestamp.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().state.withTimestamp(1625097600);
   * ```
   */
  public withTimestamp(timestamp: number): AnvilOptions {
    this.setCliFlag("--timestamp", timestamp.toString());
    return this.getAnvilOptions();
  }

  /**
   * Number of blocks with transactions to keep in memory.
   * Sets the `--transaction-block-keeper` flag.
   * @param count Number of blocks.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().state.withTransactionBlockKeeper(100);
   * ```
   */
  public withTransactionBlockKeeper(count: number): AnvilOptions {
    this.setCliFlag("--transaction-block-keeper", count.toString());
    return this.getAnvilOptions();
  }
}
