import { AnvilOptions } from "./AnvilOptions";

export class ServerOptions {
  constructor(private readonly container: AnvilOptions) {}

  /**
   * Launch an ipc server at the given path or default path.
   * @param path Optional IPC path.
   */
  public withIpc(path?: string): this {
    if (path) {
      this.container.setCliFlag("--ipc", path);
    } else {
      this.container.setCliToggle("--ipc", true);
    }
    return this;
  }

  /**
   * Number of threads to use. Specifying 0 defaults to the number of logical cores.
   * @param threads Number of threads.
   */
  public withThreads(threads: number): this {
    this.container.setCliFlag("--threads", threads.toString());
    return this;
  }

  /**
   * The cors `allow_origin` header.
   * @param origin Allow origin header. Defaults to *.
   */
  public withAllowOrigin(origin: string): this {
    this.container.setCliFlag("--allow-origin", origin);
    return this;
  }

  /**
   * Path to the cache directory where persisted states are stored.
   * @param path Cache path.
   */
  public withCachePath(path: string): this {
    this.container.setCliFlag("--cache-path", path);
    return this;
  }

  /**
   * Disable CORS.
   */
  public noCors(enabled: boolean = true): this {
    this.container.setCliToggle("--no-cors", enabled);
    return this;
  }

  /**
   * Disable the default request body size limit.
   */
  public noRequestSizeLimit(enabled: boolean = true): this {
    this.container.setCliToggle("--no-request-size-limit", enabled);
    return this;
  }
}
