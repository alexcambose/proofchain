// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

interface Certifiable {
    function assignCertificate(uint256 certificateCode) external;

    function revokeCertificate(uint256 certificateCode) external;
}
