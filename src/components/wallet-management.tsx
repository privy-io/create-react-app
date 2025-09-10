import { useImportWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import React from "react";
import { Badge } from "./ui/badge";
import { Expandable } from "./ui/expandable";

type Status = "idle" | "loading" | "success" | "error";

const WalletManagement = () => {
  const { exportWallet } = usePrivy();
  const { wallets } = useWallets();
  const { importWallet } = useImportWallet();

  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<string | null>(null);
  const [privateKey, setPrivateKey] = React.useState<string>("");
  const [importedAddress, setImportedAddress] = React.useState<string | null>(
    null
  );

  const handleExport = async () => {
    try {
      setError(null);
      setResult(null);
      setStatus("loading");
      await exportWallet({ address: wallets[0]?.address as string });
      setResult("Export modal shown");
      setStatus("success");
    } catch (e) {
      setError(e?.toString?.() ?? "Failed to export wallet");
      setStatus("error");
    }
  };

  const handleImport = async () => {
    try {
      setError(null);
      setResult(null);
      setImportedAddress(null);
      setStatus("loading");
      const wallet = await importWallet({ privateKey });
      setImportedAddress(wallet?.address ?? null);
      setResult("Imported wallet");
      setStatus("success");
      setPrivateKey("");
    } catch (e) {
      setError(e?.toString?.() ?? "Failed to import wallet");
      setStatus("error");
    }
  };

  return (
    <Expandable
      title="Wallet management"
      className={["card", "card-padding"].join(" ")}
    >
      <div className="row-between-start">
        <div>
          <h3 className="card-title">
            Wallet management{" "}
            <Badge>
              <code>@/components/wallet-management.tsx</code>
            </Badge>
          </h3>
          <p className={["mt-1", "muted", "text-sm"].join(" ")}>
            Export your embedded wallet or import an external private key.
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
        <div className={["mt-2", "alert", "alert-error", "text-xs"].join(" ")}>
          {error}
        </div>
      )}
      {result && (
        <div
          className={["mt-2", "alert", "alert-success", "text-xs"].join(" ")}
        >
          {result}
        </div>
      )}

      <div className={["mt-3", "grid", "grid-1", "grid-gap-3"].join(" ")}>
        <button
          onClick={handleExport}
          disabled={status === "loading"}
          className="btn"
        >
          {status === "loading" ? "Opening…" : "Export wallet"}
        </button>

        <div>
          <label className={["block", "text-xs", "font-medium"].join(" ")}>
            Private key (hex)
          </label>
          <input
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            placeholder="0x..."
            className="input"
          />
          <div className="mt-2">
            <button
              onClick={handleImport}
              disabled={!privateKey || status === "loading"}
              className="btn"
            >
              {status === "loading" ? "Importing…" : "Import wallet"}
            </button>
            {importedAddress && (
              <div
                className={["mt-2", "truncate", "text-xs", "muted"].join(" ")}
              >
                Imported: <span className="font-mono">{importedAddress}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Expandable>
  );
};

export default WalletManagement;
