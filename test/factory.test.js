const Factory = artifacts.require('Factory');

contract('Factory', () => {
  describe('Constructor', () => {
    it('contains the aggregator address', async () => {
      const instance = await Factory.deployed();
      const aggregatorAddress = await instance.contract.methods
        .aggregator()
        .call();
      console.log(aggregatorAddress);
      expect(aggregatorAddress).to.not.equal(
        '0x' + Array(40).fill('0').join('')
      );
    });
  });
});
