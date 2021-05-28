---
sidebar_position: 2
---

# Setting up

Proofchain can be ran either locally or remote.

## Running locally

Clone the [repo](https://github.com/alexcambose/proofchain) locally and install the top level dependencies.

```
$ git clone git@github.com:alexcambose/proofchain.git

$ cd proofchain && npm install
```

Run Ganache (local blockchain)

```
npm run ganache
```

Contracts need to be compiled. Ganache must be running in the background, so I suggest opening a new terminal for running the following commands.

```
$ cd ./truffle
$ npm install
$ npm run migrate:test
```

Contracts are now compiled, .env file contains the Factory contracts address in the local blockchain. We can now run the frontend.
Run the frontend.

```
$ cd ../frontend
$ npm install
$ npm run dev
```

## Running remote

Proofchian is also available as a Dapp running on the Rinkeby blockchain. You can check it out at [https://demo.proofchain.alexcambose.ro/](https://demo.proofchain.alexcambose.ro/).
