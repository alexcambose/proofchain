// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./Company.sol";
import "./RawMaterial.sol";

contract Factory {
    address public companyContractAddress;
    address public rawMaterialContractAddress;

    constructor() {
        Company company = new Company();
        companyContractAddress = address(company);
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterialContractAddress = address(rawMaterial);
    }
}
