import { AnvilOptions, Order } from "../../src";

describe("StateOptions", () => {
  let options: AnvilOptions;

  beforeEach(() => {
    options = new AnvilOptions();
  });

  it("withConfigOut should set --config-out flag", () => {
    options.state.withConfigOut("config.json");
    expect(options.entryPoint).toContain("--config-out");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--config-out") + 1],
    ).toBe("config.json");
  });

  it("withDumpState should set --dump-state flag", () => {
    options.state.withDumpState("state.json");
    expect(options.entryPoint).toContain("--dump-state");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--dump-state") + 1],
    ).toBe("state.json");
  });

  it("withInit should set --init flag", () => {
    options.state.withInit("genesis.json");
    expect(options.entryPoint).toContain("--init");
    expect(options.entryPoint[options.entryPoint.indexOf("--init") + 1]).toBe(
      "genesis.json",
    );
  });

  it("withLoadState should set --load-state flag", () => {
    options.state.withLoadState("state.json");
    expect(options.entryPoint).toContain("--load-state");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--load-state") + 1],
    ).toBe("state.json");
  });

  it("withMaxPersistedStates should set --max-persisted-states flag", () => {
    options.state.withMaxPersistedStates(10);
    expect(options.entryPoint).toContain("--max-persisted-states");
    expect(
      options.entryPoint[
        options.entryPoint.indexOf("--max-persisted-states") + 1
      ],
    ).toBe("10");
  });

  it("withOrder should set --order flag", () => {
    options.state.withOrder(Order.Fifo);
    expect(options.entryPoint).toContain("--order");
    expect(options.entryPoint[options.entryPoint.indexOf("--order") + 1]).toBe(
      Order.Fifo,
    );
  });

  it("withPreserveHistoricalStates should toggle --preserve-historical-states flag", () => {
    options.state.withPreserveHistoricalStates(true);
    expect(options.entryPoint).toContain("--preserve-historical-states");
    options.state.withPreserveHistoricalStates(false);
    expect(options.entryPoint).not.toContain("--preserve-historical-states");
  });

  it("withPruneHistory should set --prune-history flag with count", () => {
    options.state.withPruneHistory(100);
    expect(options.entryPoint).toContain("--prune-history");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--prune-history") + 1],
    ).toBe("100");
  });

  it("withPruneHistory should toggle --prune-history flag without count", () => {
    const freshOptions = new AnvilOptions(["anvil"]);
    freshOptions.state.withPruneHistory();
    expect(freshOptions.entryPoint).toEqual(["anvil", "--prune-history"]);
  });

  it("withStateInterval should set --state-interval flag", () => {
    options.state.withStateInterval(60);
    expect(options.entryPoint).toContain("--state-interval");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--state-interval") + 1],
    ).toBe("60");
  });

  it("withState should set --state flag", () => {
    options.state.withState("state.json");
    expect(options.entryPoint).toContain("--state");
    expect(options.entryPoint[options.entryPoint.indexOf("--state") + 1]).toBe(
      "state.json",
    );
  });

  it("withTimestamp should set --timestamp flag", () => {
    options.state.withTimestamp(1625097600);
    expect(options.entryPoint).toContain("--timestamp");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--timestamp") + 1],
    ).toBe("1625097600");
  });

  it("withTransactionBlockKeeper should set --transaction-block-keeper flag", () => {
    options.state.withTransactionBlockKeeper(100);
    expect(options.entryPoint).toContain("--transaction-block-keeper");
    expect(
      options.entryPoint[
        options.entryPoint.indexOf("--transaction-block-keeper") + 1
      ],
    ).toBe("100");
  });
});
