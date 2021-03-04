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

        Company company = new Company();
        address companyContractAddress = address(company);
        Material materialContract = new Material();
        address materialContractAddress = address(materialContract);
        CertificateAuthorityManager certificateAuthorityManager =
            new CertificateAuthorityManager();
        address certificateAuthorityManagerContractAddress =
            address(certificateAuthorityManager);
        aggregator = address(
            new Aggregator(
                companyContractAddress,
                materialContractAddress,
                certificateAuthorityManagerContractAddress
            )
        );
    }
}
