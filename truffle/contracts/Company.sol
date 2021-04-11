// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;
import "./Certifiable.sol";
import "./Shipper.sol";

contract Company is Certifiable, Shipper {
    event CompanyCreate(address indexed owner);
    enum EntityTypeEnum {MANUFACTURER, LOGISTIC, WAREHOUSE, RETAILER}
    struct CompanyInfo {
        EntityTypeEnum entityType;
        string name;
        CertificateInstance[] certificates;
        bool isValue;
    }
    mapping(address => CompanyInfo) public companies;

    modifier doesNotHaveCompany {
        require(companies[msg.sender].isValue == false, "Address already has a company");
        _;
    }

    constructor(address _masterAddress, address _factoryContractAddress)
        Ownable(_masterAddress, _factoryContractAddress)
    {}

    function create(string memory _name, EntityTypeEnum _entityType) public doesNotHaveCompany {
        address sender = msg.sender;
        companies[sender].name = _name;
        companies[sender].entityType = _entityType;
        companies[sender].isValue = true;
        emit CompanyCreate(sender);
    }

    function getCompany(address _addr) public view returns (CompanyInfo memory) {
        return companies[_addr];
    }

    function assignCertificate(uint256 _certificateCode, address _company) public payable {
        super.assignCertificate(_certificateCode);

        CertificateInstance memory ci =
            CertificateInstance({code: _certificateCode, stake: msg.value});

        companies[_company].certificates.push(ci);
    }

    function cancelCertificate(uint256 _certificateCode, address _company) public {
        super.cancelCertificate(_certificateCode);
        uint256 length = companies[_company].certificates.length;
        uint8 i;
        for (i = 0; i < length; i++) {
            if (companies[_company].certificates[i].code == _certificateCode) {
                companies[_company].certificates[i] = companies[_company].certificates[length - 1];
                delete companies[_company].certificates[length - 1];
            }
        }
        if (i == length - 1) {
            revert("Certificate code not found");
        }
    }

    function revokeCertificate(uint256 _certificateCode, address _company) public {
        super.revokeCertificate();
        uint256 length = companies[_company].certificates.length;
        uint8 i;
        for (i = 0; i < length; i++) {
            if (companies[_company].certificates[i].code == _certificateCode) {
                companies[_company].certificates[i] = companies[_company].certificates[length - 1];
                // payable(certificateAuthorityManagerAddress).transfer(
                //     100000000000000000
                // );
                delete companies[_company].certificates[length - 1];
            }
        }
        if (i == length - 1) {
            revert("Certificate code not found");
        }
    }

    function getCompanyCertificate(address _company)
        public
        view
        returns (CertificateInstance memory)
    {
        return companies[_company].certificates[companies[_company].certificates.length - 1];
    }

    function getCompanyCertificate(address _company, uint256 _index)
        public
        view
        returns (CertificateInstance memory)
    {
        return companies[_company].certificates[_index];
    }
}
