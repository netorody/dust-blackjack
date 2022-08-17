import { Button as BaseButton, ButtonProps } from "@chakra-ui/react";

export function Button(props: ButtonProps) {
  return (
    <BaseButton
      bg="none"
      fontFamily="GolosUIWebBold"
      color="#000"
      fontSize="12px"
      fontWeight="bold"
      
      _disabled={{
        opacity: 0.1,
        color: "#fff !important",
        fontFamily: "GolosUIWebBold",
        pointerEvents: "none"
        
      }}
      _hover={{
        background: "#FFCF05",
        
      }}
      _active={{
        color: "white"
      }}
      borderRadius={8}
      px="16px"
      py="12px"
      alignItems="center"
      gap="10px"
      {...props}
    />
  );
}
