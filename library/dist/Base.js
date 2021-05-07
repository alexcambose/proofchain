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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const abi_1 = require("./abi");
const eventsParser_1 = require("./utils/eventsParser");
const eth_1 = require("./utils/eth");
class Base {
    constructor(web3, _fromAddress, factoryContract, contractName, contractAbi) {
        this.web3 = web3;
        this._fromAddress = _fromAddress;
        this.factoryContract = factoryContract;
        this.contractName = contractName;
        this.contractAbi = contractAbi;
        this.contract = null;
    }
    get fromAddress() {
        if (this._fromAddress !== eth_1.EMPTY_ADDRESS)
            return this._fromAddress;
        throw new Error(`fromAddress parameter not specified`);
    }
    getContractAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const aggregatorContractAddress = yield this.factoryContract.methods
                .aggregator()
                .call();
            const aggregatorContract = new this.web3.eth.Contract(
            // @ts-ignore
            abi_1.Aggregator, aggregatorContractAddress);
            return aggregatorContract.methods[this.contractName + 'Address']().call();
        });
    }
    ensureContract() {
        return __awaiter(this, void 0, void 0, function* () {
            // if the contract isn't set
            if (!this.contract) {
                this.contract = new this.web3.eth.Contract(this.contractAbi, yield this.getContractAddress());
                return this.contract;
            }
            // if the contract is already set
            return this.contract;
        });
    }
    getRawPastEvents(eventName, filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureContract();
            const events = yield this.contract.getPastEvents(eventName, {
                filter,
                fromBlock: 0,
                toBlock: 'latest',
            });
            return events;
        });
    }
    getPastEvents(eventName, filter = {}, includeBlockData = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield this.getRawPastEvents(eventName, filter);
            let parsedEvents = events.map(eventsParser_1.parseEvent).reverse();
            if (includeBlockData) {
                parsedEvents = yield Promise.all(parsedEvents.map((e) => __awaiter(this, void 0, void 0, function* () {
                    return (Object.assign(Object.assign({}, e), { block: yield this.web3.eth.getBlock(e.event.event.blockNumber) }));
                })));
            }
            return parsedEvents;
        });
    }
}
exports.Base = Base;
