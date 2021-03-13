// SPDX-License-Identifier: MIT

// File: contracts/Aggregator.sol

pragma solidity >0.7.0 <0.9.0;

contract Aggregator {
    address public companyContractAddress;
    address public materialContractAddress;
    address public certificateAuthorityManagerContractAddress;
    address public masterAddress;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner!");
        _;
    }

    function setContracts(
        address _masterAddress,
        address _companyContractAddress,
        address _materialContractAddress,
        address _certificateAuthorityManagerContractAddress
    ) public onlyOwner {
        masterAddress = _masterAddress;
        companyContractAddress = _companyContractAddress;
        materialContractAddress = _materialContractAddress;
        certificateAuthorityManagerContractAddress = _certificateAuthorityManagerContractAddress;
    }
}

// File: contracts/MaterialBase.sol

pragma solidity >0.7.0 <0.9.0;

contract MaterialBase {
    event MaterialCreate(address indexed company, uint256 indexed materialTokenId);
    event MaterialTransfer(address indexed from, address indexed to, uint256 value);
    event BatchCreate(address indexed company, uint256 indexed batchId);
    // amount is only specified on burn
    event BatchTransfer(
        address indexed from,
        address indexed to,
        uint256 indexed batchId,
        uint256 amount
    );
    event T(address data1, uint256 data2, uint256 data3, bool data4);
    struct CertificateInstance {
        uint256 code;
        uint256 time;
        uint256 stake;
    }
    struct MaterialTokenInfo {
        // a basic name for the material
        string name;
        // a real-life identification code, see https://www.gs1.org/standards/id-keys/gtin
        uint256 code;
        // the address of the creator, the creator must own a company
        address creator;
        // certificates
        CertificateInstance[] certificates;
        uint256 certificatesLength;
        // ipfs images hash
        string[] images;
        // mapping from (tokenID -> amount of the amount identifier)
        uint256[] recipematerialTokenId;
        uint256[] recipeMaterialAmount;
        // amount identifier (kg, grams)
        string amountIdentifier;
        bool isValue;
    }
    struct BatchInfo {
        string code;
        uint256 materialTokenId;
        uint256 materialTokenAmount;
        address owner;
        bool isValue;
    }
    // Mapping from TokenID to address balances
    mapping(uint256 => mapping(address => uint256)) balance;
    // all tokens, (materialTokenId => MaterialTokenInfo)
    // materialTokenId uniquely identifies a product
    uint256 public materialTokenId = 0;
    mapping(uint256 => MaterialTokenInfo) public materialToken;

    // all batches associated with an address (address => batchId[])
    mapping(address => uint256[]) public addressBatches;
    // all batchId associated with a batch
    mapping(uint256 => BatchInfo) public batch;
    uint256 public batchId = 0;

    modifier senderIsTokenCreator(uint256 _materialTokenId) {
        require(msg.sender == materialToken[_materialTokenId].creator);
        _;
    }

    function getBalance(uint256 _tokenID, address _address) public view returns (uint256) {
        return balance[_tokenID][_address];
    }

    function getMaterialCertificate(uint256 _materialTokenId, uint256 _index)
        public
        view
        returns (CertificateInstance memory)
    {
        return materialToken[_materialTokenId].certificates[_index];
    }

    // function getBatchById(uint256 _batchId)
    //     public
    //     view
    //     returns (BatchInfo memory)
    // {
    //     return batch[_batchId];
    // }
}

// File: contracts/utils/Math.sol

pragma solidity ^0.8.0;

/**
 * @dev Standard math utilities missing in the Solidity language.
 */
library Math {
    /**
     * @dev Returns the largest of two numbers.
     */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
    }

    /**
     * @dev Returns the smallest of two numbers.
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    /**
     * @dev Returns the average of two numbers. The result is rounded towards
     * zero.
     */
    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b) / 2 can overflow, so we distribute
        return (a / 2) + (b / 2) + (((a % 2) + (b % 2)) / 2);
    }
}

// File: contracts/utils/Ownable.sol

