import React, { useState } from "react";
import styled from '@emotion/styled'
import {
  Text,
} from '@chakra-ui/react';
import Space from '../common/space'
import Carousel from './carousel'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import constants from '../../utils/constants'
const { colors: { accentColor, objectText } } = constants;

import ScissorsImg from '../../../public/images/scissors.svg';


const WholeContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 910px;

  @media (max-width: 1154px) {
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;


const RPSImg = styled.img`
  width: 100%;
  /* border-radius: 50%; */
  /* border: 5px solid ${accentColor}; */
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArrowWrapper = styled.div`
  background: ${accentColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  height: 260px;
  width: 200px;
  padding: 10px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WinnerText = styled.p``;

const Buttons = styled.button``;

const Labels = styled.p``;

const Title = styled.h1``;

export default function RockPaperScissors({ option, pcOption, isLoading, setOption, setPcOption }) {
  const guesses = [
    {
      name: "Rock",
      img:
        "https://i.imgur.com/60Wl8fY.png"
    },
    {
      name: "Paper",
      img:
        "https://i.imgur.com/oxafOTQ.png"
    },
    {
      name: "Scissors",
      img: "https://i.imgur.com/EvOvG4U.png"
    }
  ];

  const allOptions = {
    Rock: 'https://i.imgur.com/zn48hSW.png',
    Paper: 'https://i.imgur.com/oxafOTQ.png',
    Scissors: 'https://i.imgur.com/EvOvG4U.png'
  }

  const allTranslatedOptions = {
    Rock: 'Rock',
    Paper: 'Paper',
    Scissors: 'Scissors'
  }

  const handleLeftClick = () => {
    switch (option) {
      case 'Rock':
        setOption('Scissors')
        return;
      case 'Paper':
        setOption('Rock')
        return;
      case 'Scissors':
        setOption('Paper')
        return;
    }
  }

  const handleRightClick = () => {
    switch (option) {
      case 'Rock':
        return setOption('Paper');
      case 'Paper':
        setOption('Scissors')
        return;
      case 'Scissors':
        return setOption('Rock');
    }
  }

  const randomPicker = () => {
    const randNum = Math.floor(Math.random() * 3);
    return guesses[randNum];
  };

  const [userInput, changeUserInput] = useState({});
  const computerInput = randomPicker();

  const evaluate = () => {
    if (userInput.name === computerInput.name) {
      return "TIE";
    } else if (
      (userInput.name === guesses[0].name &&
        computerInput.name === guesses[2].name) ||
      (userInput.name === guesses[1].name &&
        computerInput.name === guesses[0].name) ||
      (userInput.name === guesses[2].name &&
        computerInput.name === guesses[1].name)
    ) {
      return "YOU WIN";
    } else if (
      (userInput.name === guesses[1].name &&
        computerInput.name === guesses[2].name) ||
      (userInput.name === guesses[2].name &&
        computerInput.name === guesses[0].name) ||
      (userInput.name === guesses[0].name &&
        computerInput.name === guesses[1].name)
    ) {
      return "YOU LOSE";
    }
  };

  return (
    <WholeContainer>
      <Row>
        <ArrowWrapper onClick={handleLeftClick}>
          <ArrowLeftIcon />
        </ArrowWrapper>
        <Space width={15} />
        <Column>
          <ImageWrapper>
            <RPSImg src={allOptions[option]} />
          </ImageWrapper>
          <Space height={8} />
          <Text backgroundColor='#162b1e' borderRadius='12px' fontSize="28px" color={objectText} fontWeight='bold'>{allTranslatedOptions[option].toUpperCase()}</Text>
        </Column>
        <Space width={15} />
        <ArrowWrapper onClick={handleRightClick}>
          <ArrowRightIcon />
        </ArrowWrapper>
      </Row>
      <Text color={objectText} fontFamily="MontSerrat" fontWeight={"black"} fontSize={"50px"} fontStyle="italic">VS.</Text>
      <Column>
        <ImageWrapper>
          <RPSImg src={allOptions[pcOption]} />
        </ImageWrapper>
        <Space height={8} />
        <Text backgroundColor='#162b1e' borderRadius='12px' fontSize="28px" color={objectText} fontWeight='bold'>{allTranslatedOptions[pcOption].toUpperCase()}</Text>
      </Column>
    </WholeContainer>
  );
}
