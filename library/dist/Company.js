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
class Company extends Base_1.default {
    create({ name, entityType, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureContract();
            const gas = yield this.contract.methods
                .create(name, entityType)
                .estimateGas();
            const result = yield this.contract.methods
                .create(name, entityType)
                .send({ from: this.fromAddress, gas: 300000 });
            return new MinedTransaction_1.default(result);
        });
    }
    getCompany(address = '') {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureContract();
            if (!address)
                address = this.fromAddress;
            return yield this.contract.methods.companies(address).call();
        });
    }
    hasCompany(address = '') {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureContract();
            if (!address)
                address = this.fromAddress;
            const company = yield this.contract.methods.companies(address).call();
            return company.isValue;
        });
    }
}
exports.default = Company;
