import React from 'react'
import {Card} from './Card';

function PlayerHand(currentHand) {
    return (
        <>
            {
                currentHand.currentHand.map((card, index) => (
                    <Card key={index} aversImage={card.image}/>
                ))
            }
        </>
    )
}

export default PlayerHand
