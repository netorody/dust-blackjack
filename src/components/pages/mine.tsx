import React, { useState, useContext, useEffect } from 'react';
import { Layout } from '../components/common/layout';
import { useDisclosure } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import Mine from '../components/mine/index'
import {CurrencyContext} from './_app';
import { sendCurrencyToTreasure, renderButtons } from '../utils/solana'
import Space from '../components/common/space'
import {
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled'
import constants from '../utils/constants';

const { colors, infos } = constants;
const { secondaryBackground, accentColor, objectText } = colors;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
  padding-top: 50px;
`


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
`

export default function Minesweeping() {
  const [isLoading, setLoading] = useState(false)
  const [isFlipped, setFlipped] = useState(false)
  const [inputValue, setValue] = useState()
  const [bets, setBets] = useState(0)
  const [diceValue, setDiceValue] = useState(0); // integer state
  const context = useContext(CurrencyContext)
  const [mySignature, setSignature] = useState(null)
  const [isPaymentVerified, setVerified] = useState(false)

  const { onOpen } = useDisclosure()
  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { sendTransaction, publicKey } = useWallet();
  const { connection } = useConnection();

  const betCallback = ({ parsedResult, betValue }: any) => {
    setFlipped(!isFlipped);
    setTimeout(() => {
      if(parsedResult?.data?.won) {

        setVerified(true);
        toast({
          title: `Yayyyy!!`,
          description: `All good!! Start playing by clicking on the squares`,
          status: 'info',
          duration: 15000,
          isClosable: true,
          position: 'bottom-right',
          variant: 'solid'
        });
      } else {
        toast({
          title: `Ops.`,
          description: 'Sorry, we had an issue, reach out to support',
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

    //forceUpdate
    setDiceValue(diceValue + 1)
    setLoading(true);


    console.log('a')
    //START
    const { parsedResult, signature} = await sendCurrencyToTreasure({ fromWallet, toast, toTokenAccountAddress, mintAddress, betValue, sendTransaction, connection, endpoint: 'payMineBet', publicKey, bets })
    //END
    setSignature(signature);
    console.log('b')

    setLoading(false);
    console.log('c')
    console.log('d')
    betCallback({ parsedResult, betValue })
    console.log('e')

  }

  return (
    <Layout>
      <Wrapper>
        <InnerWrapper>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
            style={{overflow: 'hidden', flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: secondaryBackground, padding: 20, borderRadius: 4}}
          >
              <Mine isPaymentVerified={isPaymentVerified} setVerified={setVerified} mySignature={mySignature} setSignature={setSignature} />
              <Space height={50} />
              <Space height={20} />
              {renderButtons(context.value, false, bet, inputValue, setValue, isLoading, onOpen)}
            </motion.div>
          </InnerWrapper>
      </Wrapper>
    </Layout>
  );
}
