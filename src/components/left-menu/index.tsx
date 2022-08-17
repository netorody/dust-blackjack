import React, { FC, useContext, useState } from "react";
import { useRouter } from "next/router";
import Select from "../common/select";
import Space from "../common/space";
import { CurrencyContext } from "../../pages/_app";

// import Balance from "../../pages/balance";

import styled from "@emotion/styled";
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Text,
  MenuItem as ChakraMenuItem,
} from "@chakra-ui/react";
import constants from "../../utils/constants";
import { ConnectWallet } from "../button/connectWallet";
import { HamburgerIcon } from "@chakra-ui/icons";
const {
  objects: { coins },
  colors: { accentColor, objectText },
} = constants;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 30px;
  align-items: center;
  background-color: transparent;
  height: 100%;
  width: 100%;
  z-index: 4;
`;

const Wrapper2 = styled.div`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  height: 100%;
  z-index: 4;
  flex-wrap: wrap;
  display: none;
  
`;

const MenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
  padding: 5px;
  font-size: 20px;
  cursor: pointer;
  text-transform: uppercase;
  
  border-radius: 2rem;
  ${(p) =>
    p.isActive &&
    `
    align-items: center;
    color:#FF0074 !important;
    &::after{
      content: '';
      position: absolute;
      top: 0px;
      width: 100%;
      height: 3px;
      background-color: #393824;
    }
  `}
`;

const MenuWrapper = styled.div`
  display: flex;
  margin-right: -15px;
  align-items: center;

    
  select {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding: 15px 12px;
  }
  button {
    //background: #ff0074;
    border-radius: 10px 0 0 10px;
    &:hover {
      //background: #ff0074;
    }
  }
`;

const MenuItem = ({ text, onClick, isActive }: any) => (
  <MenuItemWrapper onClick={onClick} isActive={isActive}>
    <Text
      fontSize="14"
      fontWeight="bold"
      color={objectText}
      style={{ whiteSpace: "nowrap" }}
    >
      {text}
    </Text>
  </MenuItemWrapper>
);

interface LeftMenuProps {}

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: medium;
`;

const Label = ({ label, imgSrc }) => (
  <LabelWrapper>
    <img
      src={imgSrc}
      height="20px"
      width="20px"
      style={{ borderRadius: "55%", border: "0.8px solid #070B17" }}
    />
    <Space width={8} />
    {label}
  </LabelWrapper>
);

const additionalOptions =
  coins && coins[0]
    ? coins.map((coin) => ({
        label: <Label label={coin.label} imgSrc={coin.imgSrc} />,
        value: coin.value,
      }))
    : [];

const options = [
  // { label: <Label label="$SOL" imgSrc="/images/coin-logos/sol.jpg" />, value: 'SOL' },
  ...additionalOptions,
  /*{label: <Label label="$BETS" imgSrc="/images/coin-logos/bets.jpg" />, value: 'BETS'},
  {label: <Label label="$USDC" imgSrc="/images/coin-logos/usdc.jpg" />, value: 'USDC'},
  {label: <Label label="$USDT" imgSrc="/images/coin-logos/usdt.jpg" />, value: 'USDT'},
  {label: <Label label="$BIP" imgSrc="/images/coin-logos/bip.jpg" />, value: 'BIP'},
  {label: <Label label="$YODA" imgSrc="/images/coin-logos/yoda.jpg" />, value: 'YODA'},
  {label: <Label label="$HIPPO" imgSrc="/images/coin-logos/HIPPO.jpg" />, value: 'HIPPO'},
  {label: <Label label="$DEGN" imgSrc="/images/coin-logos/degen.jpg" />, value: 'DEGN'},
  {label: <Label label="$OOGI" imgSrc="/images/coin-logos/oogi.jpg" />, value: 'OOGI'},
  {label: <Label label="$SHROOMZ" imgSrc="/images/coin-logos/SHROOMZ.jpg" />, value: 'SHROOMZ'},
  {label: <Label label="$SPKL" imgSrc="/images/coin-logos/spkl.jpg" />, value: 'SPKL'},
  {label: <Label label="$DRUGS" imgSrc="/images/coin-logos/drugs.jpg" />, value: 'DRUGS'},
  {label: <Label label="$NRA" imgSrc="/images/coin-logos/nra.jpg" />, value: 'NRA'},*/
];

const LeftMenu: FC<LeftMenuProps> = () => {
  const { push, replace } = useRouter();
  const context = useContext(CurrencyContext) || { value: "TBF" };

  return (
    <>
      <Wrapper>
        {/*<MenuOutItem text="Buy $BIP" onClick={() => window.open('https://app.thestarship.finance/', '_ blank')} />*/}
        <MenuItem
          text="Mines"
          onClick={() => push("/")}
          isActive={window.location.pathname === "/"}
        />
        <MenuItem
          text="Balance"
          onClick={() => push("/balance")}
          isActive={window.location.pathname === "/balance"}
          
        />
      </Wrapper>

      <MenuWrapper>
        <Select
          value={options.find((a) => a.value === context.value)}
          options={options}
          onChange={(option) => context.setValue(option.value)}
        />
        {/* <Space width={30} /> */}
        <ConnectWallet />
      </MenuWrapper>

      <Wrapper2>
        {/*<MenuOutItem text="Buy $BIP" onClick={() => window.open('https://app.thestarship.finance/', '_ blank')} />*/}
        <Select
          value={options.find((a) => a.value === context.value)}
          options={options}
          onChange={(option) => context.setValue(option.value)}
        />
        <Space width={30} />
        <MenuItem
          text="Mines"
          onClick={() => push("/")}
          isActive={window.location.pathname === "/"}
        />
        <MenuItem
          text="Balance"
          // {solBalance.toFixed(2)} 
          onClick={() => push("/balance")}
          isActive={window.location.pathname === "/balance"}

        />
        <ConnectWallet />
      </Wrapper2>
    </>
  );
};

export default LeftMenu;
