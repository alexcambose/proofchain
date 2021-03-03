// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "../Company.sol";
import "../Factory.sol";
import "./Ownable.sol";
import "../CertificateAuthorityManager.sol";

contract CertificateAuthorityManagerReferencer is Ownable {
    CertificateAuthorityManager internal company;
    address internal companyAddress;

    function getCertificateAuthorityManagerContract()
        public
        returns (CertificateAuthorityManager)
    {
        if (companyAddress == address(0)) {
            companyAddress = Factory(owner()).companyContractAddress();
            company = CertificateAuthorityManager(companyAddress);
            return company;
        }
        return company;
    }
}
