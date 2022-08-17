import constants from "./constants"
import bs58 from 'bs58'
import { SignMessage } from "./SignMessage"
import axios from "axios"
const { infos } = constants


export async function sendBetToBalance(value, mintAddress, { publicKey, connected, signMessage }, selected = false, route='bet') {
  const signature = await SignMessage({ publicKey, connected, signMessage })
  const body = {
    project: infos.project,
    wallet: publicKey?.toString(),
    tokenMint: mintAddress,
    bet: value,
    signature: bs58.encode(signature),
    selected
  }

  const { data } = await axios.post(`${infos.serverUrl}/${route}`, body)
  return { parsedResult: data }
}