import styled from "styled-components";
import { Article } from "./styles";

const Text = styled.span<{ suit: string }>`
  color: ${(p) => (p.suit === "♥" || p.suit === "♦" ? "red" : "black")};
`;

interface Props {
  rank: string;
  suit: string;
  index: number;
}

export default function Card({ rank, suit, index }: Props) {
  return (
    <Article index={index} className="card">
      <Text suit={suit} className="rank upside">
        {rank}
      </Text>
      <Text suit={suit}>{suit}</Text>
      <Text suit={suit} className="rank downside">
        {rank}
      </Text>
    </Article>
  );
}
