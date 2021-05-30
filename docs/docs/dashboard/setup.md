---
sidebar_position: 2
---

# Setup

Setting up and running the frontend.

## Installation

Install dependencies

```bash
npm install
```

## Commands

A list of available npm commands:

- `dev` - starts the application in development mode
- `build` - created an optimized production build
- `start` - starts the application in production mode. This command should be executed after `build`

## Smart contracts address

This application reads the .env file, present in the project root directory, which contains the development (local blockchain) and production (rinkeby blockchain) factory contract addresses. When running with the `dev` command, it willl use the development address (DEVELOPMENT_FACTORY_CONTRACT_ADDRESS) and when `build` is executed it will build the project using the production address (PRODUCTION_FACTORY_CONTRACT_ADDRESS).
