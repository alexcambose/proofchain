## `MaterialBase`





### `senderIsTokenCreator(uint256 _materialTokenId)`






### `getBalance(uint256 _tokenID, address _address) → uint256` (public)

The number of materials an address has





### `getOwnedMaterialsUuid(uint256 _tokenID, address _address) → uint256[]` (public)

Get the owned material instance uuids





### `getMaterialCertificateInstance(uint256 _materialTokenId, uint256 _code) → struct Certifiable.CertificateInstance` (public)

Get the certificate instance of a material token





### `getMaterialImages(uint256 _materialTokenId) → string[]` (public)

Get material images





### `getMaterialRecipe(uint256 _materialTokenId) → uint256[], uint256[]` (public)

Get material recipe





### `getBatchMaterialsUuid(uint256 _batchId) → uint256[]` (public)

Get the material instance uuids that are in a particular batch





### `getMaterialCertificatesInstanceIds(uint256 _materialTokenId) → uint256[]` (public)

Get material certificate instances





### `getAddressBatches(address _address, uint256 _batchId) → bool` (public)

Check if a batch is owned by an address





### `getMaterialInfoFromBatchId(uint256 _materialUuid) → uint256[]` (public)

Get the used batches used to create a material





### `getMaterialInfoBatchMaterialsUuid(uint256 _materialUuid) → uint256[][]` (public)

Get the used material instances to create a specific material instance






### `MaterialCreate(address company, uint256 materialTokenId)`





### `MaterialTransfer(address from, address to, uint256 materialTokenId, uint256 uuid)`





### `BatchCreate(address company, uint256 batchId, uint256 materialTokenId, uint256[] uuids)`





### `BatchTransfer(address from, address to, uint256 batchId, uint256 uuid, uint256 transportId)`





### `MaterialAssignedCertificate(address certificateAuthority, uint256 certificateCode, uint256 materialTokenId, uint256 certificateInstanceId)`





### `MaterialCanceledCertificate(address certificateAuthority, uint256 certificateCode, uint256 materialTokenId, uint256 certificateInstanceId)`





### `MaterialRevokedCertificate(address certificateAuthority, uint256 certificateCode, uint256 materialTokenId, uint256 certificateInstanceId)`





