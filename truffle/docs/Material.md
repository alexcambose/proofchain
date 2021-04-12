## `Material`






### `constructor(address _masterAddress, address _factoryContractAddress)` (public)





### `create(string _name, string _code, string _amountIdentifier, string[] _images)` (public)

Create a new raw material token info



### `create(string _name, string _code, string _amountIdentifier, string[] _images, uint256[] _recipeMaterialTokenId, uint256[] _recipeMaterialAmount)` (public)

Create a new compound material token info



### `mint(uint256 _tokenID, uint256 _amount)` (public)

Mint a new raw material



### `mint(uint256 _tokenID, uint256[] _batchesId, uint256[][] _batchesMaterialsUuid)` (public)





### `createBatch(string _code, uint256[] _uuids)` (public)





### `destroyBatch(uint256 _batchId)` (public)





### `burnBatchTokens(uint256 _batchId, uint256[] _uuids)` (public)





### `burnBatchToken(uint256 _batchId, uint256 _uuid)` (public)





### `assignCertificate(uint256 _certificateCode, uint256 _itemIdentifier)` (public)





### `cancelCertificate(uint256 _certificateCode, uint256 _itemIdentifier)` (public)





### `revokeCertificate(uint256 _certificateCode, uint256 _itemIdentifier)` (public)





### `changeBatchOwnershipBatch(uint256[] _batchIds, address _newOwner, uint256 _transportId)` (public)





### `removeBatchFromAddress(uint256 _batchId)` (public)






