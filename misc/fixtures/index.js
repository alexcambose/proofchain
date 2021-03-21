const HDWalletProvider = require('@truffle/hdwallet-provider');
const faker = require('faker');
const Web3 = require('web3');
const web3 = new Web3(
  new HDWalletProvider({
    mnemonic: {
      phrase:
        'stage analyst reform dune educate throw exile disagree pause search crouch finger',
    },
    providerOrUrl: 'http://127.0.0.1:8545',
  })
);
const factoryContractAddress = '0xf2f6FE2C06763e590EBb959E04371EBcbE996543';
const { default: Proofchain } = require('proofchain-library');
const config = {
  rawMaterials: 3,
  materials: 10,
  batches: 10,
};
const amountIdentifiers = [
  'N/m',
  'cd/m²',
  'GHz',
  'g/mol',
  'kA',
  'kg • m2',
  'kJ/(kg.K)',
  'kΩ',
  'lm/W',
  'bar',
  'mm/s',
  'mPa.s',
  'ms',
  'nm',
  '1',
  'Pa.s',
  '1/K',
  'min-1',
  'cd',
  '°C',
  'cm³',
  'cm',
  'T',
  'W/K',
  'kg/mol',
  'd',
  'N/cm²',
  'l/h',
  'F',
  'g/m²',
  'g',
  'Hz',
  'h',
  'K',
  'kg',
  'kg/s',
  'kHz',
  'kg/m',
  'kg/m³',
  'kV',
  'kW',
  'l/min',
  'l',
  'lm',
  'lx',
  'mbar',
  'MHz',
  'min',
  'mm²',
  'mm³',
  'mm',
  'MPa',
  'm3/h',
  'm³/s',
  'm²',
  'm³',
  'm',
  'm/s',
  'N',
  'Ω',
  'Pa',
  's',
  'V',
  'W',
];
(async () => {
  const accounts = await web3.eth.getAccounts();
  const proofchain = Proofchain.web3Init({
    web3,
    factoryContractAddress,
    fromAddress: accounts[0],
  });

  const hasCompany = await proofchain.company.hasCompany();
  // return;

  if (!hasCompany) {
    console.log('Created new comapny!');
    await proofchain.company.create({
      name: 'A company',
      entityType: 1,
    });
  }
  let createdRawMaterials = {};
  console.log(`Creating ${config.rawMaterials} raw materials...`);
  for (let i = 0; i < 30; i++) {
    const name = faker.commerce.productMaterial();
    const result = await materialInstance.methods
      .create(
        name,
        faker.random.word() + '-' + faker.random.number(),
        amountIdentifiers[faker.random.number(amountIdentifiers.length - 1)],
        images
      )
      .send({ from: account, gas: 400000 });
    const { materialTokenId } = result.events.MaterialCreate.returnValues;
    console.log(`${i} - ${name} created!`);
    await proofchain.material.mint({
      materialTokenId: result.events.MaterialCreate.materialTokenId,
      amount: 100 + faker.random.number(100),
    });
    createdRawMaterialsId.push(
      parseInt(result.events.MaterialCreate.materialTokenId)
    );
  }
  let createdMaterialsId = [];
  for (let i = 0; i < config.materials; i++) {
    const name = faker.commerce.productName();
    let recipeMaterialTokenId = [];
    let recipeMaterialAmount = [];
    for (let j = 0; j < faker.random.number(10); j++) {
      const newId =
        createdRawMaterialsId[
          faker.random.number(createdRawMaterialsId.length - 1)
        ];
      const newAmount = faker.random.number(10);
      recipeMaterialTokenId.push(newId);
      recipeMaterialAmount.push(newAmount);
    }
    console.log(recipeMaterialTokenId, recipeMaterialAmount);
    const result = await proofchain.material.create({
      name,
      code: faker.random.word() + '-' + faker.random.number(),
      images: [],
      amountIdentifier:
        amountIdentifiers[faker.random.number(amountIdentifiers.length - 1)],
      recipeMaterialAmount,
      recipeMaterialTokenId,
    });

    console.log(
      `${i} - ${name} - ${recipeMaterialTokenId} , ${recipeMaterialAmount} created!`
    );
    await proofchain.material.mint({
      materialTokenId: result.events.MaterialCreate.materialTokenId,
      amount: 2 + faker.random.number(10),
    });
    createdMaterialsId.push(result.events.MaterialCreate.materialTokenId);
  }
  for (let i = 0; i < config.batches; i++) {
    const rawAndCompountId = [...createdMaterialsId, ...createdRawMaterialsId];
    const result = await proofchain.batch.create({
      code: faker.random.word() + '-' + faker.random.number(),
      materialTokenAmount: faker.random.number(10),
      materialTokenId:
        rawAndCompountId[faker.random.number(rawAndCompountId.length - 1)],
    });
    console.log(`${i} - ${result.events.BatchCreate.batchId} - Batch created`);
  }
  process.exit(1);
})();
