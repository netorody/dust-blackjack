import { Stack, StackProps, Text, Image } from '@chakra-ui/react';
interface NFTViewerProps extends StackProps {
  image: string;
  name: string;
}

export const NFTViewer = ({ name, image, ...props }: NFTViewerProps) => {
  return (
    <Stack
      shadow="lg"
      bgGradient="linear(to-tr, lightGray, mediumGray)"
      borderTopRightRadius="4.25rem"
      borderTopLeftRadius="0.625rem"
      borderBottomLeftRadius="4.25rem"
      borderBottomRightRadius="0.625rem"
      borderColor="1px solid mediumGray"
      overflow="hidden"
    >
      <Stack py="3rem" pb="2rem" px="2rem">
        <Image src={image} w="300px" pb="2rem" />
        <Stack borderRadius="lg" bgColor="#191919" p={4} spacing={0}>
          <Text
            textTransform="uppercase"
            fontSize="0.5rem"
            fontWeight="bold"
            color="lightGray"
          >
            Name
          </Text>
          <Text fontSize="1.125rem" fontWeight="bold">
            {name}
          </Text>
        </Stack>
      </Stack>

      <Stack bgColor="transparent" py="1.5rem" border="none">
        <Text
          textAlign="center"
          color="#191919"
          textTransform="uppercase"
          fontWeight="semibold"
          fontSize="1.5rem"
        >
          Mint for 1 SOL
        </Text>
      </Stack>
    </Stack>
  );
};
