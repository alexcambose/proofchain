// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;
import "./Certifiable.sol";
import "./Shipper.sol";

contract Company is Certifiable, Shipper {
    event CompanyCreate(address indexed owner);
    event CompanyAssignedCertificate(
        address indexed certificateAuthority,
        uint256 indexed certificateCode,
        address indexed companyAddress,
        uint256 certificateInstanceId
    );
    event CompanyCanceledCertificate(
        address indexed certificateAuthority,
        uint256 indexed certificateCode,
        address indexed companyAddress,
        uint256 certificateInstanceId
    );
    event CompanyRevokedCertificate(
        address indexed certificateAuthority,
        uint256 indexed certificateCode,
        address indexed companyAddress,
        uint256 certificateInstanceId
    );

    enum EntityTypeEnum {MANUFACTURER, LOGISTIC, WAREHOUSE, RETAILER}
    struct CompanyInfo {
        EntityTypeEnum entityType;
        string name;
        uint256[] certificateInstanceIds;
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

    /**
     * Creates a new company
     *
     * @param _name Company name
     * @param _entityType Company entity type
     */
    function create(string memory _name, EntityTypeEnum _entityType) public doesNotHaveCompany {
        address sender = msg.sender;
        companies[sender].name = _name;
        companies[sender].entityType = _entityType;
        companies[sender].isValue = true;
        emit CompanyCreate(sender);
    }

    /**
     * Retrieves a company by address
     *
     * @param _addr Company account address
     * @return Company information
     */
    function getCompany(address _addr) public view returns (CompanyInfo memory) {
        return companies[_addr];
    }

    /**
     * Assigns a certificate to a company
     *
     * @param _certificateCode The certificate code
     * @param _company The company to be assigned to
     */
    function assignCertificate(uint256 _certificateCode, address _company) public payable {
        super.assignCertificate(_certificateCode);
        for (uint256 i = 0; i < companies[_company].certificateInstanceIds.length; i++) {
            if (
                certificateInstances[companies[_company].certificateInstanceIds[i]].code ==
                _certificateCode
            ) {
                revert("Can not assign the same certificate twice");
            }
        }
        CertificateInstance memory ci =
            CertificateInstance({code: _certificateCode, stake: msg.value});

        companies[_company].certificateInstanceIds.push(certificateInstanceId);
        certificateInstances[certificateInstanceId] = ci;
        emit CompanyAssignedCertificate(
            msg.sender,
            _certificateCode,
            _company,
            certificateInstanceId
        );
        certificateInstanceId++;
    }

    /**
     * Cancels a certificate for a company
     *
     * @param _certificateCode The certificate code
     * @param _company The target company
     */
    function cancelCertificate(uint256 _certificateCode, address _company) public {
        address certificateAuthorityFromContract = super.cancelCertificate(_certificateCode);
        uint256 length = companies[_company].certificateInstanceIds.length;
        uint8 i;
        uint256 certificateInstanceId;
        for (i = 0; i < length; i++) {
            if (
                certificateInstances[companies[_company].certificateInstanceIds[i]].code ==
                _certificateCode
            ) {
                payable(certificateAuthorityFromContract).transfer(
                    certificateInstances[companies[_company].certificateInstanceIds[i]].stake
                );
                certificateInstanceId = companies[_company].certificateInstanceIds[i];
                companies[_company].certificateInstanceIds[i] = companies[_company]
                    .certificateInstanceIds[length - 1];
                companies[_company].certificateInstanceIds.pop();
            }
        }
        if (i == length - 1) {
            revert("Certificate code not found");
        }
        emit CompanyCanceledCertificate(
            msg.sender,
            _certificateCode,
            _company,
            certificateInstanceId
        );
    }

    /**
     * Revokes a certificate from a company
     *
     * @param _certificateCode The certificate code
     * @param _company The target company
     */
    function revokeCertificate(uint256 _certificateCode, address _company) public {
        super.revokeCertificate();
        uint256 length = companies[_company].certificateInstanceIds.length;
        uint8 i;
        uint256 certificateInstanceId;
        for (i = 0; i < length; i++) {
            if (
                certificateInstances[companies[_company].certificateInstanceIds[i]].code ==
                _certificateCode
            ) {
                certificateInstanceId = companies[_company].certificateInstanceIds[i];
                companies[_company].certificateInstanceIds[i] = companies[_company]
                    .certificateInstanceIds[length - 1];
                companies[_company].certificateInstanceIds.pop();
            }
        }
        if (i == length - 1) {
            revert("Certificate code not found");
        }
        emit CompanyRevokedCertificate(
            msg.sender,
            _certificateCode,
            _company,
            certificateInstanceId
        );
    }

    /**
     * Get a certificate instance assigned to a company
     * @param _company Company address where the certificate is assigned
     * @param _code Certificate code
     * @return Certificate instance
     */
    function getCompanyCertificateInstance(address _company, uint256 _code)
        public
        view
        returns (CertificateInstance memory)
    {
        for (uint256 i = 0; i < companies[_company].certificateInstanceIds.length; i++) {
            if (certificateInstances[companies[_company].certificateInstanceIds[i]].code == _code) {
                return certificateInstances[companies[_company].certificateInstanceIds[i]];
            }
        }
        // revert("Certificate with code is not assigned");
    }

    /**
     * Get the ids of all certificates assigned to a company
     * @param _company Company address where the certificates are assigned
     * @return Certificate instance
     */
    function getCompanyCertificatesInstanceIds(address _company)
        public
        view
        returns (uint256[] memory)
    {
        return companies[_company].certificateInstanceIds;
    }
}
