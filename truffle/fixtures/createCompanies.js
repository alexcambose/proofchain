module.exports = async (
  [, companyInstance, caInstance],
  [mainAccount, otherAccount, transportCompany, certificateAuthority]
) => {
  // main account
  await companyInstance.methods.create("Main Company", 0).send({ from: mainAccount, gas: 300000 });
  console.log("Manufacturer company", mainAccount);
  await companyInstance.methods
    .create("Other Company", 0)
    .send({ from: otherAccount, gas: 300000 });
  console.log("Other manufacturer company", otherAccount);

  await companyInstance.methods
    .create("Transport Company", 1)
    .send({ from: transportCompany, gas: 300000 });
  console.log("Logistic company", transportCompany);

  await caInstance.methods
    .createCertificateAuthority("Certificate Company")
    .send({ from: certificateAuthority, gas: 300000 });
  console.log("Certificate authority", transportCompany);
};
