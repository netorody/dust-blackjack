import { Flex, FlexProps } from "@chakra-ui/layout";
import { Header } from "../header";

export function PageContaier(props: FlexProps) {
  return (
    <Flex flex={1} minH="100vh" w="100%" alignItems="center" direction="column">
      <Flex maxW="840px" w="100%">
        <Header />
      </Flex>
      <Flex maxW="940px" {...props}>
        {props.children}
      </Flex>
    </Flex>
  );
}
