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
import { AnvilOptions } from "./options/AnvilOptions";
import { AccountOptions } from "./options/AccountOptions";
import { MiningOptions } from "./options/MiningOptions";
import { LoggingOptions } from "./options/LoggingOptions";
import { ForkingOptions } from "./options/ForkingOptions";
import { NetworkOptions } from "./options/NetworkOptions";
import { EvmOptions } from "./options/EvmOptions";
import { ServerOptions } from "./options/ServerOptions";
import { StateOptions } from "./options/StateOptions";
import { Color, Hardfork, HexString, LogVerbosity, Order } from "./types";

export { Color, Hardfork, LogVerbosity, Order };
export type { HexString };

const BASE_ENTRYPOINT = ["anvil"];

/**
 * A Testcontainer for Foundry's Anvil.
 *
 * @example
 * ```typescript
 * const container = await new AnvilContainer().start();
 * ```
 */
export class AnvilContainer extends GenericContainer implements AnvilOptions {
  private entryPoint: string[] = BASE_ENTRYPOINT;
  private accountOptions = new AccountOptions(this);
  private miningOptions = new MiningOptions(this);
  private loggingOptions = new LoggingOptions(this);
  private forkingOptions = new ForkingOptions(this);
  private networkOptions = new NetworkOptions(this);
  private evmOptions = new EvmOptions(this);
  private serverOptions = new ServerOptions(this);
  private stateOptions = new StateOptions(this);

  /**
   * Creates a new AnvilContainer.
   * @example
   * ```typescript
   * const container = await new AnvilContainer().start();
   * ```
   * @param image The docker image to use. Defaults to "hellaweb3/foundry-anvil:1.6".
   */
  constructor(image: string = "ghcr.io/foundry-rs/foundry:v1.6.0-rc1") {
    super(image);
    this.withExposedPorts(8545);
    this.withWaitStrategy(Wait.forLogMessage(/Listening on 0\.0\.0\.0:8545/));
  }

  /**
   * Sets the number of dev accounts to generate and configure.
   * @param count Number of accounts. Defaults to 10.
   */
  public withAccounts(count: number): this {
    this.accountOptions.withAccounts(count);
    return this;
  }

  /**
   * Sets the block time in seconds for interval mining.
   * @param seconds Block time in seconds.
   */
  public withBlockTime(seconds: number): this {
    this.miningOptions.withBlockTime(seconds);
    return this;
  }

  /**
   * Sets the balance of every dev account in Ether.
   * @param balance Balance in Ether. Defaults to 10000.
   */
  public withBalance(balance: number): this {
    this.accountOptions.withBalance(balance);
    return this;
  }

  /**
   * Writes output of `anvil` as json to user-specified file.
   * @param path File path.
   */
  public withConfigOut(path: string): this {
    this.stateOptions.withConfigOut(path);
    return this;
  }

  /**
   * Sets the derivation path of the child key to be derived.
   * @param path Derivation path. Defaults to m/44'/60'/0'/0/.
   */
  public withDerivationPath(path: string): this {
    this.accountOptions.withDerivationPath(path);
    return this;
  }

  /**
   * Dump the state and block environment of chain on exit to the given file.
   * @param path File path or directory.
   */
  public withDumpState(path: string): this {
    this.stateOptions.withDumpState(path);
    return this;
  }

  /**
   * Sets the EVM hardfork to use.
   * @param hardfork Hardfork name.
   */
  public withHardfork(hardfork: Hardfork): this {
    this.evmOptions.withHardfork(hardfork);
    return this;
  }

  /**
   * Initialize the genesis block with the given `genesis.json` file.
   * @param path Path to genesis.json.
   */
  public withInit(path: string): this {
    this.stateOptions.withInit(path);
    return this;
  }

  /**
   * Launch an ipc server at the given path or default path.
   * @param path Optional IPC path.
   */
  public withIpc(path?: string): this {
    this.serverOptions.withIpc(path);
    return this;
  }

  /**
   * Number of threads to use. Specifying 0 defaults to the number of logical cores.
   * @param threads Number of threads.
   */
  public withThreads(threads: number): this {
    this.serverOptions.withThreads(threads);
    return this;
  }

  /**
   * Initialize the chain from a previously saved state snapshot.
   * @param path Path to state file.
   */
  public withLoadState(path: string): this {
    this.stateOptions.withLoadState(path);
    return this;
  }

  /**
   * Sets the BIP39 mnemonic phrase used for generating accounts.
   * Cannot be used if `mnemonic_random` or `mnemonic_seed` are used.
   * @param mnemonic Mnemonic phrase.
   */
  public withMnemonic(mnemonic: string): this {
    this.accountOptions.withMnemonic(mnemonic);
    return this;
  }

