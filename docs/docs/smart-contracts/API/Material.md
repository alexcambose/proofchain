## `Material`






### `constructor(address _masterAddress, address _factoryContractAddress)` (public)





### `create(string _name, string _code, string _amountIdentifier, string[] _images)` (public)

Creates a new material token





### `create(string _name, string _code, string _amountIdentifier, string[] _images, uint256[] _recipeMaterialTokenId, uint256[] _recipeMaterialAmount)` (public)

Creates a new compound material





### `mint(uint256 _tokenID, uint256 _amount)` (public)

Mint a new raw material





### `mint(uint256 _tokenID, uint256[] _batchesId, uint256[][] _batchesMaterialsUuid)` (public)

Mints a compound material





### `createBatch(string _code, uint256[] _uuids)` (public)

Create a new batch





### `destroyBatch(uint256 _batchId)` (public)

Destroy a batch and move all materials to the balance of the user





### `burnBatchTokens(uint256 _batchId, uint256[] _uuids)` (public)

Burn some tokens from a batch





### `burnBatchToken(uint256 _batchId, uint256 _uuid)` (public)

Burn a token from a batch





### `assignCertificate(uint256 _certificateCode, uint256 _itemIdentifier)` (public)

Assigns a certificate to a material





### `cancelCertificate(uint256 _certificateCode, uint256 _itemIdentifier)` (public)

Cancels a certificate forom a material





### `revokeCertificate(uint256 _certificateCode, uint256 _itemIdentifier)` (public)

Revokes a certificate forom a material





### `changeBatchOwnershipBatch(uint256[] _batchIds, address _newOwner, uint256 _transportId)` (public)

Changes the owner of multiple batches at once





### `removeBatchFromAddress(uint256 _batchId)` (public)

Remove a batch from a specified address.





