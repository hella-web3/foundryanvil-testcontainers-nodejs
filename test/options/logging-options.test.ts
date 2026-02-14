import { AnvilOptions, Color, LogVerbosity } from "../../src";

describe("LoggingOptions", () => {
  let options: AnvilOptions;

  beforeEach(() => {
    options = new AnvilOptions();
  });

  it("withColor should set --color flag", () => {
    options.logs.withColor(Color.Always);
    expect(options.entryPoint).toContain("--color");
    expect(options.entryPoint[options.entryPoint.indexOf("--color") + 1]).toBe(
      Color.Always,
    );
  });

  it("withMarkdownFormat should toggle --md flag", () => {
    options.logs.withMarkdownFormat(true);
    expect(options.entryPoint).toContain("--md");
    options.logs.withMarkdownFormat(false);
    expect(options.entryPoint).not.toContain("--md");
  });

  it("quiet should toggle --quiet flag", () => {
    options.logs.quiet(true);
    expect(options.entryPoint).toContain("--quiet");
    options.logs.quiet(false);
    expect(options.entryPoint).not.toContain("--quiet");
  });

  it("verboseLogs should set verbosity flag", () => {
    options.logs.verboseLogs(LogVerbosity.Three);
    expect(options.entryPoint).toContain(LogVerbosity.Three);
  });

  it("jsonLogFormat should toggle --json flag", () => {
    options.logs.jsonLogFormat(true);
    expect(options.entryPoint).toContain("--json");
    options.logs.jsonLogFormat(false);
    expect(options.entryPoint).not.toContain("--json");
  });

  it("disableConsoleLog should toggle --disable-console-log flag", () => {
    options.logs.disableConsoleLog(true);
    expect(options.entryPoint).toContain("--disable-console-log");
    options.logs.disableConsoleLog(false);
    expect(options.entryPoint).not.toContain("--disable-console-log");
  });
});
