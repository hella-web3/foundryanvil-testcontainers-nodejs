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
   * @param path Optional IPC path.
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
   * @param threads Number of threads.
   */
  public withThreads(threads: number): AnvilOptions {
    this.setCliFlag("--threads", threads.toString());
    return this.getAnvilOptions();
  }

  /**
   * The cors `allow_origin` header.
   * @param origin Allow origin header. Defaults to *.
   */
  public withAllowOrigin(origin: string): AnvilOptions {
    this.setCliFlag("--allow-origin", origin);
    return this.getAnvilOptions();
  }

  /**
   * Path to the cache directory where persisted states are stored.
   * @param path Cache path.
   */
  public withCachePath(path: string): AnvilOptions {
    this.setCliFlag("--cache-path", path);
    return this.getAnvilOptions();
  }

  /**
   * Disable CORS.
   */
  public noCors(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--no-cors", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Disable the default request body size limit.
   */
  public noRequestSizeLimit(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--no-request-size-limit", enabled);
    return this.getAnvilOptions();
  }
}
