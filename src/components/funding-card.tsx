import { useFundWallet, useWallets } from "@privy-io/react-auth";
import { Badge } from "./ui/badge";

const FudningCard = () => {
  const { wallets } = useWallets();
  const { fundWallet } = useFundWallet();
  const handleFundWallet = async () => {
    await fundWallet(wallets[0]?.address as string);
  };

  const handleFundWalletWithUSDC = async () => {
    await fundWallet(wallets[0]?.address as string, {
      asset: "USDC",
      amount: "1",
    });
  };

  return (
    <div>
      <div className={["card", "card-padding"].join(" ")}>
        <div className="row-between-start">
          <div>
            <h3 className="card-title">
              Fund Wallet{" "}
              <Badge>
                <code>@/components/funding-card.tsx</code>
              </Badge>
            </h3>
          </div>
        </div>
        <button onClick={handleFundWallet} className="btn">
          Fund Wallet
        </button>
        <button onClick={handleFundWalletWithUSDC} className="btn">
          Fund Wallet with USDC
        </button>
      </div>
    </div>
  );
};

export default FudningCard;
