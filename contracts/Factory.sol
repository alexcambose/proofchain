// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./Aggregator.sol";
import "./Material.sol";
import "./Company.sol";
import "./CertificateAuthorityManager.sol";

contract Factory {
    address public aggregator;

    constructor() {
        address masterAddress = msg.sender;
        Aggregator aggregatorContract = new Aggregator();
        aggregator = address(aggregatorContract);

        Company company = new Company(aggregator);
        address companyContractAddress = address(company);
        Material materialContract = new Material(aggregator);
        address materialContractAddress = address(materialContract);
        CertificateAuthorityManager certificateAuthorityManager =
            new CertificateAuthorityManager(aggregator);
        address certificateAuthorityManagerContractAddress =
            address(certificateAuthorityManager);

        aggregatorContract.setContracts(
            companyContractAddress,
            materialContractAddress,
            certificateAuthorityManagerContractAddress
        );
    }
}
