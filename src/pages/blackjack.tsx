import React, { useState, useEffect } from "react";
import Spinner from "../components/blackjack2/Spinner";
import {
  mainLink,
  newDeckShuffledLink,
  drawOneCardLink,
  drawTwoCardsLink,
  decksCount,
  reshuffleDeckLink,
  newBackLink,
  project, 
  tokenMint,
} from "../components/blackjack2/assets/const";
import {
  ActionButtonContainer,
  Balance,
  BalanceContainer,
  Message,
  BalanceText,
  BetCoin,
  BetConiText,
  BetText,
  CroupierHandContainer,
  GameScreenContainer,
  HandsContainer,
  PointsContainer,
  PointsValue,
  UserHandContainer,
  Placeholder,
  SubmitResultContainer,
  SubmitText,
  Row,
  Col,
} from "../components/blackjack2/GameElements";
import CroupierHand from "../components/blackjack2/CroupierHand";
import PlayerHand from "../components/blackjack2/PlayerHand";
import { DivButton } from "../components/blackjack2/Button";
import { GlowingButton } from "../components/common/glowing-button";
import { useWallet } from "@solana/wallet-adapter-react";
import { SignMessage } from "../utils/SignMessage";



function Game() {
  const [isDeckLoaded, setIsDeckLoaded] = useState(false);
  const [deck, setDeck] = useState({});

  const [playerHand, setPlayerHand] = useState([]);
  const [croupierHand, setCroupierHand] = useState([]);

  const [playerPoints, setPlayerPoints] = useState(0);
  const [croupierPoints, setCroupierPoints] = useState(0);

  const [playerOptionalPoints, setPlayerOptionalPoints] = useState(0);
  const [showPlayerOptionalPoints, setShowPlayerOptionalPoints] =
    useState(false);

  const [croupierOptionalPoints, setCroupierOptionalPoints] = useState(0);
  const [showCroupierOptionalPoints, setShowCroupierOptionalPoints] =
    useState(false);

  const [enableDrawingCardsForPlayer, setEnableDrawingCardsForPlayer] =
    useState(true);
  const [playerRoundEnded, setPlayerRoundEnded] = useState(false);

  const [playerCurrentBalance, setPlayerCurrentBalance] = useState(1000);
  const [currentBet, setCurrentBet] = useState(0);

  const [reverseCroupierCard, setReverseCroupierCard] = useState(false);

  const [roundCounter, setRoundCounter] = useState(1);

  const [placeBet, setPlaceBet] = useState(true);

  const [message, setMessage] = useState("Place your bet");
  const [showBetButton, setShowBetButton] = useState(true);

  const [goingForDouble, setGoingForDouble] = useState(false);

  const [winnerList, setWinnerList] = useState([]);

  const [loadingSavedGame, setLoadingSavedGame] = useState(false);

  const [gameEnded, setGameEnded] = useState(false);
  const [bestResults, setBestResults] = useState([]);
  const { connected, publicKey, signTransaction, signMessage } = useWallet();

  let enableHitButton =
    enableDrawingCardsForPlayer === true &&
    playerRoundEnded === false &&
    placeBet === false;
  let enableStandButton =
    playerRoundEnded === false &&
    enableDrawingCardsForPlayer === true &&
    placeBet === false;
  let enableDoubleButton =
    playerHand.length === 2 &&
    playerRoundEnded === false &&
    placeBet === false &&
    playerCurrentBalance >= currentBet;

  useEffect(() => {
    createNewDeck();
    window.addEventListener("beforeunload", (ev) => {
      save();
      ev.preventDefault();
      return (ev.returnValue = "Are you sure you want to close?");
    });
    return () => {
      window.removeEventListener("beforeunload", (ev) => {
        save();
        ev.preventDefault();
        return (ev.returnValue = "Are you sure you want to close?");
      });
    };
  }, []);

  useEffect(() => {
    setPlayerPoints(() => {
      return 0;
    });
    setPlayerOptionalPoints(() => {
      return 0;
    });

    playerHand.map((card) =>
      card.value === "JACK" || card.value === "KING" || card.value === "QUEEN"
        ? (setPlayerPoints((points) => {
            return points + 10;
          }),
          setPlayerOptionalPoints((points) => {
            return points + 10;
          }))
        : card.value === "ACE"
        ? (setPlayerPoints((points) => {
            return points + 11;
          }),
          setPlayerOptionalPoints((points) => {
            return points + 1;
          }),
          setShowPlayerOptionalPoints(() => {
            return true;
          }))
        : (setPlayerPoints((points) => {
            return points + parseInt(card.value);
          }),
          setPlayerOptionalPoints((points) => {
            return points + parseInt(card.value);
          }))
    );
  }, [playerHand]);

  useEffect(() => {
    setCroupierPoints(() => {
      return 0;
    });
    setCroupierOptionalPoints(() => {
      return 0;
    });

    if (croupierHand.length === 2 && playerRoundEnded === false) {
      if (
        croupierHand[0].value === "JACK" ||
        croupierHand[0].value === "KING" ||
        croupierHand[0].value === "QUEEN"
      ) {
        setCroupierPoints((points) => {
          return points + 10;
        });
        setCroupierOptionalPoints((points) => {
          return points + 10;
        });
      } else if (croupierHand[0].value === "ACE") {
        setCroupierPoints((points) => {
          return points + 11;
        });
        setCroupierOptionalPoints((points) => {
          return points + 1;
        });
        setShowCroupierOptionalPoints(() => {
          return true;
        });
      } else {
        setCroupierPoints((points) => {
          return points + parseInt(croupierHand[0].value);
        });
        setCroupierOptionalPoints((points) => {
          return points + parseInt(croupierHand[0].value);
        });
      }
    } else {
      croupierHand.map((card) =>
        card.value === "JACK" || card.value === "KING" || card.value === "QUEEN"
          ? (setCroupierPoints((points) => {
              return points + 10;
            }),
            setCroupierOptionalPoints((points) => {
              return points + 10;
            }))
          : card.value === "ACE"
          ? (setCroupierPoints((points) => {
              return points + 11;
            }),
            setCroupierOptionalPoints((points) => {
              return points + 1;
            }),
            setShowCroupierOptionalPoints(() => {
              return true;
            }))
          : (setCroupierPoints((points) => {
              return points + parseInt(card.value);
            }),
            setCroupierOptionalPoints((points) => {
              return points + parseInt(card.value);
            }))
      );
    }
  }, [croupierHand, playerRoundEnded]);

  useEffect(() => {
    if (playerPoints > 21 && playerOptionalPoints > 21) {
      setEnableDrawingCardsForPlayer(() => {
        return false;
      });
      setMessage("You lost");
      setTimeout(() => {
        computerWon();
      }, 2000);
    } else if (playerPoints === 21 || playerOptionalPoints === 21) {
      setMessage("Blackjack!");
      setEnableDrawingCardsForPlayer(() => {
        return false;
      });
      setTimeout(() => {
        stand();
      }, 2000);
    } else {
      goingForDouble === true && stand();
    }
  }, [playerPoints]);

  useEffect(() => {
    if (
      ((playerRoundEnded === true && croupierPoints <= 16) ||
        (croupierPoints > 21 && croupierOptionalPoints <= 16)) &&
      croupierPoints !== 0
    ) {
      setMessage("Computers turn");
      draw(false, drawOneCardLink);
    } else if (playerRoundEnded === true && croupierPoints !== 0) {
      let compareUserPoints;
      let compareCroupierPoints;
      if (
        playerPoints > 21 &&
        playerOptionalPoints > 0 &&
        playerOptionalPoints <= 21
      ) {
        compareUserPoints = playerOptionalPoints;
      } else {
        compareUserPoints = playerPoints;
      }

      if (croupierPoints > 21 && croupierOptionalPoints > 21) {
        compareCroupierPoints = 0;
      } else if (
        croupierPoints > 21 &&
        croupierOptionalPoints > 0 &&
        croupierOptionalPoints <= 21
      ) {
        compareCroupierPoints = croupierOptionalPoints;
      } else if (croupierPoints <= 21) {
        compareCroupierPoints = croupierPoints;
      }

      if (21 - compareUserPoints < 21 - compareCroupierPoints) {
        setMessage("You won");
        setTimeout(() => {
          playerWon();
        }, 2000);
      } else if (21 - compareUserPoints > 21 - compareCroupierPoints) {
        setMessage("Computer won");
        setTimeout(() => {
          computerWon();
        }, 2000);
      } else {
        setMessage("Draw");
        setTimeout(() => {
          noWinner();
        }, 2000);
      }
    }
  }, [croupierPoints]);

  useEffect(() => {
    if (placeBet === true) {
      setMessage("Place your bet");
      setShowBetButton(true);
    }
  }, [placeBet]);

  useEffect(() => {
    if (roundCounter > 5) {
      endGame();
    } else if (roundCounter !== 1 && loadingSavedGame === false) {
      nextRound();
    } else {
      setLoadingSavedGame(false);
    }
  }, [roundCounter]);

  const createNewDeck = () => {
    fetch(newBackLink + "game/create-new-deck", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setIsDeckLoaded(() => {
          return true;
        });
        setDeck(() => {
          return { ...responseData };
        });
      })
      .catch((err) => {
        console.log("error : " + err);
      });
  };

  const draw = (forUser, howManyCards) => {
    const body = {
      deck: deck.deck_id,
      howManyCards,
    };
    console.log(body);
    fetch(newBackLink + "game/draw", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (forUser === true) {
          setPlayerHand((currentPlayerHand) => {
            return [...currentPlayerHand, ...responseData.cards];
          });
        } else {
          setCroupierHand((currentCroupierHand) => {
            return [...currentCroupierHand, ...responseData.cards];
          });
        }
      })
      .catch((err) => {
        console.log("error : " + err);
      });
  };

  const shuffleDeck = (deckId) => {
    const body = {
      deckId,
      reshuffleDeckLink,
    };
    fetch(newBackLink + "game/shuffle-deck", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseData) => {
        setIsDeckLoaded(() => {
          return true;
        });
        setDeck(() => {
          return { ...responseData };
        });
      })
      .catch((err) => {
        console.log("error : " + err);
      });
  };

  const stand = () => {
    setReverseCroupierCard(() => {
      return true;
    });
    setTimeout(() => {
      setPlayerRoundEnded(() => {
        return true;
      });
      setEnableDrawingCardsForPlayer(() => {
        return false;
      });
    }, 250);
  };

  const double = () => {
    setGoingForDouble(true);
    setMessage("Going for double!");
    setPlayerCurrentBalance((balance) => {
      return balance - currentBet;
    });
    setCurrentBet((bet) => {
      return bet + bet;
    });
    draw(true, drawOneCardLink);
  };

  const startRound = async (amount) => {
    const signature = await SignMessage({ publicKey, connected, signMessage });
    //cria a bet 
    const body = {
      amount, wallet: publicKey , project, tokenMint, signature
    }
    try {
      const response = await fetch( newBackLink + "game/bet", {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if(response.status === 401){
        return alert("You don't have enough balance to bet")
      }
       
        setPlayerRoundEnded(false);
        setEnableDrawingCardsForPlayer(true);
        setPlaceBet(false);
        setShowBetButton(false);
        setMessage("Your turn");
        if (isDeckLoaded === true) {
          draw(true, drawTwoCardsLink);
          draw(false, drawTwoCardsLink);
        }
      
    } catch (error) {
      
    }
  
  };

  const bet = (amount) => {
    if (playerCurrentBalance - amount >= 0) {
      setPlayerCurrentBalance((balance) => {
        return balance - amount;
      });
      setCurrentBet((bet) => {
        return bet + amount;
      });
    }
  };

  const playerWon = async () => {
    const body = {
      result: true,
    };
    await fetch(newBackLink + "game/finishbet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    await fetch(newBackLink + "game/cashout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    // cashout
    setWinnerList((winners) => {
      return [...winners, "player"];
    });
    setPlayerCurrentBalance((balance) => {
      return balance + currentBet * 1.5;
    });
    setRoundCounter((round) => {
      return round + 1;
    });
  };

  const computerWon = async () => {
    const body = {
      result: false,
    };
    await fetch(newBackLink + "game/finishbet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    await fetch(newBackLink + "game/cashout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    setWinnerList((winners) => {
      return [...winners, "computer"];
    });
    setRoundCounter((round) => {
      return round + 1;
    });
  };

  const noWinner = async () => {
    const body = {
      result: false,
    };
    await fetch(newBackLink + "game/finishbet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    await fetch(newBackLink + "game/nowinner", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    setWinnerList((winners) => {
      return [...winners, "draw"];
    });
    setPlayerCurrentBalance((balance) => {
      return balance + currentBet;
    });
    setRoundCounter((round) => {
      return round + 1;
    });
  };

  const nextRound = () => {
    setReverseCroupierCard(false);
    setGoingForDouble(false);
    setShowCroupierOptionalPoints(false);
    setShowPlayerOptionalPoints(false);
    setPlayerPoints(0);
    setPlayerOptionalPoints(0);
    setCroupierPoints(0);
    setCroupierOptionalPoints(0);
    setPlaceBet(true);
    setShowBetButton(true);
    setCurrentBet(0);
    setPlayerHand([]);
    setCroupierHand([]);
  };

  const endGame = () => {
    setGameEnded(true);
    setCurrentBet(0);
    setMessage("End of game");
    let rank = JSON.parse(localStorage.getItem("rank"));

    if (rank === undefined || rank === null) {
      localStorage.setItem(
        "rank",
        JSON.stringify({
          points: [playerCurrentBalance],
        })
      );
    } else {
      let sortedRank = rank.points.sort(function (a, b) {
        return b - a;
      });
      if (sortedRank.length <= 2) {
        setBestResults([...sortedRank]);
      } else {
        setBestResults([sortedRank[0], sortedRank[1], sortedRank[2]]);
      }
      localStorage.setItem(
        "rank",
        JSON.stringify({
          points: [...rank.points, playerCurrentBalance],
        })
      );
    }
  };

  const reset = () => {
    setGameEnded(false);
    setIsDeckLoaded(false);
    shuffleDeck(deck.deck_id);
    nextRound();
    setRoundCounter(1);
    setWinnerList([]);
    setPlayerCurrentBalance(1000);
  };

  const save = () => {
    localStorage.setItem(
      "savedGame",
      JSON.stringify({
        isDeckLoaded: isDeckLoaded,
        deck: deck,
        playerHand: playerHand,
        croupierHand: croupierHand,
        playerPoints: playerPoints,
        croupierPoints: croupierPoints,
        playerOptionalPoints: playerOptionalPoints,
        showPlayerOptionalPoints: showPlayerOptionalPoints,
        croupierOptionalPoints: croupierOptionalPoints,
        showCroupierOptionalPoints: showCroupierOptionalPoints,
        enableDrawingCardsForPlayer: enableDrawingCardsForPlayer,
        playerRoundEnded: playerRoundEnded,
        playerCurrentBalance: playerCurrentBalance,
        currentBet: currentBet,
        reverseCroupierCard: reverseCroupierCard,
        roundCounter: roundCounter,
        placeBet: placeBet,
        message: message,
        showBetButton: showBetButton,
        goingForDouble: goingForDouble,
        winnerList: winnerList,
      })
    );
  };

  return (
    <GameScreenContainer>
      {isDeckLoaded === true ? (
        <>
          <BalanceContainer>
            <Row>
              <Col>
                <BetCoin
                  enabled={!placeBet}
                  onClick={() => placeBet && bet(10)}
                >
                  <BetConiText>10</BetConiText>
                </BetCoin>
                <BetCoin
                  enabled={!placeBet}
                  onClick={() => placeBet && bet(50)}
                >
                  <BetConiText>50</BetConiText>
                </BetCoin>
                <BetCoin
                  enabled={!placeBet}
                  onClick={() => placeBet && bet(100)}
                >
                  <BetConiText>100</BetConiText>
                </BetCoin>
                <BetCoin
                  enabled={!placeBet}
                  onClick={() => placeBet && bet(500)}
                >
                  <BetConiText>500</BetConiText>
                </BetCoin>
              </Col>
            </Row>

            <Balance>
              <BetText>Current bet: {currentBet}</BetText>
            </Balance>
          </BalanceContainer>

          <HandsContainer>
            <CroupierHandContainer>
              {croupierHand.length > 0 ? (
                <CroupierHand
                  currentHand={croupierHand}
                  isReversed={reverseCroupierCard}
                />
              ) : (
                <Placeholder></Placeholder>
              )}
            </CroupierHandContainer>
            <PointsContainer>
              <PointsValue>
                {showCroupierOptionalPoints === false
                  ? croupierPoints
                  : showCroupierOptionalPoints === true && croupierPoints > 21
                  ? croupierOptionalPoints
                  : croupierPoints + "/" + croupierOptionalPoints}
              </PointsValue>
            </PointsContainer>
            <Message>{message}</Message>
            {gameEnded === true && (
              <SubmitResultContainer>
                <SubmitText>Best results:</SubmitText>
                {bestResults.map((res, index) => {
                  return (
                    <SubmitText key={index}>
                      {index + 1}. {res}{" "}
                    </SubmitText>
                  );
                })}
              </SubmitResultContainer>
            )}

            {showBetButton && (
              <GlowingButton m={3} onClick={() => startRound()}>
                Start round
              </GlowingButton>
            )}
            <ActionButtonContainer>
              <GlowingButton
                m={3}
                disabled={!enableHitButton}
                onClick={() => {
                  enableHitButton && draw(true, drawOneCardLink);
                }}
              >
                Hit
              </GlowingButton>
              <GlowingButton
                m={3}
                disabled={!enableStandButton}
                onClick={() => {
                  enableStandButton && stand();
                }}
              >
                Stand
              </GlowingButton>
              <GlowingButton
                m={3}
                disabled={!enableDoubleButton}
                onClick={() => {
                  enableDoubleButton && double();
                }}
              >
                Double
              </GlowingButton>
            </ActionButtonContainer>
            <PointsContainer>
              <PointsValue>
                {showPlayerOptionalPoints === false
                  ? playerPoints
                  : showPlayerOptionalPoints === true && playerPoints > 21
                  ? playerOptionalPoints
                  : playerPoints + "/" + playerOptionalPoints}
              </PointsValue>
            </PointsContainer>
            <UserHandContainer>
              {playerHand.length > 0 ? (
                <PlayerHand currentHand={playerHand} />
              ) : (
                <Placeholder></Placeholder>
              )}
            </UserHandContainer>
          </HandsContainer>
        </>
      ) : (
        <Spinner />
      )}
    </GameScreenContainer>
  );
}

export default Game;
