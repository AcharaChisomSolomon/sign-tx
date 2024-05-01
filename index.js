const { Alchemy, Network, Wallet, Utils } = require('alchemy-sdk')
require('dotenv').config()

const { TEST_API_KEY, TEST_PRIVATE_KEY } = process.env

const settings = {
    apiKey: TEST_API_KEY,
    network: Network.ETH_SEPOLIA,
}
const alchemy = new Alchemy(settings)

const wallet = new Wallet(TEST_PRIVATE_KEY)

async function main() { 
    const nonce = await alchemy.core.getTransactionCount(
        wallet.address,
        'latest'
    )

    const transaction = {
        to: '0x4d5f0765A15e16d38BF4979f4D9070BA586Ad3A1',
        value: Utils.parseEther('0.0011'),
        gasLimit: '21000',
        maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
        maxFeePerGas: Utils.parseUnits('20', 'gwei'),
        nonce: nonce,
        type: 2,
        chainId: 11155111,
    }

    const rawTransaction = await wallet.signTransaction(transaction)
    console.log('Raw tx: ', rawTransaction)
    const tx = await alchemy.core.sendTransaction(rawTransaction)
    console.log(`https://sepolia.etherscan.io/tx/${tx.hash}`)
}

main()