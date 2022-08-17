import React from 'react';
import styled from 'styled-components';
import cardBackground from './assets/cardBack.png';

const CardContainer = styled.div`
    position: relative;
    display:flex;
    width: 100px;
    height: 140px;
    z-index: 12;
    margin: 0 6px;
`

const Card = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: all 0.5s ease-in-out;
    transform: ${({reversed}) => (reversed ? 'rotateY(180deg)' : 'none')};
`

const Avers = styled.div`
    position: absolute;
    width:100%;
    height: 100%;
    backface-visibility: hidden;
    background-image: ${({aversImage}) => (aversImage ? 'url(' + aversImage + ')' : 'url(' + aversImage + ')') };
    background-size:cover;
    background-position:center;
    border-radius: 5px;
`

const Revers = styled.div`
    position: absolute;
    width:100%;
    height: 100%;
    backface-visibility: hidden;
    background-image: url(${cardBackground});
    background-size:cover;
    background-position:center;
    transform: rotateY(180deg);
    border-radius: 5px;
`

function ReversableCard({aversImage, isReversed}) {
    return (
        <CardContainer>
            <Card reversed={!isReversed}>
                <Avers aversImage={aversImage}/>
                <Revers/>
            </Card>
        </CardContainer>
    )
}

export default ReversableCard;