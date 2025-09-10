import { useSessionSigners, useWallets } from "@privy-io/react-auth";
import React from "react";
import { Badge } from "./ui/badge";
import { Expandable } from "./ui/expandable";

const SessionSignersCard = () => {
  const { wallets } = useWallets();
  const { addSessionSigners } = useSessionSigners();

  type Status = "idle" | "loading" | "success" | "error";
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<string | null>(null);

  const handleAddSessionSigners = async () => {
    try {
      setError(null);
      setResult(null);
      setStatus("loading");
      await addSessionSigners({
        address: wallets[0]?.address,
        signers: [
          {
            signerId: process.env.NEXT_PUBLIC_PRIVY_SIGNER_ID!,
            policyIds: [],
          },
        ],
      });
      setResult("Session signer added");
      setStatus("success");
    } catch (e) {
      setError(e?.toString?.() ?? "Failed to add session signer");
      setStatus("error");
    }
  };

  return (
    <Expandable
      title="Session signers"
      className={["card", "card-padding"].join(" ")}
    >
      <div className="row-between-start">
        <div>
          <h3 className="card-title">
            Session signers{" "}
            <Badge>
              <code>@/components/session-signers-card.tsx</code>
            </Badge>
          </h3>
          <p className={["mt-1", "text-sm", "muted"].join(" ")}>
            Delegate signing to a trusted service for actions like limit orders
            or scheduled transactions when the user is offline.
          </p>
        </div>
      </div>

      {status !== "idle" && (
        <div className="mt-2">
          <Badge
            variant={
              status === "success"
                ? "success"
                : status === "error"
                ? "destructive"
                : "default"
            }
          >
            {status}
          </Badge>
        </div>
      )}

      {error && (
        <div className={["mt-3", "alert", "alert-error", "text-xs"].join(" ")}>
          {error}
        </div>
      )}
      {result && (
        <div
          className={["mt-3", "alert", "alert-success", "text-xs"].join(" ")}
        >
          {result}
        </div>
      )}

      <div className="mt-3">
        <button
          onClick={handleAddSessionSigners}
          disabled={status === "loading"}
          className="btn"
        >
          {status === "loading" ? "Adding…" : "Add session signer"}
        </button>
      </div>
    </Expandable>
  );
};

export default SessionSignersCard;
