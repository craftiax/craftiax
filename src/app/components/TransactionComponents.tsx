import { useCallback } from "react";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import type { LifecycleStatus } from "@coinbase/onchainkit/transaction";
import { Wallet, ConnectWallet } from "@coinbase/onchainkit/wallet";
import {
  artistPaymentContractAddress,
  artistPaymentContractAbi,
} from "./contracts/contract";
import { useAccount } from "wagmi";
import { parseEther } from "ethers";

interface TransactionComponentsProps {
  artistAddress: string;
  amount: string;
}

export default function TransactionComponents({
  artistAddress,
  amount,
}: TransactionComponentsProps) {
  const { address } = useAccount();
  const BASE_SEPOLIA_CHAIN_ID = 84532; // Base Sepolia chain ID

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log("LifecycleStatus", status);
  }, []);

  // Convert amount to wei
  const amountInWei = amount ? parseEther(amount) : "0";

  const contracts = [
    {
      address: artistPaymentContractAddress as `0x${string}`,
      abi: artistPaymentContractAbi,
      functionName: "payArtist",
      args: [artistAddress],
      value: amountInWei,
    },
  ];

  return address ? (
    <Transaction
      chainId={BASE_SEPOLIA_CHAIN_ID}
      contracts={contracts}
      onStatus={handleOnStatus}
    >
      <TransactionButton></TransactionButton>
      <TransactionSponsor />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>
  ) : (
    <Wallet>
      <ConnectWallet>
        <Avatar className="h-6 w-6" />
        <Name />
      </ConnectWallet>
    </Wallet>
  );
}
