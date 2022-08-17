import { useWallet } from '@solana/wallet-adapter-react'
import bs58 from 'bs58'
import axios from 'axios'
// import { sign } from 'tweetnacl'

export async function SignMessage({ publicKey, connected, signMessage }: any) {
  if (!connected) return
  try {
    // `publicKey` will be null if the wallet isn't connected
    if (!publicKey) throw new Error('Wallet not connected!')
    // `signMessage` will be undefined if the wallet doesn't support it
    if (!signMessage) { throw new Error('Wallet does not support message signing!') }

    // Encode anything as bytes
    const message = new TextEncoder().encode(
      'SOLALAND <3'
    )

    // Sign the bytes using the wallet
    const signature = await signMessage(message)
    return signature
  } catch (error) {
  }
}