"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryBytecode = exports.CertificateAuthorityManagerAbi = exports.Material = exports.Company = exports.Aggregator = exports.Factory = void 0;
var _Factory_sol_Factory_abi_json_1 = require("./contract-build/_Factory_sol_Factory.abi.json");
Object.defineProperty(exports, "Factory", { enumerable: true, get: function () { return __importDefault(_Factory_sol_Factory_abi_json_1).default; } });
var _Aggregator_sol_Aggregator_abi_json_1 = require("./contract-build/_Aggregator_sol_Aggregator.abi.json");
Object.defineProperty(exports, "Aggregator", { enumerable: true, get: function () { return __importDefault(_Aggregator_sol_Aggregator_abi_json_1).default; } });
var _Company_sol_Company_abi_json_1 = require("./contract-build/_Company_sol_Company.abi.json");
Object.defineProperty(exports, "Company", { enumerable: true, get: function () { return __importDefault(_Company_sol_Company_abi_json_1).default; } });
var _Material_sol_Material_abi_json_1 = require("./contract-build/_Material_sol_Material.abi.json");
Object.defineProperty(exports, "Material", { enumerable: true, get: function () { return __importDefault(_Material_sol_Material_abi_json_1).default; } });
var _CertificateAuthorityManager_sol_CertificateAuthorityManager_abi_json_1 = require("./contract-build/_CertificateAuthorityManager_sol_CertificateAuthorityManager.abi.json");
Object.defineProperty(exports, "CertificateAuthorityManagerAbi", { enumerable: true, get: function () { return __importDefault(_CertificateAuthorityManager_sol_CertificateAuthorityManager_abi_json_1).default; } });
const _Factory_sol_Factory_bin_json_1 = __importDefault(require("./contract-build/_Factory_sol_Factory.bin.json"));
exports.FactoryBytecode = _Factory_sol_Factory_bin_json_1.default[0];
