## `Company`





### `doesNotHaveCompany()`






### `constructor(address _masterAddress, address _factoryContractAddress)` (public)





### `create(string _name, enum Company.EntityTypeEnum _entityType)` (public)

Creates a new company





### `getCompany(address _addr) → struct Company.CompanyInfo` (public)

Retrieves a company by address





### `assignCertificate(uint256 _certificateCode, address _company)` (public)

Assigns a certificate to a company





### `cancelCertificate(uint256 _certificateCode, address _company)` (public)

Cancels a certificate for a company





### `revokeCertificate(uint256 _certificateCode, address _company)` (public)

Revokes a certificate from a company





### `getCompanyCertificateInstance(address _company, uint256 _code) → struct Certifiable.CertificateInstance` (public)

Get a certificate instance assigned to a company




### `getCompanyCertificatesInstanceIds(address _company) → uint256[]` (public)

Get the ids of all certificates assigned to a company





### `CompanyCreate(address owner)`





### `CompanyAssignedCertificate(address certificateAuthority, uint256 certificateCode, address companyAddress, uint256 certificateInstanceId)`





### `CompanyCanceledCertificate(address certificateAuthority, uint256 certificateCode, address companyAddress, uint256 certificateInstanceId)`





### `CompanyRevokedCertificate(address certificateAuthority, uint256 certificateCode, address companyAddress, uint256 certificateInstanceId)`





