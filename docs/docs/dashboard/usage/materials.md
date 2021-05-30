---
sidebar_position: 3
---

# Materials

The administration panel has two sections for materials, each with a page for viewing and one for adding:

- “Materials” - Section that is intended for composite materials
- “Raw Materials” - Section that is intended for simple materials
  Creating a simple material consists of filling in a form with the material name, an arbitrary code, and a court identifier of the material.

## Raw Materials

![Materials list](/img/docs/create-material-dashboard.png)

## Compound Materials

Depending on the type of material, the forms for creating an instance are different. If it is composed, a dynamic form is displayed to select the batches and materials within the batches to be used, and for simple materials it is necessary to specify only the number of units.

![Material create](/img/docs/create-cmaterial-dashboard.png)

## Material information

The view page contains information about the characteristics of the material such as: name, ingredients (if the material is a compound one) and its instances held by the current account, but not assigned to a batch, as shown below. In the right part, the table of instances of the material is present, together with their uuid and the hash of the creation transaction.
![Material view](/img/docs/view-material-dashboard.png)

## Material Certificates

The certificates associated with the selected material are displayed in the second section of the panel, in the form of a table.
![Material view certificates](/img/docs/view-material-certificates-dashboard.jpg)
