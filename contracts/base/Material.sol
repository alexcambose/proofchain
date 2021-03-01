// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

contract Material {
    event MaterialCreate(address indexed company, uint256 materialTokenID);
    event MaterialTransfer(
        address indexed from,
        address indexed to,
        uint256 value
    );
    struct MaterialTokenInfo {
        // a basic title for the material
        string title;
        // a real-life identification code, see https://www.gs1.org/standards/id-keys/gtin
        uint256 code;
        // the address of the creator, the creator must own a company
        address creator;
        // certificates
        address[] certificates;
        // ipfs images hash
        string[] images;
        // mapping from (tokenID -> amount of the amount identifier)
        uint256[] recipeMaterialTokenId;
        uint256[] recipeMaterialAmount;
        // amount identifier
        string amountIdentifier;
    }
    struct BatchInfo {
        string code;
        uint256 materialTokenId;
        uint256 materialTokenAmount;
    }
    // Mapping from TokenID to address balances
    mapping(uint256 => mapping(address => uint256)) balance;
    // all tokens, (materialTokenID => MaterialTokenInfo)
    uint256 public materialTokenID = 0;
    mapping(uint256 => MaterialTokenInfo) public materialToken;

    // all batches associated with an address (address => BatchInfo[])
    mapping(address => BatchInfo[]) public batches;

    modifier senderIsTokenCreator(uint256 _materialTokenID) {
        require(msg.sender == materialToken[_materialTokenID].creator);
        _;
    }

    function getBalance(uint256 _tokenID, address _address)
        public
        view
        returns (uint256)
    {
        return balance[_tokenID][_address];
    }

    function createBatch(
        string memory _code,
        uint256 _tokenID,
        uint256 _amount
    ) public {
        require(
            balance[_tokenID][msg.sender] >= _amount,
            "You do not have enough materials to create this batch"
        );
        balance[_tokenID][msg.sender] -= _amount;
        // create instance
        BatchInfo memory batchInfo =
            BatchInfo({
                code: _code,
                materialTokenId: _tokenID,
                materialTokenAmount: _amount
            });
        batches[msg.sender].push(batchInfo);
    }
}
