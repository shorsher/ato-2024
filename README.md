# Open Source Tools for Building in Web3 

This repo contains a sample application to accompany the ATO 2024 Talk - Open Source Tools for Building in Web3. 

### Components

The core application is a small express API, that allows users to mint ERC20 tokens and interact with the `SimpleStorage` contract.

The `solidity` directory contains a [hardhat](https://hardhat.org/) project containing both of those contracts.

### Setup

#### FireFly
This project is intended to be used with the [FireFly CLI](https://github.com/hyperledger/firefly-cli).

Once you have the CLI installed, run `ff init` to create a stack. This provides you with a local blockchain and FireFly environment to use for development.

#### Hardhat

Hardhat is an Ethereum development environment. It provides components for developing, building, and deploying smart contracts to EVM blockchains.

Within the `solidity` directory, run `npm install` to install hardhat and its dependencies. 

Compile:
`npx hardhat compile`

Test:
`npx hardhat test`

Deploy to FireFly network:
`npx hardhat run scripts/deploy.js --network firefly`

Export the contract address from the above step to an environment variable:
`export SIMPLESTORAGE_ADDRESS=<simplestorage contract address output>`

#### API Server

First, install your dependencies.
`npm install`

To help initialize the FireFly FFI/API's, you can use the `setup` script. This will programmatically create a FireFly Interface and API for the `SimpleStorage` we deployed above.
`npm run setup`

Start the application:
`npm run start`


### Example Queries

```bash
$ curl --location 'localhost:3000/api/v1/storage'
```

```bash
$ curl --location 'localhost:3000/api/v1/storage' \
--header 'Content-Type: application/json' \
--data '{
    "value": "30"
}'
```