"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = exports.TransportStatusEnum = void 0;
const web3_1 = __importDefault(require("web3"));
const Base_1 = require("./Base");
const keccak256_1 = __importDefault(require("keccak256"));
const Transaction_1 = require("./Transaction");
var TransportStatusEnum;
(function (TransportStatusEnum) {
    /**
     * Transport has no status set. It was just created
     */
    TransportStatusEnum[TransportStatusEnum["NONE"] = 0] = "NONE";
    /**
     * Transport is ready for transit
     */
    TransportStatusEnum[TransportStatusEnum["READY_FOR_TRANSIT"] = 1] = "READY_FOR_TRANSIT";
    /**
     * Transport is awaiting transit.
     */
    TransportStatusEnum[TransportStatusEnum["PENDING_TRANSIT"] = 2] = "PENDING_TRANSIT";
    /**
     * Transport is in transit
     */
    TransportStatusEnum[TransportStatusEnum["IN_TRANSIT"] = 3] = "IN_TRANSIT";
    /**
     * Transport is pending to be finalised
     */
    TransportStatusEnum[TransportStatusEnum["PENDING_FINALISED"] = 4] = "PENDING_FINALISED";
    /**
     * Transport is finalised
     */
    TransportStatusEnum[TransportStatusEnum["FINALISED"] = 5] = "FINALISED";
})(TransportStatusEnum = exports.TransportStatusEnum || (exports.TransportStatusEnum = {}));
class Transport extends Base_1.Base {
    constructor() {
        super(...arguments);
        this.TransportStatusEnum = TransportStatusEnum;
    }
    /**
     * Creates a new transport
     * @param options Transport options
     * @param options.receiver Transport receiver
     * @param options.batchIds Transport batches
     * @param options.transportCompany Transport company
     * @param options.password Transport password
     * @returns Transport created event
     */
    initiate(options) {
        const { receiver, transportCompany, batchIds, password } = options;
        let transaction;
        if (password) {
            const passwordInHex = keccak256_1.default(password).toString('hex');
            transaction = this.contract.methods.createTransport(receiver, transportCompany, batchIds, '0x' + web3_1.default.utils.padLeft(passwordInHex.replace('0x', ''), 64));
        }
        else {
            transaction = this.contract.methods.createTransport(receiver, transportCompany, batchIds);
        }
        return new Transaction_1.Transaction(transaction, this.fromAddress);
    }
    /**
     * Set a new status to a transport
     * @param options Transport status options
     * @param options.transportId Traget transport id
     * @param options.status Transport status to be set
     * @returns Transport status chaged event
     */
    setTransportStatus(options) {
        const { transportId, status } = options;
        const transaction = this.contract.methods.setTransportStatus(transportId, status);
        return new Transaction_1.Transaction(transaction, this.fromAddress);
    }
    /**
     * Sets a transport as finalised
     * @param options Transport finalisation options
     * @param options.transportId Traget transport id
     * @param options.password Transport password
     * @returns Transport finalised event
     */
    finaliseTransport(options) {
        const { transportId, password } = options;
        let transaction;
        if (password) {
            transaction = this.contract.methods.finaliseTransport(transportId, password);
        }
        else {
            transaction = this.contract.methods.finaliseTransport(transportId);
        }
        return new Transaction_1.Transaction(transaction, this.fromAddress);
    }
    /**
     * Get a transport by id
     * @param transportId Transport id
     * @returns Transport data
     */
    getById(transportId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = yield this.contract.methods
                .transports(transportId)
                .call();
            transport.batchIds = yield this.getBatchIds(transportId);
            return transport;
        });
    }
    /**
     * Get transport batches
     * @param transportId Transport id
     * @returns Transport batches
     */
    getBatchIds(transportId) {
        return __awaiter(this, void 0, void 0, function* () {
            const batchIds = yield this.contract.methods
                .getTransportBatchids(transportId)
                .call();
            return batchIds;
        });
    }
    /**
     * Get all transports
     * @param options Fetch filters
     * @param options.sender The sender of the transport
     * @param options.receiver The receiver of the transport
     * @param options.transportCompany The tranport company associated with this transport
     * @returns Fetched transports
     */
    all(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sender, receiver, transportCompany } = options;
            const createEvents = yield this.getPastEvents('TransportCreated', {
                sender,
                receiver,
                transportCompany,
            });
            let transports = [];
            for (let createEvent of createEvents) {
                const fetchedBatch = yield this.getById(createEvent.transportId);
                transports.push(fetchedBatch);
            }
            return transports;
        });
    }
    /**
     * Get all status events from a transport
     * @param transportId Transport id
     * @returns Transport status events
     */
    getStatusEvents(transportId) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield this.getPastEvents('TransportStatus', {
                transportId,
            });
            return events;
        });
    }
}
exports.Transport = Transport;
