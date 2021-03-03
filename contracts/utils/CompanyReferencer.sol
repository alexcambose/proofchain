// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "../Company.sol";
import "../Factory.sol";
import "./Ownable.sol";

contract CompanyReferencer is Ownable {
    Company internal company;
    address internal companyAddress;

    function getCompanyContract() public returns (Company) {
        if (companyAddress == address(0)) {
            companyAddress = Factory(owner()).companyContractAddress();
            company = Company(companyAddress);
            return company;
        }
        return company;
    }
}