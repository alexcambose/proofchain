// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import './utils/Ownable.sol';

// import "./utils/MaterialReferencer.sol";

contract CertificateAuthorityManager {
    event CertificateAuthorityCreated(address indexed owner);
    event CertificateAuthorityCertificateCreated(address indexed owner, uint256 indexed code);
    struct Certificate {
        string title;
        // unique certificate code, used to assign a specific certificate code to a material/company
        address certificateAuthority;
    }
    struct CertificateAuthority {
        string name;
        bool disabled;
        // true if this certificate authority is set
        bool isValue;
    }
    // address => [code => certificate]
    mapping(uint256 => Certificate) public authorityCertificates;
    uint256[] public authorityCertificatesCodes;
    mapping(address => CertificateAuthority) public certificateAuthorities;
    address[] certificateAuthoritiesAddress;
    // minimum stake the certificate authorities need to deposit
    uint256 public minimumStake = 1 ether;

    constructor(address _masterAddress, address _factoryContractAddress) {}

    function setMinimumStake(uint256 _stake) public {
        minimumStake = _stake;
    }

    function createCertificateAuthority(string memory _name) public {
        certificateAuthoritiesAddress.push(msg.sender);
        certificateAuthorities[msg.sender].name = _name;
        certificateAuthorities[msg.sender].isValue = true;
        emit CertificateAuthorityCreated(msg.sender);
    }

    function createCertificate(string memory _title, uint256 _code) public {
        require(
            authorityCertificates[_code].certificateAuthority == address(0),
            'This certificate already exists. You can not override this'
        );
        authorityCertificatesCodes.push(_code);
        authorityCertificates[_code].title = _title;
        authorityCertificates[_code].certificateAuthority = msg.sender;
        emit CertificateAuthorityCertificateCreated(msg.sender, _code);
    }
}
