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
exports.Company = exports.CERTIFICATE_ASSIGNMENT_TYPE = void 0;
const Base_1 = require("./Base");
const Transaction_1 = require("./Transaction");
var CERTIFICATE_ASSIGNMENT_TYPE;
(function (CERTIFICATE_ASSIGNMENT_TYPE) {
    CERTIFICATE_ASSIGNMENT_TYPE[CERTIFICATE_ASSIGNMENT_TYPE["CREATE"] = 0] = "CREATE";
    CERTIFICATE_ASSIGNMENT_TYPE[CERTIFICATE_ASSIGNMENT_TYPE["CANCEL"] = 1] = "CANCEL";
    CERTIFICATE_ASSIGNMENT_TYPE[CERTIFICATE_ASSIGNMENT_TYPE["REVOKE"] = 2] = "REVOKE";
})(CERTIFICATE_ASSIGNMENT_TYPE = exports.CERTIFICATE_ASSIGNMENT_TYPE || (exports.CERTIFICATE_ASSIGNMENT_TYPE = {}));
class Company extends Base_1.Base {
    /**
     * Create a new company
     * @param options Company data
     * @param options.name Company name
     * @param options.entityType Company entity type
     * @returns
     */
    create(options) {
        const { name, entityType } = options;
        const transaction = this.contract.methods.create(name, entityType);
        return new Transaction_1.Transaction(transaction, this.fromAddress);
    }
    /**
     * Get company by onwer address
     * @param address Owner address. If no address is provided it will default to the fromAddress specified at proofchain initiation.
     * @returns Company Information
     */
    getCompany(address = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!address)
                address = this.fromAddress;
            return yield this.contract.methods.companies(address).call();
        });
    }
    /**
     * Checks whether an address has a company
     * @param address Owner address. If no address is provided it will default to the fromAddress specified at proofchain initiation.
     * @returns True if the owner has a company
     */
    hasCompany(address = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!address)
                address = this.fromAddress;
            const company = yield this.contract.methods.companies(address).call();
            return company.isValue;
        });
    }
    /**
     * Assign a certificate to a company
     * @param options Assign Certificate Options
     * @param options.certificateCode The code of the certificate to be assigned
     * @param options.companyAddress The address of the company that will be assigned the certificate to
     * @param options.stake The amount in wei that will be sent as a stake
     * @returns Assigned certificate event
     */
    assignCertificate(options) {
        const { certificateCode, companyAddress, stake } = options;
        const result = this.contract.methods.assignCertificate(certificateCode, companyAddress);
        return new Transaction_1.Transaction(result, this.fromAddress, { value: stake });
    }
    /**
     * Cancel a certificate from a company
     * @param options Cancel certificate options
     * @param options.certificateCode The code of the certificate to be canceled
     * @param options.companyAddress The address of the company that the certificate will be canceled
     * @returns Canceled certificate event
     */
    cancelCertificate(options) {
        const { certificateCode, companyAddress } = options;
        const transaction = this.contract.methods.cancelCertificate(certificateCode, companyAddress);
        return new Transaction_1.Transaction(transaction, this.fromAddress);
    }
    /**
     * Revoke a certificate from a company
     * @param options Revoke certificate options
     * @param options.certificateCode The code of the certificate to be revoked
     * @param options.companyAddress The address of the company that the certificate will be revoked
     * @returns Revoked certificate event
     */
    revokeCertificate(options) {
        const { certificateCode, companyAddress } = options;
        const result = this.contract.methods.revokeCertificate(certificateCode, companyAddress);
        return new Transaction_1.Transaction(result, this.fromAddress);
    }
    /**
     * Get all assigned certificates to a company
     * @param companyAddress Company address. If not provided, this will default to "fromAddress"
     * @returns Array of certificate instances
     */
    assigedCertificates(companyAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!companyAddress)
                companyAddress = this.fromAddress;
            const certificateInstanceIds = yield this.contract.methods
                .getCompanyCertificatesInstanceIds(companyAddress)
                .call();
            return Promise.all(certificateInstanceIds.map((e) => __awaiter(this, void 0, void 0, function* () { return this.contract.methods.certificateInstances(e).call(); })));
        });
    }
    /**
     * Get the companies that have the specified certificate assigned
     * @param certificateCode Certificate code
     * @returns Companies that have the specified certificate assigned
     */
    getFromCertificate(certificateCode) {
        return __awaiter(this, void 0, void 0, function* () {
            // assign certificate will always be the first
            const assignedEvents = yield this.getPastEvents('CompanyAssignedCertificate', { certificateCode });
            // initialise variable
            let companies = [];
            for (let assignEvent of assignedEvents) {
                const { companyAddress } = assignEvent;
                // if the material is already added, skip it
                if (companies.find((e) => e.assignEvent.companyAddress === companyAddress)) {
                    continue;
                }
                // get instance
                const CompanyAssignedCertificatesInstance = yield this.contract.methods
                    .getCompanyCertificateInstance(companyAddress, certificateCode)
                    .call();
                if (CompanyAssignedCertificatesInstance.stake != 0) {
                    companies.push(Object.assign({ companyAddress, assignEvent: assignEvent }, CompanyAssignedCertificatesInstance));
                }
            }
            return companies;
        });
    }
    /**
     * Get certificate assignment history
     * @param options Filtering options
     * @param options.company The company that the certificate was assigned
     * @param options.certificateCode The certificate code
     * @returns Certificate history events
     */
    certificateAssignmentHistory(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { companyAddress, certificateCode } = options;
            let history = {};
            let assignEvents = yield this.getPastEvents('CompanyAssignedCertificate', { companyAddress, certificateCode });
            let revokeEvents = yield this.getPastEvents('CompanyRevokedCertificate', { companyAddress, certificateCode });
            let cancelEvents = yield this.getPastEvents('CompanyCanceledCertificate', { companyAddress, certificateCode });
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
exports.Company = Company;
