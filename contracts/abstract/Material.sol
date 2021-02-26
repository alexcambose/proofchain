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
        string title;
        uint256 code;
        address creator;
        address[] certificates;
        string[] images;
        mapping(uint256 => uint256) recipe;
    }
    // Mapping from TokenID to address balances
    mapping(uint256 => mapping(address => uint256)) balance;
    mapping(uint256 => MaterialTokenInfo) public materialToken;
    uint256 public materialTokenID = 0;

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

    function mint(uint256 _tokenID, uint256 _amount)
        public
        senderIsTokenCreator(_tokenID)
    {
        address companyAddress = materialToken[_tokenID].creator;
        balance[_tokenID][msg.sender] += _amount;
        emit MaterialTransfer(address(0), companyAddress, _amount);
    }
}
