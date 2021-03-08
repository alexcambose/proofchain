// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./CertificateAuthorityManagerReferencer.sol";

abstract contract CertificateAuthorityOwnable is CertificateAuthorityManagerReferencer {
    modifier senderHasCertificateAuthority {
        // require(
        //     getCertificateAuthorityManagerContract()
        //         .getCertificateAuthorityManager(msg.sender)
        //         .isValue == true,
        //     ""
        // );
        _;
    }
}
