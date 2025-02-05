import styles from "./styles/WalletMint.module.css";
import { useMemo, useState, useEffect } from "react";

import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import {
    PhantomWalletAdapter,
    // GlowWalletAdapter,
    // SlopeWalletAdapter,
    // SolflareWalletAdapter,
    // TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import {
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import { clusterApiUrl } from "@solana/web3.js";
import { MetaplexProvider } from "./MetaplexProvider";
import { MintNFTs } from "./MintNFTs";

import "@solana/wallet-adapter-react-ui/styles.css";

// import dynamic from 'next/dynamic';

// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// console.log(WalletMultiButton)

import('@solana/wallet-adapter-react-ui').then((mod) => console.log("this", mod))

export default function WalletMint() {
    const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            // new GlowWalletAdapter(),
            // new SlopeWalletAdapter(),
            // new SolflareWalletAdapter({ network }),
            // new TorusWalletAdapter(),
        ],
        [network]
    );

    const handleChange = (event) => {
        switch (event.target.value) {
            case "devnet":
                setNetwork(WalletAdapterNetwork.Devnet);
                break;
            case "mainnet":
                setNetwork(WalletAdapterNetwork.Mainnet);
                break;
            case "testnet":
                setNetwork(WalletAdapterNetwork.Testnet);
                break;
            default:
                setNetwork(WalletAdapterNetwork.Devnet);
                break;
        }
    };

    const ButtonWrapper = import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton)


    return (
        <div>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>
                        <MetaplexProvider>
                            <div className={styles.App}>
                                {/* <ButtonWrapper /> */}
                                <WalletMultiButton />
                                <MintNFTs onClusterChange={handleChange} />
                            </div>
                        </MetaplexProvider>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </div>
    );
}
