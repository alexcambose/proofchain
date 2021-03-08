// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

contract Aggregator {
    address public companyContractAddress;
    address public materialContractAddress;
    address public certificateAuthorityManagerContractAddress;
    address public masterAddress;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, 'Only owner!');
        _;
    }

    function setContracts(
        address _masterAddress,
        address _companyContractAddress,
        address _materialContractAddress,
        address _certificateAuthorityManagerContractAddress
    ) public onlyOwner {
        masterAddress = _masterAddress;
        companyContractAddress = _companyContractAddress;
        materialContractAddress = _materialContractAddress;
        certificateAuthorityManagerContractAddress = _certificateAuthorityManagerContractAddress;
    }
}
