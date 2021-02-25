// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

contract Company {
    enum EntityTypeEnum {MANUFACTURER, LOGISTIC, WAREHOUSE, RETAILER}

    struct CompanyInfo {
        EntityTypeEnum _entityType;
        string _name;
    }
    mapping(address => CompanyInfo) public companies;

    function createCompany(string memory name, EntityTypeEnum entityType)
        public
    {
        address sender = msg.sender;
        companies[sender]._name = name;
        companies[sender]._entityType = entityType;
    }
}
