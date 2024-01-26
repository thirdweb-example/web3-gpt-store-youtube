import { Web3Button, useContract, useNFTs, useShowConnectEmbed } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';
import SignIn from '../components/SignIn';
import Navbar from '../components/Navbar';
import { CONTRACT_ADDRESS } from '../lib/constants';

const Shop = () => {
    const showConnectEmbed = useShowConnectEmbed();

    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data: nfts } = useNFTs(contract);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {showConnectEmbed ? (
                    <SignIn />
                ) : (
                    <>
                        <Navbar />
                        <div className={styles.grid}>
                            {nfts && nfts.length > 0 ? (
                                nfts.map((nft) => (
                                    <div key={nft.metadata.id} style={{
                                        backgroundColor: "#222",
                                        padding: "1rem",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        minWidth: "200px",
                                        textAlign: "center",
                                    }}>
                                        <h3>{nft.metadata.name}</h3>
                                        <Web3Button
                                            contractAddress={CONTRACT_ADDRESS}
                                            action={(contract) => contract.erc1155.claim(nft.metadata.id, 1)}
                                            onSuccess={() => alert("GPT claimed!")}
                                        >Claim GPT</Web3Button>
                                    </div>
                                ))
                            ) : (
                                <p>No GPTs available</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    )
};

export default Shop;