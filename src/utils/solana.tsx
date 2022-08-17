import React from "react";
import {
  Input,
  Switch,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/react";
import Space from "../components/common/space";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import * as web3 from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import constants from "../utils/constants";
import { Button } from "../components/common/button";

const {
  colors,
  infos,
  objects: { coins },
} = constants;
const { project } = infos;
const {
  primaryBackground,
  secondaryBackground,
  objectBackground,
  objectText,
  buttonText,
  accentColor,
} = colors;

const connect = new web3.Connection(
  "https://small-red-dew.solana-mainnet.quiknode.pro/a7a53c5e116e9196170c3ee6ddc1a150dd64cf9b"
);
const TOKEN_PROGRAM_ID = new web3.PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

export const SOL_TOKEN_ACCOUNT = infos.publicKey;
export const SPKL_TOKEN_ACCOUNT =
  "4GU42hV6Utgu2LmgYxdMP4bMALrcvZwfXSt9QgbmeXjo";
export const BIP_TOKEN_ACCOUNT = "FiSVrKiJ1sQiqrV6FejNxNPcKorn225kBthh7WCJZPi3";
export const USDC_TOKEN_ACCOUNT =
  "DUcQr4jwUVmKLgYJnZk6sgVbnhjyiWwG71XxYX2KLvUX";
export const USDT_TOKEN_ACCOUNT =
  "4FLJicaijkqsrZdJMp89SBorwgaQLweLvLHaFCCzhstG";
export const NRA_TOKEN_ACCOUNT = "DY41jLmfuwKgSBhJiCxrP7Yp8DPii6r2H8FcLcJ8mXaV";
export const DRUGS_TOKEN_ACCOUNT =
  "7uW58ttmZ67Mif53XHti4sL59ZPEVSWfgabGymFvfNXy";
export const DEGN_TOKEN_ACCOUNT =
  "7FVdu1vxfLPm23hdCghWeCnrtVtr3d8gCZQVbaNnEcaW";
export const SHROOMZ_TOKEN_ACCOUNT =
  "Gkvh5iK5d5xuSVTTb9LXtizz3pmhJPWHYW5pidBztqTB";
export const OOGI_TOKEN_ACCOUNT =
  "FZJih1FAMK6pH6737M19KCymNfyfisWXppVTTwx77pGA";
export const YODA_TOKEN_ACCOUNT =
  "3FmzyNgosNkZuRmEAuSYLmweJdPjjsbPJzHfVPEDTWoR";
export const HIPPO_TOKEN_ACCOUNT =
  "CnyybntW1GREv45yRKRFmUEYimKwruBg4NnJ1uYAwrCr";
export const BETS_TOKEN_ACCOUNT =
  "GN7SpwL77eDGUHqu4vuNxJXgtXSdcECnDDJ6jxqdErF6";

export const SOL_MINT = infos.publicKey;
export const SPKL_MINT = "31tCNEE6LiL9yW4Bu153Dq4vi2GuorXxCA9pW9aA6ecU";
export const BIP_MINT = "FoqP7aTaibT5npFKYKQQdyonL99vkW8YALNPwWepdvf5";
export const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
export const USDT_MINT = "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";
export const NRA_MINT = "1C2EYVrwmoXAGbiKirFFBeDFDYUBHPhDeg9trhibTND";
export const DRUGS_MINT = "DcqWM1BdgfUFktSKw8XC6qLAo2Ki2dUFXc1YYe67c8kD";
export const DEGN_MINT = "A9UhP1xfQHWUhSd54NgKPub2XB3ZuQMdPEvf9aMTHxGT";
export const SHROOMZ_MINT = "2vRgBSJEVPXxayrhXoazQyCKSGFYQG3ZdfT2Gv5gZykL";
export const OOGI_MINT = "H7Qc9APCWWGDVxGD5fJHmLTmdEgT9GFatAKFNg6sHh8A";
export const YODA_MINT = "YodaXmvJfRMEecpYacvcvDEM3TCom6dVdFik4x8HyFe";
export const HIPPO_MINT = "3EkHyexJLGCvSxzn5umbtd9N69GoT4p5pfdLTFqCNP9Y";
export const BETS_MINT = "9mto3a7pbJpGL69h9xxSNLhr1zeQtUcsH87TYq9zT4nQ";

const Row = styled.div<{ direction: string }>`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  justify-content: space-around;
  position: relative;
  z-index: 1;
  align-items: center;
  grid-gap: 12px;
  width: 100%;
  @media (max-width: 750px) {
    /* width: 100% !important; */
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    max-width: 270px;
    margin: 0 auto;
  }
`;

const BottomWrapper = styled.div`
  padding: 50px;
  padding-top: 25px;

  margin-bottom: -50px;
  @media (max-width: 1154px) {
    width: 100%;
    padding: 5px;
    margin: 0;
  }
`;

export const renderButtons = ({
  value,
  modal,
  bet,
  inputValue,
  setValue,
  isLoading,
  onOpen,
  noCustom,
  direction,
}: any) => {
  console.log({});

  let mintAddress: string;
  let currency;
  let firstBetValue: {} | null | undefined;
  let secondBetValue: {} | null | undefined;
  let thirdBetValue: {} | null | undefined;
  let maxBetValue: number;
  let toTokenAccountAddress: string;

  switch (value) {
    case "SOL":
      mintAddress = SOL_MINT;
      currency = "SOL";
      firstBetValue = 0.1;
      secondBetValue = 0.25;
      thirdBetValue = 0.5;
      maxBetValue = 1;
      toTokenAccountAddress = SOL_TOKEN_ACCOUNT;
      break;
    default:
      mintAddress = SOL_MINT;
      currency = "SOL";
      firstBetValue = 0.1;
      secondBetValue = 0.25;
      thirdBetValue = 0.5;
      maxBetValue = 1;
      toTokenAccountAddress = SOL_TOKEN_ACCOUNT;
      break;
  }

  for (let coin of coins) {
    if (value === coin.value) {
      mintAddress = coin.mintAddress;
      currency = coin.value;
      firstBetValue = coin.firstBetValue;
      secondBetValue = coin.secondBetValue;
      thirdBetValue = coin.thirdBetValue;
      maxBetValue = coin.maxBetValue;
      toTokenAccountAddress = coin.toTokenAccountAddress;
      break;
    }
  }

  if (!currency || !firstBetValue) {
    return;
  }

  if (modal) {
    return (
      <ModalContent>
        <ModalCloseButton color="#000" />
        <ModalBody paddingTop="60px">
          <Input
            width="100%"
            height="56px"
            placeholder={`value in $${currency} (max: ${maxBetValue})`}
            color="#000"
            type="number"
            value={inputValue}
            onChange={(e) =>
              Number(e.target.value) <= maxBetValue &&
              setValue(Number(e.target.value))
            }
          />
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isLoading}
            loadingText={`Loading $${currency}`}
            onClick={() => bet(inputValue, mintAddress, toTokenAccountAddress)}
          >
            <Text fontSize="14px" fontWeight="bold" color={buttonText}>
              Bet
            </Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }

  return (
    <BottomWrapper>
      <Space height={5} />
      <Row direction={direction}>
        <Button
          backgroundColor={objectBackground}
          isLoading={isLoading}
          loadingText={`Loading $${currency}`}
          onClick={() => bet(firstBetValue, mintAddress, toTokenAccountAddress)}
        >
          {firstBetValue} ${currency}
        </Button>
        <Space height={5} />
        <Button
          isLoading={isLoading}
          loadingText={`Loading $${currency}`}
          onClick={() =>
            bet(secondBetValue, mintAddress, toTokenAccountAddress)
          }
        >
          {secondBetValue} ${currency}
        </Button>

        <Space height={5} />
        {thirdBetValue && (
          <Button
            isLoading={isLoading}
            loadingText={`Loading $${currency}`}
            onClick={() =>
              bet(thirdBetValue, mintAddress, toTokenAccountAddress)
            }
          >
            {thirdBetValue} ${currency}
          </Button>
        )}
        <Space width={10} height={20} />

        {!noCustom && !thirdBetValue && (
          <Button
            backgroundColor={objectBackground}
            isLoading={isLoading}
            loadingText={`Loading $${currency}`}
            onClick={onOpen}
          >
            Custom ${currency} Value
          </Button>
        )}
      </Row>
    </BottomWrapper>
  );
};

export const renderRaceButtons = (
  value: any,
  modal: any,
  bet,
  inputValue,
  setValue,
  isLoading,
  onOpen
) => {
  let mintAddress: string;
  let currency;
  let firstBetValue: {} | null | undefined;
  let secondBetValue: {} | null | undefined;
  let maxBetValue: number;
  let toTokenAccountAddress: string;

  switch (value) {
    /*case 'BIP':
      mintAddress = BIP_MINT;
      currency = 'BIP';
      firstBetValue = 200;
      secondBetValue = 1000;
      maxBetValue = 10000;
      toTokenAccountAddress = BIP_TOKEN_ACCOUNT;
      break;
    case 'USDC':
      mintAddress = USDC_MINT;
      currency = 'USDC';
      firstBetValue = 3;
      secondBetValue = 10;
      maxBetValue = 100;
      toTokenAccountAddress = USDC_TOKEN_ACCOUNT;
      break;
    case 'DEGN':
      mintAddress = DEGN_MINT;
      currency = 'DEGN';
      firstBetValue = 5000;
      secondBetValue = 20000;
      maxBetValue = 50000;
      toTokenAccountAddress = DEGN_TOKEN_ACCOUNT;
      break;
    case 'OOGI':
      mintAddress = OOGI_MINT;
      currency = 'OOGI';
      firstBetValue = 100;
      secondBetValue = 500;
      maxBetValue = 1000;
      toTokenAccountAddress = OOGI_TOKEN_ACCOUNT;
      break;
    case 'SHROOMZ':
      mintAddress = SHROOMZ_MINT;
      currency = 'SHROOMZ';
      firstBetValue = 5000;
      secondBetValue = 20000;
      maxBetValue = 100000;
      toTokenAccountAddress = SHROOMZ_TOKEN_ACCOUNT;
      break;*/
    case "SOL":
      mintAddress = SOL_MINT;
      currency = "SOL";
      firstBetValue = 0.1;
      secondBetValue = 0.5;
      maxBetValue = 1;
      toTokenAccountAddress = SOL_TOKEN_ACCOUNT;
      break;
    /*case 'SPKL':
      mintAddress = SPKL_MINT;
      currency = 'SPKL';
      firstBetValue = 10;
      secondBetValue = 500;
      maxBetValue = 1001;
      toTokenAccountAddress = SPKL_TOKEN_ACCOUNT;
      break;
    case 'USDT':
      mintAddress = USDT_MINT;
      currency = 'USDT';
      firstBetValue = 3;
      secondBetValue = 10;
      maxBetValue = 100;
      toTokenAccountAddress = USDT_TOKEN_ACCOUNT;
      break;
    case 'NRA':
      mintAddress = NRA_MINT;
      currency = 'NRA';
      firstBetValue = 10000;
      secondBetValue = 30000;
      maxBetValue = 100001;
      toTokenAccountAddress = NRA_TOKEN_ACCOUNT;
      break;
    case 'DRUGS':
      mintAddress = DRUGS_MINT;
      currency = 'DRUGS';
      firstBetValue = 2000;
      secondBetValue = 10000;
      maxBetValue = 100000;
      toTokenAccountAddress = DRUGS_TOKEN_ACCOUNT;
      break;*/
    default:
      mintAddress = SOL_MINT;
      currency = "SOL";
      firstBetValue = 0.1;
      secondBetValue = 0.3;
      maxBetValue = 0.5;
      toTokenAccountAddress = SOL_TOKEN_ACCOUNT;
      break;
  }

  if (modal) {
    return (
      <ModalContent>
        <ModalCloseButton color="#000" />
        <ModalBody paddingTop="60px">
          <Input
            width="100%"
            height="56px"
            placeholder={`value in $${currency}`}
            color="#000"
            type="number"
            value={inputValue}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isLoading}
            loadingText={`Loading $${currency}`}
            borderRadius="2rem"
            width="100%"
            height="56px"
            backgroundColor={primaryBackground}
            onClick={() => bet(inputValue, mintAddress, toTokenAccountAddress)}
          >
            <Text fontSize="14px" fontWeight="bold" color={objectBackground}>
              Place RACE value
            </Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }

  return (
    <Row>
      <Button
        isLoading={isLoading}
        loadingText={`Loading $${currency}`}
        borderRadius="2rem"
        width="260px"
        height="56px"
        borderColor={objectBackground}
        borderWidth="1px"
        backgroundColor={primaryBackground}
        onClick={onOpen}
      >
        <Text fontSize="14px" fontWeight="bold" color={buttonText}>
          Place your ${currency} RACE position
        </Text>
      </Button>
    </Row>
  );
};

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

export const sendCurrencyToTreasure = async ({
  fromWallet,
  toast,
  toTokenAccountAddress,
  mintAddress,
  betValue,
  sendTransaction,
  connection,
  endpoint,
  publicKey,
  bets,
}: any) => {
  let multiplier;
  let currency;

  switch (mintAddress) {
    case BIP_MINT:
      multiplier = 1000000000;
      currency = "BIP";
      break;
    case USDC_MINT:
      multiplier = 1000000;
      currency = "USDC";
      break;
    case YODA_MINT:
      multiplier = 1000000;
      currency = "YODA";
      break;
    case HIPPO_MINT:
      multiplier = 1000000000;
      currency = "HIPPO";
      break;
    case DEGN_MINT:
      multiplier = 1000000000;
      currency = "DEGN";
      break;
    case SHROOMZ_MINT:
      multiplier = 1000000;
      currency = "SHROOMZ";
      break;
    case OOGI_MINT:
      multiplier = 1000000000;
      currency = "OOGI";
      break;
    case SOL_MINT:
      multiplier = web3.LAMPORTS_PER_SOL;
      currency = "SOL";
      break;
    case SPKL_MINT:
      multiplier = 1000000000;
      currency = "SPKL";
      break;
    case BETS_MINT:
      multiplier = 1000000000;
      currency = "BETS";
      break;
    case USDT_MINT:
      multiplier = 1000000;
      currency = "USDT";
      break;
    case NRA_MINT:
      multiplier = 1000000000;
      currency = "NRA";
      break;
    case DRUGS_MINT:
      multiplier = 10000;
      currency = "DRUGS";
      break;
    default:
  }

  for (let coin of coins) {
    if (mintAddress === coin.mintAddress) {
      multiplier = coin.multiplier;
      currency = coin.value; //currency
      break;
    }
  }

  if (!multiplier || !currency) {
    return;
  }

  if (mintAddress === SOL_MINT) {
    const transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new web3.PublicKey(SOL_TOKEN_ACCOUNT),
        lamports: betValue * multiplier,
      })
    );

    /*transaction.add(
      web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new web3.PublicKey('GNRSQFbPZmEEiipXjiLB5xUcjLJxE2HqkgYaseBUBETm'),
        lamports: 0.02 * multiplier,
      })
    )*/

    // Sign transaction, broadcast, and confirm
    const signature = await sendTransaction(transaction, connection);
    // await connection.confirmTransaction(signature, 'processed');
    await new Promise((r) => checkTx(connection, signature, r, 0));
    const r = await localStorage.getItem("r");

    const resp = await fetch(
      `${infos.serverUrl}/api/v1/transaction/${endpoint}`,
      {
        //const resp = await fetch(`${infos.serverUrl}/api/v1/transaction/${endpoint}`, {
        body: `{"transactionId":"${signature}", "betValue":"${betValue}", "currency":"${currency}", "r":"${r}", "project":"${project}"}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    const parsedResult = await resp.json();

    return { parsedResult, signature };
  }

  const parsed = await connect.getParsedTokenAccountsByOwner(
    fromWallet.publicKey,
    { programId: TOKEN_PROGRAM_ID }
  );

  const toTokenAccount = new web3.PublicKey(toTokenAccountAddress);
  var fromTokenAddress = null;

  for (let i = 0; i < parsed.value.length; i++) {
    if (parsed.value[i].account.data.parsed.info.mint === mintAddress) {
      fromTokenAddress = parsed.value[i].pubkey;
    }
  }

  if (!fromTokenAddress) {
    toast({
      title: `Error`,
      description: `No ${currency}`,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
      variant: "solid",
    });
    return null;
  }

  // Add token transfer instructions to transaction
  const transaction = new web3.Transaction().add(
    splToken.Token.createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,
      fromTokenAddress,
      toTokenAccount,
      fromWallet.publicKey,
      [],
      betValue * multiplier
    )
  );

  /*transaction.add(
    web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new web3.PublicKey('GNRSQFbPZmEEiipXjiLB5xUcjLJxE2HqkgYaseBUBETm'),
      lamports: 0.02 * multiplier,
    })
  )*/

  // Sign transaction, broadcast, and confirm
  const signature = await sendTransaction(transaction, connection);
  await connection.confirmTransaction(signature, "processed");
  const r = await localStorage.getItem("r");

  const resp = await fetch(
    `${infos.serverUrl}/api/v1/transaction/${endpoint}`,
    {
      //const resp = await fetch(`${infos.serverUrl}/api/v1/transaction/${endpoint}`, {
      body: `{"transactionId":"${signature}", "betValue":"${betValue}", "currency":"${currency}", "r":"${r}", "project":"${project}"}`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );

  const parsedResult = await resp.json();

  return { parsedResult, signature };
};
