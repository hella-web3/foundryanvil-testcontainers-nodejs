import {
  AnvilOptions,
  GetAnvilOptions,
  SetFlagFunction,
  ToggleFlagFunction,
} from "./anvil-options";

export class ServerOptions {
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
   * Launch an ipc server at the given path or default path.
   * Sets the `--ipc` flag.
   * @param path Optional IPC path.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().server.withIpc("/tmp/anvil.ipc");
   * ```
   */
  public withIpc(path?: string): AnvilOptions {
    if (path) {
      this.setCliFlag("--ipc", path);
    } else {
      this.toggleCliFlag("--ipc", true);
    }
    return this.getAnvilOptions();
  }

  /**
   * Number of threads to use. Specifying 0 defaults to the number of logical cores.
   * Sets the `--threads` flag.
   * @param threads Number of threads.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().server.withThreads(0);
   * ```
   */
  public withThreads(threads: number): AnvilOptions {
    this.setCliFlag("--threads", threads.toString());
    return this.getAnvilOptions();
  }

  /**
   * The cors `allow_origin` header.
   * Sets the `--allow-origin` flag.
   * @param origin Allow origin header. Defaults to *.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().server.withAllowOrigin("*");
   * ```
   */
  public withAllowOrigin(origin: string): AnvilOptions {
    this.setCliFlag("--allow-origin", origin);
    return this.getAnvilOptions();
  }

  /**
   * Path to the cache directory where persisted states are stored.
   * Sets the `--cache-path` flag.
   * @param path Cache path.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().server.withCachePath("/tmp/anvil-cache");
   * ```
   */
  public withCachePath(path: string): AnvilOptions {
    this.setCliFlag("--cache-path", path);
    return this.getAnvilOptions();
  }

  /**
   * Disable CORS.
   * Sets the `--no-cors` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().server.noCors();
   * ```
   */
  public noCors(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--no-cors", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Disable the default request body size limit.
   * Sets the `--no-request-size-limit` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().server.noRequestSizeLimit();
   * ```
   */
  public noRequestSizeLimit(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--no-request-size-limit", enabled);
    return this.getAnvilOptions();
  }
}
