## `MaterialBase`





### `senderIsTokenCreator(uint256 _materialTokenId)`






### `getBalance(uint256 _tokenID, address _address) → uint256` (public)





### `getOwnedMaterialsUuid(uint256 _tokenID, address _address) → uint256[]` (public)





### `getMaterialCertificateInstance(uint256 _materialTokenId, uint256 _code) → struct Certifiable.CertificateInstance` (public)





### `getMaterialImages(uint256 _materialTokenId) → string[]` (public)





### `getMaterialRecipe(uint256 _materialTokenId) → uint256[], uint256[]` (public)





### `getBatchMaterialsUuid(uint256 _batchId) → uint256[]` (public)





### `getMaterialCertificatesInstanceIds(uint256 _materialTokenId) → uint256[]` (public)





### `getAddressBatches(address _address, uint256 _batchId) → bool` (public)





### `getMaterialInfoFromBatchId(uint256 _materialUuid) → uint256[]` (public)





### `getMaterialInfoBatchMaterialsUuid(uint256 _materialUuid) → uint256[][]` (public)






### `MaterialCreate(address company, uint256 materialTokenId)`





### `MaterialTransfer(address from, address to, uint256 materialTokenId, uint256 uuid)`





### `BatchCreate(address company, uint256 batchId, uint256 materialTokenId, uint256[] uuids)`





### `BatchTransfer(address from, address to, uint256 batchId, uint256 uuid, uint256 transportId)`





### `MaterialAssignedCertificate(address certificateAuthority, uint256 certificateCode, uint256 materialTokenId, uint256 certificateInstanceId)`





### `MaterialCanceledCertificate(address certificateAuthority, uint256 certificateCode, uint256 materialTokenId, uint256 certificateInstanceId)`





### `MaterialRevokedCertificate(address certificateAuthority, uint256 certificateCode, uint256 materialTokenId, uint256 certificateInstanceId)`





