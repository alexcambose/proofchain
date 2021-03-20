// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./utils/Ownable.sol";

// import "./utils/MaterialReferencer.sol";

contract CertificateAuthorityManager {
    event CertificateAuthorityCreated(address indexed owner);
    event CertificateAuthorityCertificateCreated(address indexed owner, uint256 indexed code);
    struct Certificate {
        string name;
        uint256 code;
        string description;
        // unique certificate code, used to assign a specific certificate code to a material/company
        address certificateAuthority;
    }
    struct CertificateAuthority {
        string name;
        bool disabled;
        address owner;
        // true if this certificate authority is set
        bool isValue;
    }
    // address => [code => certificate]
    mapping(uint256 => Certificate) public authorityCertificates;
    uint256 public codeCounter = 0;
    mapping(address => CertificateAuthority) public certificateAuthorities;
    // minimum stake the certificate authorities need to deposit
    uint256 public minimumStake = 1 ether;
    address masterAddress;

    constructor(address _masterAddress, address _factoryContractAddress) {
        masterAddress = _masterAddress;
    }

    modifier onlyOwner {
        require(masterAddress == msg.sender, "Only owner");
        _;
    }
    modifier onlyCertificateAuthority {
        require(
            certificateAuthorities[msg.sender].isValue == true,
            "Only a certificate authority is allowed"
        );
        _;
    }

    function setMinimumStake(uint256 _stake) public onlyOwner {
        minimumStake = _stake;
    }

    function createCertificateAuthority(string memory _name) public {
        require(
            certificateAuthorities[msg.sender].isValue == false,
            "This address alredy has a certificate authority"
        );
        certificateAuthorities[msg.sender].name = _name;
        certificateAuthorities[msg.sender].owner = msg.sender;
        certificateAuthorities[msg.sender].isValue = true;
        emit CertificateAuthorityCreated(msg.sender);
    }

    function createCertificate(string memory _name, string memory _description)
        public
        onlyCertificateAuthority
    {
        authorityCertificates[codeCounter].name = _name;
        authorityCertificates[codeCounter].description = _description;
        authorityCertificates[codeCounter].certificateAuthority = msg.sender;
        authorityCertificates[codeCounter].code = codeCounter;
        emit CertificateAuthorityCertificateCreated(msg.sender, codeCounter);
        codeCounter++;
    }
}
