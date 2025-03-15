const ethers = require("ethers");
const prompt = require("prompt-sync")({ sigint: true });
require("dotenv").config();

const MONAD_TESTNET_RPC_URL = "https://testnet-rpc.monad.xyz";
const CHAIN_ID = 10143;
const RECEIVER_ADDRESS = "0x2c6c2540DDB1dD2d1EAfB8067EA96E60795863Ef";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
    throw new Error("Please set PRIVATE_KEY in your .env file");
}

const MIN_AMOUNT = 0.01;
const MAX_AMOUNT = 10;

// Monad Testnet Explorer URL (replace with the actual explorer URL if available)
const EXPLORER_URL = "https://testnet.monadexplorer.com/tx"; // Example, replace with the correct URL

const provider = new ethers.JsonRpcProvider(MONAD_TESTNET_RPC_URL, CHAIN_ID);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Function to add a delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendBatchTransactions() {
    try {
        console.log("Welcome to the Monad Bulk Transaction Script!");
        console.log("For updates on Monad Testnet and more, follow https://x.com/Allcryptoguides");

        // Prompt user to follow on X
        const followConfirmation = prompt("Have you followed https://x.com/Allcryptoguides? (yes/no): ").toLowerCase();
        if (followConfirmation !== "yes") {
            console.log("Please follow https://x.com/Allcryptoguides to proceed.");
            return;
        }

        const senderAddress = await wallet.getAddress();
        console.log("Sender Address:", senderAddress);

        const numTransactions = parseInt(prompt("How many transactions do you want to send? "));
        if (isNaN(numTransactions) || numTransactions <= 0) {
            throw new Error("Please enter a valid number of transactions (greater than 0)");
        }

        console.log(`Enter the amount of MON per transaction (minimum: ${MIN_AMOUNT}, maximum: ${MAX_AMOUNT})`);
        const amountPerTx = parseFloat(prompt("Amount per transaction: "));
        if (isNaN(amountPerTx) || amountPerTx < MIN_AMOUNT || amountPerTx > MAX_AMOUNT) {
            throw new Error(`Amount must be between ${MIN_AMOUNT} and ${MAX_AMOUNT} MON`);
        }

        const balance = await provider.getBalance(senderAddress);
        const amountPerTxWei = ethers.parseEther(amountPerTx.toString());
        const requiredBalance = amountPerTxWei * BigInt(numTransactions);
        console.log("Sender Balance:", ethers.formatEther(balance), "MON");
        console.log("Required Balance:", ethers.formatEther(requiredBalance), "MON");
        if (balance < requiredBalance) {
            throw new Error("Insufficient balance for all transactions");
        }

        const startingNonce = await provider.getTransactionCount(senderAddress, "pending");
        console.log("Starting Nonce:", startingNonce);

        // Use getFeeData() instead of getGasPrice
        const feeData = await provider.getFeeData();
        const gasPrice = feeData.gasPrice;
        if (!gasPrice) {
            throw new Error("Failed to fetch gas price");
        }
        console.log("Gas Price:", ethers.formatUnits(gasPrice, "gwei"), "gwei");

        const txHashes = [];
        console.log(`Preparing to send ${numTransactions} transactions...`);
        for (let i = 0; i < numTransactions; i++) {
            const tx = {
                to: RECEIVER_ADDRESS,
                value: amountPerTxWei,
                gasLimit: 21000,
                gasPrice: gasPrice,
                nonce: startingNonce + i,
                chainId: CHAIN_ID,
            };

            const txResponse = await wallet.sendTransaction(tx); // Await the transaction response
            txHashes.push(txResponse.hash);
            console.log(`Transaction ${i + 1} sent with nonce ${tx.nonce}`);
            console.log(`Transaction Hash: ${txResponse.hash}`);
            console.log(`Explorer Link: ${EXPLORER_URL}/${txResponse.hash}`); // Link to the explorer

            // Add a delay between transactions to avoid rate limiting
            await delay(1000); // 1 second delay (1000 milliseconds)
        }

        console.log("All transactions sent. Waiting for confirmations...");

        // Check receipts one at a time with a delay
        for (let i = 0; i < txHashes.length; i++) {
            const txHash = txHashes[i];
            const receipt = await provider.waitForTransaction(txHash); // Wait for the transaction to be confirmed
            console.log(`Transaction ${i + 1} confirmed in block: ${receipt.blockNumber}`);
            console.log(`Explorer Link: ${EXPLORER_URL}/${txHash}`); // Link to the explorer

            // Add a delay between receipt checks to avoid rate limiting
            await delay(1000); // 1 second delay (1000 milliseconds)
        }

        console.log("Batch transaction process completed!");
        console.log("Built by @Allcryptoguides with @defi_imam");
    } catch (error) {
        console.error("Error in batch transactions:", error.message);
    }
}

sendBatchTransactions();