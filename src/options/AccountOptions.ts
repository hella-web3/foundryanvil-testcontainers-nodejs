import { AnvilOptions } from "./AnvilOptions";

export class AccountOptions {
  constructor(private readonly container: AnvilOptions) {}

  /**
   * Sets the number of dev accounts to generate and configure.
   * @param count Number of accounts. Defaults to 10.
   */
  public withAccounts(count: number): this {
    this.container.setCliFlag("--accounts", count.toString());
    return this;
  }

  /**
   * Sets the balance of every dev account in Ether.
   * @param balance Balance in Ether. Defaults to 10000.
   */
  public withBalance(balance: number): this {
    this.container.setCliFlag("--balance", balance.toString());
    return this;
  }

  /**
   * Sets the derivation path of the child key to be derived.
   * @param path Derivation path. Defaults to m/44'/60'/0'/0/.
   */
  public withDerivationPath(path: string): this {
    this.container.setCliFlag("--derivation-path", path);
    return this;
  }

  /**
   * Sets the BIP39 mnemonic phrase used for generating accounts.
   * Cannot be used if `mnemonic_random` or `mnemonic_seed` are used.
   * @param mnemonic Mnemonic phrase.
   */
  public withMnemonic(mnemonic: string): this {
    this.container.removeCliFlag("--mnemonic-random");
    this.container.removeCliFlag("--mnemonic-seed-unsafe");
    this.container.setCliFlag("--mnemonic", mnemonic);
    return this;
  }

  /**
   * Automatically generates a BIP39 mnemonic phrase.
   * Cannot be used with other `mnemonic` options.
   * @param words Number of words in the mnemonic. Defaults to 12.
   */
  public withRandomMnemonic(words?: number): this {
    this.container.removeCliFlag("--mnemonic");
    this.container.removeCliFlag("--mnemonic-seed-unsafe");
    if (words) {
      this.container.setCliFlag("--mnemonic-random", words.toString());
    } else {
      this.container.setCliToggle("--mnemonic-random", true);
    }
    return this;
  }

  /**
   * Generates a BIP39 mnemonic phrase from a given seed.
   * Cannot be used with other `mnemonic` options.
   * @param seed Mnemonic seed.
   */
  public withMnemonicSeedUnsafe(seed: string): this {
    this.container.removeCliFlag("--mnemonic");
    this.container.removeCliFlag("--mnemonic-random");
    this.container.setCliFlag("--mnemonic-seed-unsafe", seed);
    return this;
  }
}
