import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
// import { color } from "@coinbase/onchainkit/theme";
import { useDisconnect } from "wagmi";

export function WalletComponents() {
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    console.log("Disconnect clicked");
    disconnect();
  };

  return (
    <div className="flex justify-end">
      <Wallet>
        <ConnectWallet withWalletAggregator>
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownBasename />
          <WalletDropdownLink icon="wallet" href="https://keys.coinbase.com">
            Wallet
          </WalletDropdownLink>
          <WalletDropdownFundLink />
          <button type="button" onClick={handleDisconnect}>
            {" "}
            <WalletDropdownDisconnect />
          </button>{" "}
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
