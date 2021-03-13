// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

contract MaterialBase {
    event MaterialCreate(address indexed company, uint256 indexed materialTokenId);
    event MaterialTransfer(address indexed from, address indexed to, uint256 value);
    event BatchCreate(address indexed company, uint256 indexed batchId);
    // amount is only specified on burn
    event BatchTransfer(
        address indexed from,
        address indexed to,
        uint256 indexed batchId,
        uint256 amount
    );
    struct CertificateInstance {
        uint256 code;
        uint256 time;
        uint256 stake;
    }
    struct MaterialTokenInfo {
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
        uint256[] recipematerialTokenId;
        uint256[] recipeMaterialAmount;
        // amount identifier (kg, grams)
        string amountIdentifier;
        bool isValue;
    }
    struct BatchInfo {
        string code;
        uint256 materialTokenId;
        uint256 materialTokenAmount;
        address owner;
        bool isValue;
    }
    // Mapping from TokenID to address balances
    mapping(uint256 => mapping(address => uint256)) balance;
    // all tokens, (materialTokenId => MaterialTokenInfo)
    // materialTokenId uniquely identifies a product
    uint256 public materialTokenId = 0;
    mapping(uint256 => MaterialTokenInfo) public materialToken;

    // all batches associated with an address (address => batchId[])
    mapping(address => uint256[]) public addressBatches;
    // all batchId associated with a batch
    mapping(uint256 => BatchInfo) public batch;
    uint256 public batchId = 0;

    modifier senderIsTokenCreator(uint256 _materialTokenId) {
        require(msg.sender == materialToken[_materialTokenId].creator);
        _;
    }

    function getBalance(uint256 _tokenID, address _address) public view returns (uint256) {
        return balance[_tokenID][_address];
    }

    function getMaterialCertificate(uint256 _materialTokenId, uint256 _index)
        public
        view
        returns (CertificateInstance memory)
    {
        return materialToken[_materialTokenId].certificates[_index];
    }

    // function getBatchById(uint256 _batchId)
    //     public
    //     view
    //     returns (BatchInfo memory)
    // {
    //     return batch[_batchId];
    // }
}
