// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./Company.sol";
import "./Material.sol";

// import "./CertificateAuthorityManager.sol";

contract Factory {
    address masterAddress;
    address public companyContractAddress;
    address public materialContractAddress;
    address public certificateAuthorityManagerAddress;

    constructor() {
        masterAddress = msg.sender;

        Company company = new Company();
        companyContractAddress = address(company);
        Material materialContract = new Material();
        materialContractAddress = address(materialContract);
        // CertificateAuthorityManager certificateAuthorityManager =
        // new CertificateAuthorityManager();
        // certificateAuthorityManagerAddress = address(
        //     certificateAuthorityManager
        // );
    }
}
