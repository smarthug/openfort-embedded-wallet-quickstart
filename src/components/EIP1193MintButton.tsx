import React, { useEffect, useState } from 'react';
import { useOpenfort } from '../hooks/useOpenfort';
import { EmbeddedState } from '@openfort/openfort-js';

import { createPublicClient, createWalletClient, custom, encodeFunctionData, http } from 'viem'
import { polygonAmoy } from 'viem/chains';
// import { eip5792Actions } from 'viem/experimental'

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
  }, [state])



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

    const erc1155Address =  import.meta.env.VITE_PUBLIC_ERC1155_ADDRESS as string;
    console.log('ERC1155 address:', erc1155Address);

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



  return (
    <div className='space-y-2'>
      <button
        className='w-full'
        disabled={state !== EmbeddedState.READY}
        onClick={handleSendTransaction1155}
        variant="outline"
      >
        {loading ? <Loading /> : 'Mint ERC 1155 NFT'}
      </button>

    </div>
  );
};

export default EIP1193MintButton;
