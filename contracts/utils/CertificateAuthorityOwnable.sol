// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "../CertificateAuthorityManager.sol";
import "./CertificateAuthorityManagerReferencer.sol";

contract CertificateAuthorityOwnable is CertificateAuthorityManagerReferencer {
    modifier senderHasCompany {
        require(
            getCertificateAuthorityManagerContract()
                .getCompany(msg.sender)
                .isValue == true,
            ""
        );
        _;
    }
}
