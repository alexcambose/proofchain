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
exports.CompanyEntityTypeEnum = exports.CERTIFICATE_ASSIGNMENT_TYPE = void 0;
var Material_1 = require("./Material");
Object.defineProperty(exports, "CERTIFICATE_ASSIGNMENT_TYPE", { enumerable: true, get: function () { return Material_1.CERTIFICATE_ASSIGNMENT_TYPE; } });
var enums_1 = require("./enums");
Object.defineProperty(exports, "CompanyEntityTypeEnum", { enumerable: true, get: function () { return enums_1.CompanyEntityTypeEnum; } });
const abi_1 = require("./abi");
const web3_1 = __importDefault(require("web3"));
const Company_1 = require("./Company");
const abi_2 = require("./abi");
const Material_2 = require("./Material");
const CertificateAuthority_1 = require("./CertificateAuthority");
const Batch_1 = require("./Batch");
const Transport_1 = require("./Transport");
const eth_1 = require("./utils/eth");
/**
 * Main class
 */
class Proofchain {
    /**
     * Proofchain constructor function
     *
     * @param options       An object containing proofchain configuration parameters
     * @param options.web3  The web3 instance used to execute transactions. Must have a provider. See {@link https://web3js.readthedocs.io/|Web3.js}
     * @param options.factoryContractAddress  The address of Factory.sol
     * @param options.fromAddress  The address from which smart contract interaction will be done.
     */
    constructor(options) {
        const { web3, factoryContractAddress, fromAddress } = options;
        this.web3 = web3;
        this.factoryContract = new web3.eth.Contract(
        // @ts-ignore
        abi_1.Factory, factoryContractAddress);
        this.fromAddress = fromAddress;
        this.company = new Company_1.Company(this.web3, this.fromAddress || eth_1.EMPTY_ADDRESS, this.factoryContract, 'companyContract', abi_2.Company);
        this.material = new Material_2.Material(this.web3, this.fromAddress || eth_1.EMPTY_ADDRESS, this.factoryContract, 'materialContract', abi_2.Material);
        this.certificateAuthority = new CertificateAuthority_1.CertificateAuthority(this.web3, this.fromAddress || eth_1.EMPTY_ADDRESS, this.factoryContract, 'certificateAuthorityManagerContract', abi_2.CertificateAuthorityManagerAbi);
        this.batch = new Batch_1.Batch(this.web3, this.fromAddress || eth_1.EMPTY_ADDRESS, this.factoryContract, 'materialContract', abi_2.Material);
        this.transport = new Transport_1.Transport(this.web3, this.fromAddress || eth_1.EMPTY_ADDRESS, this.factoryContract, 'companyContract', abi_2.Company);
    }
    static init({ httpProvider, privateKey, factoryContractAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(httpProvider));
            web3.eth.accounts.wallet.add(privateKey);
            const proofchain = new Proofchain({
                web3,
                factoryContractAddress,
                fromAddress: web3.eth.accounts.wallet[0].address,
            });
            yield proofchain.batch.ensureContract();
            yield proofchain.certificateAuthority.ensureContract();
            yield proofchain.company.ensureContract();
            yield proofchain.material.ensureContract();
            yield proofchain.transport.ensureContract();
            return proofchain;
        });
    }
    /**
     * Creates a new proofchain instance. Similar to web3Init.
     * @see {@link web3Init}
     *
     * @param options       An object containing proofchain configuration parameters
     * @param options.web3Provider  Web3 provider. See {@link https://web3js.readthedocs.io/en/v1.3.4/web3-eth.html#providers|Web3.js}
     * @param options.factoryContractAddress  The address of Factory.sol
     * @param options.fromAddress  The address from which smart contract interaction will be done.
     * @returns Proofchain instance
     */
    static providerInit(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { web3Provider, factoryContractAddress, fromAddress } = options;
            const web3 = new web3_1.default(web3Provider);
            return yield this.web3Init({ web3, factoryContractAddress, fromAddress });
        });
    }
    /**
     * Creates a new proofchain instance
     *
     * @param options  An object containing proofchain configuration parameters
     * @param options.web3  The web3 instance used to execute transactions. Must have a provider. See {@link https://web3js.readthedocs.io/|Web3.js}
     * @param options.factoryContractAddress  The address of Factory.sol
     * @param options.fromAddress  The address from which smart contract interaction will be done.
     * @returns Proofchain instance
     */
    static web3Init(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { web3, factoryContractAddress, fromAddress } = options;
            const proofchain = new Proofchain({
                web3,
                fromAddress,
                factoryContractAddress,
            });
            yield proofchain.batch.ensureContract();
            yield proofchain.certificateAuthority.ensureContract();
            yield proofchain.company.ensureContract();
            yield proofchain.material.ensureContract();
            yield proofchain.transport.ensureContract();
            return proofchain;
        });
    }
    isInitialised() {
        return !!this.web3;
    }
}
exports.default = Proofchain;
