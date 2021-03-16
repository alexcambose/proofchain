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
const Base_1 = __importDefault(require("./Base"));
const MinedTransaction_1 = __importDefault(require("./MinedTransaction"));
class Batch extends Base_1.default {
    create({ code, materialTokenId, materialTokenAmount, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureContract();
            const transaction = yield this.contract.methods
                .createBatch(code, materialTokenId, materialTokenAmount)
                .send({ from: this.fromAddress, gas: 300000 });
            return new MinedTransaction_1.default(transaction);
        });
    }
    burn({ batchId, materialTokenAmount, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureContract();
            const transaction = yield this.contract.methods
                .burnBatchToken(batchId, materialTokenAmount)
                .send({ from: this.fromAddress, gas: 300000 });
        });
    }
    getById(batchId) {
        return __awaiter(this, void 0, void 0, function* () {
            const batch = yield this.contract.methods.batch(batchId).call();
            return batch;
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureContract();
            const createEvents = yield this.getPastEvents('BatchCreate', { company: this.fromAddress });
            let batches = [];
            for (let createEvent of createEvents) {
                const fetchedBatch = yield this.getById(createEvent.batchId);
                batches.push(fetchedBatch);
            }
            return batches;
        });
    }
}
exports.default = Batch;
