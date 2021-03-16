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
class Material extends Base_1.default {
    create({ name, code, amountIdentifier, images = [], recipeMaterialTokenId = [], recipeMaterialAmount = [], }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureContract();
            // check if the specified recipe ids exist
            for (let id of recipeMaterialTokenId) {
                const material = yield this.getById(id, false);
                if (!material) {
                    throw new Error(`Material with id ${id} does not exist`);
                }
            }
            const transaction = yield this.contract.methods
                .create(name, code, amountIdentifier, images, recipeMaterialTokenId, recipeMaterialAmount)
                .send({ from: this.fromAddress, gas: 400000 });
            return new MinedTransaction_1.default(transaction);
        });
    }
    getById(materialTokenId, full = true) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureContract();
            const material = yield this.contract.methods
                .materialToken(String(materialTokenId))
                .call();
            if (full) {
                const recipe = yield this.contract.methods
                    .getMaterialRecipe(materialTokenId)
                    .call();
                material.recipeMaterialTokenId = recipe['0'];
                material.recipeMaterialAmount = recipe['1'];
            }
            if (!material.isValue)
                return null;
            return material;
        });
    }
    all({ onlyRawMaterials, onlyMaterials, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureContract();
            const createEvents = yield this.getPastEvents('MaterialCreate', { company: this.fromAddress });
            let materials = [];
            for (let createEvent of createEvents) {
                const fetchedMaterial = yield this.getById(createEvent.materialTokenId);
                if (onlyRawMaterials &&
                    fetchedMaterial.recipeMaterialTokenId.length > 0) {
                    continue;
                }
                else if (onlyMaterials &&
                    fetchedMaterial.recipeMaterialTokenId.length === 0) {
                    continue;
                }
                else {
                    materials.push(fetchedMaterial);
                }
            }
            return materials;
        });
    }
    countAll({ onlyMaterials, onlyRawMaterials, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureContract();
            const createEvents = yield this.getPastEvents('MaterialCreate', { company: this.fromAddress });
            return createEvents.length;
        });
    }
    getBalance(materialTokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield this.contract.methods
                .getBalance(materialTokenId, this.fromAddress)
                .call();
            return parseInt(balance);
        });
    }
    mint({ materialTokenId, amount, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureContract();
            const result = yield this.contract.methods
                .mint(materialTokenId, amount)
                .send({ from: this.fromAddress, gas: 300000 });
            return new MinedTransaction_1.default(result);
        });
    }
    getTransfers({ from, to, materialTokenId, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureContract();
            const transferEvents = yield this.getPastEvents('MaterialTransfer', { from, to, materialTokenId });
            return transferEvents;
        });
    }
}
exports.default = Material;
