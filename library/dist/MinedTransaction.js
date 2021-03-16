"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventsParser_1 = require("./utils/eventsParser");
class MinedTransaction {
    constructor(transaction) {
        this.transaction = transaction;
    }
    get events() {
        return eventsParser_1.parseTransactionEvents(this.transaction.events);
    }
    get transactionHash() {
        return this.transaction.transactionHash;
    }
}
exports.default = MinedTransaction;
