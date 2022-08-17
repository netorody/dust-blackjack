import React, { useState, useContext, useEffect } from "react";
import { Layout } from "../components/common/layout";
import { useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  useAnchorWallet,
  useWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import BlackjackComponent from "../components/blackjack/index";
import { CurrencyContext } from "./_app";
import { sendCurrencyToTreasure, renderButtons } from "../utils/solana";
import Space from "../components/common/space";
import { useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import constants from "../utils/constants";
import BaccaratComponent from "../components/baccarat";
import { sendBetToBalance } from "../utils/sendBetToBalance";
import axios from "axios";
import { GlowingButton } from "../components/common/glowing-button";

const { colors, infos } = constants;
const { secondaryBackground, accentColor, objectText } = colors;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding-top: 50px;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-top: 10px;
  @media (max-width: 1250px) {
    height: 100%;
    flex-direction: column;
    padding-bottom: 40px;
  }
`;

const BalanceArea = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 18px;
  span {
    font-size: 20px;
    font-weight: bold;
  }
`;

export default function Blackjack() {
  const [isLoading, setLoading] = useState(false);
  const [isFlipped, setFlipped] = useState(false);
  const [inputValue, setValue] = useState();
  const [bets, setBets] = useState(0);
  const [diceValue, setDiceValue] = useState(0); // integer state
  const context = useContext(CurrencyContext);
  const [mySignature, setSignature] = useState(null);
  const [isPaymentVerified, setVerified] = useState(false);
  const [won, setWon] = useState();
  const [selected, setSelected] = useState("PLAYER");

  const { onOpen } = useDisclosure();
  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { sendTransaction, publicKey, connected, signMessage } = useWallet();
  const { connection } = useConnection();
  const [solBalance, setSolBalance] = useState(0);
  const [flyBalance, setFlyBalance] = useState(0);

  useEffect(() => {
    if (connected) {
      updateBalances();
    }
  }, [connected]);

  function updateBalances() {
    const body = {
      project: infos.project,
      wallet: publicKey?.toString(),
    };

    axios.post(`${infos.serverUrl}/balance`, body).then(({ data }) => {
      data.forEach(({ amount, tokenMint }) => {
        if (tokenMint === "11111111111111111111111111111111") {
          setSolBalance(amount);
        } else {
          setFlyBalance(amount);
        }
      });
    });
  }

  const betCallback = ({ parsedResult, betValue }: any) => {
    setFlipped(!isFlipped);
    setVerified(true);
    if (parsedResult.won) {
      updateBalances();
      toast({
        title: `Yayyyy!!`,
        description: `You WON! Tokens will be transferred in less than a minute! Keep going!!`,
        status: "info",
        duration: 15000,
        isClosable: true,
        position: "bottom-right",
        variant: "solid",
      });
    } else {
      updateBalances();
      toast({
        title: `Ops.`,
        description: `Not your lucky play, try again. You lost ${betValue} ${context.value}`,
        status: "warning",
        duration: 15000,
        isClosable: true,
        position: "bottom-right",
        variant: "solid",
      });
    }
    console.log("parsedResult", parsedResult);

    updateBalances();
  };

  if (typeof window === "undefined") return <></>;

  const bet = async (
    betValue: number,
    mintAddress: string,
    toTokenAccountAddress: string
  ) => {
    if (!fromWallet) {
      toast({
        title: `Error`,
        description: "You must connect your wallet before",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        variant: "solid",
      });
      return;
    }
    // @ts-ignore
    setVerified(false);

    //forceUpdate
    setDiceValue(diceValue + 1);
    setLoading(true);

    //START
    // const { parsedResult, signature} = await sendCurrencyToTreasure({ fromWallet, toast, toTokenAccountAddress, mintAddress, betValue, sendTransaction, connection, endpoint: 'payBlackjackBet', publicKey, bets })
    const { parsedResult } = await sendBetToBalance(
      betValue,
      mintAddress,
      { publicKey, connected, signMessage },
      selected as any,
      "baccarat"
    );

    setLoading(false);
    setWon(parsedResult?.won);
    betCallback({ parsedResult, betValue });
  };

  return (
    <Layout
      style={{
        width: "100vw",
      }}
    >
      <Wrapper>
        <InnerWrapper>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
            style={{
              overflow: "hidden",
              flex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              borderRadius: 4,
            }}
          >
            {connected && (
              <BalanceArea>
                <span>$SOL: {solBalance.toFixed(2)}</span>
              </BalanceArea>
            )}
            <BaccaratComponent
              isPaymentVerified={isPaymentVerified}
              setVerified={setVerified}
              won={won}
              selected={selected}
              setSelected={setSelected}
            />
            <Space height={50} />
            <Space height={20} />
            {renderButtons({
              value: context.value,
              modal: false,
              bet,
              inputValue,
              setValue,
              isLoading,
              onOpen,
              noCustom: false,
              direction: "row",
            })}
          </motion.div>
        </InnerWrapper>
      </Wrapper>
    </Layout>
  );
}
