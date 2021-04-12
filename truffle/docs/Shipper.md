## `Shipper`





### `batchesOwner(uint256[] _batchIds)`





### `onlyTransportCompany(uint256 _transportId)`





### `onlyReceiver(uint256 _transportId)`





### `onlyNotfinalisedTransport(uint256 _transportId)`






### `createTransport(address _receiver, address _transportCompany, uint256[] _batchIds)` (public)





### `createTransport(address _receiver, address _transportCompany, uint256[] _batchIds, bytes32 _hashedPassword)` (public)





### `setTransportStatus(uint256 _transportId, enum Shipper.TransportStatusEnum _status)` (public)





### `finaliseTransport(uint256 _transportId)` (public)





### `finaliseTransport(uint256 _transportId, string _password)` (public)





### `getTransportBatchids(uint256 _transportId) → uint256[]` (public)






### `TransportCreated(address sender, address receiver, address transportCompany, uint256 transportId)`





### `TransportStatus(uint256 transportId, enum Shipper.TransportStatusEnum status)`





