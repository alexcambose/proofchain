// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./Ownable.sol";
import "../Company.sol";
import "../Aggregator.sol";

contract CompanyOwnable is Ownable {
    Company internal company;
    address internal companyAddress;

    function getCompanyContract() public returns (Company) {
        if (companyAddress == address(0)) {
            companyAddress = Aggregator(owner()).companyContractAddress();
            company = Company(companyAddress);
            return company;
        }
        return company;
    }

    modifier senderHasCompany {
        require(
            getCompanyContract().getCompany(msg.sender).isValue == true,
            ""
        );
        _;
    }
}
