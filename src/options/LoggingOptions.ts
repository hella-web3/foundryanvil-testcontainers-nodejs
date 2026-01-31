import { AnvilOptions } from "./AnvilOptions";
import { Color, LogVerbosity } from "../types";

export class LoggingOptions {
  constructor(private readonly container: AnvilOptions) {}

  /**
   * The color of the log messages.
   * @param color Color setting.
   */
  public withColor(color: Color): this {
    this.container.setCliFlag("--color", color);
    return this;
  }

  /**
   * Format log messages as Markdown.
   */
  public withMarkdownFormat(enabled: boolean = true): this {
    this.container.setCliToggle("--md", enabled);
    return this;
  }

  /**
   * Do not print log messages.
   */
  public quiet(enabled: boolean = true): this {
    this.container.setCliToggle("--quiet", enabled);
    return this;
  }

  /**
   * Sets the verbosity level of the log messages.
   * @param logVerbosity Verbosity level.
   */
  public verboseLogs(logVerbosity: LogVerbosity): this {
    Object.values(LogVerbosity).forEach((v) => {
      this.container.removeCliFlag(v);
    });
    this.container.setCliToggle(logVerbosity, true);
    return this;
  }

  /**
   * Format log messages as JSON.
   */
  public jsonLogFormat(enabled: boolean = true): this {
    this.container.setCliToggle("--json", enabled);
    return this;
  }

  /**
   * Disable printing of `console.log` invocations to stdout.
   */
  public disableConsoleLog(enabled: boolean = true): this {
    this.container.setCliToggle("--disable-console-log", enabled);
    return this;
  }
}
