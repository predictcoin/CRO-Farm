/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { CROPredict, CROPredictInterface } from "../CROPredict";

const _abi = [
  {
    inputs: [],
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
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "_burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "_decimals",
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
    inputs: [],
    name: "_name",
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
    name: "_symbol",
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
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
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
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
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
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506000339050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3506040518060400160405280600b81526020017f4352302050726564696374000000000000000000000000000000000000000000815250600690805190602001906200010092919062000268565b506040518060400160405280600381526020017f4352500000000000000000000000000000000000000000000000000000000000815250600590805190602001906200014e92919062000268565b506012600460006101000a81548160ff021916908360ff16021790555069152d02c7e14af680000060038190555060035460016000620001936200023f60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef6003546040518082815260200191505060405180910390a36200030e565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620002ab57805160ff1916838001178555620002dc565b82800160010185558215620002dc579182015b82811115620002db578251825591602001919060010190620002be565b5b509050620002eb9190620002ef565b5090565b5b808211156200030a576000816000905550600101620002f0565b5090565b611ad0806200031e6000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c8063893d20e8116100ad578063a9059cbb11610071578063a9059cbb1461058e578063b09f1266146105f2578063d28d885214610675578063dd62ed3e146106f8578063f2fde38b1461077057610121565b8063893d20e8146103f15780638da5cb5b1461042557806395d89b4114610459578063a22b35ce146104dc578063a457c2d71461052a57610121565b8063313ce567116100f4578063313ce567146102af57806332424aa3146102d057806339509351146102f157806342966c681461035557806370a082311461039957610121565b806306fdde0314610126578063095ea7b3146101a957806318160ddd1461020d57806323b872dd1461022b575b600080fd5b61012e6107b4565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561016e578082015181840152602081019050610153565b50505050905090810190601f16801561019b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101f5600480360360408110156101bf57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610856565b60405180821515815260200191505060405180910390f35b610215610874565b6040518082815260200191505060405180910390f35b6102976004803603606081101561024157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061087e565b60405180821515815260200191505060405180910390f35b6102b7610957565b604051808260ff16815260200191505060405180910390f35b6102d861096e565b604051808260ff16815260200191505060405180910390f35b61033d6004803603604081101561030757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610981565b60405180821515815260200191505060405180910390f35b6103816004803603602081101561036b57600080fd5b8101908080359060200190929190505050610a34565b60405180821515815260200191505060405180910390f35b6103db600480360360208110156103af57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a50565b6040518082815260200191505060405180910390f35b6103f9610a99565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61042d610aa8565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610461610ad1565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104a1578082015181840152602081019050610486565b50505050905090810190601f1680156104ce5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610528600480360360408110156104f257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610b73565b005b6105766004803603604081101561054057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c42565b60405180821515815260200191505060405180910390f35b6105da600480360360408110156105a457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610d0f565b60405180821515815260200191505060405180910390f35b6105fa610d2d565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561063a57808201518184015260208101905061061f565b50505050905090810190601f1680156106675780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61067d610dcb565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156106bd5780820151818401526020810190506106a2565b50505050905090810190601f1680156106ea5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61075a6004803603604081101561070e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e69565b6040518082815260200191505060405180910390f35b6107b26004803603602081101561078657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610ef0565b005b606060068054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561084c5780601f106108215761010080835404028352916020019161084c565b820191906000526020600020905b81548152906001019060200180831161082f57829003601f168201915b5050505050905090565b600061086a610863610fc4565b8484610fcc565b6001905092915050565b6000600354905090565b600061088b8484846111c3565b61094c84610897610fc4565b6109478560405180606001604052806028815260200161197c60289139600260008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006108fd610fc4565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461147d9092919063ffffffff16565b610fcc565b600190509392505050565b6000600460009054906101000a900460ff16905090565b600460009054906101000a900460ff1681565b6000610a2a61098e610fc4565b84610a25856002600061099f610fc4565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461153d90919063ffffffff16565b610fcc565b6001905092915050565b6000610a47610a41610fc4565b836115c5565b60019050919050565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000610aa3610aa8565b905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b695780601f10610b3e57610100808354040283529160200191610b69565b820191906000526020600020905b815481529060010190602001808311610b4c57829003601f168201915b5050505050905090565b610b7d82826115c5565b610c3e82610b89610fc4565b610c3984604051806060016040528060248152602001611a5560249139600260008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000610bef610fc4565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461147d9092919063ffffffff16565b610fcc565b5050565b6000610d05610c4f610fc4565b84610d00856040518060600160405280602581526020016119ed6025913960026000610c79610fc4565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461147d9092919063ffffffff16565b610fcc565b6001905092915050565b6000610d23610d1c610fc4565b84846111c3565b6001905092915050565b60058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610dc35780601f10610d9857610100808354040283529160200191610dc3565b820191906000526020600020905b815481529060010190602001808311610da657829003601f168201915b505050505081565b60068054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e615780601f10610e3657610100808354040283529160200191610e61565b820191906000526020600020905b815481529060010190602001808311610e4457829003601f168201915b505050505081565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b610ef8610fc4565b73ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610fb8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b610fc18161177f565b50565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611052576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806119326024913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156110d8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180611a796022913960400191505060405180910390fd5b80600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611249576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602581526020018061190d6025913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156112cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001806119ca6023913960400191505060405180910390fd5b61133b816040518060600160405280602681526020016119a460269139600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461147d9092919063ffffffff16565b600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506113d081600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461153d90919063ffffffff16565b600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b600083831115829061152a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156114ef5780820151818401526020810190506114d4565b50505050905090810190601f16801561151c5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385039050809150509392505050565b6000808284019050838110156115bb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561164b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180611a126021913960400191505060405180910390fd5b6116b781604051806060016040528060228152602001611a3360229139600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461147d9092919063ffffffff16565b600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061170f816003546118c290919063ffffffff16565b600381905550600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611805576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806119566026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600061190483836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061147d565b90509291505056fe42455032303a207472616e736665722066726f6d20746865207a65726f206164647265737342455032303a20617070726f76652066726f6d20746865207a65726f20616464726573734f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737342455032303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636542455032303a207472616e7366657220616d6f756e7420657863656564732062616c616e636542455032303a207472616e7366657220746f20746865207a65726f206164647265737342455032303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f42455032303a206275726e2066726f6d20746865207a65726f206164647265737342455032303a206275726e20616d6f756e7420657863656564732062616c616e636542455032303a206275726e20616d6f756e74206578636565647320616c6c6f77616e636542455032303a20617070726f766520746f20746865207a65726f2061646472657373a264697066735822122036f3e8df62b17c7402979560516c0b6bcf228e84c8dbe730f818f76616cdfec664736f6c634300060c0033";

type CROPredictConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CROPredictConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CROPredict__factory extends ContractFactory {
  constructor(...args: CROPredictConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "CROPredict";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CROPredict> {
    return super.deploy(overrides || {}) as Promise<CROPredict>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CROPredict {
    return super.attach(address) as CROPredict;
  }
  connect(signer: Signer): CROPredict__factory {
    return super.connect(signer) as CROPredict__factory;
  }
  static readonly contractName: "CROPredict";
  public readonly contractName: "CROPredict";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CROPredictInterface {
    return new utils.Interface(_abi) as CROPredictInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CROPredict {
    return new Contract(address, _abi, signerOrProvider) as CROPredict;
  }
}
