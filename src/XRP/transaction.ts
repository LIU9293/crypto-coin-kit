// @ts-ignore
import binary from "ripple-binary-codec";

type TransactionType = "Payment";

export interface TxbProps {
  transactionType: TransactionType;
  account: string;
  destination: string;
  destinationTag?: number;
  amount: string;
  fee: string;
  sequence: number;
}

export class TransactionBuilder {
  private readonly flags = 2147483648;
  private readonly transactionType: string;
  private readonly destination: string;
  private readonly destinationTag?: number;
  private readonly account: string;
  private readonly amount: string;
  private readonly fee: string;
  private readonly sequence: number;

  constructor(args: TxbProps) {
    const {
      transactionType,
      account,
      amount,
      destination,
      destinationTag,
      fee,
      sequence
    } = args;
    this.transactionType = transactionType;
    this.account = account;
    this.amount = amount;
    this.destination = destination;
    this.destinationTag = destinationTag;
    this.fee = fee;
    this.sequence = sequence;
  }

  public toBinary(): string {
    const txJson = this.toJSON();
    return binary.encodeForSigning(txJson);
  }

  private toJSON(): any {
    const partialTx = {
      Account: this.account,
      Amount: this.amount,
      Destination: this.destination,
      Fee: this.fee,
      Flags: this.flags,
      Sequence: this.sequence,
      TransactionType: this.transactionType
    };
    // DestinationTag: undefined or null will produce an unexpected 2E00000000 hex fragment in unsigned TX;
    return this.destinationTag
      ? { ...partialTx, DestinationTag: this.destinationTag }
      : partialTx;
  }
}