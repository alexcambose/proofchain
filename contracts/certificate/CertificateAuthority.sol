// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

contract CertificateAuthority {
    struct CertificateTypeInfo {
        string title;
    }
    mapping(address => CertificateTypeInfo) public certificates;
}
