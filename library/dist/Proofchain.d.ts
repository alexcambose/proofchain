export { CERTIFICATE_ASSIGNMENT_TYPE } from './Material';
export { CompanyEntityTypeEnum } from './enums';
import { Company } from './Company';
import { Material } from './Material';
import { CertificateAuthority } from './CertificateAuthority';
import { Batch } from './Batch';
import { Transport } from './Transport';
/**
 * Main class
 */
declare class Proofchain {
    private factoryContract;
    private web3;
    private fromAddress?;
    /**
     * Material class instance.
     */
    material: Material;
    /**
     * Company class instance.
     */
    company: Company;
    /**
     * Batch class instance.
     */
    batch: Batch;
    /**
     * Transport class instance.
     */
    transport: Transport;
    /**
     * CertificateAuthority class instance.
     */
    certificateAuthority: CertificateAuthority;
    /**
     * Proofchain constructor function
     *
     * @param options       An object containing proofchain configuration parameters
     * @param options.web3  The web3 instance used to execute transactions. Must have a provider. See {@link https://web3js.readthedocs.io/|Web3.js}
     * @param options.factoryContractAddress  The address of Factory.sol
     * @param options.fromAddress  The address from which smart contract interaction will be done.
     */
    private constructor();
    protected static init({ httpProvider, privateKey, factoryContractAddress, }: {
        httpProvider: string;
        privateKey: string;
        factoryContractAddress: string;
    }): Promise<Proofchain>;
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
    static providerInit(options: {
        web3Provider: any;
        factoryContractAddress: string;
        fromAddress?: string;
    }): Promise<Proofchain>;
    /**
     * Creates a new proofchain instance
     *
     * @param options  An object containing proofchain configuration parameters
     * @param options.web3  The web3 instance used to execute transactions. Must have a provider. See {@link https://web3js.readthedocs.io/|Web3.js}
     * @param options.factoryContractAddress  The address of Factory.sol
     * @param options.fromAddress  The address from which smart contract interaction will be done.
     * @returns Proofchain instance
     */
    static web3Init(options: {
        web3: any;
        factoryContractAddress: string;
        fromAddress?: string;
    }): Promise<Proofchain>;
    isInitialised(): boolean;
}
export default Proofchain;
