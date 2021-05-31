## `Shipper`





### `batchesOwner(uint256[] _batchIds)`





### `onlyTransportCompany(uint256 _transportId)`





### `onlyReceiver(uint256 _transportId)`





### `onlyNotfinalisedTransport(uint256 _transportId)`






### `createTransport(address _receiver, address _transportCompany, uint256[] _batchIds)` (public)

Create a new transport




### `createTransport(address _receiver, address _transportCompany, uint256[] _batchIds, bytes32 _hashedPassword)` (public)

Create a new transport




### `setTransportStatus(uint256 _transportId, enum Shipper.TransportStatusEnum _status)` (public)

Sets the status of a transport




### `finaliseTransport(uint256 _transportId)` (public)

Finalises a transport




### `finaliseTransport(uint256 _transportId, string _password)` (public)

Finalises a transport




### `getTransportBatchids(uint256 _transportId) → uint256[]` (public)

Get the batch ids from a transport





### `TransportCreated(address sender, address receiver, address transportCompany, uint256 transportId)`





### `TransportStatus(uint256 transportId, enum Shipper.TransportStatusEnum status)`