pragma solidity >0.7.0 <0.9.0;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable {
    address private _owner;
    address public _aggregator;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor(address _masterAddress, address _aggregator_) {
        _aggregator = _aggregator_;
        address msgSender = _masterAddress;
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current aggregator.
     */
    function aggregator() public view virtual returns (address) {
        return _aggregator;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

// File: contracts/CertificateAuthorityManager.sol

pragma solidity >0.7.0 <0.9.0;

// import "./utils/MaterialReferencer.sol";

contract CertificateAuthorityManager {
    event CertificateAuthorityCreated(address indexed owner);
    event CertificateAuthorityCertificateCreated(address indexed owner, uint256 indexed code);
    struct Certificate {
        string name;
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

    function createCertificate(string memory _name, uint256 _code) public {
        require(
            authorityCertificates[_code].certificateAuthority == address(0),
            "This certificate already exists. You can not override this"
        );
        authorityCertificatesCodes.push(_code);
        authorityCertificates[_code].name = _name;
        authorityCertificates[_code].certificateAuthority = msg.sender;
        emit CertificateAuthorityCertificateCreated(msg.sender, _code);
    }
}

// File: contracts/utils/CertificateAuthorityManagerReferencer.sol

pragma solidity >0.7.0 <0.9.0;

abstract contract CertificateAuthorityManagerReferencer is Ownable {
    CertificateAuthorityManager internal certificateAuthorityManager;
    address public certificateAuthorityManagerAddress;

    function getCertificateAuthorityManagerContract() public returns (CertificateAuthorityManager) {
        if (certificateAuthorityManagerAddress == address(0)) {
            certificateAuthorityManagerAddress = Aggregator(aggregator())
                .certificateAuthorityManagerContractAddress();
            certificateAuthorityManager = CertificateAuthorityManager(
                certificateAuthorityManagerAddress
            );
            return certificateAuthorityManager;
        }
        return certificateAuthorityManager;
    }

    function getMasterAddress() public view returns (address) {
        return Aggregator(aggregator()).masterAddress();
    }
}

// File: contracts/Certifiable.sol

pragma solidity >0.7.0 <0.9.0;

abstract contract Certifiable is CertificateAuthorityManagerReferencer {
    function assignCertificate(uint256 _certificateCode) public payable {
        CertificateAuthorityManager cam = getCertificateAuthorityManagerContract();
        (, address certificateAuthority) = cam.authorityCertificates(_certificateCode);

        require(
            certificateAuthority == msg.sender,
            "You need to be the owner of the certificate authority in order to assign it"
        );
        require(
            msg.value >= cam.minimumStake(),
            "Received payment is lower that the minimum stake"
        );
    }

    function cancelCertificate(uint256 _certificateCode) public {
        CertificateAuthorityManager cam = getCertificateAuthorityManagerContract();
        (, address certificateAuthority) = cam.authorityCertificates(_certificateCode);

        require(
            certificateAuthority == msg.sender,
            "You need to be the owner of the certificate authority in order to assign it"
        );
    }

    function revokeCertificate() public view {
        require(
            getMasterAddress() == msg.sender,
            "You need to be the owner of the factory in order to revoke it"
        );
    }
}

// File: contracts/Material.sol

pragma solidity >0.7.0 <0.9.0;

contract Material is Certifiable, MaterialBase {
    using Math for uint256;

    constructor(address _masterAddress, address _factoryContractAddress)
        Ownable(_masterAddress, _factoryContractAddress)
    {}

    function create(
        string memory _name,
        uint256 _code,
        string[] memory _images
    ) public {
        materialToken[materialTokenId].name = _name;
        materialToken[materialTokenId].code = _code;
        materialToken[materialTokenId].images = _images;
        materialToken[materialTokenId].creator = msg.sender;
        materialToken[materialTokenId].isValue = true;
        emit MaterialCreate(msg.sender, materialTokenId);
        materialTokenId++;
    }

    function create(
        string memory _name,
        uint256 _code,
        string[] memory _images,
        uint256[] memory _recipematerialTokenId,
        uint256[] memory _recipeMaterialAmount
    ) public {
        require(
            _recipematerialTokenId.length == _recipeMaterialAmount.length,
            "Arrays must be the same length"
        );
        materialToken[materialTokenId].recipematerialTokenId = _recipematerialTokenId;
        materialToken[materialTokenId].recipeMaterialAmount = _recipeMaterialAmount;
        create(_name, _code, _images);
    }

    function mint(uint256 _tokenID, uint256 _amount) public senderIsTokenCreator(_tokenID) {
        require(
            materialToken[_tokenID].recipematerialTokenId.length == 0,
            "You need to specify the required products"
        );

        address companyAddress = materialToken[_tokenID].creator;
        balance[_tokenID][msg.sender] += _amount;
        emit MaterialTransfer(address(0), companyAddress, _amount);
    }

    function mint(
        uint256 _tokenID,
        uint256 _amount,
        uint256[] memory _batchesId,
        uint256[] memory _batchesAmount
    ) public senderIsTokenCreator(_tokenID) {
        // specified pairs must be of the same length
        require(_batchesId.length == _batchesAmount.length, "Arrays must be the same length");
        // the material token that we want to mint is a compound token
        require(
            materialToken[_tokenID].recipematerialTokenId.length != 0,
            "The token does not need additional ingredients"
        );
        // specified batches must be at least the same length of the material token recipe
        require(
            materialToken[_tokenID].recipematerialTokenId.length <= _batchesId.length,
            "Not enough ingredients provided"
        );

        address companyAddress = materialToken[_tokenID].creator;

        for (uint8 amountIndex = 0; amountIndex < _amount; amountIndex++) {
            uint256[] memory recipeMaterialsAmount = materialToken[_tokenID].recipeMaterialAmount;
            uint256 recipeMaterialsAmountUnusedLength = recipeMaterialsAmount.length;
            for (uint8 i = 0; i < materialToken[_tokenID].recipematerialTokenId.length; i++) {
                for (uint8 j = 0; j < _batchesId.length; j++) {
                    require(
                        batch[_batchesId[j]].materialTokenAmount >= _batchesAmount[j],
                        "Invalid batch amount specification"
                    );

                    if (
                        // same ids
                        batch[_batchesId[j]].materialTokenId ==
                        materialToken[_tokenID].recipematerialTokenId[i] &&
                        // there is still a neeed for required material
                        recipeMaterialsAmount[i] != 0 &&
                        // the specified available amount for the current batch is > 0
                        _batchesAmount[j] != 0 &&
                        // the actual batch has enougn materials
                        batch[_batchesId[j]].materialTokenAmount > 0
                    ) {
                        uint256 toBeBurned = recipeMaterialsAmount[i].min(_batchesAmount[j]);
                        // remove products from existing batches
                        burnBatchToken(_batchesId[j], toBeBurned);
                        _batchesAmount[j] -= toBeBurned;

                        recipeMaterialsAmount[i] -= toBeBurned;
                        if (recipeMaterialsAmount[i] == 0) {
                            recipeMaterialsAmountUnusedLength--;
                        }
                    }
                }
            }
            // final check to see if all products were used
            require(recipeMaterialsAmountUnusedLength == 0, "Could not satisfy all requirements");
        }
        balance[_tokenID][msg.sender] += _amount;
        emit MaterialTransfer(address(0), companyAddress, _amount);
    }

    function createBatch(
        string memory _code,
        uint256 _tokenID,
        uint256 _amount
    ) public {
        require(
            balance[_tokenID][msg.sender] >= _amount,
            "You do not have enough materials to create this batch"
        );
        balance[_tokenID][msg.sender] -= _amount;
        // create instance
        BatchInfo memory batchInfo =
            BatchInfo({
                code: _code,
                materialTokenId: _tokenID,
                materialTokenAmount: _amount,
                isValue: true,
                owner: msg.sender
            });
        batch[batchId] = batchInfo;
        addressBatches[msg.sender].push(batchId);
        emit BatchCreate(msg.sender, batchId);
        batchId++;
    }

    function burnBatchToken(uint256 _batchId, uint256 _amount) public {
        require(_amount > 0, "Amount needs to be bigger than 0");
        require(batch[_batchId].materialTokenAmount >= _amount, "Amount not available");

        batch[_batchId].materialTokenAmount -= _amount;
        if (batch[_batchId].materialTokenAmount == 0) {}
        emit BatchTransfer(msg.sender, address(0), batchId, _amount);
    }

    function assignCertificate(uint256 _certificateCode, uint256 _itemIdentifier) public payable {
        super.assignCertificate(_certificateCode);

        CertificateInstance memory ci =
            CertificateInstance({code: _certificateCode, time: block.timestamp, stake: msg.value});

        materialToken[_itemIdentifier].certificates.push(ci);
    }

    function cancelCertificate(uint256 _certificateCode, uint256 _itemIdentifier) public {
        super.cancelCertificate(_certificateCode);
        uint256 length = materialToken[_itemIdentifier].certificates.length;
        uint8 i;
        for (i = 0; i < length; i++) {
            if (materialToken[_itemIdentifier].certificates[i].code == _certificateCode) {
                materialToken[_itemIdentifier].certificates[i] = materialToken[_itemIdentifier]
                    .certificates[length - 1];
                delete materialToken[_itemIdentifier].certificates[length - 1];
            }
        }
        if (i == length - 1) {
            revert("Certificate code not found");
        }
    }

    /*
     */
    function revokeCertificate(uint256 _certificateCode, uint256 _itemIdentifier) public {
        super.revokeCertificate();
        uint256 length = materialToken[_itemIdentifier].certificates.length;
        uint8 i;
        for (i = 0; i < length; i++) {
            if (materialToken[_itemIdentifier].certificates[i].code == _certificateCode) {
                materialToken[_itemIdentifier].certificates[i] = materialToken[_itemIdentifier]
                    .certificates[length - 1];
                emit T(
                    certificateAuthorityManagerAddress,
                    materialToken[_itemIdentifier].certificates[length - 1].stake,
                    address(this).balance,
                    true
                );
                // payable(certificateAuthorityManagerAddress).transfer(
                //     100000000000000000
                // );
                delete materialToken[_itemIdentifier].certificates[length - 1];
            }
        }
        if (i == length - 1) {
            revert("Certificate code not found");
        }
    }

    function changeBatchOwnershipBatch(uint256[] memory _batchIds, address _newOwner) public {
        for (uint8 i = 0; i < _batchIds.length; i++) {
            batch[_batchIds[i]].owner = _newOwner;
        }
    }
}

// File: contracts/utils/MaterialReferencer.sol

pragma solidity >0.7.0 <0.9.0;

abstract contract MaterialReferencer is Ownable {
    Material internal material;
    address internal materialAddress;

    function getMaterialContract() public returns (Material) {
        if (materialAddress == address(0)) {
            materialAddress = Aggregator(aggregator()).materialContractAddress();
            material = Material(materialAddress);
            return material;
        }
        return material;
    }
}

// File: contracts/Shipper.sol

pragma solidity >0.7.0 <0.9.0;

abstract contract Shipper is MaterialReferencer {
    event TransportInitiated(uint256 indexed _transportId);
    event TransportTransit(uint256 _transportId, bool _inTransit);
    event TransportFinalised(uint256 _transportId);

    struct TransportInfo {
        // sender company
        address sender;
        address receiver;
        address transportCompany;
        uint256[] batchIds;
        uint256 value;
        bool readyForShipment;
        bool inTransit;
        bool finalised;
        string hashedPassword;
    }
    event T(address a, address b);
    TransportInfo[] public transports;
    uint256 public transportId = 0;
    modifier batchesOwner(uint256[] memory _batchIds) {
        for (uint8 i = 0; i < _batchIds.length; i++) {
            (, , , address batchIdOwner, ) = getMaterialContract().batch(_batchIds[i]);
            if (batchIdOwner != msg.sender) {
                revert("You are not the owner of all batches");
            }
        }
        _;
    }

    modifier onlyTransportCompany(uint256 _transportId) {
        emit T(transports[_transportId].transportCompany, msg.sender);
        // require(
        //     transports[_transportId].transportCompany == msg.sender,
        //     "Only the transport company is allowed"
        // );
        _;
    }
    modifier onlyReceiver(uint256 _transportId) {
        require(
            transports[_transportId].receiver == msg.sender,
            "Only the transport receiver is allowed"
        );
        _;
    }
    modifier onlyNotFinalizedTransport(uint256 _transportId) {
        require(transports[_transportId].finalised == false, "This transport is finalized");
        _;
    }

    // The sender calls this
    function initiateTransport(
        address _receiver,
        address _transportCompany,
        uint256[] memory _batchIds
    ) public batchesOwner(_batchIds) {
        require(msg.sender != _receiver, "Cannot initiate a transport to yourself");

        TransportInfo memory ti =
            TransportInfo({
                sender: msg.sender,
                receiver: _receiver,
                transportCompany: _transportCompany,
                batchIds: _batchIds,
                value: 0,
                readyForShipment: false,
                inTransit: false,
                finalised: false,
                hashedPassword: ""
            });
        transports.push(ti);
        emit TransportInitiated(transports.length - 1);
    }

    function initiateTransport(
        address _receiver,
        address _transportCompany,
        uint256[] memory _batchIds,
        string memory _hashedPassword
    ) public batchesOwner(_batchIds) {
        initiateTransport(_receiver, _transportCompany, _batchIds);
        transports[transports.length - 1].hashedPassword = _hashedPassword;
    }

    function setTransit(uint256 _transportId, bool _transitValue)
        public
        onlyTransportCompany(_transportId)
        onlyNotFinalizedTransport(_transportId)
    {
        transports[_transportId].inTransit = _transitValue;
        emit TransportTransit(_transportId, _transitValue);
    }

    function finaliseTransport(uint256 _transportId) public onlyReceiver(_transportId) {
        require(
            bytes(transports[_transportId].hashedPassword).length == 0,
            "This transport can not be finalised without a password"
        );
        transports[_transportId].finalised = true;
        getMaterialContract().changeBatchOwnershipBatch(
            transports[_transportId].batchIds,
            transports[_transportId].receiver
        );
        emit TransportFinalised(_transportId);
    }

    function finaliseTransport(uint256 _transportId, string memory _hashedPassword)
        public
        onlyReceiver(_transportId)
    {
        require(
            (keccak256(abi.encodePacked((transports[_transportId].hashedPassword))) ==
                keccak256(abi.encodePacked((_hashedPassword)))),
            "Incorrect password"
        );
        transports[_transportId].finalised = true;
        getMaterialContract().changeBatchOwnershipBatch(
            transports[_transportId].batchIds,
            transports[_transportId].receiver
        );
        emit TransportFinalised(_transportId);
    }
}

// File: contracts/Company.sol

pragma solidity >0.7.0 <0.9.0;

contract Company is Certifiable, Shipper {
    event CompanyCreate(address indexed owner);
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
        require(companies[msg.sender].isValue == false, "Address already has a company");
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
        emit CompanyCreate(sender);
    }

    function getCompany(address _addr) public view returns (CompanyInfo memory) {
        return companies[_addr];
    }

    function assignCertificate(uint256 _certificateCode, address _company) public payable {
        super.assignCertificate(_certificateCode);

        CertificateInstance memory ci =
            CertificateInstance({code: _certificateCode, time: block.timestamp, stake: msg.value});

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

// File: contracts/Factory.sol

pragma solidity >0.7.0 <0.9.0;

contract Factory {
    address public aggregator;
    address public masterAddress;

    constructor() {
        masterAddress = msg.sender;
        Aggregator aggregatorContract = new Aggregator();
        aggregator = address(aggregatorContract);

        Company company = new Company(masterAddress, aggregator);
        address companyContractAddress = address(company);
        Material materialContract = new Material(masterAddress, aggregator);
        address materialContractAddress = address(materialContract);
        CertificateAuthorityManager certificateAuthorityManager =
            new CertificateAuthorityManager(masterAddress, aggregator);
        address certificateAuthorityManagerContractAddress = address(certificateAuthorityManager);

        aggregatorContract.setContracts(
            masterAddress,
            companyContractAddress,
            materialContractAddress,
            certificateAuthorityManagerContractAddress
        );
    }
}
