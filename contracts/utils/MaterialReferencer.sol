// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "../Material.sol";
import "../Aggregator.sol";
import "./Ownable.sol";

contract MaterialReferencer is Ownable {
    Material internal material;
    address internal materialAddress;

    function getMaterialContract() public returns (Material) {
        if (materialAddress == address(0)) {
            materialAddress = Aggregator(owner()).materialContractAddress();
            material = Material(materialAddress);
            return material;
        }
        return material;
    }
}
