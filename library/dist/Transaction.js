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
exports.Transaction = void 0;
const MinedTransaction_1 = __importDefault(require("./MinedTransaction"));
/**
 * Transaction class. Used as an additional layer of abstractisation
 */
class Transaction {
    /**
     * Transaction constructor
     * @param transactionInstance Web3 transaction instance
     * @param fromAddress The address from which the transaction will be sent
     */
    constructor(transactionInstance, fromAddress, options = {}) {
        this.transactionInstance = transactionInstance;
        this.fromAddress = fromAddress;
        this.options = options;
        this.gasPrice = 0;
    }
    /**
     * Estimages the gas needed to perform the transaction
     * @param options Transaction options
     * @returns Returns the gas needed to perform the transaction
     */
    estimateGas() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transactionInstance.estimateGas({
                from: this.fromAddress,
                value: this.options.value,
            });
        });
    }
    encodeAbi() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    setGasPrice(gasInWei) {
        return __awaiter(this, void 0, void 0, function* () {
            this.gasPrice = gasInWei;
        });
    }
    /**
     * Sends the transaction
     * @param options Send options
     * @returns Transaction result
     */
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            let additionalOptions = {};
            if (this.gasPrice) {
                additionalOptions.gasPrice = String(this.gasPrice);
            }
            const result = yield this.transactionInstance.send(Object.assign({ from: this.fromAddress, gas: yield this.estimateGas(), value: this.options.value }, additionalOptions));
            //@ts-ignore
            return new MinedTransaction_1.default(result);
        });
    }
}
exports.Transaction = Transaction;
