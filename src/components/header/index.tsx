import { useRouter } from "next/router";
import { Box, Flex, Image } from "@chakra-ui/react";
import { ConnectWallet } from "../button/connectWallet";
import { Button } from "../common/button";
import { useContext, useMemo } from "react";
import Select from "../common/select";
import constants from "../../utils/constants";
import styled from "@emotion/styled";
import Space from "../common/space";
import { CurrencyContext } from "../../pages/_app";

const {
  objects: { coins },
  colors: { accentColor, objectText },
} = constants;

const routes = [
  {
    name: "BLACK JACK",
    route: "/",
  },
  {
    name: "BALANCE",
    route: "/balance",
  },
];

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
  /*{
    label: <Label label="$SOL" imgSrc="/images/coin-logos/sol.jpg" />,
    value: "SOL",
  },*/
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

export function Header() {
  const { pathname, push } = useRouter();
  const context = useContext(CurrencyContext) || { value: "SOL" };

  const activeStyle = useMemo(
    () => ({
      bg: "#FFCF05",
      color: "white",
    }),
    []
  );

  return (
    <Flex flex={1} w="100%" flexDirection="column">
      <Flex
        w="100%"
        flex={1}
        flexDirection={{ base: "column", sm: "row" }}
        gap={{ base: "16px", sm: "0" }}
        justifyContent="space-between"
        align={{ base: "top", sm: "top" }}
        mt="28px"
        mb="28px"
        padding="0px 16px"
      >
        <Image src="/img/logo.png" w="220px" /> 
        <Flex 
          justifyItems="end"
          flexDirection={{ base: "column", sm: "row" }}
          gap={{ base: "8px", sm: "0" }}
        >
          {/*<Image mr="15px" src="/img/discord.svg" w="23px" />
          <Image mr="20px" src="/img/twitter.svg" w="23px" />*/}
          <Select
            value={options.find((a) => a.value === context.value)}
            options={options}
            onChange={(option) => context.setValue(option.value)}
          />
          <Space width={16} />
          <ConnectWallet
            style={{
              paddingBottom: "10px",
              paddingTop: "10px",
              height: "38px",
            }}
          />
        </Flex>
      </Flex>
      <Flex w="100%" flex={1}>
        <Box
          w="100%"
          h="1px"
          bg="linear-gradient(90deg, rgba(255, 208, 5,0) 0%, rgba(255, 208, 5,.5) 20%, rgba(255, 208, 5, 1) 50%, rgba(255, 208, 5,.5) 80%, rgba(255, 208, 5,0) 100%)"
        />
      </Flex>
      <Flex w="100%" pt={4} pb={4} flex={1} flexDirection="row" bg={"linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.5) 50%, rgba(0,0,0,0) 100%)"} justifyContent={"center"} backdropFilter="blur(5px)">
        {routes.map((e) => (
          <Button
            
            color="#fff"
            onClick={() => push(e.route)}
            mr={4}
            {...(pathname === e.route && activeStyle)}
          >
            {e.name}
          </Button>
        ))}
      </Flex>
      <Flex w="100%" flex={1}>
        <Box
          w="100%"
          h="1px"
          bg="linear-gradient(90deg, rgba(255, 208, 5,0) 0%, rgba(255, 208, 5,.5) 20%, rgba(255, 208, 5, 1) 50%, rgba(255, 208, 5,.5) 80%, rgba(255, 208, 5,0) 100%)"
        />
      </Flex>
    </Flex>
  );
}
