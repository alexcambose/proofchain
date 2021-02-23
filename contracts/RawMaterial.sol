// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./utils/Ownable.sol";

contract RawMaterial is Ownable {
    mapping(address => uint256) private balances;
}
