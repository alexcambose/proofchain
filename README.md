<h1 align="center">
  <br>
  <a href="proofchain.alexcambose.ro"><img src="https://i.imgur.com/Rsdo4OA.png" alt="Markdownify"></a>
</h1>
<h2 align="center" width="300">Proofchain leverages blockchain technology to facilitate efficient communication and data exchange between global supply chains, providing customers with proof of product provenance and ownership.</h2>

<p align="center">
  <a href="https://www.travis-ci.com/alexcambose/proofchain">
    <img src="https://www.travis-ci.com/alexcambose/proofchain.svg?branch=master"
         alt="Travis">
  </a>
  <a href="https://lbesson.mit-license.org">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg"
         alt="License">
  </a>
</p>

<p align="center">
  <a href="#platform">Platform</a> •
  <a href="#core-features">Core features</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#resources">Resources</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

---

## Platform

<img align="right" width="400" src="https://imgur.com/tTHFr37.png">

**Smart Contracts**: At the core of Proofchain are the smart contracts, written in Solidity, which live on the Ethereum blockchain. These make up an open platform that anyone can interact with.

**Proofchain Dashboard**: It offers a snapshot of the core features of the smart contracts based platform.

**Proofchain Web3 library**: A JS library which simplifies interacting with Proofchain contracts, facilitating communication between existing Supply Chain Management software and distributed ledged technology.

**Proofchain Client App**: A mobile-first web application that provides end users with the ability to view the complete provenance history of each product.

## Core features overview

### Representing physical goods in the form of non-fungible digital tokens and recipes that enable their transformation

In order to digitally represent a manufacturing process, tokens can be minted, added to a batch, or transformed into a new token based on a pre defined recipe.

#### Batching

Each batch of materials corresponds to one token that holds unique features. Batches can be transferred or used as input for other materials.

#### Transport

Batches can be transferred from one entity to another.

#### Company and goods certification

Supply chain entities and materials can be audited by third party "certificate authority" organizations. These certificates communicates impact about their business, proudcts and supply chains practices.

- **Company identity**: Each company that uses the Proofchain excosystem is identified by an ethereum address.
  - Manufacturer company: Creates raw materials, materials, batches and transports.
  - Transport company: Intermediary between other company types, can manage transports.
- **Raw Materials**
  - Represented using non-fungible digital tokens that are created on a blockchain for each batch of manufactured products.
- **Materials**
  - Similar to raw materials but are composed of multiple raw materials
- **Batches**
  - Batches are a collection composed of the same material or raw material type
- **Transports**
  - Property exchange mechanism. A transport is composed of the sender, receiver and transport company
- **Certificates**
  - Certificates are a method by which companies communicates impact about their business, proudcts and supply chains practices.
- **Certificate authorities**:
  - Certificate authorities can create and assign certificates to materials, raw materials and companies.

## Project structure

```
├── frontend - Proofchain Dashboard and Client App source
├── library - Proofchain Library
├── truffle - Proofchain Smart Contracts
├── docs - Overall project documentation
├── presentation - Proofchian presentation website
├── misc - Other utility code
├── lerna.json
├── package.json
├── README.md
└── ...
```

## Resources

- [Proofchain DEMO](https://demo.proofchain.alexcambose.ro/)

- [Presentation website](https://proofchain.alexcambose.ro/)

- [General documentation](https://docs.proofchain.alexcambose.ro/)

- [Frontend information](./frontend/)

- [Smart contracts information](./truffle/)

- [Smart contracts docs](./truffle/docs)

- [Library informtion](./library/)

- [Library docs](https://library.proofchain.alexcambose.ro/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
