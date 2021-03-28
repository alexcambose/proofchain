// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./Ownable.sol";
import "../Company.sol";
import "../Aggregator.sol";

abstract contract CompanyOwnable is Ownable {
    Company internal company;
    address internal companyAddress;

    function getCompanyContract() public returns (Company) {
        if (companyAddress == address(0)) {
            companyAddress = Aggregator(aggregator()).companyContractAddress();
            company = Company(companyAddress);
            return company;
        }
        return company;
    }

    modifier senderHasCompany {
        require(
            getCompanyContract().getCompany(msg.sender).isValue == true,
            "The sender does not have a company"
        );
        _;
    }

    modifier fromCompanyContract {
        require(msg.sender == companyAddress, "You are not the company contract");
        _;
    }
}