  /**
   * Automatically generates a BIP39 mnemonic phrase.
   * Cannot be used with other `mnemonic` options.
   * @param words Number of words in the mnemonic. Defaults to 12.
   */
  public withRandomMnemonic(words?: number) {
    this.accountOptions.withRandomMnemonic(words);
    return this;
  }

  /**
   * Generates a BIP39 mnemonic phrase from a given seed.
   * Cannot be used with other `mnemonic` options.
   * @param seed Mnemonic seed.
   */
  public withMnemonicSeedUnsafe(seed: string): this {
    this.accountOptions.withMnemonicSeedUnsafe(seed);
    return this;
  }

  /**
   * Max number of states to persist on disk.
   * @param count Max states.
   */
  public withMaxPersistedStates(count: number): this {
    this.stateOptions.withMaxPersistedStates(count);
    return this;
  }

  /**
   * Enable mixed mining.
   */
  public withMixedMining(enabled: boolean = true): this {
    this.miningOptions.withMixedMining(enabled);
    return this;
  }

  /**
   * Disable auto and interval mining, and mine on demand instead.
   */
  public withNoMining(enabled: boolean = true): this {
    this.miningOptions.withNoMining(enabled);
    return this;
  }

  /**
   * Sets the number of the genesis block.
   * @param number Block number.
   */
  public withBlockNumber(number: number): this {
    this.miningOptions.withBlockNumber(number);
    return this;
  }

  /**
   * How transactions are sorted in the mempool.
   * @param order Sorting order. Defaults to fees.
   */
  public withOrder(order: Order): this {
    this.stateOptions.withOrder(order);
    return this;
  }

  /**
   * Preserve historical state snapshots when dumping the state.
   */
  public withPreserveHistoricalStates(enabled: boolean = true): this {
    this.stateOptions.withPreserveHistoricalStates(enabled);
    return this;
  }

  /**
   * Don't keep full chain history.
   * @param count Optional max number of states to keep in memory.
   */
  public withPruneHistory(count?: number): this {
    this.stateOptions.withPruneHistory(count);
    return this;
  }

  /**
   * Interval in seconds at which the state and block environment is to be dumped to disk.
   * @param seconds Interval in seconds.
   */
  public withStateInterval(seconds: number): this {
    this.stateOptions.withStateInterval(seconds);
    return this;
  }

  /**
   * Slots in an epoch.
   * @param slots Number of slots. Defaults to 32.
   */
  public withSlotsInAnEpoch(slots: number): this {
    this.miningOptions.withSlotsInAnEpoch(slots);
    return this;
  }

  /**
   * Alias for both --load-state and --dump-state.
   * @param path Path to state file.
   */
  public withState(path: string): this {
    this.stateOptions.withState(path);
    return this;
  }

  /**
   * The timestamp of the genesis block.
   * @param timestamp Genesis timestamp.
   */
  public withTimestamp(timestamp: number): this {
    this.stateOptions.withTimestamp(timestamp);
    return this;
  }

  /**
   * Number of blocks with transactions to keep in memory.
   * @param count Block count.
   */
  public withTransactionBlockKeeper(count: number): this {
    this.stateOptions.withTransactionBlockKeeper(count);
    return this;
  }

  /**
   * Sets the color of the log messages.
   * @param color Color option.
   */
  public withColor(color: Color): this {
    this.loggingOptions.withColor(color);
    return this;
  }

  /**
   * Format log messages as Markdown.
   */
  public withMarkdownFormat(enabled: boolean = true): this {
    this.loggingOptions.withMarkdownFormat(enabled);
    return this;
  }

  /**
   * Do not print log messages.
   */
  public quiet(enabled: boolean = true): this {
    this.loggingOptions.quiet(enabled);
    return this;
  }

  /**
   * Sets the log verbosity level.
   * @example
   * ```typescript
   * await new AnvilContainer().verboseLogs(LogVerbosity.Five).start();
   * ```
   * @param logVerbosity The verbosity level.
   */
  public verboseLogs(logVerbosity: LogVerbosity): this {
    this.loggingOptions.verboseLogs(logVerbosity);
    return this;
  }

  /**
   * Enables automatic impersonation on startup.
   */
  public autoImpersonate(enabled: boolean = true): this {
    this.evmOptions.autoImpersonate(enabled);
    return this;
  }

  /**
   * Format log messages as JSON.
   */
  public jsonLogFormat(enabled: boolean = true): this {
    this.loggingOptions.jsonLogFormat(enabled);
    return this;
  }

