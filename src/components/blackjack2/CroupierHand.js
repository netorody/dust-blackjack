import React from "react";
import { Card } from "./Card";

function CroupierHand({ currentHand }) {
  return (
    <>
      {currentHand.map((card, index) => (
        <Card key={index} aversImage={card.image} />
      ))}
    </>
  );
}

export default CroupierHand;
