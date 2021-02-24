// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./utils/Ownable.sol";

contract RawMaterial is Ownable {
    struct MaterialTokenInfo {
        string title;
        uint256 code;
        address owner;
        address[] certificates;
        string[] images;
    }
    // Mapping from TokenID to address balances
    mapping(uint256 => mapping(address => uint256)) private _balances;

    function createMaterialToken(
        string memory title,
        uint256 code,
        string[] memory images
    ) public {}

    function mint(
        address to,
        uint256 tokenID,
        uint32 amount
    ) public {}
}
