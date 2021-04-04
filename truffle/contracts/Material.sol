// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./MaterialBase.sol";

import "./utils/CompanyOwnable.sol";
import "./utils/CertificateAuthorityManagerReferencer.sol";
import "./Certifiable.sol";

contract Material is Certifiable, MaterialBase, CompanyOwnable {
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
            materialToken[_tokenID].creator != address(0),
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
            emit MaterialTransfer(address(0), companyAddress, _tokenID, mi.uuid);
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
        // for each recipe item
        for (uint8 i = 0; i < materialToken[_tokenID].recipeMaterialTokenId.length; i++) {
            uint256 recipeMaterialsAmount = materialToken[_tokenID].recipeMaterialAmount[i];

            // for each batch
            for (uint8 j = 0; j < _batchesId.length; j++) {
                // require that the provided batch is owned by the sender
                require(batch[_batchesId[j]].owner == msg.sender, "You do not own all batches");
                // find the batch with the correct recipe item
                if (
                    // same materialTokenIds
                    batch[_batchesId[j]].materialTokenId ==
                    materialToken[_tokenID].recipeMaterialTokenId[i] &&
                    recipeMaterialsAmount > 0
                ) {
                    uuidMaterialInfo[mi.uuid].fromBatchId.push(_batchesId[j]);
                    uint256[] storage uuidsToBeAdded =
                        uuidMaterialInfo[mi.uuid].batchMaterialsUuid.push();
                    for (
                        uint256 k = 0;
                        k < _batchesMaterialsUuid[j].length && recipeMaterialsAmount > 0;
                        k++
                    ) {
                        uuidsToBeAdded.push(_batchesMaterialsUuid[j][k]);
                        burnBatchToken(_batchesId[j], _batchesMaterialsUuid[j][k]);

                        recipeMaterialsAmount--;
                    }
                }
            }
            if (recipeMaterialsAmount != 0) {
                revert("Not enough materials specified");
            }
        }
        // final check to see if all products were used
        // require(recipeMaterialsAmountUnusedLength == 0, "Could not satisfy all requirements");
        balance[_tokenID][msg.sender].push(mi.uuid);
        emit MaterialTransfer(address(0), companyAddress, _tokenID, mi.uuid);
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
                owner: msg.sender
            });
        batch[batchId] = batchInfo;
        addressBatches[msg.sender][batchId] = true;
        emit BatchCreate(msg.sender, batchId, materialTokenId);
        batchId++;
    }

    function destroyBatch(uint256 _batchId) public {
        require(batch[_batchId].owner == msg.sender, "You are not the owner of this batch");
        emit BatchTransfer(msg.sender, address(0), _batchId, 0);
        addressBatches[msg.sender][_batchId] = false;
        for (uint256 i = 0; i < batch[_batchId].materialsUuid.length; i++) {
            // ensure these are my materials
            uint256 uuid = batch[_batchId].materialsUuid[i];
            balance[uuidMaterialInfo[uuid].materialTokenId][msg.sender].push(uuid);
        }
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
        bool burned = false;
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
                burned = true;
            }
        }
        // material not in this batch
        if (!burned) {
            revert("The specified material uuid not present in this batch");
        }
    }

    function assignCertificate(uint256 _certificateCode, uint256 _itemIdentifier) public payable {
        super.assignCertificate(_certificateCode);
        for (uint256 i = 0; i < materialToken[_itemIdentifier].certificateInstanceIds.length; i++) {
            if (
                certificateInstances[materialToken[_itemIdentifier].certificateInstanceIds[i]]
                    .code == _certificateCode
            ) {
                revert("Can not assign the same certificate twice");
            }
        }
        CertificateInstance memory ci =
            CertificateInstance({code: _certificateCode, stake: msg.value});
        materialToken[_itemIdentifier].certificateInstanceIds.push(certificateInstanceId);
        certificateInstances[certificateInstanceId] = ci;
        emit AssignedCertificate(
            msg.sender,
            _certificateCode,
            _itemIdentifier,
            certificateInstanceId
        );
        certificateInstanceId++;
    }

    function cancelCertificate(uint256 _certificateCode, uint256 _itemIdentifier) public {
        super.cancelCertificate(_certificateCode);
        uint256 length = materialToken[_itemIdentifier].certificateInstanceIds.length;
        uint8 i;
        uint256 certificateInstanceId;
        for (i = 0; i < length; i++) {
            if (
                certificateInstances[materialToken[_itemIdentifier].certificateInstanceIds[i]]
                    .code == _certificateCode
            ) {
                certificateInstanceId = materialToken[_itemIdentifier].certificateInstanceIds[i];
                materialToken[_itemIdentifier].certificateInstanceIds[i] = materialToken[
                    _itemIdentifier
                ]
                    .certificateInstanceIds[length - 1];
                materialToken[_itemIdentifier].certificateInstanceIds.pop();
            }
        }
        if (i == length - 1) {
            revert("Certificate code not found");
        }
        emit CanceledCertificate(
            msg.sender,
            _certificateCode,
            _itemIdentifier,
            certificateInstanceId
        );
    }

    /*
     */
    function revokeCertificate(uint256 _certificateCode, uint256 _itemIdentifier) public {
        super.revokeCertificate();
        uint256 length = materialToken[_itemIdentifier].certificateInstanceIds.length;
        uint8 i;
        uint256 certificateInstanceId;
        for (i = 0; i < length; i++) {
            if (
                certificateInstances[materialToken[_itemIdentifier].certificateInstanceIds[i]]
                    .code == _certificateCode
            ) {
                certificateInstanceId = materialToken[_itemIdentifier].certificateInstanceIds[i];

                materialToken[_itemIdentifier].certificateInstanceIds[i] = materialToken[
                    _itemIdentifier
                ]
                    .certificateInstanceIds[length - 1];

                // payable(certificateAuthorityManagerAddress).transfer(
                //     100000000000000000
                // );

                materialToken[_itemIdentifier].certificateInstanceIds.pop();
            }
        }
        if (i == length - 1) {
            revert("Certificate code not found");
        }
        emit RevokedCertificate(
            msg.sender,
            _certificateCode,
            _itemIdentifier,
            certificateInstanceId
        );
    }

    function changeBatchOwnershipBatch(uint256[] memory _batchIds, address _newOwner)
        public
        fromCompanyContract
    {
        for (uint8 i = 0; i < _batchIds.length; i++) {
            addressBatches[batch[_batchIds[i]].owner][_batchIds[i]] = false;
            addressBatches[_newOwner][_batchIds[i]] = true;
            batch[_batchIds[i]].owner = _newOwner;
            emit BatchTransfer(batch[_batchIds[i]].owner, _newOwner, _batchIds[i], 0);
        }
    }

    function removeBatchFromAddress(uint256 _batchId) public {
        // require(
        //     batch[_batchId].owner == _address,
        //     "You are not the owner of the specified certificate"
        // );
        // no need to check, since this is always reffering the sender mapping
        addressBatches[tx.origin][_batchId] = false;
    }
}
