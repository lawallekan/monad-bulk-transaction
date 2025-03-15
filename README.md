# Monad Bulk Transaction Script

This script allows you to send multiple transactions on the Monad Testnet. It is built using `ethers.js` and includes features like rate limiting, transaction confirmation tracking, and explorer links.

---

## **Prerequisites**

Before you begin, ensure you have the following installed:

1. **Node.js**: Download and install Node.js from [nodejs.org](https://nodejs.org/).
2. **Git** (optional): If you want to clone the repository, install Git from [git-scm.com](https://git-scm.com/).

---

## **Installation**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/lawallekan/monad-bulk-transaction.git
   cd monad-bulk-transaction

   Install Dependencies:


npm install

Set Up Environment Variables:

Create a .env file in the root directory of the project.

Add the following lines to the .env file:

plaintext
Copy
PRIVATE_KEY=your_64_character_private_key_here
RECEIVER_ADDRESS=0x2c6c2540DDB1dD2d1EAfB8067EA96E60795863Ef
Replace your_64_character_private_key_here with your actual private key (without the 0x prefix).

Replace 0x2c6c2540DDB1dD2d1EAfB8067EA96E60795863Ef with the receiver address if needed.

Example .env File:


PRIVATE_KEY=4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d

Usage
Run the Script:


node index.js
Follow the Prompts:

The script will ask you to confirm that you’ve followed @Allcryptoguides on X. Type yes to proceed.

Enter the number of transactions you want to send.

Enter the amount of MON to send per transaction (minimum: 0.01, maximum: 10).

Monitor Transactions:

The script will send the transactions and display the transaction hash and explorer link for each transaction.

It will also wait for confirmations and display the block number once each transaction is confirmed.

Completion:

Once all transactions are confirmed, the script will display a completion message:


Batch transaction process completed!
Built by @Allcryptoguides with @defi_imam



Run the Script:

node index.js


Contributing
If you’d like to contribute to this project, please follow these steps:

Fork the repository.

Create a new branch for your feature or bugfix.

Commit your changes.

Push your branch and submit a pull request.






