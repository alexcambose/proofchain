// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;
import "./Certifiable.sol";

contract Company is Certifiable {
    enum EntityTypeEnum {MANUFACTURER, LOGISTIC, WAREHOUSE, RETAILER}

    struct CompanyInfo {
        EntityTypeEnum entityType;
        string name;
        bool isValue;
    }
    mapping(address => CompanyInfo) public companies;

    modifier doesNotHaveCompany {
        require(
            companies[msg.sender].isValue == false,
            "Address already has a company"
        );
        _;
    }

    constructor(address _factoryContractAddress)
        Ownable(_factoryContractAddress)
    {}

    function create(string memory _name, EntityTypeEnum _entityType) public {
        address sender = msg.sender;
        companies[sender].name = _name;
        companies[sender].entityType = _entityType;
        companies[sender].isValue = true;
    }

    function getCompany(address _addr)
        public
        view
        returns (CompanyInfo memory)
    {
        return companies[_addr];
    }

    // function assignCertificate(uint256 certificateCode) external override {}

    // function revokeCertificate(uint256 certificateCode) external override {}
}
