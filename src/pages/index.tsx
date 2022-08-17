import React, { useState, useEffect, useContext } from "react";
import Spinner from "../components/blackjack2/Spinner";
import { newBackLink, tokenMint } from "../components/blackjack2/assets/const";
import {
  ActionButtonContainer,
  Message,
  CroupierHandContainer,
  GameScreenContainer,
  HandsContainer,
  PointsContainer,
  PointsValue,
  UserHandContainer,
  Placeholder,
} from "../components/blackjack2/GameElements";
import CroupierHand from "../components/blackjack2/CroupierHand";
import PlayerHand from "../components/blackjack2/PlayerHand";
import { DivButton } from "../components/blackjack2/Button";
import { GlowingButton } from "../components/common/glowing-button";
import { useWallet } from "@solana/wallet-adapter-react";
import { SignMessage } from "../utils/SignMessage";
import { CurrencyInput } from "../components/common/currency-input";
import { CurrencyContext } from "./_app";
import { useToast, Text } from "@chakra-ui/react";

import constants from "../utils/constants";
import axios from "axios";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";

const {
  infos,
  objects: { coins },
} = constants;

function Game() {
  const context = useContext(CurrencyContext) || { value: "SOL" };
  const token = coins.find(({ value }) => value === context.value);
  const [playerHand, setPlayerHand] = useState<any[]>([]);
  const [croupierHand, setCroupierHand] = useState<any[]>([]);

  const [playerPoints, setPlayerPoints] = useState(0);
  const [playerOptionalPoints, setPlayerOptionalPoints] = useState(0);

  const [croupierPoints, setCroupierPoints] = useState(0);
  const [croupierOptionalPoints, setCroupierOptionalPoints] = useState(0);

  const [currentBet, setCurrentBet] = useState(0);

  const [message, setMessage] = useState("Place your bet");

  const [showBetButton, setShowBetButton] = useState(true);

  const [gameEnded, setGameEnded] = useState(false);
  const [gameInit, setGameInit] = useState(false);

  const [betId, setBetId] = useState("");
  const [balances, setBalances] = useState([]);

  const { connected, publicKey, signMessage } = useWallet();
  const toast = useToast();

  async function updateBalances() {
    const body = {
      project: infos.project,
      wallet: publicKey?.toString(),
    };

    axios.post(`${infos.serverUrl}/balance`, body).then(({ data }) => {
      const balances: any = coins.map(({ label, mintAddress }) => {
        const temp: any = {};
        const finder = data.find(
          ({ tokenMint }: any) => tokenMint === mintAddress
        );
        temp.mintAddress = mintAddress;
        temp.label = label;
        if (finder) {
          temp.amount = finder.amount;
        } else {
          temp.amount = 0;
        }
        return temp;
      });
      setBalances(balances);
    });
  }

  const startRound = async () => {
    if (!connected || !token) {
      return;
    }
    await updateBalances();

    if (token.value === "SOL" && (currentBet < 0.05 || currentBet > 0.5)) {
      toast({
        title: `Error`,
        description: "Max is 0.5 $SOL and min is 0.05 $SOL",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        variant: "solid",
      });
      return;
    }


    const coin: any = balances.find(
      (b: any) => b.mintAddress === token.mintAddress
    );

    if (currentBet > coin?.amount || !currentBet || !coin) {
      toast({
        title: `Error`,
        description: "You need to deposit before playing",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        variant: "solid",
      });
      return;
    }

    const signature = await SignMessage({ publicKey, connected, signMessage });
    const body = {
      signature: bs58.encode(signature),
      amount: currentBet,
      wallet: publicKey?.toString(),
      project: infos.project,
      tokenMint: (token && token.mintAddress) || tokenMint,
    };
    setMessage("");

    try {
      const response = await fetch(newBackLink + "blackJack/newblackjack", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setPlayerHand(data.playerCards);
      setPlayerPoints(data.playerPoints);
      setPlayerOptionalPoints(data.playerOptionalPoints);
      setCroupierPoints(data.housePoints);
      setCroupierOptionalPoints(data.houseOptionalPoints)
      setCroupierHand(data.houseCards);
      setShowBetButton(false);
      setBetId(data.id);
      setGameInit(true);

      if (data.message) {
        setMessage(data.message);
        setGameEnded(true);
        setShowBetButton(false);
      }
    } catch (error) {
      console.log("error newbet", error);
    }
  };

  const hit = async () => {
    if (!connected) {
      return;
    }

    const body = {
      gameId: betId,
    };

    try {
      const response = await fetch(newBackLink + "blackJack/hit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!data.playerCards) {
        return;
      }
      const oldSrate = [...playerHand, data.playerCards];

      console.log(oldSrate);
      setPlayerHand(oldSrate);
      setPlayerPoints((old) => Number(old) + Number(data.playerPoints));
      setPlayerOptionalPoints(
        (old) => Number(old) + Number(data.playerOptionalPoints)
      );

      setMessage(data.message);

      if (data.houseCards) {
        setCroupierHand((old) => old.concat(data.houseCards));
        setCroupierPoints((old) => Number(old) + Number(data.housePoints));
        setCroupierOptionalPoints((old) => Number(old) + Number(data.houseOptionalPoints))
      }

      if (data.message) {
        setGameEnded(true);
        setShowBetButton(false);
        setGameInit(false);
        setMessage("Place your bet");
        return toast({
          position: "top-right",
          description: data.description,
          status: data.message === "WON" ? "info" : data.message === 'DRAW'? "info": data.message === 'Blackjack' ? 'info' :"error",
          variant: "solid",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {}
  };

  const stand = async () => {
    if (!connected) {
      return;
    }

    const body = {
      gameId: betId,
    };

    try {
      const response = await fetch(newBackLink + "blackJack/stand", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.houseCards) {
        setCroupierHand((old) => old.concat(data.houseCards));
        setCroupierPoints(Number(data.housePoints));
        setCroupierOptionalPoints(Number(data.houseOptionalPoints));
      }
      if (data.message) {
        setGameEnded(true);
        setShowBetButton(false);
        setGameInit(false);

        return toast({
          position: "top-right",
          description: data.description,
          status: data.message === "WON" ? "info" : data.message === 'DRAW'? "info": data.message === 'Blackjack' ? 'info' :"error",
          variant: "solid",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {}
  };

  const double = async () => {
    if (!connected) {
      return;
    }

    const body = {
      gameId: betId,
    };

    try {
      const response = await fetch(newBackLink + "blackJack/double", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.playerCards) {
        const oldSrate = [...playerHand, data.playerCards];
        console.log(oldSrate);
        setPlayerHand(oldSrate);
        setPlayerPoints((old) => Number(old) + Number(data.playerPoints));
        setPlayerOptionalPoints(
          (old) => Number(old) + Number(data.playerOptionalPoints)
        );
      }

      if (data.houseCards) {
        setCroupierHand((oldSrate) => oldSrate.concat(data.houseCards));
        setCroupierPoints(Number(data.housePoints));
        setCroupierOptionalPoints(Number(data.houseOptionalPoints));
      }
      if (data.message) {
        setGameEnded(true);
        setShowBetButton(false);
        setGameInit(false);

        return toast({
          position: "top-right",
          description: data.description,
          status: data.message === "WON" ? "info" : data.message === 'DRAW'? "info": data.message === 'Blackjack' ? 'info' :"error",
          variant: "solid",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {}
  };

  const nextRound = () => {
    setPlayerPoints(0);
    setPlayerOptionalPoints(0);
    setCroupierPoints(0);
    setCroupierOptionalPoints(0);
    setShowBetButton(true);
    setCurrentBet(0.1);
    setPlayerHand([]);
    setCroupierHand([]);
    setGameInit(false);
    setMessage("Place your bet");
  };

  const reset = () => {
    setGameEnded(false);
    nextRound();
  };

  return (
    <GameScreenContainer>
      <>
        <div className="board-wrapper">
          <div className="score">
            <PointsContainer>
              <h3>House</h3>
              <PointsValue>
                {croupierPoints !== croupierOptionalPoints
                  ? croupierPoints > 21
                    ? croupierOptionalPoints
                    : croupierPoints + "/" + croupierOptionalPoints
                  : croupierPoints}
                <span>Points</span>
              </PointsValue>
            </PointsContainer>
            <img src="/img/cardback.png" width="100px" />
            <PointsContainer>
              <h3>Player</h3>
              <PointsValue>
                {playerPoints !== playerOptionalPoints
                  ? playerPoints > 21
                    ? playerOptionalPoints
                    : playerPoints + "/" + playerOptionalPoints
                  : playerPoints}
                <span>Points</span>
              </PointsValue>
            </PointsContainer>
          </div>
          {/* END .score */}

          <HandsContainer>
            <div className="house handplay">
              <CroupierHandContainer>
                {croupierHand.length > 0 ? (
                  <CroupierHand currentHand={croupierHand} />
                ) : (
                  <Placeholder></Placeholder>
                )}
              </CroupierHandContainer>
            </div>
            {/* END .house */}

            <div className="place-info">
              <Message>{message}</Message>

              {gameEnded === true && (
                <GlowingButton m={3} onClick={() => reset()}>
                  Play Again
                </GlowingButton>
              )}
              {/* 
              {!gameEnded &&
                showBetButton &&(
                  <GlowingButton m={3} onClick={() => {}}>
                    Your turn
                  </GlowingButton>
                )} */}

              {showBetButton ? (
                <>
                  <CurrencyInput
                    value={currentBet}
                    onChange={(e) => setCurrentBet(Number(e.target.value))}
                  />
                  <GlowingButton m={3} onClick={() => startRound()}>
                    Start
                  </GlowingButton>
                </>
              ) : (
                !gameEnded && (
                  <>
                    <Text m={3} textTransform="uppercase" fontWeight='bold' fontFamily='GolosUIWebBold'>
                      Your turn
                    </Text>
                  </>
                )
              )}
            </div>
            {/* END .place-info */}

            <div className="player handplay">
              <UserHandContainer>
                {playerHand.length > 0 ? (
                  <PlayerHand currentHand={playerHand} />
                ) : (
                  <Placeholder></Placeholder>
                )}
              </UserHandContainer>
            </div>
            {/* END .player */}
          </HandsContainer>

          <ActionButtonContainer>
            <GlowingButton m={3} onClick={() => hit()} disabled={!gameInit}>
              Hit
            </GlowingButton>
            <GlowingButton m={3} onClick={() => stand()} disabled={!gameInit}>
              Stand
            </GlowingButton>
            <GlowingButton m={3} onClick={() => double()} disabled={!gameInit}>
              Double
            </GlowingButton>
          </ActionButtonContainer>
        </div>
        {/* END .board-wrapper */}
      </>
    </GameScreenContainer>
  );
}

export default Game;
