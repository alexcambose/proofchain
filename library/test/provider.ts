import ganache from 'ganache-core';
import Web3 from 'web3';
import { FactoryBytecode, Factory } from '../src/abi';
export const provider = ganache.provider({
  total_accounts: 10,
  mnemonic:
    'pilot derive lamp negative way glance science sniff member goat warrior hole',
});

export const deployedFactoryAddress = async () => {
  // @ts-ignore
  const web3 = new Web3(provider);
  // @ts-ignore
  const instance = new web3.eth.Contract(Factory);
  const accounts = await web3.eth.getAccounts();
  const gas = await instance.deploy({ data: FactoryBytecode }).estimateGas();
  const result = await instance
    .deploy({ data: FactoryBytecode })
    .send({ from: accounts[0], gas: gas + 1 });
  // @ts-ignore
  return result.options.address;
};
