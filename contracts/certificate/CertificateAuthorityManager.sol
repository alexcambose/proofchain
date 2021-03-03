// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "../utils/Ownable.sol";
import "../utils/CompanyReferencer.sol";
import "../utils/MaterialReferencer.sol";

contract CertificateAuthorityManager is
    Ownable,
    CompanyReferencer,
    MaterialReferencer
{
    // address public factoryContractAddress;

    struct CertificateTypeInfo {
        string title;
    }
    struct CertificateAuthority {
        string name;
        uint256 stake;
        bool disabled;
    }
    mapping(address => CertificateTypeInfo) public certificates;
    mapping(address => CertificateAuthority) public certificateAuthorities;
    address[] certificateAuthoritiesAddress;
    // minimum stake the certificate authorities need to deposit
    uint256 public minimumStake = 1;

    // constructor(address _factoryContractAddress) {
    //     factoryContractAddress = _factoryContractAddress;
    // }

    function createCertificateAuthority(string memory _name) public payable {
        require(
            msg.value >= minimumStake,
            "Received payment is lower that the minimum stake"
        );
        certificateAuthoritiesAddress.push(msg.sender);
        certificateAuthorities[msg.sender].name = _name;
        certificateAuthorities[msg.sender].stake = msg.value;
    }
}
