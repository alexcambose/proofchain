// SPDX-License-Identifier: MIT
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
    address _aggregator;

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor(address _masterAddress, address _aggregator_) {
        _aggregator = _aggregator_;
        _owner = _masterAddress;
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
}
