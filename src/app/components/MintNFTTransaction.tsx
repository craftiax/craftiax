import React from "react";
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction,
} from "@coinbase/onchainkit/transaction";
import { useAccount } from "wagmi";

interface MintNFTTransactionProps {
  metadataUrl: string;
}

const MintNFTTransaction: React.FC<MintNFTTransactionProps> = ({
  metadataUrl,
}) => {
  const { address } = useAccount();
  const BASE_SEPOLIA_CHAIN_ID = 84532;

  const contracts = [
    {
      address: "0xc3e53F2b286C6334908FcF2EBADd4349ED86048B" as `0x${string}`,
      abi: [
        {
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "string", name: "uri", type: "string" },
          ],
          name: "safeMint",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      functionName: "safeMint",
      args: [address, metadataUrl],
    },
  ];

  return (
    <Transaction chainId={BASE_SEPOLIA_CHAIN_ID} contracts={contracts}>
      <TransactionButton>Mint NFT</TransactionButton>
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>
  );
};

export default MintNFTTransaction;
