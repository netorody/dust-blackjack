import { useWalletDialog } from "@solana/wallet-adapter-material-ui";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "../../common/button";
import constants from "../../../utils/constants";
import { ButtonProps } from "@chakra-ui/button";
import { Image } from "@chakra-ui/react";

const { colors } = constants;

export const ConnectWallet: React.FC<ButtonProps> = ({ ...props }) => {
  const wallet = useAnchorWallet();
  const { connected, disconnect } = useWallet();
  const { setOpen } = useWalletDialog();

  const handleClick = () => setOpen(true);

  if (connected) {
    return (
      <Button onClick={disconnect} {...props} color={"white"} background={"#25242C"}>
        <Image mr="5px" src="/img/wallet.svg" w="17px" />
        DISCONNECT WALLET
      </Button>
    );
  }

  return (
    <Button w="100%" onClick={handleClick} {...props} color={"white"} background={"#25242C"}>
      <Image mr="5px" src="/img/wallet.svg" w="17px" />
      CONNECT WALLET
    </Button>
  );
};
