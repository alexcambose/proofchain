// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;
import "./utils/CertificateAuthorityManagerReferencer.sol";

abstract contract Certifiable is CertificateAuthorityManagerReferencer {
    function assignCertificate(uint256 _certificateCode) public payable {
        CertificateAuthorityManager cam =
            getCertificateAuthorityManagerContract();
        (, address certificateAuthority) =
            cam.authorityCertificates(_certificateCode);

        require(
            certificateAuthority == msg.sender,
            "You need to be the owner of the certificate authority in order to assign it"
        );
        require(
            msg.value >= cam.minimumStake(),
            "Received payment is lower that the minimum stake"
        );
    }

    function cancelCertificate(uint256 _certificateCode) public {
        CertificateAuthorityManager cam =
            getCertificateAuthorityManagerContract();
        (, address certificateAuthority) =
            cam.authorityCertificates(_certificateCode);

        require(
            certificateAuthority == msg.sender,
            "You need to be the owner of the certificate authority in order to assign it"
        );
    }

    function revokeCertificate() public view {
        require(
            getMasterAddress() == msg.sender,
            "You need to be the owner of the factory in order to revoke it"
        );
    }
}
