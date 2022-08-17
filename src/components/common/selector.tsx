import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { LegacyRef, useRef } from "react";

export const Select = styled.select`
  flex: 1;
  display: flex;
  cursor: pointer;
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

export function Selector({
  label,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  const ref = useRef<HTMLSelectElement>(null);

  return (
    <Flex
      h="51px"
      borderRadius={8}
      bg="darkGreen"
      border="2px solid"
      borderColor="rgba(255,255,255,0.1)"
      cursor="pointer"
      w="100%"
      direction="row"
      alignItems="center"
      p="12px"
      justifyContent="space-between"
      onClick={() =>
        ref.current?.focus({
          preventScroll: false,
        })
      }
    >
      <span
        style={{ userSelect: "none", fontSize: 16 }}
        onClick={() =>
          ref.current?.focus({
            preventScroll: false,
          })
        }
      >
        {label}
      </span>
      <Select ref={ref as LegacyRef<any>} autoFocus {...props}>
        <option value="SOL">$SOL</option>
      </Select>
    </Flex>
  );
}
