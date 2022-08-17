import React, { useEffect, useRef, useState } from 'react';

import {
  Text,
} from '@chakra-ui/react';
import styled from '@emotion/styled'
import { motion } from "framer-motion";
import Space from '../common/space';
import { useRouter } from 'next/router';
import { Button } from '../button';
import constants from '../../utils/constants';
const { infos } = constants;
const { serverUrl } = infos;

export function timeSince(date) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' years'
  }
  interval = seconds / 259200
  if (interval > 1) {
    return Math.floor(interval) + ' months'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hours'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minutes'
  }
  return Math.floor(seconds) + ' seconds'
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  padding: 10px;
`

const NftImage = styled.img`
  width: 150px;
  height: 150px;
  border: 2px solid white;
  border-radius: 5px;
  margin: 8px;
`

const HomeNftImage = styled.img`
  width:50px;
  height: 50px;
  border: 2px solid white;
  border-radius: 5px;
  margin: 2px;
`

const Column = styled.div`
  display: flex;
  flex: 1;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-left: 80px;
`

const TransactionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: ${p => p.isOutline ? '#0202204f' : 'transparent'};
  margin-top: 3px;
  padding: 14px 0px;
  width: 900px;
`

const GameWrappper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: rgba(135, 134, 171, 0.8);
  font-weight: medium;
  font-size: 18px;
`

const BetvaueWrappper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: rgba(135, 134, 171, 0.8);
  font-weight: medium;
  font-size: 18px;
`

const CreatedWrappper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: rgba(135, 134, 171, 0.8);
  font-weight: medium;
  font-size: 18px;
`

function start_and_end(str) {
  if(!str) {
    return null;
  }

  if (str.length > 10) {
    return str.substr(0, 4) + '...' + str.substr(str.length-4, str.length);
  }
  return str;
}


const getPositionText = (position) => {
  switch(position) {
    case 1:
      return `1st place 👑 `
    case 2:
      return '2nd place 🥈'
    case 3:
      return '3rd place 🥉'
    default:
      return 'Losing...'
  }
}

const getPositionInfo = (position) => {
  switch(position) {
    case 1:
      return `(50% of JackPot)`
    case 2:
      return '(20% of JackPot)'
    case 3:
      return '(8% of JackPot)'
    default:
      return null
  }
}

const getPositionFontWeight = (position) => {
  switch(position) {
    case 1:
      return `bold`
    case 2:
      return 'medium'
    case 3:
      return 'normal'
    default:
      return 'normal'
  }
}

const getPositionFontSize = (position) => {
  switch(position) {
    case 1:
      return `24px`
    case 2:
      return '18px'
    case 3:
      return '16px'
    default:
      return '16px'
  }
}

const getPositionColor = (position) => {
  switch(position) {
    case 1:
      return `rgba(80, 227, 194, 1)`
    case 2:
      return 'rgba(80, 227, 194, 0.8)'
    case 3:
      return 'rgba(80, 227, 194, 0.4)'
    default:
      return '#ff0000'
  }
}

const Transaction = ({betValue, createdAt, won, game, fromWallet, isOutline, currency, position}) => (
  <TransactionWrapper isOutline={isOutline}>
    <GameWrappper>
      <Text color={getPositionColor(position)} fontSize={getPositionFontSize(position)} fontWeight={getPositionFontWeight(position)}>{getPositionText(position)}</Text>
      <Text fontSize="16px" >{getPositionInfo(position)}</Text>
    </GameWrappper>
    <BetvaueWrappper>
      <Text fontSize="16px" color={getPositionColor(position)}>{betValue} ${currency}</Text>
    </BetvaueWrappper>
    <CreatedWrappper>
      <Text fontSize="16px" >{timeSince(createdAt)} ago</Text>
    </CreatedWrappper>
    <CreatedWrappper>
      <Text fontSize="16px" >{start_and_end(fromWallet)}</Text>
    </CreatedWrappper>
  </TransactionWrapper>
)


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: linear-gradient(210.96deg, rgba(36, 33, 81, 0.74) 0.01%, rgba(38, 35, 83, 0.78) 42.05%, rgba(47, 45, 97, 0.51) 104.81%);
  box-shadow: -23.609px 48.8461px 73.2692px rgba(23, 18, 43, 0.55);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  width: 900px
  min-height: 600px;
  overflow: scroll;
  z-index: 3;
`

export default function RaceJackpot({ isHome, potNumber }) {
  const [jackpot, setJackpot] = useState(null);
  const { push } = useRouter();


  useEffect(() => {
    const fetchTransactions = async () => {
      const resp = await fetch("https://coinflip-octo.herokuapp.com/api/v1/transaction/raceJackpot", {
      //const resp = await fetch(`https://coinflip-octo.herokuapp.com/api/v1/transaction/raceJackpot`, {
        headers: {
          "Content-Type": "application/json"
        },
      });
      const parsedResult = await resp.json();
      if(!jackpot) {
        setJackpot(parsedResult?.data)
      }
    }

    fetchTransactions()
  }, [])

  useEffect(() => {
    const fetchTransactions = async () => {
      const resp = await fetch("https://coinflip-octo.herokuapp.com/api/v1/transaction/raceJackpot", {
      //const resp = await fetch(`https://coinflip-octo.herokuapp.com/api/v1/transaction/raceJackpot`, {
        headers: {
          "Content-Type": "application/json"
        },
      });
      const parsedResult = await resp.json();
      setJackpot(parsedResult?.data)
      setTimeout(() => fetchTransactions(), 5000)
    }

    fetchTransactions()
  }, [])


  if(isHome) {
    return (
      <Column>
        <Row>
          <Text fontSize="24px" fontWeight="normal" color={`#fff`} paddingTop="15px">
            Race Jackpot:
          </Text>
          <Space width={20}/>
          <Button width="160px" backgroundColor="#fff"  onClick={() => push('/race')}>
            Play Race!!
          </Button>
        </Row>
        <Space width={10}/>
        <Text fontSize="36px" fontWeight="bold" color={`rgba(80, 227, 194, 1)`}>
          {jackpot && jackpot.toFixed(4)} $SOL
        </Text>
        <Row>
                </Row>
      </Column>
    );
  }

  return (
    <Column>
        <Row>
          <Text fontSize="24px" fontWeight="normal" color={`#fff`} paddingTop="15px">
            Race Jackpot:
          </Text>
          <Space width={10}/>
          <Text fontSize="56px" fontWeight="bold" color={`rgba(80, 227, 194, 1)`}>
            {jackpot && jackpot.toFixed(4)} $SOL
          </Text>
        </Row>
        </Column>
  );
}
