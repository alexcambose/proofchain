# Proofchain frontend

The sub-project contains the frontend for the Proofchain Dashboard and Proofchain Client app

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

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
