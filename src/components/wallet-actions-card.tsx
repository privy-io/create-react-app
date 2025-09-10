import {
  useWallets,
  useSendTransaction,
  useSignMessage,
  useSignTransaction,
} from "@privy-io/react-auth";
import { encodeFunctionData, erc20Abi } from "viem";
import React from "react";
import { Badge } from "./ui/badge";

const WalletActionsCard = () => {
  const { signMessage } = useSignMessage();
  const { signTransaction } = useSignTransaction();
  const { sendTransaction } = useSendTransaction();
  const { wallets } = useWallets();

  type Status = "idle" | "loading" | "success" | "error";
  const [messageStatus, setMessageStatus] = React.useState<Status>("idle");
  const [txStatus, setTxStatus] = React.useState<Status>("idle");
  const [sendStatus, setSendStatus] = React.useState<Status>("idle");
  const [usdcStatus, setUsdcStatus] = React.useState<Status>("idle");

  const [messageResult, setMessageResult] = React.useState<string | null>(null);
  const [txResult, setTxResult] = React.useState<string | null>(null);
  const [sendResult, setSendResult] = React.useState<string | null>(null);
  const [usdcResult, setUsdcResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleSignMessage = async () => {
    try {
      setError(null);
      setMessageStatus("loading");
      setMessageResult(null);
      const message = "Hello, world!";
      const { signature } = await signMessage(
        { message },
        { address: wallets[0]?.address }
      );
      setMessageResult(signature);
      setMessageStatus("success");
    } catch (e) {
      setError(e?.toString?.() ?? "Failed to sign message");
      setMessageStatus("error");
    }
  };

  const handleSignTransaction = async () => {
    try {
      setError(null);
      setTxStatus("loading");
      setTxResult(null);
      const transaction = await signTransaction(
        { to: "0xE3070d3e4309afA3bC9a6b057685743CF42da77C", value: 10000 },
        { address: wallets[0]?.address }
      );
      setTxResult(
        typeof transaction === "string"
          ? transaction
          : JSON.stringify(transaction)
      );
      setTxStatus("success");
    } catch (e) {
      setError(e?.toString?.() ?? "Failed to sign transaction");
      setTxStatus("error");
    }
  };

  const handleSendTransaction = async () => {
    try {
      setError(null);
      setSendStatus("loading");
      setSendResult(null);
      const transaction = await sendTransaction(
        { to: "0xE3070d3e4309afA3bC9a6b057685743CF42da77C", value: 10000 },
        { address: wallets[0]?.address }
      );
      setSendResult(
        typeof transaction === "string"
          ? transaction
          : JSON.stringify(transaction)
      );
      setSendStatus("success");
    } catch (e) {
      setError(e?.toString?.() ?? "Failed to send transaction");
      setSendStatus("error");
    }
  };

  const handleSendUSDCTransaction = async () => {
    try {
      setError(null);
      setUsdcStatus("loading");
      setUsdcResult(null);
      const data = encodeFunctionData({
        abi: erc20Abi,
        functionName: "transfer",
        args: ["0xE3070d3e4309afA3bC9a6b057685743CF42da77C", BigInt(1000000)],
      });
      const transaction = await sendTransaction({
        to: "0xE3070d3e4309afA3bC9a6b057685743CF42da77C",
        data,
      });
      setUsdcResult(
        typeof transaction === "string"
          ? transaction
          : JSON.stringify(transaction)
      );
      setUsdcStatus("success");
    } catch (e) {
      setError(e?.toString?.() ?? "Failed to send USDC transaction");
      setUsdcStatus("error");
    }
  };

  return (
    <div className={["card", "card-padding"].join(" ")}>
      <div className="row-between-start">
        <div>
          <h3 className="card-title">
            Wallet actions{" "}
            <Badge>
              <code>@/components/wallet-actions-card.tsx</code>
            </Badge>
          </h3>
          <p className={["mt-1", "text-sm", "muted"].join(" ")}>
            If you are using Privy embedded wallets, you can disable the UI
            modal prompt on these actions. So users can have seamless one click
            experience.
          </p>
        </div>
      </div>

      {error && (
        <div className={["mt-3", "alert", "alert-error", "text-xs"].join(" ")}>
          {error}
        </div>
      )}

      <div className={["mt-3", "row", "wrap", "gap-2"].join(" ")}>
        <button
          onClick={handleSignMessage}
          disabled={messageStatus === "loading"}
          className="btn"
        >
          {messageStatus === "loading" ? "Signing message…" : "Sign message"}
        </button>
        {messageStatus !== "idle" && (
          <div className={["row", "gap-2"].join(" ")}>
            <Badge
              variant={
                messageStatus === "success"
                  ? "success"
                  : messageStatus === "error"
                  ? "destructive"
                  : "default"
              }
            >
              {messageStatus}
            </Badge>
            {messageResult && (
              <span className={["truncate", "text-xs", "muted"].join(" ")}>
                {messageResult}
              </span>
            )}
          </div>
        )}

        <button
          onClick={handleSignTransaction}
          disabled={txStatus === "loading"}
          className="btn"
        >
          {txStatus === "loading" ? "Signing transaction…" : "Sign transaction"}
        </button>
        {txStatus !== "idle" && (
          <div className={["row", "gap-2"].join(" ")}>
            <Badge
              variant={
                txStatus === "success"
                  ? "success"
                  : txStatus === "error"
                  ? "destructive"
                  : "default"
              }
            >
              {txStatus}
            </Badge>
            {txResult && (
              <span className={["truncate", "text-xs", "muted"].join(" ")}>
                {txResult}
              </span>
            )}
          </div>
        )}

        <button
          onClick={handleSendTransaction}
          disabled={sendStatus === "loading"}
          className="btn"
        >
          {sendStatus === "loading"
            ? "Sending transaction…"
            : "Send transaction"}
        </button>
        {sendStatus !== "idle" && (
          <div className={["row", "gap-2"].join(" ")}>
            <Badge
              variant={
                sendStatus === "success"
                  ? "success"
                  : sendStatus === "error"
                  ? "destructive"
                  : "default"
              }
            >
              {sendStatus}
            </Badge>
            {sendResult && (
              <span className={["truncate", "text-xs", "muted"].join(" ")}>
                {sendResult}
              </span>
            )}
          </div>
        )}

        <button
          onClick={handleSendUSDCTransaction}
          disabled={usdcStatus === "loading"}
          className="btn"
        >
          {usdcStatus === "loading" ? "Sending USDC…" : "Send USDC transaction"}
        </button>
        {usdcStatus !== "idle" && (
          <div className={["row", "gap-2"].join(" ")}>
            <Badge
              variant={
                usdcStatus === "success"
                  ? "success"
                  : usdcStatus === "error"
                  ? "destructive"
                  : "default"
              }
            >
              {usdcStatus}
            </Badge>
            {usdcResult && (
              <span className={["truncate", "text-xs", "muted"].join(" ")}>
                {usdcResult}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletActionsCard;
