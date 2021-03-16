import Web3 from 'web3';
import Company from './Company';
import Material from './Material';
import CertificateAuthority from './CertificateAuthority';
import Batch from './Batch';
interface IProofchainConfig {
    factoryContractAddress: string;
}
/**
 * Main class
 */
declare class Proofchain {
    private factoryContract;
    private web3;
    private fromAddress;
    material: Material;
    company: Company;
    batch: Batch;
    certificateAuthority: CertificateAuthority;
    constructor({ web3, factoryContractAddress, fromAddress, }: {
        web3: Web3;
        factoryContractAddress: string;
        fromAddress: string;
    });
    static init({ httpProvider, privateKey, factoryContractAddress, }: IProofchainConfig & {
        httpProvider: string;
        privateKey: string;
    }): Proofchain;
    static providerInit({ web3Provider, factoryContractAddress, fromAddress, }: IProofchainConfig & {
        web3Provider: any;
        fromAddress: string;
    }): Proofchain;
    static web3Init({ web3, factoryContractAddress, fromAddress, }: IProofchainConfig & {
        web3: any;
        fromAddress: string;
    }): Proofchain;
    isInitialised(): boolean;
}
export default Proofchain;
