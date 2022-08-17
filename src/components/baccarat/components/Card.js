import React from "react";
import styled from "@emotion/styled";

const Text = styled.span`
  color: ${(p) => (p.suit === "♥" || p.suit === "♦" ? "red" : "black")};
`;

const Area = styled.img`
  position: relative;
  width: 96px;
  height: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  border: 1px solid green;
`;

const Card = ({ rank, suit }) => (
  <Area>
    <Text suit={suit} className="rank upside">
      {rank}
    </Text>
    <Text suit={suit}>{suit}</Text>
    <Text suit={suit} className="rank downside">
      {rank}
    </Text>
  </Area>
);

export default Card;
