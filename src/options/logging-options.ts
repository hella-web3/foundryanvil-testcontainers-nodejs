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
   * Sets the `--color` flag.
   * @param color Color setting.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().logs.withColor(Color.Always);
   * ```
   */
  public withColor(color: Color): AnvilOptions {
    this.setCliFlag("--color", color);
    return this.getAnvilOptions();
  }

  /**
   * Format log messages as Markdown.
   * Sets the `--md` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().logs.withMarkdownFormat();
   * ```
   */
  public withMarkdownFormat(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--md", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Do not print log messages.
   * Sets the `--quiet` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().logs.quiet();
   * ```
   */
  public quiet(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--quiet", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Sets the verbosity level of the log messages.
   * Sets the `-v`, `-vv`, etc. flags.
   * @param logVerbosity Verbosity level.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().logs.verboseLogs(LogVerbosity.Three);
   * ```
   */
  public verboseLogs(logVerbosity: LogVerbosity): AnvilOptions {
    this.toggleCliFlag(logVerbosity, true);
    return this.getAnvilOptions();
  }

  /**
   * Format log messages as JSON.
   * Sets the `--json` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().logs.jsonLogFormat();
   * ```
   */
  public jsonLogFormat(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--json", enabled);
    return this.getAnvilOptions();
  }

  /**
   * Disable printing of `console.log` invocations to stdout.
   * Sets the `--disable-console-log` flag.
   * @param enabled Whether to enable. Defaults to true.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().logs.disableConsoleLog();
   * ```
   */
  public disableConsoleLog(enabled: boolean = true): AnvilOptions {
    this.toggleCliFlag("--disable-console-log", enabled);
    return this.getAnvilOptions();
  }
}
