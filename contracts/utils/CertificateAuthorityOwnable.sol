// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./CertificateAuthorityManagerReferencer.sol";

contract CertificateAuthorityOwnable is CertificateAuthorityManagerReferencer {
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
