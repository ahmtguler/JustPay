import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import * as buffer from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

window.Buffer = buffer.Buffer;

baseSepolia.blockExplorers = [
    {
        name: "Blockscout",
        url: "https://base-sepolia.blockscout.com/",
    },
];

const queryClient = new QueryClient();
const chains = [baseSepolia];
const projectId = "e07a28ddd8a29d405e1d0fd68f928451";
const metadata = {
    name: "JustPay",
    description: "AppKit Example",
    url: "https://web3modal.com", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const config = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
    wagmiConfig: config,
    projectId,
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </WagmiProvider>
    </React.StrictMode>
);
