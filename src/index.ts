import {
  AbstractStartedContainer,
  GenericContainer,
  StartedTestContainer,
  Wait,
} from "testcontainers";
import {
  Abi,
  createTestClient,
  http,
  parseEther,
  publicActions,
  TransactionReceipt,
  walletActions,
} from "viem";
import { foundry } from "viem/chains";
import * as fs from "node:fs";
import path from "node:path";
import { Color, Hardfork, HexString, LogVerbosity, Order } from "./types";
import { AnvilOptions } from "./options/anvil-options";

export { AnvilOptions };
export { AccountOptions } from "./options/account-options";
export { EvmOptions } from "./options/evm-options";
export { ForkingOptions } from "./options/forking-options";
export { LoggingOptions } from "./options/logging-options";
export { MiningOptions } from "./options/mining-options";
export { NetworkOptions } from "./options/network-options";
export { ServerOptions } from "./options/server-options";
export { StateOptions } from "./options/state-options";
export { Color, Hardfork, LogVerbosity, Order };
export type { HexString };
/**
 * A Testcontainer for Foundry's Anvil.
 *
 * @example
 * ```typescript
 * const container = await new AnvilContainer().start();
 * ```
 */
export class AnvilContainer extends GenericContainer {
  private readonly options: AnvilOptions;
  /**
   * Creates a new AnvilContainer.
   * @example
   * ```typescript
   * const container = await new AnvilContainer().start();
   * ```
   * @param image The docker image to use. Defaults to "hellaweb3/foundry-anvil:1.6".
   * @param options
   */
  constructor(
    options?: AnvilOptions,
    image: string = "ghcr.io/foundry-rs/foundry:v1.6.0-rc1",
  ) {
    super(image);
    this.withExposedPorts(8545);
    this.withWaitStrategy(Wait.forLogMessage(/Listening on 0\.0\.0\.0:8545/));

    this.options = options ?? new AnvilOptions();
  }

  /**
   * Starts the container and returns a {@link StartedAnvilContainer}.
   * @returns A promise that resolves to the started container.
   */
  public override async start(): Promise<StartedAnvilContainer> {
    //this.options.setCliFlag("--host", "0.0.0.0");
    this.withEntrypoint(this.options.entryPoint);

    const startedContainer = await super.start();
    return new StartedAnvilContainer(
      startedContainer,
      `http://${startedContainer.getHost()}:${startedContainer.getMappedPort(8545)}`,
    );
  }
}
/**
 * A started Anvil container with helper methods for interacting with the node.
 */
export class StartedAnvilContainer extends AbstractStartedContainer {
  private readonly _rpcUrl;
  private readonly _client;

  /**
   * Creates a new StartedAnvilContainer.
   * @param startedTestContainer The underlying TestContainer.
   * @param url The RPC URL of the started container.
   */
  constructor(startedTestContainer: StartedTestContainer, url: string) {
    super(startedTestContainer);
    this._rpcUrl = url;

    this._client = createTestClient({
      chain: foundry,
      mode: "anvil",
      transport: http(url),
    })
      .extend(publicActions)
      .extend(walletActions);
  }

  /**
   * Gets the RPC URL of the Anvil node.
   */
  get rpcUrl() {
    return this._rpcUrl;
  }

  /**
   * Gets the viem TestClient for interacting with the Anvil node.
   */
  get client(): typeof this._client {
    return this._client;
  }

  /**
   * Gets the addresses available in the Anvil node.
   * @returns Array of addresses.
   */
  addresses(): Promise<HexString[]> {
    return this._client.getAddresses();
  }

  /**
   * Sends an ETH transaction.
   * @example
   * ```typescript
   * let addresses = await container.addresses();
   * const receipt = await container.sendEthTransaction(
   * addresses[0],
   * addresses[1],
   * "1");
   * ```
   *
   * @param from The sender address.
   * @param to The recipient address.
   * @param amount The amount of ETH to send (as a string, e.g., "1.5").
   * @returns Transaction receipt.
   */
  async sendEthTransaction(
    from: HexString,
    to: HexString,
    amount: string,
  ): Promise<TransactionReceipt> {
    const hash = await this._client.sendTransaction({
      account: from,
      from: from,
      to: to,
      value: parseEther(amount),
    });
    await this._client.mine({ blocks: 1 });

    return await this._client.waitForTransactionReceipt({ hash });
  }

  /**
   * Deploys a contract to the Anvil node using local artifacts.
   * @example
   * ```typescript
   * const receipt = await container.deployContract(
   *     container.contractAbi('WrappedEther/WrappedEther.json'),
   *     container.contractBytecode('WrappedEther/WrappedEther.bin'),
   *     account);
   * ```
   *
   * @param abi The contract ABI.
   * @param bytecode The contract bytecode.
   * @param account The account to deploy from.
   * @returns Transaction receipt.
   */
  async deployContract(
    abi: Abi | readonly unknown[],
    bytecode: HexString,
    account: HexString,
  ): Promise<TransactionReceipt> {
    const hash = await this._client.deployContract({
      abi: abi as Abi,
      bytecode: bytecode,
      account,
    });
    await this._client.mine({ blocks: 1 });

    const receipt = await this._client.waitForTransactionReceipt({ hash });
    console.log(`Contract deployed to: ${receipt.contractAddress}`);

    return receipt;
  }

  /**
   * Get local testing artifact contract ABI for deployment to anvil.
   * @example
   * ```typescript
   * contractAbi('WrappedEther/WrappedEther.json');
   * ```
   *
   * @param abiLocation location of the ABI file relative to the test/artifacts directory
   */
  contractAbi(abiLocation: string): Abi {
    const fullPath = path.join(__dirname, `../test/artifacts/${abiLocation}`);
    try {
      const abiJson = fs.readFileSync(fullPath, "utf8");
      return JSON.parse(abiJson) as Abi;
    } catch (error: any) {
      switch (error.code) {
        case "ENOENT":
          throw new Error(`ABI file not found at ${fullPath}`);
        case "EACCES":
          throw new Error(`Permission denied for ABI file at ${fullPath}`);
        case "EISDIR":
          throw new Error(
            `ABI location is a directory, not a file: ${fullPath}`,
          );
      }
      throw error;
    }
  }

  /**
   * Get local testing artifact contract bytecode for deployment to anvil.
   * @example
   * ```typescript
   * contractBytecode('WrappedEther/WrappedEther.bin');
   * ```
   *
   * @param binLocation location of the bytecode file relative to the test/artifacts directory
   */
  contractBytecode(binLocation: string): HexString {
    const fullPath = path.join(__dirname, `../test/artifacts/${binLocation}`);
    try {
      return fs.readFileSync(fullPath, "utf8") as HexString;
    } catch (error: any) {
      switch (error.code) {
        case "ENOENT":
          throw new Error(`Bytecode file not found at ${fullPath}`);
        case "EACCES":
          throw new Error(`Permission denied for bytecode file at ${fullPath}`);
        case "EISDIR":
          throw new Error(
            `Bytecode location is a directory, not a file: ${fullPath}`,
          );
      }
      throw error;
    }
  }
}
