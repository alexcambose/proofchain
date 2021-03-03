// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./utils/Ownable.sol";
import "./utils/CompanyReferencer.sol";
import "./utils/MaterialReferencer.sol";

contract CertificateAuthorityManager is
    Ownable,
    CompanyReferencer,
    MaterialReferencer
{
    // address public factoryContractAddress;

    struct Certificate {
        string title;
        uint256 stake;
        // unique certificate code, used to assign a specific certificate code to a material/company
        uint256 code;
        // true if this certificate is set
        bool isValue;
    }
    struct CertificateAuthority {
        string name;
        bool disabled;
        // true if this certificate authority is set
        bool isValue;
    }
    // address => [code => certificate]
    mapping(address => mapping(uint256 => Certificate))
        public authorityCertificates;
    mapping(address => CertificateAuthority) public certificateAuthorities;
    address[] certificateAuthoritiesAddress;
    // minimum stake the certificate authorities need to deposit
    uint256 public minimumStake = 1;

    // constructor(address _factoryContractAddress) {
    //     factoryContractAddress = _factoryContractAddress;
    // }

    function createCertificateAuthority(string memory _name) public {
        certificateAuthoritiesAddress.push(msg.sender);
        certificateAuthorities[msg.sender].name = _name;
        certificateAuthorities[msg.sender].isValue = true;
    }

    function createCertificate(string memory _title, uint256 code) public {
        require(
            authorityCertificates[msg.sender][code].isValue == false,
            "This certificate already exists. You can not override this"
        );
        // certificateAuthorities[msg.sender].stake = msg.value;
        authorityCertificates[msg.sender][code].title = _title;
    }

    function assignCertificateToMaterial(uint256 code, uint256 materialTokenId)
        public
        payable
    {
        require(
            msg.value >= minimumStake,
            "Received payment is lower that the minimum stake"
        );
    }
}
