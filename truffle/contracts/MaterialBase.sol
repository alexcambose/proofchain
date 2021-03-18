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
    event BatchCreate(address indexed company, uint256 indexed batchId);

    event BatchTransfer(
        address indexed from,
        address indexed to,
        uint256 indexed batchId,
        uint256 uuid // uuid is only specified on burn
    );
    struct CertificateInstance {
        uint256 code;
        uint256 time;
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
        CertificateInstance[] certificates;
        uint256 certificatesLength;
        // ipfs images hash
        string[] images;
        // mapping from (tokenID -> amount of the amount identifier)
        uint256[] recipeMaterialTokenId;
        uint256[] recipeMaterialAmount;
        // amount identifier (kg, grams)
        string amountIdentifier;
        bool isValue;
    }

    struct MaterialInfo {
        uint256 materialTokenId;
        uint256 uuid;
        uint256[] fromBatchId;
        uint256[][] batchMaterialsUuid;
        // uint batchMaterials
        // batchId => materials uuids[]
        // mapping(uint256 => uint256[]) batchMaterialsUuid;
    }
    // uuid generator
    uint256 materialUuidGenerator = 0;
    // uuid => MaterialInfo
    mapping(uint256 => MaterialInfo) public uuidMaterialInfo;
    struct BatchInfo {
        uint256 batchId;
        address owner;
        string code;
        uint256 materialTokenId;
        uint256[] materialsUuid;
        bool isValue;
    }
    // Mapping tokenid => to materials owned by an address (materials who are not in a batch)
    mapping(uint256 => mapping(address => uint256[])) balance;
    // all tokens, (materialTokenId => MaterialTokenInfo)
    // materialTokenId uniquely identifies a product
    uint256 public materialTokenId = 0;
    mapping(uint256 => MaterialTokenInfo) public materialToken;

    // all batches associated with an address (address => batchId[])
    mapping(address => uint256[]) public addressBatches;
    // all batchId associated with a batch
    mapping(uint256 => BatchInfo) public batch;
    uint256 public batchId = 0;
    event T(uint256 i, uint256 v);
    modifier senderIsTokenCreator(uint256 _materialTokenId) {
        require(
            msg.sender == materialToken[_materialTokenId].creator,
            "You are not the creator of this token"
        );
        _;
    }

    function getBalance(uint256 _tokenID, address _address) public view returns (uint256) {
        // uint256 total = 0;
        // for (uint256 i = 0; i < balance[_address].length; i++) {
        //     if (_tokenID == balance[_address][i].materialTokenId) {
        //         total++;
        //     }
        // }
        // return total;
        return balance[_tokenID][_address].length;
    }

    function getOwnedMaterialsUuid(uint256 _tokenID, address _address)
        public
        view
        returns (uint256[] memory)
    {
        return balance[_tokenID][_address];
    }

    function getMaterialCertificate(uint256 _materialTokenId, uint256 _index)
        public
        view
        returns (CertificateInstance memory)
    {
        return materialToken[_materialTokenId].certificates[_index];
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
}
