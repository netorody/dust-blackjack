import { Flex, Input, InputProps } from "@chakra-ui/react";
import { LegacyRef, useRef } from "react";

type Props = {};

export function CurrencyInput({ ...props }: InputProps) {
  const ref = useRef<HTMLInputElement>();

  const focus = () => ref.current?.focus();

  return (
    <Flex
      bg="rgba(0,0,0,.2)"
      border="1px solid"
      borderColor="rgba(255,255,255,0.1)"
      onClick={focus}
      cursor=""
      borderRadius={10}
      w="150px"
      p="12px"
      outline="none"
      justifyContent="center"
      alignItems="center"
      mt="10px"
    >
      <span
        style={{
          fontSize: 12,
        }}
      >
        AMOUNT
      </span>
      <Flex flex={1}>
        <Input
          ref={ref as LegacyRef<any>}
          bg="transparent"
          color="#FFCF05"
          outline="none"
          textAlign="end"
          border="0px"
          p="0px"
          mr="5px"
          h="unset"
          type="number"
          _placeholder={{
            fontSize: "16px",
          }}
          {...props}
        />
      </Flex>
    </Flex>
  );
}
