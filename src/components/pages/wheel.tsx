import React, { useState, useRef, useContext, useEffect } from 'react';
import { Layout } from '../components/common/layout';
import { Switch, Modal, ModalOverlay, Checkbox, useDisclosure } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';
import WheelComponent from '../components/wheel/index'
import { sendCurrencyToTreasure, renderButtons } from '../utils/solana'
import {CurrencyContext} from './_app';
import Space from '../components/common/space'
import constants from '../utils/constants';

const { colors, infos } = constants;
const { secondaryBackground, accentColor, objectText } = colors;

const MASTER_PK = 'B8e4g2SP7AC9SqQXPChEEmduhwBuZ8MTMb5xEGUchU2t';
const connect = new web3.Connection('https://proud-cold-snowflake.solana-mainnet.quiknode.pro');
const TOKEN_PROGRAM_ID = new web3.PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);


import {
  Text,
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled'
import { sendBetToBalance } from '../utils/sendBetToBalance';
import axios from 'axios';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`


const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  height: 75vh;
  width: 100%;
  padding-top: 20px;
  @media (max-width: 1250px) {
    height: 100%;
    flex-direction: column;
    padding-bottom: 40px;
  }
`

const RowCentered = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 246px;
  padding-top: 10px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 70%;
  @media (max-width: 1280px) {
    width: 100% !important;
  }
`
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

`

const Button = styled.button<{ selected: boolean }>`
  height: 50px;
  width: 40%;
  background-color: ${({ selected }) => selected ? '#1F3F39' : 'transparent'};
  border: 3px solid ${({ selected }) => selected ? '#1F3F39' : '#FFF'};
  color: #FFF;
  ${({ selected }) => selected && `
    -webkit-box-shadow: 0px 0px 15px 7px rgba(255, 255, 255, .6); 
    box-shadow: 0px 0px 15px 7px rgba(255, 255, 255, .6);
  ` }
  font-weight: bold;
  font-size: 20px;

  transition: .2s;
`



export default function Wheel() {
  const audioRef = useRef<any>(null)
  const context = useContext(CurrencyContext)

  const [isEven, setEven] = useState(false)
  const [isBlack, setBlack] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [inputValue, setValue] = useState()
  const [rotate, setRotate] = useState("");
  const [diceValue, setDiceValue] = useState(0); // integer state
  const [isChecked, setChecked] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { connection } = useConnection();
  const [option, setOption] = useState('ODD')

  const { sendTransaction, publicKey, connected, signMessage } = useWallet();
  const [solBalance, setSolBalance] = useState(0)
  const [flyBalance, setFlyBalance] = useState(0)

  useEffect(() => {
    if (connected) {
      updateBalances()
    }
  }, [connected])


  function updateBalances() {
    const body = {
      project: infos.project,
      wallet: publicKey?.toString()
    }

    axios.post(`${infos.serverUrl}/balance`, body).then(({ data }) => {

      data.forEach(({ amount, tokenMint }) => {
        if (tokenMint === "11111111111111111111111111111111") {
          setSolBalance(amount)
        } else {
          // setFlyBalance(amount)
        }
      })
    })
  }

  if (typeof window === 'undefined') return <></>;


  const oddResult = [0, 1, 4, 5, 8, 9, 12, 13, 16, 18, 21, 23, 24, 27, 28, 30, 32, 33]
  const evenResult = [2, 3, 6, 7, 10, 11, 14, 15, 17, 19, 20, 22, 25, 26, 29, 31, 34, 35]
  const redResult = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34]
  const blackResult = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35]

  const possibleResults = [
    "rotate(3deg)", //odd, red 3 0
    "rotate(13deg)", //odd 35 black 1
    "rotate(23deg)", //even, red 12 2
    "rotate(32deg)", //even 28 black 3
    "rotate(42deg)", //odd, red 7 4
    "rotate(52deg)", //odd 29 black 5
    "rotate(61deg)", //even, red 18 6
    "rotate(71deg)", //even 22 black 7
    "rotate(81deg)", //odd, red 9 8
    "rotate(91deg)", //odd 31 black 9
    "rotate(101deg)", //even, red 14 10
    "rotate(110deg)", //even 20 black 11 
    "rotate(120deg)", //odd, red 1 12
    "rotate(130deg)", //odd 33 black 13 
    "rotate(140deg)", //even, red 16 14
    "rotate(150deg)", //even 24 black 15

    "rotate(159deg)", //odd, red 5 16
    "rotate(168deg)", //even 10 black 17
    "rotate(179deg)", //odd, red 23 18
    "rotate(189deg)", //even 8 black 19
    "rotate(198deg)", //even 30, red 20
    "rotate(207deg)", //odd 11 black 21
    "rotate(217deg)", //even, red 36 22
    "rotate(227deg)", //odd 13 black 23
    "rotate(237deg)", //odd 27, red 24
    "rotate(246deg)", //even 6 black 25
    "rotate(256deg)", //even, red 34 26
    "rotate(266deg)", //odd 17 black 27
    "rotate(276deg)", //odd 25, red 28
    "rotate(286deg)", //even 2 black 29
    "rotate(296deg)", //odd 21, red 30
    "rotate(305deg)", //even 4 black 31
    "rotate(315deg)", //odd, red 19 32
    "rotate(325deg)", //odd 15 black 33
    "rotate(335deg)", //even, red 32 34
    //"rotate(345deg)",
    "rotate(355deg)", //even 26 black 35
  ]



	const roll = () => {
		const xRand = 6000000;
		const rotate = "rotate(" + xRand + "deg)";
		setRotate(rotate);
	};

  const bet = async (betValue: number, mintAddress: string, toTokenAccountAddress: string) => {
    audioRef?.current?.play()

    if(!fromWallet) {
      toast({
        title: `Error`,
        description: 'You must connect your wallet before',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        variant: 'solid'
      });
      return;
    }

    //forceUpdate
    setDiceValue(diceValue + 1)


    roll();
    setLoading(true);

    // const { parsedResult } = await sendCurrencyToTreasure({ fromWallet, toast, toTokenAccountAddress, mintAddress, betValue, sendTransaction, connection, endpoint: 'wheelBet', publicKey })
    const { parsedResult } = await sendBetToBalance(betValue, mintAddress, { publicKey, connected, signMessage })
    setLoading(false);
    onClose();
    const dice = Math.floor(Math.random() * 17);
    // const isRedEven = !isBlack && isEven
    // const isBlackEven = isBlack && isEven
    // const isRedOdd = !isBlack && !isEven
    // const isBlackOdd = isBlack && !isEven
    let winningArr: any = [];
    let losingArr: any = [];
    if (option === 'ODD') {
      winningArr = [...oddResult]
      losingArr = [...evenResult]
    } else if (option === 'EVEN') {
      winningArr = [...evenResult]
      losingArr = [...oddResult]
    } else if (option === 'BLACK') {
      winningArr = [...blackResult]
      losingArr = [...redResult]
    } else if (option === 'RED') {
      winningArr = [...redResult]
      losingArr = [...blackResult]
    }

    if(parsedResult?.won) {
      audioRef?.current?.load()
      //isEven ? 2, 4, 6 : 1, 3, 5;


      setRotate(possibleResults[winningArr[dice]]);
      const winValue = betValue * 2;

      toast({
        title: `Yayyyy!!`,
        description: `You got $${(winValue).toFixed(2)} $${context.value} back! They will be transferred in less than a minute! Keep going!!`,
        status: 'info',
        duration: 15000,
        isClosable: true,
        position: 'bottom-right',
        variant: 'solid'
      });
      updateBalances()
    } else {
      audioRef?.current?.load()

      setRotate(possibleResults[losingArr[dice]]);
      toast({
        title: `Ops.`,
        description: 'Not your lucky play, try again',
        status: 'warning',
        duration: 15000,
        isClosable: true,
        position: 'bottom-right',
        variant: 'solid'
      });
      updateBalances()
    }
    if(isChecked) {
      await bet(betValue, mintAddress, toTokenAccountAddress);
    }
  }

  return (
    <Layout style={{ backgroundImage: "url('https://i.imgur.com/e5W6Pyn.png')", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <Wrapper>
        <InnerWrapper>
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
            style={{overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, .25)', padding: 20, borderRadius: 4}}
          >
            {connected && (
                <BalanceArea>
                  <span>$SOL: {solBalance.toFixed(2)}</span>
                  <span>$DMC: {flyBalance.toFixed(2)}</span>
                </BalanceArea>
              )}
            <WheelComponent isRolling={isLoading} rotate={rotate} diceValue={diceValue} />
          <RowCentered/>
          <RowCentered/>
          <RowCentered>
              <Button
                selected={option == 'ODD'}
                onClick={() => setOption('ODD')}
                disabled={isLoading}
              >
                Odd
              </Button>

              <Button
                selected={option == 'EVEN'}
                onClick={() => setOption('EVEN')}
                disabled={isLoading}
              >
                Even
              </Button>

            </RowCentered>
            <RowCentered>
              <Button
                selected={option == 'RED'}
                onClick={() => setOption('RED')}
                disabled={isLoading}
              >
                Red
              </Button>

              <Button
                selected={option == 'BLACK'}
                onClick={() => setOption('BLACK')}
                disabled={isLoading}
              >
                Black
              </Button>

            </RowCentered>
          <RowCentered/>
          {renderButtons(context.value, false, bet, inputValue, setValue, isLoading, onOpen)}
          </motion.div>
        </InnerWrapper>
      </Wrapper>
      <audio
        src='/audios/wheel.mp3'
        autoPlay={false}
        ref={audioRef}
        //onPlay={() => setPlayingState(true)}
        //onPause={() => setPlayingState(false)}
      />
    </Layout>
  );
}
