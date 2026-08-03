"use client";

import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";

function shorten(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function ConnectButton() {
  const { address, isConnected, status } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-[var(--mist)]">
          {ensName ?? shorten(address)}
        </span>
        <button
          type="button"
          onClick={() => disconnect()}
          className="rounded-sm border border-[var(--line)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--fog)] transition hover:border-[var(--jade)] hover:text-[var(--jade)]"
        >
          Disconnect
        </button>
      </div>
    );
  }

  const connector = connectors[0];

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        disabled={!connector || isPending || status === "connecting"}
        onClick={() => connector && connect({ connector })}
        className="rounded-sm bg-[var(--jade)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--jade-bright)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending || status === "connecting" ? "Connecting…" : "Connect wallet"}
      </button>
      {error && (
        <p className="max-w-xs text-xs text-[var(--warn)]">{error.message}</p>
      )}
    </div>
  );
}
