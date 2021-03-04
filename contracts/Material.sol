// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./MaterialBase.sol";
import "./utils/Math.sol";
import "./utils/CompanyOwnable.sol";
import "./utils/CertificateAuthorityManagerReferencer.sol";
import "./Certifiable.sol";

contract Material is Certifiable, MaterialBase, CompanyOwnable {
    using Math for uint256;

    function create(
        string memory _title,
        uint256 _code,
        string[] memory _images
    ) public senderHasCompany {
        materialToken[materialTokenId].title = _title;
        materialToken[materialTokenId].code = _code;
        materialToken[materialTokenId].images = _images;
        materialToken[materialTokenId].creator = msg.sender;
        materialToken[materialTokenId].isValue = true;
        emit MaterialCreate(msg.sender, materialTokenId);
        materialTokenId++;
    }

    function create(
        string memory _title,
        uint256 _code,
        string[] memory _images,
        uint256[] memory _recipematerialTokenId,
        uint256[] memory _recipeMaterialAmount
    ) public senderHasCompany {
        require(
            _recipematerialTokenId.length == _recipeMaterialAmount.length,
            "Arrays must be the same length"
        );
        materialToken[materialTokenId]
            .recipematerialTokenId = _recipematerialTokenId;
        materialToken[materialTokenId]
            .recipeMaterialAmount = _recipeMaterialAmount;
        create(_title, _code, _images);
    }

    function mint(uint256 _tokenID, uint256 _amount)
        public
        senderIsTokenCreator(_tokenID)
    {
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
        require(
            _batchesId.length == _batchesAmount.length,
            "Arrays must be the same length"
        );
        // the material token that we want to mint is a compound token
        require(
            materialToken[_tokenID].recipematerialTokenId.length != 0,
            "The token does not need additional ingredients"
        );
        // specified batches must be at least the same length of the material token recipe
        require(
            materialToken[_tokenID].recipematerialTokenId.length <=
                _batchesId.length,
            "Not enough ingredients provided"
        );

        address companyAddress = materialToken[_tokenID].creator;

        for (uint8 amountIndex = 0; amountIndex < _amount; amountIndex++) {
            uint256[] memory recipeMaterialsAmount =
                materialToken[_tokenID].recipeMaterialAmount;
            uint256 recipeMaterialsAmountUnusedLength =
                recipeMaterialsAmount.length;
            for (
                uint8 i = 0;
                i < materialToken[_tokenID].recipematerialTokenId.length;
                i++
            ) {
                for (uint8 j = 0; j < _batchesId.length; j++) {
                    require(
                        batch[_batchesId[j]].materialTokenAmount >=
                            _batchesAmount[j],
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
                        uint256 toBeBurned =
                            recipeMaterialsAmount[i].min(_batchesAmount[j]);
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
            require(
                recipeMaterialsAmountUnusedLength == 0,
                "Could not satisfy all requirements"
            );
        }
        balance[_tokenID][msg.sender] += _amount;
        emit MaterialTransfer(address(0), companyAddress, _amount);
    }

    function createBatch(
        string memory _code,
        uint256 _tokenID,
        uint256 _amount
    ) public senderHasCompany {
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
                materialTokenAmount: _amount
            });
        batch[batchId] = batchInfo;
        addressBatches[msg.sender].push(batchId);
        emit BatchCreate(msg.sender, batchId);
        batchId++;
    }

    function burnBatchToken(uint256 _batchId, uint256 _amount) public {
        require(_amount > 0, "Amount needs to be bigger than 0");
        require(
            batch[_batchId].materialTokenAmount >= _amount,
            "Amount not available"
        );

        batch[_batchId].materialTokenAmount -= _amount;
        if (batch[_batchId].materialTokenAmount == 0) {}
        emit BatchTransfer(msg.sender, address(0), batchId, _amount);
    }

    function assignCertificate(
        uint256 _certificateCode,
        uint256 _itemIdentifier
    ) external payable override {
        // Certifiable.assignCertificate(_certificateCode, _itemIdentifier);

        CertificateInstance memory ci =
            CertificateInstance({
                code: _certificateCode,
                time: block.timestamp,
                stake: msg.value
            });
        materialToken[_itemIdentifier].certificates.push(ci);
    }

    function revokeCertificate(
        uint256 _certificateCode,
        uint256 _itemIdentifier
    ) external override {
        for (
            uint8 i = 0;
            i < materialToken[_itemIdentifier].certificates.length;
            i++
        ) {
            if (materialToken[_itemIdentifier].certificates[i].code != 0) {}
        }
        require(msg.sender == owner());
    }
}
