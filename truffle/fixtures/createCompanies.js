module.exports = async (
  [, companyInstance, caInstance],
  [mainAccount, otherAccount, transportCompany, certificateAuthority]
) => {
  await companyInstance.methods.create("Main Company", 0).send({ from: mainAccount, gas: 300000 });
  await companyInstance.methods
    .create("Other Company", 0)
    .send({ from: otherAccount, gas: 300000 });
  await companyInstance.methods
    .create("Transport Company", 1)
    .send({ from: transportCompany, gas: 300000 });
  await caInstance.methods
    .createCertificateAuthority("Main Company")
    .send({ from: certificateAuthority, gas: 300000 });
}; 
 