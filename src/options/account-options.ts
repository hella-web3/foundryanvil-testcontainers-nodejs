import {
  AnvilOptions,
  GetAnvilOptions,
  SetFlagFunction,
  ToggleFlagFunction,
} from "./anvil-options";

export class AccountOptions {
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
   * Sets the number of dev accounts to generate and configure.
   * Sets the `--accounts` flag.
   * @param count Number of accounts. Defaults to 10.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().account.withAccounts(5);
   * ```
   */
  public withAccounts(count: number): AnvilOptions {
    this.setCliFlag("--accounts", count.toString());
    return this.getAnvilOptions();
  }

  /**
   * Sets the balance of every dev account in Ether.
   * Sets the `--balance` flag.
   * @param balance Balance in Ether. Defaults to 10000.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().account.withBalance(100);
   * ```
   */
  public withBalance(balance: number): AnvilOptions {
    this.setCliFlag("--balance", balance.toString());
    return this.getAnvilOptions();
  }

  /**
   * Sets the derivation path of the child key to be derived.
   * Sets the `--derivation-path` flag.
   * @param path Derivation path. Defaults to m/44'/60'/0'/0/.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().account.withDerivationPath("m/44'/60'/0'/0/");
   * ```
   */
  public withDerivationPath(path: string): AnvilOptions {
    this.setCliFlag("--derivation-path", path);
    return this.getAnvilOptions();
  }

  /**
   * Sets the BIP39 mnemonic phrase used for generating accounts.
   * Cannot be used if `mnemonic_random` or `mnemonic_seed` are used.
   * Sets the `--mnemonic` flag.
   * @param mnemonic Mnemonic phrase.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().account.withMnemonic("test test test test test test test test test test test junk");
   * ```
   */
  public withMnemonic(mnemonic: string): AnvilOptions {
    // TODO add validation only one mnemonic option is used
    //this.removeCliFlag("--mnemonic-random");
    //this.removeCliFlag("--mnemonic-seed-unsafe");

    this.setCliFlag("--mnemonic", mnemonic);
    return this.getAnvilOptions();
  }

  /**
   * Automatically generates a BIP39 mnemonic phrase.
   * Cannot be used with other `mnemonic` options.
   * Sets the `--mnemonic-random` flag.
   * @param words Number of words in the mnemonic. Defaults to 12.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().account.withRandomMnemonic(24);
   * ```
   */
  public withRandomMnemonic(words?: number): AnvilOptions {
    //this.removeCliFlag("--mnemonic");
    //this.removeCliFlag("--mnemonic-seed-unsafe");
    if (words) {
      this.setCliFlag("--mnemonic-random", words.toString());
    } else {
      this.toggleCliFlag("--mnemonic-random", true);
    }
    return this.getAnvilOptions();
  }

  /**
   * Generates a BIP39 mnemonic phrase from a given seed.
   * Cannot be used with other `mnemonic` options.
   * Sets the `--mnemonic-seed-unsafe` flag.
   * @param seed Mnemonic seed.
   * @example
   * ```typescript
   * const options: AnvilOptions = new AnvilOptions().account.withMnemonicSeedUnsafe("myseed");
   * ```
   */
  public withMnemonicSeedUnsafe(seed: string): AnvilOptions {
    //this.removeCliFlag("--mnemonic");
    //this.removeCliFlag("--mnemonic-random");
    this.setCliFlag("--mnemonic-seed-unsafe", seed);
    return this.getAnvilOptions();
  }
}
