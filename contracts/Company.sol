// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;
import "./Certifiable.sol";

contract Company is Certifiable {
    enum EntityTypeEnum {MANUFACTURER, LOGISTIC, WAREHOUSE, RETAILER}
    struct CertificateInstance {
        uint256 code;
        uint256 time;
        uint256 stake;
    }
    struct CompanyInfo {
        EntityTypeEnum entityType;
        string name;
        CertificateInstance[] certificates;
        bool isValue;
    }
    mapping(address => CompanyInfo) public companies;

    modifier doesNotHaveCompany {
        require(
            companies[msg.sender].isValue == false,
            "Address already has a company"
        );
        _;
    }

    constructor(address _masterAddress, address _factoryContractAddress)
        Ownable(_masterAddress, _factoryContractAddress)
    {}

    function create(string memory _name, EntityTypeEnum _entityType) public {
        address sender = msg.sender;
        companies[sender].name = _name;
        companies[sender].entityType = _entityType;
        companies[sender].isValue = true;
    }

    function getCompany(address _addr)
        public
        view
        returns (CompanyInfo memory)
    {
        return companies[_addr];
    }

    function cancelCertificate(uint256 _certificateCode, address _company)
        public
    {
        // super.cancelCertificate(_certificateCode, _company);
        // uint256 length = materialToken[_itemIdentifier].certificates.length;
        // uint8 i;
        // for (i = 0; i < length; i++) {
        //     if (
        //         materialToken[_itemIdentifier].certificates[i].code ==
        //         _certificateCode
        //     ) {
        //         materialToken[_itemIdentifier].certificates[i] = materialToken[
        //             _itemIdentifier
        //         ]
        //             .certificates[length - 1];
        //         delete materialToken[_itemIdentifier].certificates[length - 1];
        //     }
        // }
        // if (i == length - 1) {
        //     revert("Certificate code not found");
        // }
    }

    /*
     */
    function revokeCertificate(uint256 _certificateCode, address _company)
        public
    {
        //     super.revokeCertificate(_certificateCode, _itemIdentifier);
        //     uint256 length = materialToken[_itemIdentifier].certificates.length;
        //     uint8 i;
        //     for (i = 0; i < length; i++) {
        //         if (
        //             materialToken[_itemIdentifier].certificates[i].code ==
        //             _certificateCode
        //         ) {
        //             materialToken[_itemIdentifier].certificates[i] = materialToken[
        //                 _itemIdentifier
        //             ]
        //                 .certificates[length - 1];
        //             emit T(
        //                 certificateAuthorityManagerAddress,
        //                 materialToken[_itemIdentifier].certificates[length - 1]
        //                     .stake,
        //                 address(this).balance,
        //                 true
        //             );
        //             // payable(certificateAuthorityManagerAddress).transfer(
        //             //     100000000000000000
        //             // );
        //             delete materialToken[_itemIdentifier].certificates[length - 1];
        //         }
        //     }
        //     if (i == length - 1) {
        //         revert("Certificate code not found");
        //     }
    }
}
