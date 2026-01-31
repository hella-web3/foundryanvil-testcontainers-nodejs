<!--suppress HtmlDeprecatedAttribute -->
<div align="center">

<h1>Foundry Anvil Testcontainers NodeJS Module</h1>

<a href="https://github.com/hella-web3/foundryanvil-testcontainers-nodejs/actions/workflows/main.yml">
    <img alt="Build+Test Status" src="https://github.com/hella-web3/foundryanvil-testcontainers-nodejs/actions/workflows/main.yml/badge.svg" />
</a>

<a href="https://www.npmjs.com/package/@hellaweb3/foundryanvil-testcontainers-nodejs">
<img alt="npm version" src="https://img.shields.io/npm/v/%40hellaweb3%2Ffoundryanvil-testcontainers-nodejs" />
</a>

<a href="https://www.npmjs.com/package/@hellaweb3/foundryanvil-testcontainers-nodejs">
<img alt="npm downloads" src="https://img.shields.io/npm/dy/%40hellaweb3%2Ffoundryanvil-testcontainers-nodejs" />
</a>

</div>

## Description

This repository provides a [Testcontainers](https://testcontainers.com/) module
for Node.js to run a customized
Anvil node in your E2E tests.

This Typescript module provides a Fluent API style method of configuring and
starting the Anvil node. And during your
test execution, the module provides
a [viem test client](https://viem.sh/docs/clients/test) and
streamlined helper methods to interact with the node.

**Base image:** https://github.com/foundry-rs/foundry/blob/master/Dockerfile

**Built using Anvil:** https://getfoundry.sh/anvil/reference/anvil

**Foundry image:** `ghcr.io/foundry-rs/foundry:v1.6.0-rc1`

**Custom image:** `hellaweb3/foundry-anvil:1.6`

[Custom image DockerHub](https://hub.docker.com/repository/docker/hellaweb3/0.1-eth-anvil/general)

---

## Usage

Install the module:

```shell
pnpm add -D @hellaweb3/foundryanvil-testcontainers-nodejs
```

### Setup

Use the `AnvilContainer` module to start up a new Anvil testcontainer in your
test suite.

- Set up the container in a `beforeAll` hook.
- Add an `afterAll` hook to stop the container.

```ts
describe("AnvilContainer", () => {
  let container: StartedAnvilContainer;

  beforeAll(async () => {
    const options = new AnvilOptions().logs
      .verboseLogs(LogVerbosity.Five)
      .logs.jsonLogFormat()
      .account.withRandomMnemonic()
      .evm.autoImpersonate();

    container = await new AnvilContainer(options).start();
  }, 60000);

  afterAll(async () => {
    if (container) await container.stop();
  });
});
```

### Test

The `StartedAnvilContainer` provides a viem test client that you can use to
interact with the node.

- Access the viem test client via `container.client`.
- Use container test helpers like `addresses()` and `sendEthTransaction()`.

```ts
it("test send transaction", async () => {
  let addresses = await container.addresses();

  const receipt: TransactionReceipt = await container.sendEthTransaction(
    addresses[0],
    addresses[1],
    "1",
  );

  expect(receipt.status).toBe("success");
});
```

---

## Scripts

| Script           | Description                       |
|------------------|-----------------------------------|
| `pnpm dev`       | Start development mode with watch |
| `pnpm build`     | Build for production              |
| `pnpm test`      | Run tests                         |
| `pnpm eslint`    | Lint code                         |
| `pnpm typecheck` | Run TypeScript type checking      |

---

### Forking Options

Configure the Anvil node to fork from a remote RPC URL:

```ts
const options = new AnvilOptions().fork
  .withForkUrl(`https://mainnet.infura.io/v3/${INFURA_KEY}`)
  .fork.withForkBlockNumber(17500000);

const container = await new AnvilContainer(options).start();
```

---

## Configuration Options

The `AnvilContainer` can be highly customized using the `AnvilOptions` class. Options are organized into logical modules to make configuration intuitive.

### Account Options
Configure development accounts, balances, and mnemonics.
* **Use-case**: Setup specific pre-funded accounts or use a known mnemonic to ensure predictable addresses across test runs.

```ts
const options = new AnvilOptions().account
  .withAccounts(10)
  .account.withBalance(1000)
  .account.withRandomMnemonic();

const container = await new AnvilContainer(options).start();
```

### EVM Options
Fine-tune the EVM behavior, gas limits, and hardforks.
* **Use-case**: Test contract deployments that exceed default code size limits or simulate specific Ethereum hardforks.

```ts
const options = new AnvilOptions().evm
  .withHardfork(Hardfork.London)
  .evm.withCodeSizeLimit(32128)
  .evm.autoImpersonate();
```

### Forking Options
Fork from a remote RPC endpoint to test against real-world state.
* **Use-case**: Integration tests that interact with existing protocols (e.g., Uniswap, Aave) on Mainnet or L2s.

```ts
const options = new AnvilOptions().fork
  .withForkUrl("https://mainnet.infura.io/v3/YOUR_KEY")
  .fork.withForkBlockNumber(18000000);
```

### Mining Options
Control block production and mining behavior.
* **Use-case**: Simulate a real-time mining interval to test frontend polling logic or time-dependent contract features.

```ts
const options = new AnvilOptions().mining
  .withBlockTime(1) // Mine a block every second
  .mining.withMixedMining();
```

### Logging Options
Adjust output verbosity and format for better debugging.
* **Use-case**: Enable JSON logging for automated log analysis or increase verbosity to debug failing transactions.

```ts
const options = new AnvilOptions().logs
  .verboseLogs(LogVerbosity.Three)
  .logs.jsonLogFormat();
```

### Network Options
Enable features specific to certain networks like Celo or Optimism.
* **Use-case**: E2E tests for cross-chain applications or protocols deployed on Optimism or Celo.

```ts
const options = new AnvilOptions().network
  .withOptimism();
```

### Server Options
Configure the RPC server settings, CORS, and IPC.
* **Use-case**: Testing IPC connections or adjusting CORS settings for local web application development.

```ts
const options = new AnvilOptions().server
  .withAllowOrigin("*")
  .server.noCors();
```

### State Options
Manage chain state, persistence, and snapshots.
* **Use-case**: Speed up test suites by loading a pre-configured state instead of re-deploying contracts every time.

```ts
const options = new AnvilOptions().state
  .withLoadState("path/to/state.json")
  .state.withDumpState("path/to/new-state.json");
```

---

## Tools

- **[Bunchee](https://github.com/huozhi/bunchee)** - Zero-config bundler for npm
  packages
- **[Jest](https://jestjs.io/)** - Testing framework

## Module Formats

This library exports both ESM and CommonJS formats, with full TypeScript
support:

- `dist/index.js` - ESM
- `dist/index.cjs` - CommonJS
- `dist/index.d.ts` - TypeScript declarations

## Publishing

```bash
# Build the package
pnpm run build

# Publish to npm
np --no-publish

# Trigger GitHub release workflow
git push origin --tags
```

This will trigger the release.yml and publish.yml workflows.

---

## Contracts

WETH: https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code

---

### Using a Custom Docker Image

**Build the docker image:**

```shell
docker build -t hellaweb3/foundry-anvil:1.6 .
```

**Run the docker image:**

```shell
docker run -p 8545:8545 hellaweb3/foundry-anvil:1.6
```

**Push the docker image:**

```shell
docker push hellaweb3/foundry-anvil:1.6
```

**Use cast to test the connection:**

```shell
cast block-number
```

**Use script to test the connection:**

```shell
node ./scripts/get-block-number.ts
```

## License

MIT
