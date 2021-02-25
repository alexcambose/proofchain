// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./utils/Ownable.sol";
import "./utils/CompanyOwnable.sol";

contract RawMaterial is Ownable, CompanyOwnable {
    event RawMaterialCreate(address indexed company, uint256 materialTokenID);
    event RawMaterialTransfer(
        address indexed from,
        address indexed to,
        uint256 value
    );

    struct MaterialTokenInfo {
        string title;
        uint256 code;
        address creator;
        address[] certificates;
        string[] images;
    }

    // Mapping from TokenID to address balances
    mapping(uint256 => mapping(address => uint256)) private balance;
    mapping(uint256 => MaterialTokenInfo) public materialToken;
    uint256 private materialTokenID = 0;

    constructor(address _companyContract) CompanyOwnable(_companyContract) {}

    modifier senderIsTokenCreator(uint256 _materialTokenID) {
        require(msg.sender == materialToken[_materialTokenID].creator);
        _;
    }

    function create(
        string memory _title,
        uint256 _code,
        string[] memory _images
    ) public senderHasCompany {
        materialToken[materialTokenID].title = _title;
        materialToken[materialTokenID].code = _code;
        materialToken[materialTokenID].images = _images;
        materialToken[materialTokenID].creator = msg.sender;
        emit RawMaterialCreate(msg.sender, materialTokenID);
        materialTokenID++;
    }

    function mint(uint256 _tokenID, uint256 _amount)
        public
        senderIsTokenCreator(_tokenID)
    {
        address companyAddress = materialToken[_tokenID].creator;
        balance[_tokenID][msg.sender] += _amount;
        emit RawMaterialTransfer(address(0), companyAddress, _amount);
    }

    function getBalance(uint256 _tokenID, address _address)
        public
        view
        returns (uint256)
    {
        return balance[_tokenID][_address];
    }
}
