import { Stack, Text, Flex } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Flex
      width="100vw"
      direction="row"
      alignItems="center"
      justifyContent="center"
      p="50"
    >
      <Stack maxW="1067px" w="100%" bg="black">
        <Text textAlign="center" fontFamily="Poppins">
        </Text>
      </Stack>
    </Flex>
  );
};
