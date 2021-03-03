// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "../Company.sol";
import "../Factory.sol";
import "./CompanyReferencer.sol";

contract CompanyOwnable is CompanyReferencer {
    modifier senderHasCompany {
        require(
            getCompanyContract().getCompany(msg.sender).isValue == true,
            ""
        );
        _;
    }
}
