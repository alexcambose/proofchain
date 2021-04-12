// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

/**
Contains the addresses for Material, Company, CertificateAuthorityManager contracts
 */
contract Aggregator {
    address public companyContractAddress;
    address public materialContractAddress;
    address public certificateAuthorityManagerContractAddress;
    address public masterAddress;
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner!");
        _;
    }

    /**
     * Set contract addresses
     * @param _masterAddress The address of the Factory contract
     * @param _companyContractAddress The address of the Company contract
     * @param _materialContractAddress The address of the Material contract
     * @param _certificateAuthorityManagerContractAddress The address of the CertificateAuthorityManager contract
     */
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
