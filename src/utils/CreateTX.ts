import { useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection } from "@solana/web3.js";
import { useCallback, useContext } from "react";
import { CurrencyContext } from "../pages/_app";
import constants from "./constants";
import { web3 } from "@project-serum/anchor";
import axios from "axios";

const {
  colors,
  infos,
  objects: { coins },
} = constants;

const SOL_MINT = infos.publicKey;
const SOL_TOKEN_ACCOUNT = infos.publicKey;

let receiverWallet = infos.publicKey;

const genesysRpc = new Connection(
  "https://small-red-dew.solana-mainnet.quiknode.pro/a7a53c5e116e9196170c3ee6ddc1a150dd64cf9b/",
  "confirmed"
);

async function checkTx(connection, signature, resolve, quant) {
  try {
    await connection.confirmTransaction(signature, "processed");
    return resolve();
  } catch (error) {
    quant += 1;
    if (quant < 5) {
      checkTx(connection, signature, resolve, quant);
    } else {
      return resolve();
    }
  }
}

export async function CreateTX({
  publicKey,
  signTransaction,
  token,
  amount,
  callToast,
}) {
  let mintAddress: any;
  let currency;
  let firstBetValue: {} | null | undefined;
  let secondBetValue: {} | null | undefined;
  let thirdBetValue: {} | null | undefined;
  let maxBetValue: number;
  let toTokenAccountAddress: string;
  let tokenProgram: any;

  switch (token.value) {
    case "SOL":
      mintAddress = new PublicKey(SOL_MINT);
      currency = "SOL";
      firstBetValue = 0.1;
      secondBetValue = 0.25;
      thirdBetValue = 0.5;
      maxBetValue = 1;
      toTokenAccountAddress = SOL_TOKEN_ACCOUNT;
      break;
    default:
      mintAddress = new PublicKey(SOL_MINT);
      currency = "SOL";
      firstBetValue = 0.1;
      secondBetValue = 0.25;
      thirdBetValue = 0.5;
      maxBetValue = 1;
      toTokenAccountAddress = SOL_TOKEN_ACCOUNT;
      break;
  }

  for (let coin of coins) {
    if (token.value === coin.value) {
      mintAddress = new PublicKey(coin.mintAddress);
      currency = coin.value;
      firstBetValue = coin.firstBetValue;
      secondBetValue = coin.secondBetValue;
      thirdBetValue = coin.thirdBetValue;
      maxBetValue = coin.maxBetValue;
      toTokenAccountAddress = coin.toTokenAccountAddress;
      break;
    }
  }

  if (!publicKey || !signTransaction) return;

  const instructions: TransactionInstruction[] = [];

  const mintToken = new Token(
    genesysRpc,
    mintAddress,
    TOKEN_PROGRAM_ID,
    Keypair.generate() // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.
  );

  const senderTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(
    publicKey
  );

  console.log(6);

  // const associatedDestinationTokenAddr =
  //   await Token.getAssociatedTokenAddress(
  //     mintToken.associatedProgramId,
  //     mintToken.programId,
  //     mintAddress,
  //     new PublicKey(receiverWallet)
  //   );

  console.log(7);

  console.log(
    `mintToken.associatedProgramId ${mintToken.associatedProgramId}`,
    `mintToken.programId ${mintToken.programId}`,
    `mintAddress ${mintAddress}`,
    `receiverWallet ${receiverWallet}`
  );

  instructions.push(
    Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      senderTokenAccount.address,
      new PublicKey(toTokenAccountAddress),
      publicKey,
      [],
      amount * token.multiplier
    )
  );

  console.log(8);

  const transaction = new Transaction().add(...instructions);
  console.log(9);

  transaction.feePayer = publicKey;
  transaction.recentBlockhash = await (
    await genesysRpc.getRecentBlockhash()
  ).blockhash;
  console.log(10);
  console.log(transaction);

  const tx = await signTransaction(transaction);
  console.log(11);

  const serialized = tx.serialize({
    verifySignatures: false,
  });
  console.log(12);

  const body = {
    tx: serialized,
    project: infos.project,
    wallet: publicKey.toString(),
    tokenMint: token.mintAddress,
    amount: Number(amount),
  };
  // const txSig = await genesysRpc.sendRawTransaction(serialized);
  // console.log('txSig', txSig.lastIndexOf.toString())
  callToast();
  const { data } = await axios.post(`${infos.serverUrl}/deposit-v2`, body);
}

export async function CreateSOLTX({
  publicKey,
  signTransaction,
  token,
  amount,
  callToast,
}) {
  const transaction = new Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new PublicKey(receiverWallet),
      lamports: amount * token.multiplier, // * (1 / 1.02)
    })
  );

  transaction.feePayer = publicKey;
  transaction.recentBlockhash = (
    await genesysRpc.getLatestBlockhash("finalized")
  ).blockhash;

  const tx = await signTransaction(transaction);

  const serialized = tx.serialize({
    verifySignatures: false,
  });
  // /api/v1/transaction/
  const body = {
    tx: serialized,
    project: infos.project,
    wallet: publicKey.toString(),
    tokenMint: "11111111111111111111111111111111",
    amount: Number(amount),
  };

  callToast();

  await axios.post(`${infos.serverUrl}/deposit-v2`, body);

  // const signature = await genesysRpc.sendRawTransaction(serialized)
  // console.log('signature', signature)

  // await new Promise(r => checkTx(genesysRpc, signature, r, 0))
}

