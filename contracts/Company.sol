// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

contract Company {
    enum EntityTypeEnum {MANUFACTURER, LOGISTIC, WAREHOUSE, RETAILER}
    EntityTypeEnum entityType;
    string name;

    constructor(string memory _name, EntityTypeEnum _entityType) {
        name = _name;
        entityType = _entityType;
    }
}
