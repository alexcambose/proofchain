// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "../Company.sol";

abstract contract CompanyOwnable {
    address private companyContract;
    Company private company;

    constructor(address _companyContract) {
        companyContract = _companyContract;
        company = Company(_companyContract);
    }

    modifier senderHasCompany {
        require(company.getCompany(msg.sender).isValue == true, "");
        _;
    }
}
