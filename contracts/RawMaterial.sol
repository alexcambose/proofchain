// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./base/Material.sol";
import "./utils/Ownable.sol";
import "./utils/CompanyOwnable.sol";

contract RawMaterial is Material, Ownable, CompanyOwnable {
    constructor(address _companyContract) CompanyOwnable(_companyContract) {}

    function create(
        string memory _title,
        uint256 _code,
        string[] memory _images
    ) public senderHasCompany {
        materialToken[materialTokenID].title = _title;
        materialToken[materialTokenID].code = _code;
        materialToken[materialTokenID].images = _images;
        materialToken[materialTokenID].creator = msg.sender;
        emit MaterialCreate(msg.sender, materialTokenID);
        materialTokenID++;
    }

    function create(
        string memory _title,
        uint256 _code,
        string[] memory _images,
        uint256[] memory _recipeMaterialTokenId,
        uint256[] memory _recipeMaterialAmount
    ) public senderHasCompany {
        require(
            _recipeMaterialTokenId.length == _recipeMaterialAmount.length,
            "Arrays must be the same length"
        );
        materialToken[materialTokenID]
            .recipeMaterialTokenId = _recipeMaterialTokenId;
        materialToken[materialTokenID]
            .recipeMaterialAmount = _recipeMaterialAmount;
        create(_title, _code, _images);
    }

    function mint(uint256 _tokenID, uint256 _amount)
        public
        senderIsTokenCreator(_tokenID)
    {
        require(
            materialToken[_tokenID].recipeMaterialTokenId.length == 0,
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
        require(
            _batchesId.length == _batchesAmount.length,
            "Arrays must be the same length"
        );
        require(
            materialToken[_tokenID].recipeMaterialTokenId.length == 0,
            "The token does not need additional ingredients"
        );
        address companyAddress = materialToken[_tokenID].creator;
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
}
