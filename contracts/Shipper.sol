// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;
import "./utils/MaterialReferencer.sol";

abstract contract Shipper is MaterialReferencer {
    event TransportInitiated(uint256 indexed _transportId);
    event TransportTransit(uint256 _transportId, bool _inTransit);
    event TransportFinalised(uint256 _transportId);

    struct TransportInfo {
        // sender company
        address sender;
        address receiver;
        address transportCompany;
        uint256[] batchIds;
        uint256 value;
        bool readyForShipment;
        bool inTransit;
        bool finalised;
        string hashedPassword;
    }
    event T(address a, address b);
    TransportInfo[] public transports;
    uint256 public transportId = 0;
    modifier batchesOwner(uint256[] memory _batchIds) {
        for (uint8 i = 0; i < _batchIds.length; i++) {
            (, , , address batchIdOwner, ) =
                getMaterialContract().batch(_batchIds[i]);
            if (batchIdOwner != msg.sender) {
                revert("You are not the owner of all batches");
            }
        }
        _;
    }

    modifier onlyTransportCompany(uint256 _transportId) {
        emit T(transports[_transportId].transportCompany, msg.sender);
        // require(
        //     transports[_transportId].transportCompany == msg.sender,
        //     "Only the transport company is allowed"
        // );
        _;
    }
    modifier onlyReceiver(uint256 _transportId) {
        require(
            transports[_transportId].receiver == msg.sender,
            "Only the transport receiver is allowed"
        );
        _;
    }
    modifier onlyNotFinalizedTransport(uint256 _transportId) {
        require(
            transports[_transportId].finalised == false,
            "This transport is finalized"
        );
        _;
    }

    // The sender calls this
    function initiateTransport(
        address _receiver,
        address _transportCompany,
        uint256[] memory _batchIds
    ) public batchesOwner(_batchIds) {
        require(
            msg.sender != _receiver,
            "Cannot initiate a transport to yourself"
        );

        TransportInfo memory ti =
            TransportInfo({
                sender: msg.sender,
                receiver: _receiver,
                transportCompany: _transportCompany,
                batchIds: _batchIds,
                value: 0,
                readyForShipment: false,
                inTransit: false,
                finalised: false,
                hashedPassword: ""
            });
        transports.push(ti);
        emit TransportInitiated(transports.length - 1);
    }

    function initiateTransport(
        address _receiver,
        address _transportCompany,
        uint256[] memory _batchIds,
        string memory _hashedPassword
    ) public batchesOwner(_batchIds) {
        initiateTransport(_receiver, _transportCompany, _batchIds);
        transports[transports.length - 1].hashedPassword = _hashedPassword;
    }

    function setTransit(uint256 _transportId, bool _transitValue)
        public
        onlyTransportCompany(_transportId)
        onlyNotFinalizedTransport(_transportId)
    {
        transports[_transportId].inTransit = _transitValue;
        emit TransportTransit(_transportId, _transitValue);
    }

    function finaliseTransport(uint256 _transportId)
        public
        onlyReceiver(_transportId)
    {
        require(
            bytes(transports[_transportId].hashedPassword).length == 0,
            "This transport can not be finalised without a password"
        );
        transports[_transportId].finalised = true;
        getMaterialContract().changeBatchOwnershipBatch(
            transports[_transportId].batchIds,
            transports[_transportId].receiver
        );
        emit TransportFinalised(_transportId);
    }

    function finaliseTransport(
        uint256 _transportId,
        string memory _hashedPassword
    ) public onlyReceiver(_transportId) {
        require(
            (keccak256(
                abi.encodePacked((transports[_transportId].hashedPassword))
            ) == keccak256(abi.encodePacked((_hashedPassword)))),
            "Incorrect password"
        );
        transports[_transportId].finalised = true;
        getMaterialContract().changeBatchOwnershipBatch(
            transports[_transportId].batchIds,
            transports[_transportId].receiver
        );
        emit TransportFinalised(_transportId);
    }
}
