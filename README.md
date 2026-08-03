# DCA

Small Next.js web3 mock for dollar-cost averaging.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- wagmi + viem + TanStack Query for wallet connect

## Branch

Work happens on **`MIA`**. Pull from that branch:

```bash
git fetch origin
git checkout MIA
```

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Connect an injected wallet (e.g. MetaMask) to arm a demo DCA schedule — no real on-chain spend.
