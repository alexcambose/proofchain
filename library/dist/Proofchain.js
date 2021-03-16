"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abi_1 = require("./abi");
const web3_1 = __importDefault(require("web3"));
const Company_1 = __importDefault(require("./Company"));
const abi_2 = require("./abi");
const Material_1 = __importDefault(require("./Material"));
const CertificateAuthority_1 = __importDefault(require("./CertificateAuthority"));
const Batch_1 = __importDefault(require("./Batch"));
/**
 * Main class
 */
class Proofchain {
    constructor({ web3, factoryContractAddress, fromAddress, }) {
        this.web3 = web3;
        this.factoryContract = new web3.eth.Contract(
        // @ts-ignore
        abi_1.Factory, factoryContractAddress);
        this.fromAddress = fromAddress;
        this.company = new Company_1.default(this.web3, this.fromAddress, this.factoryContract, 'companyContract', abi_2.Company);
        this.material = new Material_1.default(this.web3, this.fromAddress, this.factoryContract, 'materialContract', abi_2.Material);
        this.certificateAuthority = new CertificateAuthority_1.default(this.web3, this.fromAddress, this.factoryContract, 'certificateAuthorityManagerContract', abi_2.Material);
        this.batch = new Batch_1.default(this.web3, this.fromAddress, this.factoryContract, 'materialContract', abi_2.Material);
    }
    static init({ httpProvider, privateKey, factoryContractAddress, }) {
        const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(httpProvider));
        web3.eth.accounts.wallet.add(privateKey);
        return new Proofchain({
            web3,
            factoryContractAddress,
            fromAddress: web3.eth.accounts.wallet[0].address,
        });
    }
    static providerInit({ web3Provider, factoryContractAddress, fromAddress, }) {
        const web3 = new web3_1.default(web3Provider);
        return this.web3Init({ web3, factoryContractAddress, fromAddress });
    }
    static web3Init({ web3, factoryContractAddress, fromAddress, }) {
        return new Proofchain({
            web3,
            fromAddress,
            factoryContractAddress,
        });
    }
    isInitialised() {
        return !!this.web3;
    }
}
exports.default = Proofchain;
