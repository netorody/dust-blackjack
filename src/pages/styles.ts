import styled from "styled-components";

export const Area = styled.div`
  min-height: 660px;
  min-width: 220px;
  margin-top: 40px;
  display: flex;
  border-radius: 36px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const GameArea = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  background: rgba(29, 44, 33, 0.4);
  padding: 32px;

  border: 1px solid rgba(13, 22, 36, 1);
  border-radius: 20px;
  @media only screen and (max-width: 1023px) {
    flex-direction: column-reverse;
    padding: 40px 0;
    margin-bottom: 20px;
  }
`;

export const BetsArea = styled.div`
  margin-right: 10px;
  flex: 0.9;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  justify-content: center;
  padding: 20px;
  gap: 18px;

  @media only screen and (max-width: 1023px) {
    height: fit-content;
    width: 100%;
    border-right: none;
  }
`;

export const Game = styled.div`
  flex: 2;
  background-color: transparent;
  display: flex;
  border-radius: 36px;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  @media only screen and (max-width: 1023px) {
    height: fit-content;
    width: 100%;
  }
`;

export const Input = styled.input`
  height: 40px;
  width: 100%;
  color: #000;
  padding: 6px;
  outline: none;
  background: rgba(0, 0, 0, 0.15);
  color: #fff;
  border-radius: 2rem;
  border: 2px solid #1e1e1e;

  :focus {
    filter: opacity(1);
  }
`;

export const Label = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Select = styled.select`
  height: 40px;
  width: 50%;
  color: #000;
  padding: 6px;
  outline: none;
  background: transparent;
  text-align: end;
  color: #fff;
  border: 0px solid #1e1e1e;

  border-radius: 2rem;
  :focus {
    filter: opacity(1);
  }
`;

export const BetButton = styled.button<{ isBottom: boolean }>`
  height: 54px;
  width: 100%;
  border: 2px solid #1e1e1e;
  background-color: #77c12d;
  font-size: 18px;
  font-weight: bold;
  border-radius: 6px;
  transition: 0.2s;

  :hover {
    transform: translate(0, -4px);
  }
`;

export const Line = styled.div`
  height: 80px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 6px;
  @media only screen and (max-width: 1023px) {
    height: 58px;
  }
`;

export const Mine = styled.button`
  height: 80px;
  width: 80px;
  border-radius: 10px;
  background-image: url("/img/mine.svg");
  background-size: 80px 80px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  :hover {
    transform: translate(0, -4px);
    filter: opacity(1);
  }

  @media only screen and (max-width: 1023px) {
    height: 58px;
    width: 58px;
  }
`;

export const BombArea = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.8);
`;

export const Bomb = styled.img`
  width: auto;
`;
