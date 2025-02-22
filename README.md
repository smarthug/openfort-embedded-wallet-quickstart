

# Openfort Embedded Wallet Quickstart
Minting ERC 1155 NFTs with gas fee sponsorship through [guest mode login](https://www.openfort.xyz/docs/guides/javascript/auth/guest)

* [slide](https://docs.google.com/presentation/d/1LyNoFS3vyIM4nnE3t5tfWBhIzgLuyafB9ynSBWl4JKo/edit?usp=sharing)
* [video](https://www.youtube.com/watch?v=68EOquzJs6U)
##  🚦Prerequisite
1. Access to the Openfort dashboard through whitelisting
2. Deployed ERC1155 Smart Contract Address


## 🚀 Getting started
Follow the relevant steps below.


### 1. Clone the repo
```
npm install
```

### 2. Visit the Openfort Dashboard
check the [video](https://www.youtube.com/watch?v=68EOquzJs6U)

ABI
```
[{
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
}]
```
### 3. Fill the .env
```
cp .env.example .env.local
```

```
VITE_PUBLIC_OPENFORT_PUBLIC_KEY=
VITE_OPENFORT_SECRET_KEY=
VITE_PUBLIC_SHIELD_API_KEY=

VITE_PUBLIC_ERC1155_ADDRESS=
VITE_PUBLIC_POLICY_ID=
```

### 4. Run the Demo
```
npm run dev
```

