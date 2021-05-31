# Initialization

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
```
