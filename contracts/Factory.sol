// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./Company.sol";
import "./RawMaterial.sol";
import "./CompoundMaterial.sol";

contract Factory {
    address public companyContractAddress;
    address public rawMaterialContractAddress;
    address public compoundMaterialContractAddress;

    constructor() {
        Company company = new Company();
        companyContractAddress = address(company);
        RawMaterial rawMaterial = new RawMaterial(companyContractAddress);
        rawMaterialContractAddress = address(rawMaterial);
        CompoundMaterial compoundMaterial =
            new CompoundMaterial(companyContractAddress);
        compoundMaterialContractAddress = address(compoundMaterial);
    }
}
