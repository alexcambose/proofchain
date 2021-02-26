// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./abstract/Material.sol";
import "./utils/Ownable.sol";
import "./utils/CompanyOwnable.sol";

contract CompoundMaterial is Material, Ownable, CompanyOwnable {
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
}