  /**
   * The cors `allow_origin` header.
   * @param origin Allow origin header. Defaults to *.
   */
  public withAllowOrigin(origin: string): this {
    this.serverOptions.withAllowOrigin(origin);
    return this;
  }

  /**
   * Path to the cache directory where persisted states are stored.
   * @param path Cache path.
   */
  public withCachePath(path: string): this {
    this.serverOptions.withCachePath(path);
    return this;
  }

  /**
   * Disable CORS.
   */
  public noCors(enabled: boolean = true): this {
    this.serverOptions.noCors(enabled);
    return this;
  }

  /**
   * Disable the default request body size limit.
   */
  public noRequestSizeLimit(enabled: boolean = true): this {
    this.serverOptions.noRequestSizeLimit(enabled);
    return this;
  }

  /**
   * Sets the number of assumed available compute units per second for this provider.
   * @param cups CUPS value. Defaults to 330.
   */
  public withComputeUnitsPerSecond(cups: number): this {
    this.forkingOptions.withComputeUnitsPerSecond(cups);
    return this;
  }

  /**
   * Forks from a given RPC URL.
   * @example
   * ```typescript
   * await new AnvilContainer()
   * .withForkUrl(`https://mainnet.infura.io/v3/${INFURA_KEY}`)
   * .start();
   * ```
   * @param url The RPC URL to fork from.
   */
  public withForkUrl(url: string): this {
    this.withEnvironment({ ANVIL_FORK_URL: url });
    this.forkingOptions.withForkUrl(url);
    return this;
  }

  /**
   * Forks from a specific block number.
   * @example
   * ```typescript
   * await new AnvilContainer()
   * .withForkUrl(`https://mainnet.infura.io/v3/${INFURA_KEY}`)
   * .withForkBlockNumber(24314802)
   * .start();
   * ```
   * @param blockNumber The block number to fork from.
   */
  public withForkBlockNumber(blockNumber: number): this {
    this.withEnvironment({ ANVIL_FORK_BLOCK_NUMBER: blockNumber.toString() });
    this.forkingOptions.withForkBlockNumber(blockNumber);
    return this;
  }

  /**
   * Specify chain id to skip fetching it from remote endpoint.
   * @param chainId Chain ID.
   */
  public withForkChainId(chainId: number): this {
    this.forkingOptions.withForkChainId(chainId);
    return this;
  }

  /**
   * Headers to use for the rpc client.
   * @param header Header string, e.g. "User-Agent: test-agent".
   */
  public withForkHeader(header: string): this {
    this.forkingOptions.withForkHeader(header);
    return this;
  }

  /**
   * Initial retry backoff on encountering errors.
   * @param backoff Backoff in ms.
   */
  public withForkRetryBackoff(backoff: number): this {
    this.forkingOptions.withForkRetryBackoff(backoff);
    return this;
  }

  /**
   * Fetch state from after a specific transaction hash has been applied over a remote endpoint.
   * @param hash Transaction hash.
   */
  public withForkTransactionHash(hash: string): this {
    this.forkingOptions.withForkTransactionHash(hash);
    return this;
  }

  /**
   * Disables rate limiting for this node's provider.
   */
  public noRateLimit(enabled: boolean = true): this {
    this.forkingOptions.noRateLimit(enabled);
    return this;
  }

  /**
   * Explicitly disables the use of RPC caching.
   */
  public noStorageCaching(enabled: boolean = true): this {
    this.forkingOptions.noStorageCaching(enabled);
    return this;
  }

  /**
   * Number of retry requests for spurious networks.
   * @param retries Number of retries. Defaults to 5.
   */
  public withRetries(retries: number): this {
    this.forkingOptions.withRetries(retries);
    return this;
  }

  /**
   * Timeout in ms for requests sent to remote JSON-RPC server in forking mode.
   * @param timeout Timeout in ms. Defaults to 45000.
   */
  public withTimeout(timeout: number): this {
    this.forkingOptions.withTimeout(timeout);
    return this;
  }

  /**
   * The base fee in a block.
   * @param fee Base fee.
   */
  public withBlockBaseFeePerGas(fee: number | bigint): this {
    this.evmOptions.withBlockBaseFeePerGas(fee);
    return this;
  }

  /**
   * Sets the chain ID.
   * @param chainId Chain ID.
   */
  public withChainId(chainId: number): this {
    this.evmOptions.withChainId(chainId);
    return this;
  }

  /**
   * EIP-170: Contract code size limit in bytes.
   * @param size Code size limit. Defaults to 0x6000.
   */
  public withCodeSizeLimit(size: number): this {
    this.evmOptions.withCodeSizeLimit(size);
    return this;
  }

