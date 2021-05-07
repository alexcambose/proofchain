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
exports.Material = exports.CERTIFICATE_ASSIGNMENT_TYPE = void 0;
const Base_1 = require("./Base");
const Transaction_1 = require("./Transaction");
const eth_1 = require("./utils/eth");
var CERTIFICATE_ASSIGNMENT_TYPE;
(function (CERTIFICATE_ASSIGNMENT_TYPE) {
    CERTIFICATE_ASSIGNMENT_TYPE[CERTIFICATE_ASSIGNMENT_TYPE["CREATE"] = 0] = "CREATE";
    CERTIFICATE_ASSIGNMENT_TYPE[CERTIFICATE_ASSIGNMENT_TYPE["CANCEL"] = 1] = "CANCEL";
    CERTIFICATE_ASSIGNMENT_TYPE[CERTIFICATE_ASSIGNMENT_TYPE["REVOKE"] = 2] = "REVOKE";
})(CERTIFICATE_ASSIGNMENT_TYPE = exports.CERTIFICATE_ASSIGNMENT_TYPE || (exports.CERTIFICATE_ASSIGNMENT_TYPE = {}));
/**
 * Material class
 */
class Material extends Base_1.Base {
    /**
     * Create a new material
     * @param options Material creation options
     * @param options.name Material name
     * @param options.code Material code
     * @param options.amountIdentifier Material instance amount identifier
     * @param options.images Material images array
     * @param options.recipeMaterialTokenId Material recipe token id
     * @param options.recipeMaterialAmount Material recipe token amount
     * @returns Create material event
     */
    create(options) {
        const { name, code, amountIdentifier, images = [], recipeMaterialTokenId = [], recipeMaterialAmount = [], } = options;
        // check if the specified recipe ids exist
        // for (let id of recipeMaterialTokenId) {
        //   const material = await this.getById(id, false);
        //   if (!material) {
        //     throw new Error(`Material with id ${id} does not exist`);
        //   }
        // }
        if (recipeMaterialTokenId.length !== recipeMaterialAmount.length) {
            throw new Error('recipeMaterialTokenId and recipeMaterialAmount are different lengths');
        }
        let transaction;
        if (recipeMaterialAmount.length) {
            transaction = this.contract.methods.create(name, code, amountIdentifier, images, recipeMaterialTokenId, recipeMaterialAmount);
        }
        else {
            transaction = this.contract.methods.create(name, code, amountIdentifier, images);
        }
        return new Transaction_1.Transaction(transaction, this.fromAddress);
    }
    /**
     * Get a material by its token id
     * @param materialTokenId Material token id
     * @param full Set to true it the resulting object should include recipe details
     * @returns Material token info
     */
    getById(materialTokenId, full = true) {
        return __awaiter(this, void 0, void 0, function* () {
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
            if (material.creator === eth_1.EMPTY_ADDRESS)
                return null;
            return material;
        });
    }
    /**
     * Get all materials
     * @param options Filtering options
     * @param options.onlyRawMaterials - Set to true to include only raw materials
     * @param options.onlyMaterials - Set to true to include only compound materials
     * @returns Materials tokens info
     */
    all(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { onlyRawMaterials, onlyMaterials } = options;
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
    /**
     * Count the number of materials
     * @param options Count options
     * @param options.onlyRawMaterials - Set to true to count only raw materials
     * @param options.onlyMaterials - Set to true to count only compound materials
     * @returns Number of materials
     */
    countAll(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { onlyMaterials, onlyRawMaterials } = options;
            const createEvents = yield this.getPastEvents('MaterialCreate', { company: this.fromAddress });
            return createEvents.length;
        });
    }
    /**
     * Get the number of materials the account has
     * @param materialTokenId Material token id
     * @returns The balance of the materials that the "fromAddress" account has
     */
    getBalance(materialTokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield this.contract.methods
                .getBalance(materialTokenId, this.fromAddress)
                .call();
            return parseInt(balance);
        });
    }
    /**
     * Create a new material instance.
     * @param options Minting options
     * @param options.materialTokenId Material token id to mint
     * @param options.amount Amount to mint
     * @param options.fromBatchId Recipe batch id
     * @param options.fromBatchMaterialsUuid Recipe amount from the corresponding batch id
     * @returns Mint event
     */
    mint(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { materialTokenId, amount, fromBatchId, fromBatchMaterialsUuid, } = options;
            const material = yield this.getById(materialTokenId);
            if ((material === null || material === void 0 ? void 0 : material.creator) !== this.fromAddress) {
                throw new Error('You are not the owner of this material');
            }
            const isRaw = (material === null || material === void 0 ? void 0 : material.recipeMaterialAmount.length) === 0;
            let transaction;
            if (isRaw) {
                transaction = yield this.contract.methods.mint(materialTokenId, amount);
            }
            else {
                const estimatedGas = yield this.contract.methods
                    .mint(materialTokenId, fromBatchId, fromBatchMaterialsUuid)
                    .estimateGas({ from: this.fromAddress });
                transaction = yield this.contract.methods.mint(materialTokenId, fromBatchId, fromBatchMaterialsUuid);
            }
            return new Transaction_1.Transaction(transaction, this.fromAddress);
        });
    }
    /**
     * Get transfers
     * @param options Transfer filtering options
     * @param options.from Transfer sender account
     * @param options.to Transfer receiver account
     * @param options.materialTokenId Transfer material token id
     * @returns Transfer events
     */
    getTransfers(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { from, to, materialTokenId } = options;
            const transferEvents = yield this.getPastEvents('MaterialTransfer', { from, to, materialTokenId });
            return transferEvents;
        });
    }
    /**
     * Get owned material instances
     * @param materialTokenId Material token id
     * @returns Uuids
     */
    getOwnedMaterialsUuid(materialTokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const materialsUuid = yield this.getOwnedMaterialsUuidCodes(materialTokenId);
            return Promise.all(materialsUuid.map((e) => __awaiter(this, void 0, void 0, function* () { return this.getMaterialByUuid(e); })));
        });
    }
    /**
     * get the uuids of the owned material
     * @param materialTokenId Material token id
     * @returns Uuids
     */
    getOwnedMaterialsUuidCodes(materialTokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const materialsUuid = yield this.contract.methods
                .getOwnedMaterialsUuid(materialTokenId, this.fromAddress)
                .call();
            return materialsUuid;
        });
    }
    /**
     * Get the instance of the material by uuid
     * @param materialUuid Material uuid
     * @param full Include material batch information
     * @returns Material instance
     */
    getMaterialByUuid(materialUuid, full = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const material = yield this.contract.methods
                .uuidMaterialInfo(materialUuid)
                .call();
            const events = yield this.getPastEvents('MaterialTransfer', {
                from: eth_1.EMPTY_ADDRESS,
                materialTokenId: material.materialTokenId,
            }, full);
            if (full) {
                material.fromBatchId = yield this.contract.methods
                    .getMaterialInfoFromBatchId(materialUuid)
                    .call();
                material.batchMaterialsUuid = yield this.contract.methods
                    .getMaterialInfoBatchMaterialsUuid(materialUuid)
                    .call();
            }
            // @ts-ignore
            material.mintEvent = events.find((e) => e.uuid == material.uuid);
            return material;
        });
    }
    /**
     * Assign a certificate to a material
     * @param options Assign Certificate Options
     * @param options.certificateCode The code of the certificate to be assigned
     * @param options.materialTokenId The material token id that will be assigned the certificate to
     * @param options.stake The amount in wei that will be sent as a stake
     * @returns Assigned certificate event
     */
    assignCertificate(options) {
        const { certificateCode, materialTokenId, stake } = options;
        const transaction = this.contract.methods.assignCertificate(certificateCode, materialTokenId);
        return new Transaction_1.Transaction(transaction, this.fromAddress, { value: stake });
    }
    /**
     * Cancel a certificate from a material
     * @param options Cancel certificate options
     * @param options.certificateCode The code of the certificate to be canceled
     * @param options.materialTokenId The material token id that the certificate will be canceled
     * @returns Canceled certificate event
     */
    cancelCertificate(options) {
        const { certificateCode, materialTokenId } = options;
        const transaction = this.contract.methods.cancelCertificate(certificateCode, materialTokenId);
        return new Transaction_1.Transaction(transaction, this.fromAddress);
    }
    /**
     * Revoke a certificate from a material
     * @param options Revoke certificate options
     * @param options.certificateCode The code of the certificate to be revoked
     * @param options.materialTokenId The material token id that the certificate will be revoked
     * @returns Revoked certificate event
     */
    revokeCertificate(options) {
        const { certificateCode, materialTokenId } = options;
        const transaction = this.contract.methods.revokeCertificate(certificateCode, materialTokenId);
        return new Transaction_1.Transaction(transaction, this.fromAddress);
    }
    /**
     * Get all assigned certificates to a material token
     * @param materialTokenId Company address
     * @returns Array of certificate instances
     */
    assigedCertificates(materialTokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const certificateInstanceIds = yield this.contract.methods
                .getMaterialCertificatesInstanceIds(materialTokenId)
                .call();
            return Promise.all(certificateInstanceIds.map((e) => __awaiter(this, void 0, void 0, function* () { return this.contract.methods.certificateInstances(e).call(); })));
        });
    }
    /**
     * Get the materials that have the specified certificate assigned
     * @param certificateCode Certificate code
     * @returns Materials that have the specified certificate assigned
     */
    getFromCertificate(certificateCode) {
        return __awaiter(this, void 0, void 0, function* () {
            // assign certificate will always be the first
            const assignedEvents = yield this.getPastEvents('MaterialAssignedCertificate', { certificateCode });
            // initialise variable
            let materials = [];
            for (let assignEvent of assignedEvents) {
                const { materialTokenId } = assignEvent;
                // if the material is already added, skip it
                if (materials.find((e) => e.assignEvent.materialTokenId === materialTokenId)) {
                    continue;
                }
                // get instance
                const MaterialAssignedCertificatesInstance = yield this.contract.methods
                    .getMaterialCertificateInstance(materialTokenId, certificateCode)
                    .call();
                if (MaterialAssignedCertificatesInstance.stake != 0) {
                    materials.push(Object.assign({ materialTokenId, assignEvent: assignEvent }, MaterialAssignedCertificatesInstance));
                }
            }
            return materials;
        });
    }
    /**
     * Get certificate assignment history
     * @param options Filtering options
     * @param options.materialTokenId The material token id that the certificate was assigned
     * @param options.certificateCode The certificate code
     * @returns Certificate history events
     */
    certificateAssignmentHistory(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { materialTokenId, certificateCode } = options;
            let history = {};
            let assignEvents = yield this.getPastEvents('MaterialAssignedCertificate', { materialTokenId, certificateCode }, true);
            let revokeEvents = yield this.getPastEvents('MaterialRevokedCertificate', { materialTokenId, certificateCode }, true);
            let cancelEvents = yield this.getPastEvents('MaterialCanceledCertificate', { materialTokenId, certificateCode }, true);
            for (let { type, events } of [
                {
                    type: CERTIFICATE_ASSIGNMENT_TYPE.CREATE,
                    events: assignEvents,
                },
                {
                    type: CERTIFICATE_ASSIGNMENT_TYPE.REVOKE,
                    events: revokeEvents,
                },
                {
                    type: CERTIFICATE_ASSIGNMENT_TYPE.CANCEL,
                    events: cancelEvents,
                },
            ]) {
                for (let event of events) {
                    const { certificateCode } = event;
                    if (!history[certificateCode]) {
                        history[certificateCode] = [];
                    }
                    history[certificateCode].push({
                        type,
                        event,
                    });
                }
            }
            //sort
            for (let certificateCode in history) {
                history[certificateCode] = history[certificateCode].sort((a, b) => a.event.event.blockNumber - b.event.event.blockNumber);
            }
            return history;
        });
    }
    /**
     * Get a certificate instance by a certificate id
     * @param certificateInstanceId Certification instance identification number
     * @returns A certificate instance
     */
    getCertificateInstance(certificateInstanceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const certificateInstance = yield this.contract.methods
                .certificateInstances(certificateInstanceId)
                .call();
            return certificateInstance;
        });
    }
}
exports.Material = Material;
