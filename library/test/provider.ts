import ganacheCli from 'ganache-core';

const provider = ganacheCli.provider({
  mnemonic:
    'pilot derive lamp negative way glance science sniff member goat warrior hole',
});

export default provider;
