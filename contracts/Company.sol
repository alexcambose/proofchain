// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

contract Company {
    enum EntityTypeEnum {MANUFACTURER, LOGISTIC, WAREHOUSE, RETAILER}

    struct CompanyInfo {
        EntityTypeEnum entityType;
        string name;
        bool isValue;
    }
    mapping(address => CompanyInfo) public companies;

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
}
