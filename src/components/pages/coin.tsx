import React, { useState, useContext, useEffect } from 'react';
import { Layout } from '../components/common/layout';
import { Switch, Modal, ModalOverlay, useDisclosure, Checkbox, Button } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import CoinComponent from '../components/coin/index'
import {CurrencyContext} from './_app';
import { sendCurrencyToTreasure, renderButtons } from '../utils/solana'
import Space from '../components/common/space'
import LiveBets from '../components/live-bets/index'
import {
  Text,
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import constants from '../utils/constants';
import { url } from 'inspector';

const { colors, infos } = constants;
const { objectBackground, secondaryBackground, accentColor, objectText } = colors;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
`

const Wr = styled.div`
  background: #FFCC00;   
  -webkit-transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  box-shadow:0 0 10rem rgba(0, 0, 0, 0.5) inset;
`


const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-top: 70px;
  background-color: red;
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
  width: 400px;
  padding: 15px 0px;
`

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 280px;
  padding-top: 10px;
`

const breeding = keyframes`
  0% {
    width: 35px;
    height: 35px;
  }

  50% {
    width: 45px;
    height: 45px;
  }

  100% {
    width: 35px;
    height: 35px;
  }

`;

const LoadingBall = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 100%;

${p => p.isFilled ? `
    background: #00E676;
  ` : `
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.7);
  `}
`

export default function Coin() {
  const [isEven, setEven] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isFlipping, setFlipping] = useState(false)
  const [isFlipped, setFlipped] = useState(false)
  const [inputValue, setValue] = useState()
  const [bets, setBets] = useState(0)
  const [isChecked, setChecked] = useState(false)
  const [textContent, setTextContent] = useState("HEADS");
  const [diceValue, setDiceValue] = useState(0); // integer state
  const context = useContext(CurrencyContext)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { sendTransaction, publicKey } = useWallet();
  const { connection } = useConnection();

  const flip = ({ parsedResult, betValue }: any) => {
    setTextContent('')
    setFlipping(true);
    setTimeout(() => {
      setFlipping(false)
      setDiceValue(diceValue + 1)
      if(parsedResult?.data?.won) {

        //isEven ? 2, 4, 6 : 1, 3, 5;
        const realResult = isEven ? 'HEADS' : 'TAILS';

        setFlipped(true);
        setTextContent(realResult);
        const winValue = betValue * 2;

        
        toast({
          title: `Yayyyy!!`,
          description: `You got $${(winValue).toFixed(2)} $Tokens back! They will be transferred in less than a minute! Keep going!!`,
          status: 'info',
          duration: 15000,
          isClosable: true,
          position: 'bottom-right',
          variant: 'solid'
        });
      } else {
        const realResult = !isEven ? 'HEADS' : 'TAILS';

        //isEven ? 1, 3, 5 : 2, 4, 6 ;
        setFlipped(true);
        setTextContent(realResult);
        toast({
          title: `Ops.`,
          description: 'Not your lucky play, try again',
          status: 'warning',
          duration: 15000,
          isClosable: true,
          position: 'bottom-right',
          variant: 'solid'
        });

      }
    }, 1000);
  }

  if (typeof window === 'undefined') return <></>;


  const bet = async (betValue: number, mintAddress: string, toTokenAccountAddress: string) => {
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
    setFlipped(false);


    //forceUpdate
    setDiceValue(diceValue + 1)
    setLoading(true);


    //START
    const { parsedResult } = await sendCurrencyToTreasure({ fromWallet, toast, toTokenAccountAddress, mintAddress, betValue, sendTransaction, connection, endpoint: 'coinBet', publicKey, bets })
    //END

    setBets(bets >= 4 ? 0 : bets + 1)
    setLoading(false);
    onClose();
    flip({ parsedResult, betValue })

    if(isChecked) {
      await bet(betValue, mintAddress, toTokenAccountAddress);
    }
  }

  useEffect(() => {
    async function fetchStatus() {
      const resp = await fetch(`${infos.serverUrl}/api/v1/transaction/bets`, {
        body: `{"publicKeyString":"${publicKey?.toString()}"}`,
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });

      const parsedResponse = await resp.json();
      console.log('parsedResponse', parsedResponse.data);
      setBets(parsedResponse.data);
    }

    if(publicKey?.toString()) {
      fetchStatus();
    }

  }, [publicKey && publicKey?.toString()])

  console.log('context', context);

  return (
    <Layout>
      <Wrapper>
        <InnerWrapper>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
          >
              <Wr style={{overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', padding: 20, borderRadius: 4}}>
                <CoinComponent isFlipped={isFlipped} isFlipping={isFlipping || isLoading} textContent={textContent} diceValue={diceValue} />
                <RowCentered>
                  <Text fontSize="36px" fontWeight="bold" color={!isEven ? objectBackground : 'rgba(255, 255, 255, 0.5)'}>TAILS</Text>
                  <Space width={10} />
                  <Switch size="lg" isChecked={isEven} value={isEven ? 'isEven' : 'isOdd'} onChange={(e) => setEven(e.target.value !== 'isEven')} />
                  <Space width={10} />
                  <Text fontSize="36px" fontWeight="bold" color={isEven ? objectBackground : 'rgba(255, 255, 255, 0.5)'}>HEADS</Text>
                  <Space width={50} />
                  <Checkbox size='lg' colorScheme='green' onChange={(e) => setChecked(e.target.checked)} isChecked={isChecked}>
                    <Text fontSize="24px" fontWeight="medium" color={objectBackground}>Auto</Text>
                  </Checkbox>
                  <Space width={15} />
                </RowCentered>
                {renderButtons(context.value, false, bet, inputValue, setValue, isLoading, onOpen)}
              </Wr>
            </motion.div>
            <Space height={70} />
            <LiveBets />
          </InnerWrapper>
      </Wrapper>

    </Layout>
  );
}