  /**
   * Disable the `call.gas_limit <= block.gas_limit` constraint.
   */
  public disableBlockGasLimit(enabled: boolean = true): this {
    this.evmOptions.disableBlockGasLimit(enabled);
    return this;
  }

  /**
   * Disable EIP-170: Contract code size limit.
   */
  public disableCodeSizeLimit(enabled: boolean = true): this {
    this.evmOptions.disableCodeSizeLimit(enabled);
    return this;
  }

  /**
   * Disable the enforcement of a minimum suggested priority fee.
   */
  public disableMinPriorityFee(enabled: boolean = true): this {
    this.evmOptions.disableMinPriorityFee(enabled);
    return this;
  }

  /**
   * The block gas limit.
   * @param limit Gas limit.
   */
  public withGasLimit(limit: number | bigint): this {
    this.evmOptions.withGasLimit(limit);
    return this;
  }

  /**
   * The gas price.
   * @param price Gas price.
   */
  public withGasPrice(price: number | bigint): this {
    this.evmOptions.withGasPrice(price);
    return this;
  }

  /**
   * Disable printing of `console.log` invocations to stdout.
   */
  public disableConsoleLog(enabled: boolean = true): this {
    this.loggingOptions.disableConsoleLog(enabled);
    return this;
  }

  /**
   * Disable the default create2 deployer.
   */
  public disableDefaultCreate2Deployer(enabled: boolean = true): this {
    this.evmOptions.disableDefaultCreate2Deployer(enabled);
    return this;
  }

  /**
   * Disable pool balance checks.
   */
  public disablePoolBalanceChecks(enabled: boolean = true): this {
    this.evmOptions.disablePoolBalanceChecks(enabled);
    return this;
  }

  /**
   * The memory limit per EVM execution in bytes.
   * @param limit Memory limit.
   */
  public withMemoryLimit(limit: number): this {
    this.evmOptions.withMemoryLimit(limit);
    return this;
  }

  /**
   * Enable printing of traces for executed transactions and `eth_call` to stdout.
   */
  public withPrintTraces(enabled: boolean = true): this {
    this.evmOptions.withPrintTraces(enabled);
    return this;
  }

  /**
   * Enable steps tracing used for debug calls returning geth-style traces.
   */
  public withStepsTracing(enabled: boolean = true): this {
    this.evmOptions.withStepsTracing(enabled);
    return this;
  }

  /**
   * Enable Celo network features.
   */
  public withCelo(enabled: boolean = true): this {
    this.networkOptions.withCelo(enabled);
    return this;
  }

  /**
   * Enable Optimism network features.
   */
  public withOptimism(enabled: boolean = true): this {
    this.networkOptions.withOptimism(enabled);
    return this;
  }

  /**
   * Starts the container and returns a {@link StartedAnvilContainer}.
   * @returns A promise that resolves to the started container.
   */
  public override async start(): Promise<StartedAnvilContainer> {
    if (!this.entryPoint.includes("--host")) {
      this.entryPoint.push("--host", "0.0.0.0");
    }
    this.withEntrypoint(this.entryPoint);

    const startedContainer = await super.start();
    return new StartedAnvilContainer(
      startedContainer,
      `http://${startedContainer.getHost()}:${startedContainer.getMappedPort(8545)}`,
    );
  }

  public setCliFlag(flag: string, value: string) {
    const index = this.entryPoint.indexOf(flag);
    if (index !== -1) {
      this.entryPoint[index + 1] = value;
    } else {
      this.entryPoint.push(flag, value);
    }
  }

  public removeCliFlag(flag: string) {
    const index = this.entryPoint.indexOf(flag);
    if (index !== -1) {
      // If it's a flag with a value (like --accounts 10)
      // Check if next element is likely a value or another flag
      if (
        index + 1 < this.entryPoint.length &&
        !this.entryPoint[index + 1].startsWith("-")
      ) {
        this.entryPoint.splice(index, 2);
      } else {
        this.entryPoint.splice(index, 1);
      }
    }
  }

  public setCliToggle(flag: string, enabled: boolean) {
    const index = this.entryPoint.indexOf(flag);
    if (enabled && index === -1) {
      this.entryPoint.push(flag);
    } else if (!enabled && index !== -1) {
      this.entryPoint.splice(index, 1);
    }
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
    const abiJson = fs.readFileSync(
      path.join(__dirname, `../test/artifacts/${abiLocation}`),
      "utf8",
    );
    return JSON.parse(abiJson) as Abi;
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
    return fs.readFileSync(
      path.join(__dirname, `../test/artifacts/${binLocation}`),
      "utf8",
    ) as HexString;
  }
}
