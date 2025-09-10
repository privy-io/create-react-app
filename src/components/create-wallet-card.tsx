import { useCreateWallet } from "@privy-io/react-auth";
import React from "react";
import { Badge } from "./ui/badge";

const CreateWalletCard = () => {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [walletAddress, setWalletAddress] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const { createWallet } = useCreateWallet({
    onSuccess: ({ wallet }) => {
      console.log("Created wallet ", wallet);
      setStatus("success");
      // Most embedded wallets expose an EVM address at wallet.address
      // Adjust here if you need a specific chain address
      setWalletAddress(wallet?.address ?? null);
    },
    onError: (error) => {
      console.error("Failed to create wallet with error ", error);
      setErrorMessage(error?.toString() ?? "Failed to create wallet");
      setStatus("error");
    },
  });

  const handleCreate = async () => {
    setErrorMessage(null);
    setStatus("loading");
    try {
      await createWallet({
        createAdditional: true,
      });
    } catch {
      // onError handler above will set error state
    }
  };
  return (
    <div className={["card", "card-padding"].join(" ")}>
      <div className="row-between-start">
        <div>
          <h3 className="card-title">
            Create wallet{" "}
            <Badge>
              <code>@/components/create-wallet-card.tsx</code>
            </Badge>
          </h3>
          <p className={["mt-1", "text-sm", "muted"].join(" ")}>
            Creates a new wallet for the user. To limit to a single wallet per
            user, remove the <code>createAdditional</code> flag from{" "}
            <code>createWallet</code>.
          </p>
        </div>
        {status === "success" && (
          <span className={["badge", "badge-success"].join(" ")}>
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M20 7L10 17L4 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Success
          </span>
        )}
      </div>

      {walletAddress && (
        <div
          className={["mt-3", "alert", "text-xs"].join(" ")}
          style={{
            background: "#f9fafb",
            color: "#374151",
            borderColor: "#e5e7eb",
          }}
        >
          <div className="card-title">Address</div>
          <div className={["mt-0.5", "truncate", "font-mono"].join(" ")}>
            {walletAddress}
          </div>
        </div>
      )}

      {errorMessage && status === "error" && (
        <div className={["mt-2", "alert", "alert-error", "text-xs"].join(" ")}>
          {errorMessage}
        </div>
      )}

      <button
        onClick={handleCreate}
        disabled={status === "loading"}
        className={["mt-3", "btn"].join(" ")}
      >
        {status === "loading" && (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {status === "loading" ? "Creating..." : "Create Wallet"}
      </button>
    </div>
  );
};

export default CreateWalletCard;
