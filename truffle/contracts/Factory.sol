// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;

import "./Aggregator.sol";
import "./Material.sol";
import "./Company.sol";
import "./CertificateAuthorityManager.sol";

contract Factory {
    address public aggregator;
    address public masterAddress;

    constructor() {
        masterAddress = msg.sender;
        Aggregator aggregatorContract = new Aggregator();
        aggregator = address(aggregatorContract);

        Company company = new Company(masterAddress, aggregator);
        Material materialContract = new Material(masterAddress, aggregator);
        CertificateAuthorityManager certificateAuthorityManager =
            new CertificateAuthorityManager(masterAddress, aggregator);

        aggregatorContract.setContracts(
            masterAddress,
            address(company),
            address(materialContract),
            address(certificateAuthorityManager)
        );
    }
}
