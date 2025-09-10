import { useLinkAccount } from "@privy-io/react-auth";
import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Expandable } from "./ui/expandable";
type Status = "idle" | "loading" | "success" | "error";
type Action = "github" | "twitter" | "google" | "wallet" | null;

const LinkAccountsCard = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [currentAction, setCurrentAction] = useState<Action>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const { linkGithub, linkTwitter, linkGoogle, linkWallet } = useLinkAccount({
    onSuccess: () => {
      setResult("Linked successfully");
      setStatus("success");
    },
    onError: (e) => {
      setError(e?.toString?.() ?? "Failed to link account");
      setStatus("error");
    },
  });

  const badgeFor = (status: Status) => (
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
  );

  return (
    <Expandable
      title="Link Accounts"
      className={["card", "card-padding"].join(" ")}
    >
      <div className="row-between-start">
        <div>
          <h3 className="card-title">
            Link Accounts{" "}
            <Badge>
              <code>@/components/link-accounts-card.tsx</code>
            </Badge>
          </h3>
          <p className={["mt-1", "muted", "text-sm"].join(" ")}>
            Link social accounts or external wallets to the current user. Privy
            support almost every popular social provider, read more at{" "}
            <a
              href="https://docs.privy.io/user-management/users/linking-accounts"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Link Accounts Documentation
            </a>
          </p>
        </div>
      </div>

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

      <div className={["mt-3", "grid", "grid-1", "grid-gap-2"].join(" ")}>
        <button
          onClick={() => {
            setError(null);
            setResult(null);
            setCurrentAction("github");
            setStatus("loading");
            linkGithub();
          }}
          disabled={status === "loading" && currentAction === "github"}
          className="btn"
        >
          {status === "loading" && currentAction === "github"
            ? "Linking GitHub…"
            : "Link GitHub"}
        </button>
        {currentAction === "github" && status !== "idle" && (
          <div className={["row", "gap-2"].join(" ")}>{badgeFor(status)}</div>
        )}

        <button
          onClick={() => {
            setError(null);
            setResult(null);
            setCurrentAction("twitter");
            setStatus("loading");
            linkTwitter();
          }}
          disabled={status === "loading" && currentAction === "twitter"}
          className="btn"
        >
          {status === "loading" && currentAction === "twitter"
            ? "Linking Twitter…"
            : "Link Twitter"}
        </button>
        {currentAction === "twitter" && status !== "idle" && (
          <div className={["row", "gap-2"].join(" ")}>{badgeFor(status)}</div>
        )}

        <button
          onClick={() => {
            setError(null);
            setResult(null);
            setCurrentAction("google");
            setStatus("loading");
            linkGoogle();
          }}
          disabled={status === "loading" && currentAction === "google"}
          className="btn"
        >
          {status === "loading" && currentAction === "google"
            ? "Linking Google…"
            : "Link Google"}
        </button>
        {currentAction === "google" && status !== "idle" && (
          <div className={["row", "gap-2"].join(" ")}>{badgeFor(status)}</div>
        )}

        <button
          onClick={() => {
            setError(null);
            setResult(null);
            setCurrentAction("wallet");
            setStatus("loading");
            linkWallet();
          }}
          disabled={status === "loading" && currentAction === "wallet"}
          className="btn"
        >
          {status === "loading" && currentAction === "wallet"
            ? "Linking wallet…"
            : "Link wallet"}
        </button>
        {currentAction === "wallet" && status !== "idle" && (
          <div className={["row", "gap-2"].join(" ")}>{badgeFor(status)}</div>
        )}
      </div>
    </Expandable>
  );
};

export default LinkAccountsCard;
