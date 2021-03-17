// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./MaterialBase.sol";
import "./utils/Math.sol";
import "./utils/CompanyOwnable.sol";
import "./utils/CertificateAuthorityManagerReferencer.sol";
import "./Certifiable.sol";

contract Material is Certifiable, MaterialBase, CompanyOwnable {
    using Math for uint256;

    constructor(address _masterAddress, address _factoryContractAddress)
        Ownable(_masterAddress, _factoryContractAddress)
    {}

    /**
    Create a new raw material token info
     */
    function create(
        string memory _name,
        string memory _code,
        string memory _amountIdentifier,
        string[] memory _images
    ) public senderHasCompany {
        materialToken[materialTokenId].materialTokenId = materialTokenId;
        materialToken[materialTokenId].name = _name;
        materialToken[materialTokenId].code = _code;
        materialToken[materialTokenId].amountIdentifier = _amountIdentifier;
        materialToken[materialTokenId].images = _images;
        materialToken[materialTokenId].creator = msg.sender;
        materialToken[materialTokenId].isValue = true;
        emit MaterialCreate(msg.sender, materialTokenId);
        materialTokenId++;
    }

    /**
    Create a new compound material token info
     */
    function create(
        string memory _name,
        string memory _code,
        string memory _amountIdentifier,
        string[] memory _images,
        uint256[] memory _recipeMaterialTokenId,
        uint256[] memory _recipeMaterialAmount
    ) public senderHasCompany {
        require(
            _recipeMaterialTokenId.length == _recipeMaterialAmount.length,
            "Arrays must be the same length"
        );
        materialToken[materialTokenId].recipeMaterialTokenId = _recipeMaterialTokenId;
        materialToken[materialTokenId].recipeMaterialAmount = _recipeMaterialAmount;
        create(_name, _code, _amountIdentifier, _images);
    }

    /**
    Mint a new raw material 
     */
    function mint(uint256 _tokenID, uint256 _amount) public senderIsTokenCreator(_tokenID) {
        require(
            materialToken[_tokenID].isValue == true,
            "Can not mint a material that does not exist"
        );
        require(
            materialToken[_tokenID].recipeMaterialTokenId.length == 0,
            "You need to specify the required products"
        );

        address companyAddress = materialToken[_tokenID].creator;
        for (uint256 i = 0; i < _amount; i++) {
            MaterialInfo memory mi;
            mi.uuid = materialUuidGenerator++;
            mi.materialTokenId = _tokenID;
            balance[_tokenID][msg.sender].push(mi.uuid);
            uuidMaterialInfo[mi.uuid] = mi;
            emit MaterialTransfer(address(0), companyAddress,_tokenID, mi.uuid);
        }
    }

    /*
    Mints a compound material
    */
    function mint(
        uint256 _tokenID, // material to be minted
        uint256[] memory _batchesId,
        uint256[][] memory _batchesMaterialsUuid
    ) public senderIsTokenCreator(_tokenID) {
        // specified pairs must be of the same length
        require(
            _batchesId.length == _batchesMaterialsUuid.length,
            "Arrays must be the same length"
        );
        // the material token that we want to mint is a compound token
        require(
            materialToken[_tokenID].recipeMaterialTokenId.length != 0,
            "The token does not need additional ingredients"
        );
        // specified batches must be at least the same length of the material token recipe
        require(
            materialToken[_tokenID].recipeMaterialTokenId.length <= _batchesId.length,
            "Not enough ingredients provided"
        );
        //ok
        address companyAddress = materialToken[_tokenID].creator;

        MaterialInfo memory mi =
            MaterialInfo({
                materialTokenId: _tokenID,
                uuid: materialUuidGenerator++,
                fromBatchId: new uint256[](0),
                batchMaterialsUuid: new uint256[][](0)
            });
        uuidMaterialInfo[mi.uuid] = mi;
        // uint256[] memory recipeMaterialsAmount = materialToken[_tokenID].recipeMaterialAmount;
        // uint256 recipeMaterialsAmountUnusedLength = recipeMaterialsAmount.length;
        // for each recipe item
        for (uint8 i = 0; i < materialToken[_tokenID].recipeMaterialTokenId.length; i++) {
            // for each batch
            for (uint8 j = 0; j < _batchesId.length; j++) {
                // require(
                //     batch[_batchesId[j]].materialTokenAmount >= _batchesAmount[j],
                //     "Invalid batch amount specification"
                // );
                // find the batch with the correct recipe item
                if (
                    // same materialTokenIds
                    batch[_batchesId[j]].materialTokenId ==
                    materialToken[_tokenID].recipeMaterialTokenId[i]
                    // the actual batch has enougn materials
                    // batch[_batchesId[j]].materialsUuid.length >=
                    // materialToken[_tokenID].recipeMaterialAmount[i]
                ) {
                    uuidMaterialInfo[mi.uuid].fromBatchId.push(_batchesId[j]);
                    uuidMaterialInfo[mi.uuid].batchMaterialsUuid.push(_batchesMaterialsUuid[j]);
                    //     // remove products from existing batches
                    burnBatchTokens(_batchesId[j], _batchesMaterialsUuid[j]);
                }
            }
        }
        // final check to see if all products were used
        // require(recipeMaterialsAmountUnusedLength == 0, "Could not satisfy all requirements");
        balance[_tokenID][msg.sender].push(mi.uuid);
        emit MaterialTransfer(address(0), companyAddress,_tokenID, mi.uuid);
    }

    function createBatch(string memory _code, uint256[] memory _uuids) public senderHasCompany {
        require(_uuids.length > 0, "Can not create a batch without materials");

        uint256 materialTokenId = uuidMaterialInfo[_uuids[0]].materialTokenId;
        require(
            balance[materialTokenId][msg.sender].length >= _uuids.length,
            "You do not have enough materials to create this batch"
        );
        // set the materialTokenId
        for (uint256 i = 0; i < _uuids.length; i++) {
            // ensure these are my materials
            for (uint256 j = 0; j < balance[materialTokenId][msg.sender].length; j++) {
                // material found
                if (balance[materialTokenId][msg.sender][j] == _uuids[i]) {
                    // delete from balance
                    balance[materialTokenId][msg.sender][j] = balance[materialTokenId][msg.sender][
                        balance[materialTokenId][msg.sender].length - 1
                    ];
                    balance[materialTokenId][msg.sender].pop();
                }
            }
        }

        // create instance
        BatchInfo memory batchInfo =
            BatchInfo({
                batchId: batchId,
                code: _code,
                materialTokenId: materialTokenId,
                materialsUuid: _uuids,
                isValue: true,
                owner: msg.sender
            });
        batch[batchId] = batchInfo;
        addressBatches[msg.sender].push(batchId);
        emit BatchCreate(msg.sender, batchId);
        batchId++;
    }

    function burnBatchTokens(uint256 _batchId, uint256[] memory _uuids) public {
        require(_uuids.length > 0, "Amount needs to be bigger than 0");
        require(batch[_batchId].materialsUuid.length >= _uuids.length, "Amount not available");
        for (uint256 i = 0; i < _uuids.length; i++) {
            // ensure these are my materials
            burnBatchToken(_batchId, _uuids[i]);
        }
    }

    function burnBatchToken(uint256 _batchId, uint256 _uuid) public {
        require(batch[_batchId].materialsUuid.length >= 1, "Amount not available");
        // ensure these are my materials
        for (uint256 j = 0; j < batch[_batchId].materialsUuid.length; j++) {
            // material found
            if (batch[_batchId].materialsUuid[j] == _uuid) {
                // delete from balance
                batch[_batchId].materialsUuid[j] = batch[_batchId].materialsUuid[
                    batch[_batchId].materialsUuid.length - 1
                ];
                batch[_batchId].materialsUuid.pop();
                emit BatchTransfer(msg.sender, address(0), batchId, _uuid);
            }
        }
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

                // payable(certificateAuthorityManagerAddress).transfer(
                //     100000000000000000pornu
                // );
                delete materialToken[_itemIdentifier].certificates[length - 1];
            }
        }
        if (i == length - 1) {
            revert("Certificate code not found");
        }
    }

    function changeBatchOwnershipBatch(uint256[] memory _batchIds, address _newOwner)
        public
        fromCompanyContract
    {
        for (uint8 i = 0; i < _batchIds.length; i++) {
            batch[_batchIds[i]].owner = _newOwner;
        }
    }
}
