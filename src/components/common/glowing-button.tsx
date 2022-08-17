import { ButtonProps } from "@chakra-ui/react";
import { Button } from "./button";

export function GlowingButton(props: ButtonProps) {
  return (
    <Button
      color="#fff"
      box-shadow="0px 0px 20px rgb(234, 226, 66)"
      bg="#FFCF05"
      border="0px"
      textTransform="uppercase"
      {...props}
    />
  );
}
