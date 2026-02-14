import { AnvilOptions } from "../../src";

describe("MiningOptions", () => {
  let options: AnvilOptions;

  beforeEach(() => {
    options = new AnvilOptions();
  });

  it("withBlockTime should set --block-time flag", () => {
    options.mining.withBlockTime(1);
    expect(options.entryPoint).toContain("--block-time");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--block-time") + 1],
    ).toBe("1");
  });

  it("withMixedMining should toggle --mixed-mining flag", () => {
    options.mining.withMixedMining(true);
    expect(options.entryPoint).toContain("--mixed-mining");
    options.mining.withMixedMining(false);
    expect(options.entryPoint).not.toContain("--mixed-mining");
  });

  it("withNoMining should toggle --no-mining flag", () => {
    options.mining.withNoMining(true);
    expect(options.entryPoint).toContain("--no-mining");
    options.mining.withNoMining(false);
    expect(options.entryPoint).not.toContain("--no-mining");
  });

  it("withBlockNumber should set --number flag", () => {
    options.mining.withBlockNumber(100);
    expect(options.entryPoint).toContain("--number");
    expect(options.entryPoint[options.entryPoint.indexOf("--number") + 1]).toBe(
      "100",
    );
  });

  it("withSlotsInAnEpoch should set --slots-in-an-epoch flag", () => {
    options.mining.withSlotsInAnEpoch(32);
    expect(options.entryPoint).toContain("--slots-in-an-epoch");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--slots-in-an-epoch") + 1],
    ).toBe("32");
  });
});
