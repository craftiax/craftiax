import React from "react";
import { TransactionButton } from "@coinbase/onchainkit/transaction";
import { useTransactionContext } from "@coinbase/onchainkit/transaction";

interface CustomTransactionButtonProps {
  onUpload: () => Promise<void>;
  isUploaded: boolean;
  disabled: boolean;
}

export default function CustomTransactionButton({
  onUpload,
  isUploaded,
  disabled,
}: CustomTransactionButtonProps) {
  const { onSubmit } = useTransactionContext();

  const handleCustomSubmit = async () => {
    if (!isUploaded) {
      await onUpload();
    } else {
      onSubmit();
    }
  };

  return (
    <TransactionButton
      text={isUploaded ? "Mint NFT" : "Upload and Mint NFT"}
      onClick={handleCustomSubmit}
      disabled={disabled}
    />
  );
}
