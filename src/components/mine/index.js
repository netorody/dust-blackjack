import React, { useEffect, useState } from "react";
import styled from '@emotion/styled'
import {
  Text,
  useToast
} from '@chakra-ui/react';
import Space from "../common/space";
import constants from '../../utils/constants';

const { infos, colors } = constants;
const { project } = infos;
const { objectText, objectBackground } = colors;

const WholeContainer = styled.div`
  text-align: center;
`;


const Image = styled.img`
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;


const MineWrapper = styled.div`
  overflow: hidden;
  border-radius: 1.5rem;
  border: 2px ${objectBackground} solid;
`;

const Span = styled.span`
  font-size: 28px;
  font-weight: bold;
  color: rgb(147, 250, 165);
`;

const SquareComponent = styled.div`
  width: 50px;
  height: 50px;
  background: ${p => !p.isPaymentVerified ? 'transparent' : (p.won ? 'green' : (p.isExploded ? `rgba(255,0,0,1)` : 'rgba(255,255,255,0.8)'))};
  border: 1px ${objectBackground} solid;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 470px) {
    width: 35px;
    height: 35px;
  }
`;

const INITIAL_STATE = [
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
]

const Square = ({mySignature, setVerified, setSignature, explode, exploded, ...props}) => {
  const [bomb, setBomb] = useState(false)
  const toast = useToast();

  console.log('mySignature', mySignature);
  const handleSquareClick = async () => {
    console.log('====1====')
    if(exploded === true || !mySignature) {
      return;
    }
    console.log('====2====')

    const resp = await fetch(`${infos.serverUrl}/api/v1/transaction/mineBet`, {
      //const resp = await fetch(`${infos.serverUrl}/api/v1/transaction/${endpoint}`, {
        body: `{"transactionId":"${mySignature}", "project":"${project}"}`,
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
    });
    console.log('====3====')
  
    const parsedResult = await resp.json();
    console.log('====4====')
    console.log('parsedResult', parsedResult);
    if(parsedResult?.data?.message) {
      return toast({
        title: `Message`,
        description: parsedResult?.data?.message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        variant: 'solid'
      });
    } else if (parsedResult?.data?.won === false) {
      setSignature(null);
      setVerified(false);
      setBomb(true)
      return toast({
        title: `Boom!!`,
        description: 'The bomb exploded!! Try again!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        variant: 'solid'
      });
    }


    explode()
    console.log('====5====')

  }

  return (
    <SquareComponent {...props} exploded={exploded} onClick={async () => handleSquareClick()} isExploded={exploded}>
      {bomb ? '💣' : exploded ? '⭐' : ''}
    </SquareComponent>
  )
}

export default function MinComp(props) {
  const [exploded, setExploded] = useState(INITIAL_STATE)
  
  useEffect(() => {
    if(props.mySignature === null) {
      setExploded(INITIAL_STATE)
    }
  }, [props.mySignature])

  const explode = (index) => {
    const explodedShadow = [...exploded];
    explodedShadow[index] = true;
    setExploded(explodedShadow);
  }



  return (
    <WholeContainer>
      <Text fontSize={"24px"} fontWeight={"bold"} color={objectText} >3 Bombs have been planted</Text>
      <Space height={10}/>
      <Text fontSize={"16px"} color={objectText}>Check 5 squares to win
        <Span> 100x</Span>
      </Text>
      <Space height={40}/>
      <MineWrapper>
        <Row>
          <Square {...props} exploded={exploded[0]} explode={() => explode(0)} />
          <Square {...props} exploded={exploded[1]} explode={() => explode(1)} />
          <Square {...props} exploded={exploded[2]} explode={() => explode(2)}  />
          <Square {...props} exploded={exploded[3]} explode={() => explode(3)}  />
          <Square {...props} exploded={exploded[4]} explode={() => explode(4)}  />
          <Square {...props} exploded={exploded[5]} explode={() => explode(5)}  />
          <Square {...props} exploded={exploded[6]} explode={() => explode(6)}  />
          <Square {...props} exploded={exploded[7]} explode={() => explode(7)}  />
        </Row>
        <Row>
          <Square {...props} exploded={exploded[8]} explode={() => explode(8)}  />
          <Square {...props} exploded={exploded[9]} explode={() => explode(9)}  />
          <Square {...props} exploded={exploded[10]} explode={() => explode(10)}  />
          <Square {...props} exploded={exploded[11]} explode={() => explode(11)}  />
          <Square {...props} exploded={exploded[12]} explode={() => explode(12)}  />
          <Square {...props} exploded={exploded[13]} explode={() => explode(13)}  />
          <Square {...props} exploded={exploded[14]} explode={() => explode(14)}  />
          <Square {...props} exploded={exploded[15]} explode={() => explode(15)}  />
        </Row>
        <Row>
          <Square {...props} exploded={exploded[16]} explode={() => explode(16)}  />
          <Square {...props} exploded={exploded[17]} explode={() => explode(17)}  />
          <Square {...props} exploded={exploded[18]} explode={() => explode(18)}  />
          <Square {...props} exploded={exploded[19]} explode={() => explode(19)}  />
          <Square {...props} exploded={exploded[20]} explode={() => explode(20)}  />
          <Square {...props} exploded={exploded[21]} explode={() => explode(21)}  />
          <Square {...props} exploded={exploded[22]} explode={() => explode(22)}  />
          <Square {...props} exploded={exploded[23]} explode={() => explode(23)}  />
        </Row>
        <Row>
          <Square {...props} exploded={exploded[24]} explode={() => explode(24)}  />
          <Square {...props} exploded={exploded[25]} explode={() => explode(25)}  />
          <Square {...props} exploded={exploded[26]} explode={() => explode(26)}  />
          <Square {...props} exploded={exploded[27]} explode={() => explode(27)}  />
          <Square {...props} exploded={exploded[28]} explode={() => explode(28)}  />
          <Square {...props} exploded={exploded[29]} explode={() => explode(29)}  />
          <Square {...props} exploded={exploded[30]} explode={() => explode(30)}  />
          <Square {...props} exploded={exploded[31]} explode={() => explode(31)}  />
        </Row>
        <Row>
          <Square {...props} exploded={exploded[32]} explode={() => explode(32)}  />
          <Square {...props} exploded={exploded[33]} explode={() => explode(33)}  />
          <Square {...props} exploded={exploded[34]} explode={() => explode(34)}  />
          <Square {...props} exploded={exploded[35]} explode={() => explode(35)}  />
          <Square {...props} exploded={exploded[36]} explode={() => explode(36)}  />
          <Square {...props} exploded={exploded[37]} explode={() => explode(37)}  />
          <Square {...props} exploded={exploded[38]} explode={() => explode(38)}  />
          <Square {...props} exploded={exploded[39]} explode={() => explode(39)}  />
        </Row>
        <Row>
          <Square {...props} exploded={exploded[40]} explode={() => explode(40)}  />
          <Square {...props} exploded={exploded[41]} explode={() => explode(41)}  />
          <Square {...props} exploded={exploded[42]} explode={() => explode(42)}  />
          <Square {...props} exploded={exploded[43]} explode={() => explode(43)}  />
          <Square {...props} exploded={exploded[44]} explode={() => explode(44)}  />
          <Square {...props} exploded={exploded[45]} explode={() => explode(45)}  />
          <Square {...props} exploded={exploded[46]} explode={() => explode(46)}  />
          <Square {...props} exploded={exploded[47]} explode={() => explode(47)}  />
        </Row>
        <Row>
          <Square {...props} exploded={exploded[48]} explode={() => explode(48)}  />
          <Square {...props} exploded={exploded[49]} explode={() => explode(49)}  />
          <Square {...props} exploded={exploded[50]} explode={() => explode(50)}  />
          <Square {...props} exploded={exploded[51]} explode={() => explode(51)}  />
          <Square {...props} exploded={exploded[52]} explode={() => explode(52)}  />
          <Square {...props} exploded={exploded[53]} explode={() => explode(53)}  />
          <Square {...props} exploded={exploded[54]} explode={() => explode(54)}  />
          <Square {...props} exploded={exploded[55]} explode={() => explode(55)}  />
        </Row>
      </MineWrapper>
    </WholeContainer>
  );
}
