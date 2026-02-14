import { AnvilOptions } from "../../src";

describe("AccountOptions", () => {
  let options: AnvilOptions;

  beforeEach(() => {
    options = new AnvilOptions();
  });

  it("withAccounts should set --accounts flag", () => {
    options.account.withAccounts(5);
    expect(options.entryPoint).toContain("--accounts");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--accounts") + 1],
    ).toBe("5");
  });

  it("withBalance should set --balance flag", () => {
    options.account.withBalance(100);
    expect(options.entryPoint).toContain("--balance");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--balance") + 1],
    ).toBe("100");
  });

  it("withDerivationPath should set --derivation-path flag", () => {
    options.account.withDerivationPath("m/44'/60'/0'/0/");
    expect(options.entryPoint).toContain("--derivation-path");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--derivation-path") + 1],
    ).toBe("m/44'/60'/0'/0/");
  });

  it("withMnemonic should set --mnemonic flag", () => {
    const mnemonic =
      "test test test test test test test test test test test junk";
    options.account.withMnemonic(mnemonic);
    expect(options.entryPoint).toContain("--mnemonic");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--mnemonic") + 1],
    ).toBe(mnemonic);
  });

  it("withRandomMnemonic should set --mnemonic-random flag with count", () => {
    options.account.withRandomMnemonic(24);
    expect(options.entryPoint).toContain("--mnemonic-random");
    expect(
      options.entryPoint[options.entryPoint.indexOf("--mnemonic-random") + 1],
    ).toBe("24");
  });

  it("withRandomMnemonic should set --mnemonic-random flag without count", () => {
    const freshOptions = new AnvilOptions(["anvil"]);
    freshOptions.account.withRandomMnemonic();
    expect(freshOptions.entryPoint).toEqual(["anvil", "--mnemonic-random"]);
  });

  it("withMnemonicSeedUnsafe should set --mnemonic-seed-unsafe flag", () => {
    options.account.withMnemonicSeedUnsafe("myseed");
    expect(options.entryPoint).toContain("--mnemonic-seed-unsafe");
    expect(
      options.entryPoint[
        options.entryPoint.indexOf("--mnemonic-seed-unsafe") + 1
      ],
    ).toBe("myseed");
  });
});
