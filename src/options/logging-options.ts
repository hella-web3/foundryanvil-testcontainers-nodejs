import {
  AnvilOptions,
  GetAnvilOptions,
  SetFlagFunction,
  ToggleFlagFunction,
} from "./anvil-options";
import { Color, LogVerbosity } from "../types";

export class LoggingOptions {
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
   * The color of the log messages.
   * @param color Color setting.
   */
  public withColor(color: Color): AnvilOptions {
    this.setCliFlag("--color", color);
    return this.getAnvilOptions();
  }

  /**
   * Format log messages as Markdown.
   */
  public withMarkdownFormat(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--md", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Do not print log messages.
   */
  public quiet(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--quiet", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Sets the verbosity level of the log messages.
   * @param logVerbosity Verbosity level.
   */
  public verboseLogs(logVerbosity: LogVerbosity): AnvilOptions {
    this.toggleCliFlag(logVerbosity, true);
    return this.getAnvilOptions();
  }

  /**
   * Format log messages as JSON.
   */
  public jsonLogFormat(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--json", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Disable printing of `console.log` invocations to stdout.
   */
  public disableConsoleLog(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--disable-console-log", enabled);
    return this.getAnvilOptions();
  }
}
