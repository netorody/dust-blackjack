import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled'
import {
  Text,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons'

const Wrapper = styled.div`
  display: flex;
  width: 331px;
  height: 81px;
  flex-direction: row;
  justify-content: flex-start;
  cursor: pointer;
  margin-top: 30px;

  ${p => p.isActive && `
    margin-left: 18px;
    background-color: #ABFC4F;
  `}
`

const IconWrapper = styled.div`
  display: flex;
  width: 81px;
  height: 81px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 1px;
  ${p => p.isActive && `
    margin-left: 18px;
    background-color: #ABFC4F;
  `}
`

const RightWrapper = styled.div`
  display: flex;
  width: 181px;
  height: 81px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 2px;
  padding-left: 10px;
  ${p => p.isActive && `
    margin-left: 18px;
    background-color: #ABFC4F;
  `}
`

const Badge = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  padding: 1px 10px;
  background-color: #A1A1A1;
  ${p => p.isActive && `
    margin-left: 18px;
    background-color: #ABFC4F;
  `}
`

const LastWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  ${p => p.isActive && `
    margin-left: 18px;
    background-color: #ABFC4F;
  `}
`



interface GameItemProps {}


const GameItem = ({text, game, onClick, isActive, min}: GameItemProps) => (
  <Wrapper onClick={onClick} isActive={isActive}>
    <IconWrapper>
      <Text fontSize="40" fontWeight="bold" color="white">{text}</Text>
    </IconWrapper>
    <RightWrapper>
      <Text fontSize="16" fontWeight="500" color="white">{game}</Text>
      <Text fontSize="13" fontWeight="500" color="#808191">Best of luck</Text>
      <Badge>
        <Text fontSize="13" fontWeight="600" color="#FFFFFF">min play {min} $BIP</Text>
      </Badge>
    </RightWrapper>
    <LastWrapper>
      <ChevronRightIcon w={6} h={6} />
    </LastWrapper>
  </Wrapper>
)

export default GameItem;
