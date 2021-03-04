// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

contract Aggregator {
    address public companyContractAddress;
    address public materialContractAddress;
    address public certificateAuthorityManagerContractAddress;

    constructor(
        address _companyContractAddress,
        address _materialContractAddress,
        address _certificateAuthorityManagerContractAddress
    ) {
        companyContractAddress = _companyContractAddress;
        materialContractAddress = _materialContractAddress;
        certificateAuthorityManagerContractAddress = _certificateAuthorityManagerContractAddress;
    }
}
