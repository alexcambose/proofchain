# proofchain-library

Web3.js based library, used to communicate with the proofchain smart contracts architecture.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install.

```bash
npm install proofchain-library
```

## Usage

```js
import Web3 from 'web3';
import Proofchain from 'proofchain-library';

const web3Instance = new Web3(
  new Web3.providers.HttpProvider('<http node provider>')
);

web3Instance.eth.accounts.wallet.add('<private key or account object>');

const proofchain = await Proofchain.web3Init({
  web3,
  fromAddress: '<address to send transctions from>',
  factoryContractAddress: '<factory contract address>',
});

// create a new material
proofchain.material
  .create({
    name,
    code,
    images: [],
    amountIdentifier,
    recipeMaterialTokenId,
    recipeMaterialAmount,
  })
  .send();
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
