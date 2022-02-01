/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SherToken, SherTokenInterface } from "../SherToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000e2538038062000e25833981016040819052620000349162000240565b6040805180820182526008815267536865726c6f636b60c01b60208083019182528351808501909452600484526329a422a960e11b90840152815191929162000080916003916200019a565b508051620000969060049060208401906200019a565b505050620000ab3382620000b260201b60201c565b50620002be565b6001600160a01b0382166200010d5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546200012191906200025a565b90915550506001600160a01b03821660009081526020819052604081208054839290620001509084906200025a565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620001a89062000281565b90600052602060002090601f016020900481019282620001cc576000855562000217565b82601f10620001e757805160ff191683800117855562000217565b8280016001018555821562000217579182015b8281111562000217578251825591602001919060010190620001fa565b506200022592915062000229565b5090565b5b808211156200022557600081556001016200022a565b6000602082840312156200025357600080fd5b5051919050565b600082198211156200027c57634e487b7160e01b600052601160045260246000fd5b500190565b600181811c908216806200029657607f821691505b60208210811415620002b857634e487b7160e01b600052602260045260246000fd5b50919050565b610b5780620002ce6000396000f3fe608060405234801561001057600080fd5b50600436106100c95760003560e01c80633950935111610081578063a457c2d71161005b578063a457c2d714610194578063a9059cbb146101a7578063dd62ed3e146101ba57600080fd5b8063395093511461014357806370a082311461015657806395d89b411461018c57600080fd5b806318160ddd116100b257806318160ddd1461010f57806323b872dd14610121578063313ce5671461013457600080fd5b806306fdde03146100ce578063095ea7b3146100ec575b600080fd5b6100d6610200565b6040516100e39190610937565b60405180910390f35b6100ff6100fa3660046109d3565b610292565b60405190151581526020016100e3565b6002545b6040519081526020016100e3565b6100ff61012f3660046109fd565b6102a8565b604051601281526020016100e3565b6100ff6101513660046109d3565b610393565b610113610164366004610a39565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b6100d66103dc565b6100ff6101a23660046109d3565b6103eb565b6100ff6101b53660046109d3565b6104c3565b6101136101c8366004610a5b565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b60606003805461020f90610a8e565b80601f016020809104026020016040519081016040528092919081815260200182805461023b90610a8e565b80156102885780601f1061025d57610100808354040283529160200191610288565b820191906000526020600020905b81548152906001019060200180831161026b57829003601f168201915b5050505050905090565b600061029f3384846104d0565b50600192915050565b60006102b5848484610683565b73ffffffffffffffffffffffffffffffffffffffff841660009081526001602090815260408083203384529091529020548281101561037b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206160448201527f6c6c6f77616e636500000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b61038885338584036104d0565b506001949350505050565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168452909152812054909161029f9185906103d7908690610ae2565b6104d0565b60606004805461020f90610a8e565b33600090815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff86168452909152812054828110156104ac576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f0000000000000000000000000000000000000000000000000000006064820152608401610372565b6104b933858584036104d0565b5060019392505050565b600061029f338484610683565b73ffffffffffffffffffffffffffffffffffffffff8316610572576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610372565b73ffffffffffffffffffffffffffffffffffffffff8216610615576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f73730000000000000000000000000000000000000000000000000000000000006064820152608401610372565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff8316610726576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610372565b73ffffffffffffffffffffffffffffffffffffffff82166107c9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610372565b73ffffffffffffffffffffffffffffffffffffffff83166000908152602081905260409020548181101561087f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610372565b73ffffffffffffffffffffffffffffffffffffffff8085166000908152602081905260408082208585039055918516815290812080548492906108c3908490610ae2565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161092991815260200190565b60405180910390a350505050565b600060208083528351808285015260005b8181101561096457858101830151858201604001528201610948565b81811115610976576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b803573ffffffffffffffffffffffffffffffffffffffff811681146109ce57600080fd5b919050565b600080604083850312156109e657600080fd5b6109ef836109aa565b946020939093013593505050565b600080600060608486031215610a1257600080fd5b610a1b846109aa565b9250610a29602085016109aa565b9150604084013590509250925092565b600060208284031215610a4b57600080fd5b610a54826109aa565b9392505050565b60008060408385031215610a6e57600080fd5b610a77836109aa565b9150610a85602084016109aa565b90509250929050565b600181811c90821680610aa257607f821691505b60208210811415610adc577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b60008219821115610b1c577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b50019056fea264697066735822122015b8cafbf47c344dbf0e561b2f26dc328f38de0d33d2c90708ca8035579c926764736f6c634300080a0033";

type SherTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SherTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SherToken__factory extends ContractFactory {
  constructor(...args: SherTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "SherToken";
  }

  deploy(
    initialSupply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SherToken> {
    return super.deploy(initialSupply, overrides || {}) as Promise<SherToken>;
  }
  getDeployTransaction(
    initialSupply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(initialSupply, overrides || {});
  }
  attach(address: string): SherToken {
    return super.attach(address) as SherToken;
  }
  connect(signer: Signer): SherToken__factory {
    return super.connect(signer) as SherToken__factory;
  }
  static readonly contractName: "SherToken";
  public readonly contractName: "SherToken";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SherTokenInterface {
    return new utils.Interface(_abi) as SherTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SherToken {
    return new Contract(address, _abi, signerOrProvider) as SherToken;
  }
}
