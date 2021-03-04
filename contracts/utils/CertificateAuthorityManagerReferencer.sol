// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "../Aggregator.sol";
import "./Ownable.sol";
import "../CertificateAuthorityManager.sol";

abstract contract CertificateAuthorityManagerReferencer is Ownable {
    CertificateAuthorityManager internal certificateAuthorityManager;
    address internal certificateAuthorityManagerAddress;

    function getCertificateAuthorityManagerContract()
        public
        returns (CertificateAuthorityManager)
    {
        if (certificateAuthorityManagerAddress == address(0)) {
            certificateAuthorityManagerAddress = Aggregator(aggregator())
                .certificateAuthorityManagerContractAddress();
            certificateAuthorityManager = CertificateAuthorityManager(
                certificateAuthorityManagerAddress
            );
            return certificateAuthorityManager;
        }
        return certificateAuthorityManager;
    }
}
