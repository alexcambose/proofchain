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
exports.Batch = void 0;
const Base_1 = require("./Base");
const Transaction_1 = require("./Transaction");
const eth_1 = require("./utils/eth");
class Batch extends Base_1.Base {
    /**
     * Create a new batch
     * @param options Batch create options
     * @returns Batch create event
     */
    create(options) {
        const { code, materialsUuid } = options;
        const transaction = this.contract.methods.createBatch(code, materialsUuid);
        return new Transaction_1.Transaction(transaction, this.fromAddress);
    }
    /**
     * Burn batch material uuid
     * @param options Burn options
     * @param options.batchId The id of the batch
     * @param options.materialsUuid The uuids of the materials to be burned
     * @returns Burn event
     */
    burn(options) {
        const { batchId, materialsUuid } = options;
        const transaction = this.contract.methods.burnBatchTokens(batchId, materialsUuid);
        return new Transaction_1.Transaction(transaction, this.fromAddress);
    }
    /**
     * Get batch by id
     * @param batchId Batch id
     * @param full Instead of return materials uuid, it will return the material instance details
     * @returns Batch informations
     */
    getById(batchId, full = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const batch = yield this.contract.methods.batch(batchId).call();
            if (batch.owner == eth_1.EMPTY_ADDRESS)
                return null;
            if (full) {
                batch.materialsUuid = yield this.contract.methods
                    .getBatchMaterialsUuid(batch.batchId)
                    .call();
            }
            return batch;
        });
    }
    /**
     * Get all batch ids
     * @param onlyExistingBatches If set to true it will return only the batches owned by "fromAddress"
     * @returns Batch ids
     */
    allBatchIds(onlyExistingBatches = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const createEvents = yield this.getPastEvents('BatchCreate', { company: this.fromAddress });
            const transferEvents = yield this.getPastEvents('BatchTransfer', { to: this.fromAddress, uuid: 0 });
            const ids = (yield Promise.all([...createEvents, ...transferEvents]
                .map((e) => e.batchId)
                .map((e) => __awaiter(this, void 0, void 0, function* () {
                if (onlyExistingBatches) {
                    const exists = yield this.contract.methods
                        .getAddressBatches(this.fromAddress, e)
                        .call();
                    if (exists)
                        return e;
                }
                else {
                    return e;
                }
            })))).filter((e) => e);
            // @ts-ignore
            return ids;
        });
    }
    /**
     * Get all batches
     * @param onlyExistingBatches If set to true it will return only the batches owned by "fromAddress"
     * @returns Batches details
     */
    all(onlyExistingBatches = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const batchIds = yield this.allBatchIds(onlyExistingBatches);
            let batches = [];
            for (let batchId of batchIds) {
                const fetchedBatch = yield this.getById(batchId);
                batches.push(fetchedBatch);
            }
            return batches;
        });
    }
    /**
     * Remove a batch (burn)
     * @param batchId The id of the batch
     * @returns
     */
    remove(batchId) {
        const transaction = this.contract.methods.removeBatchFromAddress(batchId);
        return new Transaction_1.Transaction(transaction, this.fromAddress);
    }
    /**
     * Destory batch and add existing materials to users balance
     * @param batchId Target batch id
     *
     */
    destroyBatch(batchId) {
        const transaction = this.contract.methods.destroyBatch(batchId);
        return new Transaction_1.Transaction(transaction, this.fromAddress);
    }
}
exports.Batch = Batch;
