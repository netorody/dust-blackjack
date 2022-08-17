import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import styled from '@emotion/styled'
import constants from '../../utils/constants';

const { colors } = constants;
const { secondaryBackground } = colors;


const WheelImage = styled.img`
  z-index: 999;
  width: 345px;
  height: 345px;
  transform: rotate(3deg);
  border-radius: 50%;
`

const Arrow = styled.div`
  z-index: 1000;
  width: 10px;
  height: 40px;
  position: absolute;
  top: 0px;
  left: calc(50% - 10px);
  background: #fff;
  border-radius: 2rem;
  box-shadow: 0px 0px 25px rgba(255, 255, 255, 1);
`

const MyWheel = ({ isRolling, rotate, diceValue }) => {

  return (
    <div style={{ position: 'relative' }}>
      {/* <p style={{color: secondaryBackground}}>{diceValue}</p> */}

      <Arrow/>
      <WheelImage src="/images/wheel.png" diceValue={diceValue} style={{ transform: rotate, transition: `transform ${isRolling ? '10000s' : '0s'}` }} />
    </div>
  )
}

export default MyWheel;