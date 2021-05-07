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
        // address of the sender company
        address sender;
        // address of the receiver company
        address receiver;
        // address of the transport company
        address transportCompany;
        // batch ids
        uint256[] batchIds;
        // the status of the transport
        TransportStatusEnum status;
        // a keccak256 hash of the password, if specified
        bytes32 hashedPassword;
    }
    // transportId => TransportInfo
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

    /**
     * Create a new transport
     * @param _receiver The address of the transport sender
     * @param _transportCompany The address of the transport company associated with this transport
     * @param _batchIds The ids of the batches that will be sent with this transport
     */
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

    /**
     * Create a new transport
     * @param _receiver The address of the transport sender
     * @param _transportCompany The address of the transport company associated with this transport
     * @param _batchIds The ids of the batches that will be sent with this transport
     * @param _hashedPassword A password associated with this transport
     */

    function createTransport(
        address _receiver,
        address _transportCompany,
        uint256[] memory _batchIds,
        bytes32 _hashedPassword
    ) public batchesOwner(_batchIds) {
        createTransport(_receiver, _transportCompany, _batchIds);
        transports[transportIdCounter - 1].hashedPassword = _hashedPassword;
    }

    /**
     * Sets the status of a transport
     * @param _transportId The id of the transport
     * @param _status The status to be set
     */
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

    /**
     * Finalises a transport
     * @param _transportId The id of the transport
     */
    function finaliseTransport(uint256 _transportId) public onlyReceiver(_transportId) {
        require(
            transports[_transportId].hashedPassword[0] == 0,
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

    /**
     * Finalises a transport
     * @param _transportId The id of the transport
     * @param _password Password of the transport
     */
    function finaliseTransport(uint256 _transportId, string memory _password)
        public
        onlyReceiver(_transportId)
    {
        require(
            transports[_transportId].hashedPassword == keccak256(abi.encodePacked(_password)),
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

    /**
     * Get the batch ids from a transport
     * @param _transportId The id of the transport
     * @return Batch ids
     */
    function getTransportBatchids(uint256 _transportId) public view returns (uint256[] memory) {
        return transports[_transportId].batchIds;
    }
}
