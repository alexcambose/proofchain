// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

contract MaterialBase {
    event MaterialCreate(address indexed company, uint256 indexed materialTokenId);
    event MaterialTransfer(
        address indexed from,
        address indexed to,
        uint256 indexed materialTokenId,
        uint256 uuid
    );
    event BatchCreate(
        address indexed company,
        uint256 indexed batchId,
        uint256 indexed materialTokenId
    );

    event BatchTransfer(
        address indexed from,
        address indexed to,
        uint256 indexed batchId,
        uint256 uuid // uuid is only specified on burn
    );
    event AssignedCertificate(
        address indexed certificateAuthority,
        uint256 indexed certificateCode,
        uint256 indexed materialTokenId,
        uint256 certificateInstanceId
    );
    event CanceledCertificate(
        address indexed certificateAuthority,
        uint256 indexed certificateCode,
        uint256 indexed materialTokenId,
        uint256 certificateInstanceId
    );
    event RevokedCertificate(
        address indexed certificateAuthority,
        uint256 indexed certificateCode,
        uint256 indexed materialTokenId,
        uint256 certificateInstanceId
    );
    struct CertificateInstance {
        uint256 code;
        uint256 stake;
    }
    struct MaterialTokenInfo {
        uint256 materialTokenId;
        // a basic name for the material
        string name;
        // a real-life identification code, see https://www.gs1.org/standards/id-keys/gtin
        string code;
        // the address of the creator, the creator must own a company
        address creator;
        // certificates
        uint256[] certificateInstanceIds;
        // ipfs images hash
        string[] images;
        // mapping from (tokenID -> amount of the amount identifier)
        uint256[] recipeMaterialTokenId;
        uint256[] recipeMaterialAmount;
        // amount identifier (kg, grams)
        string amountIdentifier;
    }

    struct MaterialInfo {
        uint256 materialTokenId;
        uint256 uuid;
        uint256[] fromBatchId;
        uint256[][] batchMaterialsUuid;
    }
    // uuid generator
    uint256 materialUuidGenerator = 1;
    // uuid => MaterialInfo
    mapping(uint256 => MaterialInfo) public uuidMaterialInfo;
    struct BatchInfo {
        uint256 batchId;
        address owner;
        string code;
        uint256 materialTokenId;
        uint256[] materialsUuid;
    }
    // Mapping tokenid => to materials owned by an address (materials who are not in a batch)
    mapping(uint256 => mapping(address => uint256[])) balance;
    // all tokens, (materialTokenId => MaterialTokenInfo)
    // materialTokenId uniquely identifies a product
    uint256 materialTokenId = 0;
    mapping(uint256 => MaterialTokenInfo) public materialToken;

    // all batches associated with an address (address => (batchId => (has|doesn't have)))
    mapping(address => mapping(uint256 => bool)) public addressBatches;
    // all batchId associated with a batch
    mapping(uint256 => BatchInfo) public batch;
    uint256 batchId = 0;

    // certificateInstanceId => CertificateInstance
    mapping(uint256 => CertificateInstance) public certificateInstances;
    uint256 certificateInstanceId = 0;
    modifier senderIsTokenCreator(uint256 _materialTokenId) {
        require(
            msg.sender == materialToken[_materialTokenId].creator,
            "You are not the creator of this token"
        );
        _;
    }

    function getBalance(uint256 _tokenID, address _address) public view returns (uint256) {
        return balance[_tokenID][_address].length;
    }

    function getOwnedMaterialsUuid(uint256 _tokenID, address _address)
        public
        view
        returns (uint256[] memory)
    {
        return balance[_tokenID][_address];
    }

    function getMaterialCertificateInstance(uint256 _materialTokenId, uint256 _code)
        public
        view
        returns (CertificateInstance memory)
    {
        for (
            uint256 i = 0;
            i < materialToken[_materialTokenId].certificateInstanceIds.length;
            i++
        ) {
            if (
                certificateInstances[materialToken[_materialTokenId].certificateInstanceIds[i]]
                    .code == _code
            ) {
                return
                    certificateInstances[materialToken[_materialTokenId].certificateInstanceIds[i]];
            }
        }
        // revert("Certificate with code is not assigned");
    }

    function getMaterialImages(uint256 _materialTokenId) public view returns (string[] memory) {
        return materialToken[_materialTokenId].images;
    }

    function getMaterialRecipe(uint256 _materialTokenId)
        public
        view
        returns (uint256[] memory, uint256[] memory)
    {
        return (
            materialToken[_materialTokenId].recipeMaterialTokenId,
            materialToken[_materialTokenId].recipeMaterialAmount
        );
    }

    function getBatchMaterialsUuid(uint256 _batchId) public view returns (uint256[] memory) {
        return batch[_batchId].materialsUuid;
    }

    function getMaterialCertificatesInstanceIds(uint256 _materialTokenId)
        public
        view
        returns (uint256[] memory)
    {
        return materialToken[_materialTokenId].certificateInstanceIds;
    }

    function getAddressBatches(address _address, uint256 _batchId) public view returns (bool) {
        return addressBatches[_address][_batchId];
    }

    function getMaterialInfoFromBatchId(uint256 _materialUuid)
        public
        view
        returns (uint256[] memory)
    {
        return uuidMaterialInfo[_materialUuid].fromBatchId;
    }

    function getMaterialInfoBatchMaterialsUuid(uint256 _materialUuid)
        public
        view
        returns (uint256[][] memory)
    {
        return uuidMaterialInfo[_materialUuid].batchMaterialsUuid;
    }
}
