import React, { useEffect, useState } from 'react';
import { useOpenfort } from '../hooks/useOpenfort';
import { EmbeddedState } from '@openfort/openfort-js';
// import Loading from '../Loading';
// import { Button } from '../ui/button';
import { createPublicClient, createWalletClient, custom, encodeFunctionData, http } from 'viem'
import { polygonAmoy } from 'viem/chains';
import { eip5792Actions } from 'viem/experimental'

const Loading = () => {
  return (
    <div>Loading ...</div>
  )
}

const EIP1193MintButton: React.FC<{
  handleSetMessage: (message: string) => void;
}> = ({ handleSetMessage }) => {
  const { getEvmProvider, state } = useOpenfort();
  const [loading, setLoading] = useState(false);
  const [loadingBatch, setLoadingBatch] = useState(false);

  useEffect(() => {
    const provider = getEvmProvider();
    if (!provider) {
      throw new Error('Failed to get EVM provider');
    }
    const walletClient = createWalletClient({
      chain: polygonAmoy,
      transport: custom(provider)
    })
    walletClient.getAddresses().then(([account]) => {
      handleSetMessage(`Current account address: ${account}`);
    }
    )
  }, [])

  const handleSendTransaction = async () => {
    const provider = getEvmProvider();
    if (!provider) {
      throw new Error('Failed to get EVM provider');
    }
    setLoading(true);
    const publicClient = createPublicClient({
      chain: polygonAmoy,
      transport: http()
    })
    const walletClient = createWalletClient({
      chain: polygonAmoy,
      transport: custom(provider)
    })

    const erc721Address = '0x2522f4fc9af2e1954a3d13f7a5b2683a00a4543a';

    // Read more about [ABI Formats](https://docs.soliditylang.org/en/latest/abi-spec.html#json).
    const abi = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]

    const [account] = await walletClient.getAddresses()
    const { request } = await publicClient.simulateContract({
      account,
      address: erc721Address,
      abi: abi,
      functionName: 'mint',
      args: ['0xbf765C77e769B3B5CD19c1e2CF450c9e8a10b296']
    })


    let tx: `0x${string}`;
    try {
      tx = await walletClient.writeContract(request)
      console.log('Transaction hash:', tx);
      handleSetMessage(`https://amoy.polygonscan.com/tx/${tx}`);
      const receipt = await publicClient.getTransactionReceipt({ hash: tx });
      console.log('Transaction receipt:', receipt);
    } catch (error: any) {
      console.error('Failed to send transaction:', error);
    }
    setLoading(false);
  };

  const handleSendTransaction1155 = async () => {
    const provider = getEvmProvider();
    if (!provider) {
      throw new Error('Failed to get EVM provider');
    }
    setLoading(true);
    const publicClient = createPublicClient({
      chain: polygonAmoy,
      transport: http()
    })
    const walletClient = createWalletClient({
      chain: polygonAmoy,
      transport: custom(provider)
    })

    const erc1155Address = '0x8a7547019537D97EE49Ad32F1a2Dc57B14fbB0E8';

    // Read more about [ABI Formats](https://docs.soliditylang.org/en/latest/abi-spec.html#json).
    // const abi = [
    //   {
    //     "inputs": [
    //       {
    //         "internalType": "address",
    //         "name": "_to",
    //         "type": "address"
    //       }
    //     ],
    //     "name": "mint",
    //     "outputs": [],
    //     "stateMutability": "nonpayable",
    //     "type": "function"
    //   }
    // ]




    const abi = [{
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

    const [account] = await walletClient.getAddresses()
    const { request } = await publicClient.simulateContract({
      account,
      address: erc1155Address,
      abi: abi,
      functionName: 'mint',
      args: ['0xbf765C77e769B3B5CD19c1e2CF450c9e8a10b296', 0, 1, ""]
    })


    let tx: `0x${string}`;
    try {
      tx = await walletClient.writeContract(request)
      console.log('Transaction hash:', tx);
      handleSetMessage(`https://amoy.polygonscan.com/tx/${tx}`);
      const receipt = await publicClient.getTransactionReceipt({ hash: tx });
      console.log('Transaction receipt:', receipt);
    } catch (error: any) {
      console.error('Failed to send transaction:', error);
    }
    setLoading(false);
  };

  const handleSendCalls = async () => {
    const provider = getEvmProvider();
    if (!provider) {
      throw new Error('Failed to get EVM provider');
    }
    setLoadingBatch(true);
    const walletClient = createWalletClient({
      chain: polygonAmoy,
      transport: custom(provider)
    }).extend(eip5792Actions())

    const erc721Address = '0x2522f4fc9af2e1954a3d13f7a5b2683a00a4543a';

    // Read more about [ABI Formats](https://docs.soliditylang.org/en/latest/abi-spec.html#json).
    const abi = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]

    const [account] = await walletClient.getAddresses()

    try {
      const tx = await walletClient.sendCalls({
        account,
        calls: [
          {
            to: erc721Address,
            data: encodeFunctionData({ abi, functionName: "mint", args: ['0x64452Dff1180b21dc50033e1680bB64CDd492582'] })
          },
          {
            to: erc721Address,
            data: encodeFunctionData({ abi, functionName: "mint", args: ['0x64452Dff1180b21dc50033e1680bB64CDd492582'] })
          },
        ],
      })

      console.log('Transaction hash:', tx);
      handleSetMessage(`https://amoy.polygonscan.com/tx/${tx}`);
    } catch (error: any) {
      console.error('Failed to send transaction:', error);
    }
    setLoadingBatch(false);
  };

  return (
    <div className='space-y-2'>
    <button
        className='w-full'
        disabled={state !== EmbeddedState.READY}
        onClick={handleSendTransaction1155}
        variant="outline"
      >
        {loading ? <Loading /> : 'Mint NFT 1155'}
      </button>
      <button
        className='w-full'
        disabled={state !== EmbeddedState.READY}
        onClick={handleSendTransaction}
        variant="outline"
      >
        {loading ? <Loading /> : 'Mint NFT 721'}
      </button>
      <button
        className='w-full'
        disabled={state !== EmbeddedState.READY}
        onClick={handleSendCalls}
        variant="outline"
      >
        {loadingBatch ? <Loading /> : 'Send batch calls'}
      </button>
    </div>
  );
};

export default EIP1193MintButton;
