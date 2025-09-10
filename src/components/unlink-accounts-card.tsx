import {
  LinkedAccountWithMetadata,
  usePrivy,
  User,
} from "@privy-io/react-auth";
import React from "react";
import { Badge } from "./ui/badge";
import { Expandable } from "./ui/expandable";

const UnlinkAccountsCard = () => {
  const { user, unlinkGoogle, unlinkTwitter, unlinkGithub, unlinkWallet } =
    usePrivy();

  const accounts: LinkedAccountWithMetadata[] = (
    user?.linkedAccounts ?? []
  ).filter(Boolean);
  const unlinkable = accounts.length > 1;

  type Btn = { key: string; label: string; onClick: () => Promise<User> };
  const buttons: Btn[] = [];

  for (const acc of accounts) {
    if (acc.type === "google_oauth" && acc.subject) {
      buttons.push({
        key: `google:${acc.subject}`,
        label: `Unlink Google (${acc.subject.slice(0, 6)}...)`,
        onClick: () => unlinkGoogle(acc.subject),
      });
    }
    if (acc.type === "twitter_oauth" && acc.subject) {
      buttons.push({
        key: `twitter:${acc.subject}`,
        label: `Unlink Twitter (${acc.subject.slice(0, 6)}...)`,
        onClick: () => unlinkTwitter(acc.subject),
      });
    }
    if (acc.type === "github_oauth" && acc.subject) {
      buttons.push({
        key: `github:${acc.subject}`,
        label: `Unlink GitHub (${acc.subject.slice(0, 6)}...)`,
        onClick: () => unlinkGithub(acc.subject),
      });
    }
    // Only allow unlinking external wallets (not Privy embedded)
    if (
      acc.type === "wallet" &&
      acc.address &&
      acc.walletClientType &&
      acc.walletClientType !== "privy" &&
      acc.walletClientType !== "privy-v2"
    ) {
      buttons.push({
        key: `wallet:${acc.address}`,
        label: `Unlink Wallet (${acc.address.slice(0, 6)}...)`,
        onClick: () => unlinkWallet(acc.address),
      });
    }
  }

  const [loadingKey, setLoadingKey] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleClick = async (btn: Btn) => {
    try {
      setError(null);
      setMessage(null);
      setLoadingKey(btn.key);
      await btn.onClick();
      setMessage("Unlinked successfully");
    } catch (e) {
      setError(e?.toString?.() ?? "Failed to unlink");
    } finally {
      setLoadingKey(null);
    }
  };

  return (
    <Expandable
      title="Unlink accounts"
      className={["card", "card-padding"].join(" ")}
    >
      <div className="row-between-start">
        <div>
          <h3 className="card-title">
            Unlink accounts{" "}
            <Badge>
              <code>@/components/unlink-accounts-card.tsx</code>
            </Badge>
          </h3>
          <p className={["mt-1", "text-sm", "muted"].join(" ")}>
            {unlinkable
              ? "Select an account to unlink."
              : "You need more than one linked account to unlink."}
          </p>
        </div>
      </div>

      {error && (
        <div className={["mt-2", "alert", "alert-error", "text-xs"].join(" ")}>
          {error}
        </div>
      )}
      {message && (
        <div
          className={["mt-2", "alert", "alert-success", "text-xs"].join(" ")}
        >
          {message}
        </div>
      )}

      {unlinkable && (
        <div className={["mt-3", "grid", "grid-1", "grid-gap-2"].join(" ")}>
          {buttons.map((b) => (
            <button
              key={b.key}
              onClick={() => handleClick(b)}
              disabled={!!loadingKey}
              className="btn"
            >
              {loadingKey === b.key ? "Unlinking…" : b.label}
            </button>
          ))}
        </div>
      )}
    </Expandable>
  );
};

export default UnlinkAccountsCard;
