// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;
import "./Certifiable.sol";

abstract contract MaterialBase is Certifiable {
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
        uint256 indexed materialTokenId,
        uint256[] uuids
    );

    event BatchTransfer(
        address indexed from,
        address indexed to,
        uint256 indexed batchId,
        uint256 uuid, // uuid is only specified on burn
        uint256 transportId
    );
    event MaterialAssignedCertificate(
        address indexed certificateAuthority,
        uint256 indexed certificateCode,
        uint256 indexed materialTokenId,
        uint256 certificateInstanceId
    );
    event MaterialCanceledCertificate(
        address indexed certificateAuthority,
        uint256 indexed certificateCode,
        uint256 indexed materialTokenId,
        uint256 certificateInstanceId
    );
    event MaterialRevokedCertificate(
        address indexed certificateAuthority,
        uint256 indexed certificateCode,
        uint256 indexed materialTokenId,
        uint256 certificateInstanceId
    );

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
        // images
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
        // unique id
        uint256 batchId;
        // the owner's address of this batch
        address owner;
        // arbitrary code of a batch
        string code;
        // the material id that this batch is made of
        uint256 materialTokenId;
        // array of material instance ids
        uint256[] materialsUuid;
    }
    // Mapping tokenid => to materials owned by an address (materials who are not in a batch)
    // tokenId => address[] => uuids[]
    mapping(uint256 => mapping(address => uint256[])) balance;
    // all tokens, (materialTokenId => MaterialTokenInfo)
    // materialTokenId uniquely identifies a product
    uint256 materialTokenId = 0;
    mapping(uint256 => MaterialTokenInfo) public materialToken;

    // true if an address has a specific batch id (address => (batchId => [true|false]))
    mapping(address => mapping(uint256 => bool)) public addressBatches;
    // all batchId associated with a batch
    mapping(uint256 => BatchInfo) public batch;
    uint256 batchId = 0;

    modifier senderIsTokenCreator(uint256 _materialTokenId) {
        require(
            msg.sender == materialToken[_materialTokenId].creator,
            "You are not the creator of this token"
        );
        _;
    }

    /**
     * The number of materials an address has
     *
     * @param _tokenID Material token id
     * @param _address The address
     * @return Balance
     */
    function getBalance(uint256 _tokenID, address _address) public view returns (uint256) {
        return balance[_tokenID][_address].length;
    }

    /**
     * Get the owned material instance uuids
     *
     * @param _tokenID Material token id
     * @param _address The address
     * @return Material uuids
     */
    function getOwnedMaterialsUuid(uint256 _tokenID, address _address)
        public
        view
        returns (uint256[] memory)
    {
        return balance[_tokenID][_address];
    }

    /**
     * Get the certificate instance of a material token
     *
     * @param _materialTokenId Material token id
     * @param _code Certificate identification code
     * @return Material certificate instances
     */
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

    /**
     * Get material images
     *
     * @param _materialTokenId Material token id
     * @return Material images
     */
    function getMaterialImages(uint256 _materialTokenId) public view returns (string[] memory) {
        return materialToken[_materialTokenId].images;
    }

    /**
     * Get material recipe
     *
     * @param _materialTokenId Material token id
     * @return Material recipe with token ids and amounts
     */
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

    /**
     * Get the material instance uuids that are in a particular batch
     *
     * @param _batchId The target batch id
     * @return Material uuids
     */
    function getBatchMaterialsUuid(uint256 _batchId) public view returns (uint256[] memory) {
        return batch[_batchId].materialsUuid;
    }

    /**
     * Get material certificate instances
     *
     * @param _materialTokenId Material token id
     * @return Material certificate instances
     */
    function getMaterialCertificatesInstanceIds(uint256 _materialTokenId)
        public
        view
        returns (uint256[] memory)
    {
        return materialToken[_materialTokenId].certificateInstanceIds;
    }

    /**
     * Check if a batch is owned by an address
     *
     * @param _address An address
     * @param _batchId A batch id
     * @return True if the batch is owned by an address
     */
    function getAddressBatches(address _address, uint256 _batchId) public view returns (bool) {
        return addressBatches[_address][_batchId];
    }

    /**
     * Get the used batches used to create a material
     *
     * @param _materialUuid Material instance uuid
     * @return Material batch ids
     */
    function getMaterialInfoFromBatchId(uint256 _materialUuid)
        public
        view
        returns (uint256[] memory)
    {
        return uuidMaterialInfo[_materialUuid].fromBatchId;
    }

    /**
     * Get the used material instances to create a specific material instance
     *
     * @param _materialUuid  Material instance uuid
     * @return Used material instance uuids
     */
    function getMaterialInfoBatchMaterialsUuid(uint256 _materialUuid)
        public
        view
        returns (uint256[][] memory)
    {
        return uuidMaterialInfo[_materialUuid].batchMaterialsUuid;
    }
}
