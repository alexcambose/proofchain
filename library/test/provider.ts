import ganacheCli from 'ganache-core';
import Web3 from 'web3';
import { FactoryBytecode, Factory } from '../src/abi';
export const provider = ganacheCli.provider({
  mnemonic:
    'pilot derive lamp negative way glance science sniff member goat warrior hole',
});

export const deployedFactory = async () => {
  // @ts-ignore
  const web3 = new Web3(provider);
  // @ts-ignore
  const instance = new web3.eth.Contract(Factory);
  const accounts = await web3.eth.getAccounts();

  return await instance
    .deploy({ data: FactoryBytecode })
    .send({ from: accounts[0], gas: 5752604 });
};
