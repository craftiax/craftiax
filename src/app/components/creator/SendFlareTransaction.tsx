import {
  Transaction,
  TransactionButton,
} from "@coinbase/onchainkit/transaction";
import { encodeFunctionData, Hex } from "viem";
import { baseSepolia } from "wagmi/chains";

const clickContractAddress: Hex = "0x67c97D1FB8184F038592b2109F854dfb09C77C75";
const clickContractAbi = [
  {
    type: "function",
    name: "click",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

const encodedClickData = encodeFunctionData({
  abi: clickContractAbi,
  functionName: "click",
});

const calls = [
  {
    to: clickContractAddress,
    data: encodedClickData,
  },
];

export default function TransactionWithCalls() {
  return (
    <Transaction
      chainId={baseSepolia.id}
      calls={calls}
      onStatus={(status) => console.log("Transaction status:", status)}
    >
      <TransactionButton />
    </Transaction>
  );
}
