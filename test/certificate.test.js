const Factory = artifacts.require('Factory');
const CertificateAuthorityManager = artifacts.require(
  'CertificateAuthorityManager'
);

const getCertificateAuthorityManagerInstance = async () => {
  const instance = await Factory.deployed();
  const companyInstance = new web3.eth.Contract(
    CertificateAuthorityManager.abi,
    await instance.contract.methods.companyContractAddress().call()
  );
  return companyInstance;
};

contract('Certificate', (accounts) => {
  const [account] = accounts;
  describe('createCertificate', () => {
    it('creates a new certificate', async () => {
      // const instance = await getCertificateAuthorityManagerInstance();
      // await instance.methods.create('My Company', 0).send({ from: account });
      // const result = await instance.methods.companies(account).call();
      // expect(result.name).equal('My Company');
      // expect(result.entityType).equal('0');
    });
  });
});
