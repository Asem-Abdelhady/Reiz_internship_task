import { Flex, Spacer, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex background={"teal"} marginBottom={"15px"}>
      <Text>Display some coutnries</Text>
      <Spacer />
      <Text>Some Logo</Text>
    </Flex>
  );
}
