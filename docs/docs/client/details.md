# Material information

&nbsp;

## Information

After selecting the material by scanning a QR code or entering it, the client application redirects the user to a page similar to the one below. It contains several sections "Information", "Material graph" and "Company", the first being based on details regarding the characteristics of the material, its history and the assigned certificates.
![Details Material](/img/docs/details-material-client.png)

## Graph

By selecting the “Material graph” option, we can observe a tree structure of a composite material. The root element, colored purple, is the one selected by the user to see its details. It is composed of several materials, blue nodes, added in batches, yellow nodes. The edges contain the hash associated with the batch creation transaction, where it connects a material type node (blue) with a batch node (yellow). Also, the edge will contain the transaction hash associated with creating a new material, in case it connects a slot node with a material node. The tree is made by querying the events issued by the intelligent contracts (Ethereum event logs).
![Graph Material](/img/docs/material-graph-client.png)

In order to be able to have more details, clicking on any element of the chart opens a window with additional information. In Figure 77 we can see the details after pressing on the root node, these being similar to those in Figure 76.
![Info Material](/img/docs/material-info-graph-client.png)

When clicking on a yellow node, equivalent to a batch, a window with two sections. The first contains details of it, and the second with a history of when it was created, the transports it had or the moment when it was deleted.
![Info Batch](/img/docs/batch-info-client.png)

## Company

![Info Company](/img/docs/company-client.png)
