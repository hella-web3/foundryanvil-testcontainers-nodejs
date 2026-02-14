import { AnvilOptions } from "../../src";

describe("ServerOptions", () => {
  let options: AnvilOptions;

  beforeEach(() => {
    options = new AnvilOptions();
  });

  it("withIpc should set --ipc flag with path", () => {
    options.server.withIpc("/tmp/anvil.ipc");
    expect(options.entryPoint).toContain("--ipc");
    expect(options.entryPoint[options.entryPoint.indexOf("--ipc") + 1]).toBe(
      "/tmp/anvil.ipc",
    );
  });

  it("withIpc should toggle --ipc flag without path", () => {
    const freshOptions = new AnvilOptions(["anvil"]);
    freshOptions.server.withIpc();
    expect(freshOptions.entryPoint).toEqual(["anvil", "--ipc"]);
  });

  it("withThreads should set --threads flag", () => {
    options.server.withThreads(4);
    expect(options.entryPoint).toContain("--threads");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--threads") + 1],
    ).toBe("4");
  });

  it("withAllowOrigin should set --allow-origin flag", () => {
    options.server.withAllowOrigin("*");
    expect(options.entryPoint).toContain("--allow-origin");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--allow-origin") + 1],
    ).toBe("*");
  });

  it("withCachePath should set --cache-path flag", () => {
    options.server.withCachePath("/tmp/anvil-cache");
    expect(options.entryPoint).toContain("--cache-path");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--cache-path") + 1],
    ).toBe("/tmp/anvil-cache");
  });

  it("noCors should toggle --no-cors flag", () => {
    options.server.noCors(true);
    expect(options.entryPoint).toContain("--no-cors");
    options.server.noCors(false);
    expect(options.entryPoint).not.toContain("--no-cors");
  });

  it("noRequestSizeLimit should toggle --no-request-size-limit flag", () => {
    options.server.noRequestSizeLimit(true);
    expect(options.entryPoint).toContain("--no-request-size-limit");
    options.server.noRequestSizeLimit(false);
    expect(options.entryPoint).not.toContain("--no-request-size-limit");
  });
});
