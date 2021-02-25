// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./utils/Ownable.sol";

contract RawMaterial is Ownable {
    struct MaterialTokenInfo {
        string _title;
        uint256 _code;
        address _owner;
        address[] _certificates;
        string[] _images;
    }
    // Mapping from TokenID to address balances
    mapping(uint256 => mapping(address => uint256)) private _balances;
    mapping(uint256 => MaterialTokenInfo) public _materialToken;
    uint256 private _materialTokenID = 0;

    function createMaterialToken(
        string memory title,
        uint256 code,
        string[] memory images
    ) public {
        _materialToken[_materialTokenID]._title = title;
        _materialToken[_materialTokenID]._code = code;
        _materialToken[_materialTokenID]._images = images;
        _materialTokenID++;
    }

    function mint(
        address to,
        uint256 tokenID,
        uint32 amount
    ) public {}
}
