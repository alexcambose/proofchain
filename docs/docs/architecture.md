---
sidebar_position: 3
---

# Architecture

Information about the architecture.

### Overview

The overall architecture of the Proofchain ecosystem. In terms of application architecture, through the way it works, this is a
decentralized application, which means that the execution of business logic does not take place in
the context of a single entity, but is executed in a network of nodes, and the data is stored
on a blockchain.

![Architecture](/img/docs/overall-architecture.png)

**Smart Contracts**: At the core of Proofchain are the smart contracts, written in Solidity, which live on the Ethereum blockchain. These make up an open platform that anyone can interact with.

**Proofchain Dashboard**: It offers a snapshot of the core features of the smart contracts based platform.

**Proofchain Web3 library**: A JS library which simplifies interacting with Proofchain contracts, facilitating communication between existing Supply Chain Management software and distributed ledged technology.

**Proofchain Client App**: A mobile-first web application that provides end users with the ability to view the complete provenance history of each product.

## Key features

**Materials - representing physical goods in the form of non-fungible digital tokens and recipes that enable their transformation**

In order to digitally represent a manufacturing process, tokens can be minted, added to a batch, or transformed into a new token based on a pre defined recipe.

**Batching**

Each batch of materials corresponds to one token that holds unique features. Batches can be transferred or used as input for other materials.

**Transport**

Batches can be transferred from one entity to another.

**Company and goods certification**

Supply chain entities and materials can be audited by third party "certificate authority" organizations. These certificates communicates impact about their business, proudcts and supply chains practices.

## Entitites

Key entities that make up the Proofchian framework.

### Materials

To develop a traceability system as accurate as possible, each material must have an equivalent in the digital environment (a digital twin).
To achieve this, Proofchain uses a structure named bill of materials (BOM). This represents a hierarchical way of specifying the materials and components from which a material is made.

A material is classified into two categories:

- Raw Materials
- Composite materials (Materials) - are those materials that, in order to be created, they require other materials, according to a recipe specified at the time of definition. The image below shows a definition of a composite material in the form of a tree structure.

![Material BOM](/img/docs/material-bom.png)
![Material BOM Example](/img/docs/material-bom-example.png)

A company that wants to create a digital twin of a product must create a material and specify its definition.

### Batches

Batches are a group of instances of materials of the same type.

### Transports

Transports are an exchange of owners of batches of products.
Companies that own the batches can initiate shipments to other companies, specifying
next information:

- Recipient - the Ethereum address of the company to receive the batches
- Transport company - the ethereum address of the company that will transport the batches
- (optional) A password - to change the owner of the batches at the smart contract level, the recipient must enter the password set by the initiator of the transport. This can reduce fraud if the batch does not reach its destination
  correct.

Once the shipment has started, the carrier can set certain states,
such as:

- Ready for Transit (READY_FOR_TRANSIT) - Transport is ready by
  upload to be sent to the destination
- Pending Transit (PENDING_TRANSIT) - The transport is loaded and waiting to be
  sent to destination
  33
- In Transit (IN_TRANSIT) - Transport is in transit
- Pending Finalized (PENDING_FINALISED) - The shipment has reached its destination and
  waiting to be completed by the recipient

After setting the last status, in order to change the owner of the batches at the smart contract level
the consignee must set the transport status as follows:

- Finalized - marks a successfully completed shipment. In case of
  it has a specified password, it must be transmitted. If the password is incorrect or
  is not specified, the transport cannot receive the status and implicitly the change of ownership
  on batches is not done.

### Certificates

Certificates are a statement about the qualities and impact of a product or
of a company. They are created and assigned by the certification authorities. At the time of assignment, the certifying authority must pay a minimum amount, amount that is initially set in the smart contracts, but can be later changed by the system administrator. If, whose company or product it was assigned the certificate no longer corresponds to its statement, there are two variants by which
can be revoked:

- The certification company revokes the certificate, and the amount is refunded to the certification company
- The system administrator revokes the certificate, but the amount paid is not returned to
  certification company.
  In this way, this may discourage the assignment of certificates to products and companies that do not match its statement, and certification companies are encouraged to periodically check that the certificate statement is
  respected.

**Types of certificates**

Certificates can be of several types, depending on the message they send,
such as:

- certificates that describe the impact on the environment that a material or a has
  company. An example for describing this type can be: “Resources used
  for the manufacture of this product are managed in a way that ensures health
  and the long-term maintenance of these resources. ”

- certificates describing the safety of the use of a material or the production process
  of it. An example to describe this type can be: “The product has been tested
  on people in a clinical trial to ensure safety. ”
- certificates that describe the benefits of the ingredients of the products or how they
  were manufactured. An example for describing this type can be: “The product does not
  contains synthetic flavors. May contain flavors derived from natural ingredients. ”
- certificates that describe the social impact that the purchase of products has or
  company practices. An example for describing this type can be: “The company
  has equality and diversity policies in place to ensure that access to
  rights or opportunities is not affected. ”
- certificates that describe the impact that the product has on its animals
  their growing practices. An example to describe this type can be:
  "The product has been developed and manufactured in a way that does not harm or kill
  animals. ”
- a generic type, if the certificate does not fall into the above