export async function handleClaim(
  publicKey: string,
  token,
  signTransaction,
  amount: number,
  callToast
) {
  console.log({
    publicKey,
    token,
    amount,
  });
  try {
    const TOKEN_PROGRAM_ID = new web3.PublicKey(
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
    );

    const instructions = [];
    const claimerPublicKey = new PublicKey(publicKey); // recebe
    console.log(1);

    let tokens: any[] = [];
    console.log(2);

    const airdropPublicKey = new PublicKey(infos.publicKey); // envia
    console.log("infos.publicKey", infos.publicKey);

    console.log(3);

    // const fees = 0;

    const mintPublicKey = new PublicKey(token.mintAddress);

    console.log(4);

    const mintToken = new Token(
      genesysRpc,
      mintPublicKey,
      TOKEN_PROGRAM_ID,
      // @ts-ignore
      claimerPublicKey
    ); // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.

    console.log(5);

    try {
      const senderTokenAccount =
        await mintToken.getOrCreateAssociatedAccountInfo(airdropPublicKey);

      console.log(6);

      const associatedDestinationTokenAddr =
        await Token.getAssociatedTokenAddress(
          mintToken.associatedProgramId,
          mintToken.programId,
          mintPublicKey,
          claimerPublicKey
        );

      console.log(7);

      const claimerAccount = await genesysRpc.getAccountInfo(
        associatedDestinationTokenAddr
      );

      console.log(8);

      if (claimerAccount === null) {
        console.log("creating account");

        instructions.push(
          Token.createAssociatedTokenAccountInstruction(
            mintToken.associatedProgramId,
            mintToken.programId,
            mintPublicKey,
            associatedDestinationTokenAddr,
            claimerPublicKey,
            claimerPublicKey
          )
        );
      }

      console.log(9);

      instructions.push(
        Token.createTransferInstruction(
          TOKEN_PROGRAM_ID,
          senderTokenAccount.address,
          associatedDestinationTokenAddr,
          airdropPublicKey,
          [],
          amount * token.multiplier
        )
      );
    } catch (e) {
      console.log(e);
      const TOKEN_PUBKEY = new PublicKey(
        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
      );
      const filter = {
        memcmp: {
          offset: 0,
          bytes: String(mintPublicKey),
        },
      };
      const filter2 = {
        dataSize: 165,
      };
      const getFilter = [filter, filter2];
      const programAccountsConfig = {
        filters: getFilter,
        encoding: "jsonParsed",
      };
      const accounts = await genesysRpc.getParsedProgramAccounts(
        TOKEN_PUBKEY,
        programAccountsConfig
      );

      instructions.push(
        Token.createSetAuthorityInstruction(
          TOKEN_PROGRAM_ID,
          accounts[0].pubkey,
          claimerPublicKey,
          "AccountOwner",
          airdropPublicKey,
          []
        )
      );
    }

    console.log(10);

    tokens = [];

    const transaction = new web3.Transaction().add(...instructions);

    transaction.feePayer = claimerPublicKey;

    transaction.recentBlockhash = (
      await genesysRpc.getRecentBlockhash()
    ).blockhash;

    //@ts-ignore
    const tx = await signTransaction(transaction);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const serialized = tx.serialize({
      verifySignatures: false,
      requireAllSignatures: false,
    });

    const body = {
      tx: serialized,
      project: infos.project,
      wallet: publicKey.toString(),
      tokenMint: token.mintAddress,
      amount,
    };

    callToast();

    const { data } = await axios.post(`${infos.serverUrl}/withdraw`, body);

    return data;
    // ate aqui
  } catch (err: any) {
    console.log("Something went wrong", err);
  }
}
export async function ClaimSol(
  publicKey: string,
  token,
  signTransaction,
  amount: number,
  callToast
) {
  console.log(amount);

  try {
    const instructions = [];
    const claimerPublicKey = new PublicKey(publicKey); // recebe
    console.log(1, claimerPublicKey);

    let tokens: any[] = [];
    console.log(2);

    const airdropPublicKey = new PublicKey(infos.publicKey); // envia

    console.log(3, airdropPublicKey);

    // const fees = 0;

    console.log(4);

    console.log(5);

    tokens = [];

    instructions.push(
      web3.SystemProgram.transfer({
        fromPubkey: airdropPublicKey,
        toPubkey: claimerPublicKey,
        lamports: amount * web3.LAMPORTS_PER_SOL,
      })
    );

    console.log(10);
    const transaction = new web3.Transaction().add(...instructions);
    console.log(11);

    transaction.feePayer = claimerPublicKey;

    transaction.recentBlockhash = (
      await genesysRpc.getLatestBlockhash({
        commitment: "finalized",
      })
    ).blockhash;

    //@ts-ignore
    const tx = await signTransaction(transaction);

    console.log(12);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const serialized = tx.serialize({
      verifySignatures: false,
    });
    console.log(12);

    const body = {
      tx: serialized,
      project: infos.project,
      wallet: publicKey.toString(),
      tokenMint: "11111111111111111111111111111111",
      amount,
    };

    callToast();

    const { data } = await axios.post(`${infos.serverUrl}/withdraw`, body);

    return data;
    // ate aqui
  } catch (err: any) {
    console.log("Something went wrong", err);
  }
}
