import { AccountOptions } from "./account-options";
import { MiningOptions } from "./mining-options";
import { LoggingOptions } from "./logging-options";
import { ForkingOptions } from "./forking-options";
import { NetworkOptions } from "./network-options";
import { EvmOptions } from "./evm-options";
import { ServerOptions } from "./server-options";
import { StateOptions } from "./state-options";
import { AnvilFlag } from "../types";

/**
 * The default base entry point for the Anvil container.
 *
 * It uses `anvil` as the executable and binds to `0.0.0.0` to ensure the server
 * is accessible from outside the container.
 */
const BASE_ENTRYPOINT = ["anvil", "--host", "0.0.0.0"];

export type SetFlagFunction = (flag: AnvilFlag, value: string) => void;

export type ToggleFlagFunction = (flag: AnvilFlag, enabled: boolean) => void;

export type GetAnvilOptions = () => AnvilOptions;

export class AnvilOptions {
  private readonly _entryPoint: string[] = BASE_ENTRYPOINT;

  /**
   * Creates a new instance of AnvilOptions.
   *
   * @param entryPoint - The base entry point for the Anvil process.
   * This must start with the keyword `anvil` as it runs the Foundry Anvil CLI tool
   * within the Docker container.
   *
   * Default: `["anvil", "--host", "0.0.0.0"]`
   *
   * ONLY ADVANCED USERS SHOULD SET A CUSTOM ENTRY POINT.
   * Recommended to use fluent Config setters, `setFlagFunction` and `toggleFlagFunction` to
   * configure the Anvil process.
   *
   * @example
   * ```typescript
   * // Custom entry point MUST start with the 'anvil' command
   * const options = new AnvilOptions(["anvil", "--port", "8545", "--host", "0.0.0.0"]);
   * ```
   */
  constructor(entryPoint: string[] = BASE_ENTRYPOINT) {
    this._entryPoint = entryPoint;
  }

  get entryPoint(): string[] {
    return this._entryPoint;
  }

  private toggleFlagFunction: ToggleFlagFunction = (
    flag: AnvilFlag,
    enabled: boolean,
  ) => {
    const index = this._entryPoint.indexOf(flag);
    if (enabled && index === -1) {
      this._entryPoint.push(flag);
    } else if (!enabled && index !== -1) {
      if (
        this._entryPoint[index + 1] &&
        !this._entryPoint[index + 1].startsWith("-")
      ) {
        this._entryPoint.splice(index, 2);
      } else {
        this._entryPoint.splice(index, 1);
      }
    }
  };

  private setFlagFunction: SetFlagFunction = (
    flag: AnvilFlag,
    value: string,
  ) => {
    const index = this._entryPoint.indexOf(flag);
    if (index !== -1) {
      if (
        this._entryPoint[index + 1] &&
        !this._entryPoint[index + 1].startsWith("-")
      ) {
        this._entryPoint[index + 1] = value;
      } else {
        this._entryPoint.splice(index + 1, 0, value);
      }
    } else {
      this._entryPoint.push(flag, value);
    }
  };

  private getAnvilOptions: GetAnvilOptions = () => this;

  private _network = new NetworkOptions(
    this.toggleFlagFunction,
    this.getAnvilOptions,
  );

  get network(): NetworkOptions {
    return this._network;
  }

  private _server = new ServerOptions(
    this.setFlagFunction,
    this.toggleFlagFunction,
    this.getAnvilOptions,
  );

  get server(): ServerOptions {
    return this._server;
  }

  private _state = new StateOptions(
    this.setFlagFunction,
    this.toggleFlagFunction,
    this.getAnvilOptions,
  );

  get state(): StateOptions {
    return this._state;
  }

  private _mining = new MiningOptions(
    this.setFlagFunction,
    this.toggleFlagFunction,
    this.getAnvilOptions,
  );

  get mining(): MiningOptions {
    return this._mining;
  }

  private _logs = new LoggingOptions(
    this.setFlagFunction,
    this.toggleFlagFunction,
    this.getAnvilOptions,
  );

  get logs(): LoggingOptions {
    return this._logs;
  }

  private _fork = new ForkingOptions(
    this.setFlagFunction,
    this.toggleFlagFunction,
    this.getAnvilOptions,
  );

  get fork(): ForkingOptions {
    return this._fork;
  }

  private _evm = new EvmOptions(
    this.setFlagFunction,
    this.toggleFlagFunction,
    this.getAnvilOptions,
  );

  get evm(): EvmOptions {
    return this._evm;
  }

  private _account = new AccountOptions(
    this.setFlagFunction,
    this.toggleFlagFunction,
    this.getAnvilOptions,
  );

  get account(): AccountOptions {
    return this._account;
  }
}
