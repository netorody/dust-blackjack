import React from "react";
import styled from '@emotion/styled';

const Text = styled.span`
  color: ${p => p.suit === '♥' || p.suit === '♦' ? 'red' : 'black'}
`

const Card = ({ rank, suit }) => (
  <article className="card">
    <Text suit={suit} className="rank upside">{rank}</Text>
    <Text suit={suit}>{suit}</Text>
    <Text suit={suit} className="rank downside">{rank}</Text>
  </article>
);

export default Card;
