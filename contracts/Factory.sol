// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./Company.sol";
import "./RawMaterial.sol";
import "./certificate/CertificateAuthority.sol";

contract Factory {
    address masterAddress;
    address public companyContractAddress;
    address public rawMaterialContractAddress;
    address public certificateAuthorityIssuerAddress;

    constructor() {
        masterAddress = msg.sender;

        // CertificateAuthority certificateAuthority = new CertificateAuthority();
        Company company = new Company();
        companyContractAddress = address(company);
        RawMaterial rawMaterial = new RawMaterial(companyContractAddress);
        rawMaterialContractAddress = address(rawMaterial);
    }
}
