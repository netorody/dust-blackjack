import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import { Layout } from "../components/common/layout";
import { CurrencyContext } from "./_app";
import {
  CreateSOLTX,
  CreateTX,
  handleClaim,
  ClaimSol,
} from "../utils/CreateTX";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { CurrencyInput } from "../components/common/currency-input";
import { GlowingButton } from "../components/common/glowing-button";
import { Selector } from "../components/common/selector";
import constants from "../utils/constants";

const {
  objects: { coins },
  colors: { accentColor, objectText, objectBackground, buttonText },
  infos,
} = constants;

const Area = styled.div`
  min-height: calc(100vh - 300px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Content = styled.div`
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  justify-content: flex-start;
  gap: 12px;
  border: 1px solid #FFCF05;

  span {
    font-size: 42px;
    font-weight: bold;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  outline: none;
  color: #000;
  padding: 0 6px;
  color: ${objectText};
  background: rgba(0, 0, 0, 0.15);
  color: #fff;
  border-radius: 4px;

  ::placeholder {
    color: #dadada;
  }

  :focus {
    //border: 1px solid #dadada;
  }
`;

const BalanceArea = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    font-size: 20px;
    font-weight: bold;
  }
`;

const Select = styled.select`
  height: 40px;
  width: 100%;
  border-radius: 4px;
  background-color: #121e30;
  color: ${objectText};
  background: rgba(0, 0, 0, 0.15);
  color: #fff;
`;

export default function Balance() {
  const [amount, setAmount] = useState(1);
  const [withdraw, setWithdraw] = useState(1);
  const context = useContext(CurrencyContext) || { value: "SOL" };

  const {
    objects: { coins },
  } = constants;
  const { connected, publicKey, signTransaction } = useWallet();

  const [solBalance, setSolBalance] = useState(0);
  const [dustBalance, setDustBalance] = useState(0);
  const [puffBalance, setPuffBalance] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const getBalance = () => {
    switch (context.value) {
      case "SOL":
        return solBalance;
      case "DUST":
        return dustBalance;
      case "PUFF":
        return puffBalance;
      default:
        return 0;
    }
  };

  useEffect(() => {
    if (connected) {
      updateBalances();
    }
  }, [connected]);

  function updateBalances() {
    const body = {
      project: infos.project,
      wallet: publicKey?.toString(),
    };

    axios.post(`${infos.serverUrl}/balance`, body).then(({ data }) => {
      data.forEach(({ amount, tokenMint, ...rest }: any) => {
        console.log("rest", rest);
        //@ts-ignore
        if (tokenMint === "11111111111111111111111111111111") {
          setSolBalance(amount);
        } else if (
          tokenMint === "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ"
        ) {
          setDustBalance(amount);
        } else if (
          tokenMint === "G9tt98aYSznRk7jWsfuz9FnTdokxS6Brohdo9hSmjTRB"
        ) {
          setPuffBalance(amount);
        }
      });
    });
  }

  function callToast() {
    toast({
      title: `Processing!`,
      description:
        "Your transaction is processing. It can take up to 2 minutes",
      status: "warning",
      duration: 60000,
      isClosable: true,
      position: "top-right",
      variant: "solid",
    });
  }

  async function AddFunds() {
    if (!connected) {
      toast({
        title: `Warning!`,
        description: "You need to connect your wallet",
        status: "warning",
        duration: 60000,
        isClosable: true,
        position: "top-right",
        variant: "solid",
      });
      return;
    }
    const token = coins.find(({ value }) => value === context.value);
    let final: any = token;
    if (!token) {
      final = {
        value: "SOL",
        multiplier: Math.pow(10, 9),
      };
    }
    if (context.value === "SOL") {
      await CreateSOLTX({
        publicKey,
        signTransaction,
        token: final,
        amount,
        callToast,
      });

      updateBalances();
    } else {
      await CreateTX({
        publicKey,
        signTransaction,
        token: final,
        amount,
        callToast,
      });
      updateBalances();
    }
  }

  async function requestWithdraw() {
    const token = coins.find(({ value }) => value === context.value);

    if (context.value !== "SOL") {
      await handleClaim(
        publicKey?.toString() || "",
        token || "",
        signTransaction,
        withdraw,
        callToast
      );
      setIsLoading(true);
      updateBalances();
      setIsLoading(false);
    } else {
      setIsLoading(true);
      await ClaimSol(
        publicKey?.toString() || "",
        token || "",
        signTransaction,
        withdraw,
        callToast
      );
      updateBalances();
      setIsLoading(false);
    }
  }

  return (
    <Layout style={{marginTop:"40px"}}>
      <Area>
        <Content>
          <span
            style={{
              paddingBottom: 10,
              fontSize: 20,
              textTransform: "uppercase"
            }}
          >
            Add Balance
          </span>
          {connected && (
            <BalanceArea>
              <span
                style={{
                  paddingBottom: 10,
                  fontSize: 20,
                  textTransform: "uppercase"
                }}
              >
                <span style={{color:"#FFCF05", fontSize: 28}}>{getBalance().toFixed(2)}</span> ${context.value}
              </span>
            </BalanceArea>
          )}
          <CurrencyInput
            type="number"
            onChange={({ target: { value } }) => setAmount(Number(value))}
            value={amount}
            //currency="SOL"
          />

          <GlowingButton w="100%" onClick={AddFunds} isLoading={isLoading}>
            Add Funds
          </GlowingButton>
        </Content>

        <Content>
          <span
            style={{
              paddingBottom: 10,
              fontSize: 20,
              textTransform: "uppercase"
            }}
          >
            Withdraw
          </span>
          {connected && (
            <BalanceArea>
              <span
                style={{
                  paddingBottom: 10,
                  fontSize: 20,
                  textTransform: "uppercase"
                }}
              >
                <span style={{color:"#FFCF05", fontSize: 28}}>{solBalance.toFixed(2)}</span> ${context.value}
              </span>
            </BalanceArea>
          )}
          <CurrencyInput
            type="number"
            onChange={({ target: { value } }) => setWithdraw(Number(value))}
            value={withdraw}
          />

          <GlowingButton
            w="100%"
            onClick={requestWithdraw}
            isLoading={isLoading}
          >
            Request Withdraw
          </GlowingButton>
        </Content>
      </Area>
    </Layout>
  );
}
