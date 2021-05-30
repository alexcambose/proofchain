---
sidebar_position: 1
---

# Authentication

&nbsp;

## Overview

Authentication can be done in 3 ways. Using [Metamask](https://metamask.io/), for authentication via
the Metamask extension, [Torus](https://tor.us/) for Google authentication, or a mnemonic phrase which is
the equivalent of the private key. The login page contains buttons to select the desired mode.
![Authentication Page](/img/docs/login-page-dashboard.png)

## Metamask

Metamask is an Ethereum wallet in the form of a browser extension. In addition to the specific functionalities of a wallet, it also has the functionality to connect web applications to the blockchain. Metamask injects an instance of the Web3.js library into the list of global browser variables, which is connected to an Ethereum node. When sending a transaction it is necessary to confirm it in the browser extension.
![Authentication Metamask](/img/docs/login-page-metamask-dashboard.png)

## Torus

Torus is an authentication solution that combines blockchain technology with various authentication methods such as 0Auth, OAuth2, AWS Cognito, etc., to provide decentralized applications with a non-custodial way to generate private keys and authenticate users.
The main advantage of the Torus service is that at the time of authentication, each user account is associated with a unique private key with which it can sign transactions. The private key storage mode is non-custodial, which means that no one but the user can find out the private key associated with their account.
![Authentication Torus](/img/docs/login-page-torus-dashboard.png)

## Mnemonic

The mnemonic phrase together with a hierarchical deterministic wallet (HD Wallet) is an easier alternative for storing private keys. The mnemonic phrase consists of 12 or 24 words that generate a seed used by the hierarchical deterministic wallet to create private keys, based on a derivation path.
![Authentication Mnemonic](/img/docs/login-page-mnemonic-dashboard.png)
The derivation path can also be changed.

![Authentication Mnemonic Derivation](/img/docs/login-page-derivation-dashboard.png)
