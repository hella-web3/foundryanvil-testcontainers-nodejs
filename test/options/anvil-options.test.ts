import { AnvilOptions } from "../../src";

describe("AnvilOptions", () => {
  it("should have default entrypoint", () => {
    const options = new AnvilOptions();
    expect(options.entryPoint).toEqual(["anvil", "--host", "0.0.0.0"]);
  });

  it("should allow custom entrypoint in constructor", () => {
    const customEntryPoint = ["custom-anvil", "--flag"];
    const options = new AnvilOptions(customEntryPoint);
    expect(options.entryPoint).toEqual(customEntryPoint);
  });

  it("should return sub-options modules", () => {
    const options = new AnvilOptions();
    expect(options.network).toBeDefined();
    expect(options.server).toBeDefined();
    expect(options.state).toBeDefined();
    expect(options.mining).toBeDefined();
    expect(options.logs).toBeDefined();
    expect(options.fork).toBeDefined();
    expect(options.evm).toBeDefined();
    expect(options.account).toBeDefined();
  });
});
