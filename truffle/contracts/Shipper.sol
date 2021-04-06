// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <0.9.0;
import "./utils/MaterialReferencer.sol";

abstract contract Shipper is MaterialReferencer {
    event TransportCreated(
        address indexed sender,
        address indexed receiver,
        address indexed transportCompany,
        uint256 transportId
    );
    event TransportStatus(uint256 indexed transportId, TransportStatusEnum indexed status);
    enum TransportStatusEnum {
        NONE,
        READY_FOR_TRANSIT,
        PENDING_TRANSIT,
        IN_TRANSIT,
        PENDING_FINALISED,
        FINALISED
    }
    struct TransportInfo {
        uint256 transportId;
        // sender company
        address sender;
        address receiver;
        address transportCompany;
        uint256[] batchIds;
        uint256 value;
        TransportStatusEnum status;
        string hashedPassword;
    }
    mapping(uint256 => TransportInfo) public transports;
    uint256 transportIdCounter = 0;
    modifier batchesOwner(uint256[] memory _batchIds) {
        for (uint8 i = 0; i < _batchIds.length; i++) {
            (, address batchIdOwner, , ) = getMaterialContract().batch(_batchIds[i]);
            if (batchIdOwner != msg.sender) {
                revert("You are not the owner of all batches");
            }
        }
        _;
    }

    modifier onlyTransportCompany(uint256 _transportId) {
        require(
            transports[_transportId].transportCompany == msg.sender,
            "Only the transport company is allowed"
        );
        _;
    }
    modifier onlyReceiver(uint256 _transportId) {
        require(
            transports[_transportId].receiver == msg.sender,
            "Only the transport receiver is allowed"
        );
        _;
    }
    modifier onlyNotfinalisedTransport(uint256 _transportId) {
        require(
            transports[_transportId].status != TransportStatusEnum.FINALISED,
            "This transport is finalised"
        );
        _;
    }

    // The sender calls this
    function createTransport(
        address _receiver,
        address _transportCompany,
        uint256[] memory _batchIds
    ) public batchesOwner(_batchIds) {
        require(msg.sender != _receiver, "Cannot initiate a transport to yourself");
        // require(_batchIds.length > 0, "Can not create an empty transport");

        transports[transportIdCounter].transportId = transportIdCounter;
        transports[transportIdCounter].sender = msg.sender;
        transports[transportIdCounter].receiver = _receiver;
        transports[transportIdCounter].transportCompany = _transportCompany;
        transports[transportIdCounter].batchIds = _batchIds;
        transports[transportIdCounter].status = TransportStatusEnum.NONE;

        for (uint256 i = 0; i < _batchIds.length; i++) {
            getMaterialContract().removeBatchFromAddress(_batchIds[i]);
        }
        emit TransportCreated(msg.sender, _receiver, _transportCompany, transportIdCounter);
        transportIdCounter++;
    }

    function createTransport(
        address _receiver,
        address _transportCompany,
        uint256[] memory _batchIds,
        string memory _hashedPassword
    ) public batchesOwner(_batchIds) {
        createTransport(_receiver, _transportCompany, _batchIds);
        transports[transportIdCounter - 1].hashedPassword = _hashedPassword;
    }

    function setTransportStatus(uint256 _transportId, TransportStatusEnum _status)
        public
        onlyTransportCompany(_transportId)
        onlyNotfinalisedTransport(_transportId)
    {
        require(
            _status != TransportStatusEnum.FINALISED,
            "Can not set to finalised. Use finaliseTransport"
        );

        transports[_transportId].status = _status;
        emit TransportStatus(_transportId, _status);
    }

    function finaliseTransport(uint256 _transportId) public onlyReceiver(_transportId) {
        require(
            bytes(transports[_transportId].hashedPassword).length == 0,
            "This transport can not be finalised without a password"
        );
        transports[_transportId].status = TransportStatusEnum.FINALISED;
        getMaterialContract().changeBatchOwnershipBatch(
            transports[_transportId].batchIds,
            transports[_transportId].receiver,
            _transportId
        );
        emit TransportStatus(_transportId, TransportStatusEnum.FINALISED);
    }

    function finaliseTransport(uint256 _transportId, string memory _hashedPassword)
        public
        onlyReceiver(_transportId)
    {
        require(
            (keccak256(abi.encodePacked((transports[_transportId].hashedPassword))) ==
                keccak256(abi.encodePacked((_hashedPassword)))),
            "Incorrect password"
        );
        transports[_transportId].status = TransportStatusEnum.FINALISED;

        getMaterialContract().changeBatchOwnershipBatch(
            transports[_transportId].batchIds,
            transports[_transportId].receiver,
            _transportId
        );
        emit TransportStatus(_transportId, TransportStatusEnum.FINALISED);
    }

    function getTransportBatchids(uint256 _transportId) public view returns (uint256[] memory) {
        return transports[_transportId].batchIds;
    }
}
