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
exports.CertificateAuthority = exports.CertificateTypeEnum = void 0;
const Base_1 = require("./Base");
const Transaction_1 = require("./Transaction");
const eth_1 = require("./utils/eth");
/**
 * Certificate types
 */
var CertificateTypeEnum;
(function (CertificateTypeEnum) {
    /**
     * This certificate has an environmental impact
     */
    CertificateTypeEnum[CertificateTypeEnum["ENVIRONMENTAL_IMPACT"] = 0] = "ENVIRONMENTAL_IMPACT";
    /**
     * This certificate describes the fact that the material/company uses a safe way of producing and operatins
     */
    CertificateTypeEnum[CertificateTypeEnum["SAFETY_AND_QUALITY"] = 1] = "SAFETY_AND_QUALITY";
    /**
     * This certificate has natural products
     */
    CertificateTypeEnum[CertificateTypeEnum["HEALTH_AND_NUTRITION"] = 2] = "HEALTH_AND_NUTRITION";
    /**
     * This certificate has a social impact
     */
    CertificateTypeEnum[CertificateTypeEnum["SOCIAL_IMPACT"] = 3] = "SOCIAL_IMPACT";
    /**
     * This certificate doesn't harm animals
     */
    CertificateTypeEnum[CertificateTypeEnum["ANIMAL_WELFARE"] = 4] = "ANIMAL_WELFARE";
    /**
     * This certificate has some other good qualities.
     */
    CertificateTypeEnum[CertificateTypeEnum["OTHER"] = 5] = "OTHER";
})(CertificateTypeEnum = exports.CertificateTypeEnum || (exports.CertificateTypeEnum = {}));
/**
 * Certificate authority class
 */
class CertificateAuthority extends Base_1.Base {
    /**
     * Create a certificate authority
     * @param options Create certificate authority options
     * @param options.name Certificate authority name
     * @returns Create certifiate authority events
     */
    createCertificateAuthority(options) {
        const { name } = options;
        const transaction = this.contract.methods.createCertificateAuthority(name);
        return new Transaction_1.Transaction(transaction, this.fromAddress);
    }
    /**
     *
     * @param options Create certificate options
     * @param options.name Certificate name
     * @param options.description Certificate description
     * @param options.type Certificate type
     * @returns Create certificate event
     */
    createCertificate(options) {
        const { name, description, type } = options;
        const transaction = this.contract.methods.createCertificate(name, description || '', type);
        return new Transaction_1.Transaction(transaction, this.fromAddress);
    }
    /**
     * Get certificate by code
     * @param code Certificate code
     * @returns Certificate informations
     */
    getByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const certificate = yield this.contract.methods
                .authorityCertificates(code)
                .call();
            if (certificate.certificateAuthority === eth_1.EMPTY_ADDRESS)
                return null;
            return certificate;
        });
    }
    /**
     * Get certificate authority by address
     * @param address Owner addres
     * @returns Certificate authority details
     */
    getCertificateAuthority(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const ca = yield this.contract.methods
                .certificateAuthorities(address)
                .call();
            if (ca.owner === eth_1.EMPTY_ADDRESS)
                return null;
            return ca;
        });
    }
    /**
     * Check if an address has a certificate authority
     * @param address Owner address
     * @returns True if the address has a certificate authority
     */
    hasCertificateAuthority(address = this.fromAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this.getCertificateAuthority(address));
        });
    }
    /**
     * Get certificates of address
     * @param address Address with certificates
     * @returns Certificates info
     */
    certificates(address = this.fromAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const createEvents = yield this.getPastEvents('CertificateAuthorityCertificateCreated', { owner: address });
            return Promise.all(createEvents.map((e) => this.getByCode(e.code)));
        });
    }
    /**
     * Get certificate authorities
     * @param full Include certificate authority details
     * @returns Certificate authorities
     */
    allCertificateAutorities(full = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const createEvents = yield this.getPastEvents('CertificateAuthorityCreated');
            if (!full) {
                return createEvents.map((e) => e.owner);
            }
            const certificateAuthorities = [];
            for (let { owner } of createEvents) {
                certificateAuthorities.push((yield this.getCertificateAuthority(owner)));
            }
            return certificateAuthorities;
        });
    }
    /**
     * Get the minimum allowed stake
     * @returns Minimum stake in wei
     */
    minimumStake() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contract.methods.minimumStake().call();
        });
    }
}
exports.CertificateAuthority = CertificateAuthority;
