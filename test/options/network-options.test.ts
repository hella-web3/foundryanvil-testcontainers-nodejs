import { AnvilOptions } from "../../src";

describe("NetworkOptions", () => {
  let options: AnvilOptions;

  beforeEach(() => {
    options = new AnvilOptions();
  });

  it("withCelo should toggle --celo flag", () => {
    options.network.withCelo(true);
    expect(options.entryPoint).toContain("--celo");
    options.network.withCelo(false);
    expect(options.entryPoint).not.toContain("--celo");
  });

  it("withOptimism should toggle --optimism flag", () => {
    options.network.withOptimism(true);
    expect(options.entryPoint).toContain("--optimism");
    options.network.withOptimism(false);
    expect(options.entryPoint).not.toContain("--optimism");
  });
});
