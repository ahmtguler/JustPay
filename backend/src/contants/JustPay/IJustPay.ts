/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export declare namespace LibPayment {
  export type PaymentStruct = {
    paymentId: BigNumberish;
    sender: AddressLike;
    receiver: AddressLike;
    token: AddressLike;
    amount: BigNumberish;
    executor: AddressLike;
    feeToken: AddressLike;
    feeAmount: BigNumberish;
    chainId: BigNumberish;
    deadline: BigNumberish;
    salt: BigNumberish;
  };

  export type PaymentStructOutput = [
    paymentId: bigint,
    sender: string,
    receiver: string,
    token: string,
    amount: bigint,
    executor: string,
    feeToken: string,
    feeAmount: bigint,
    chainId: bigint,
    deadline: bigint,
    salt: bigint
  ] & {
    paymentId: bigint;
    sender: string;
    receiver: string;
    token: string;
    amount: bigint;
    executor: string;
    feeToken: string;
    feeAmount: bigint;
    chainId: bigint;
    deadline: bigint;
    salt: bigint;
  };
}

export interface IJustPayInterface extends Interface {
  getFunction(
    nameOrSignature: "cancelPayment" | "processPayment"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "cancelPayment",
    values: [LibPayment.PaymentStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "processPayment",
    values: [LibPayment.PaymentStruct, BytesLike, AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "cancelPayment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "processPayment",
    data: BytesLike
  ): Result;
}

export interface IJustPay extends BaseContract {
  connect(runner?: ContractRunner | null): IJustPay;
  waitForDeployment(): Promise<this>;

  interface: IJustPayInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  cancelPayment: TypedContractMethod<
    [_payment: LibPayment.PaymentStruct],
    [void],
    "nonpayable"
  >;

  processPayment: TypedContractMethod<
    [
      _payment: LibPayment.PaymentStruct,
      _signature: BytesLike,
      _feeReceiver: AddressLike
    ],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "cancelPayment"
  ): TypedContractMethod<
    [_payment: LibPayment.PaymentStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "processPayment"
  ): TypedContractMethod<
    [
      _payment: LibPayment.PaymentStruct,
      _signature: BytesLike,
      _feeReceiver: AddressLike
    ],
    [void],
    "nonpayable"
  >;

  filters: {};
}
