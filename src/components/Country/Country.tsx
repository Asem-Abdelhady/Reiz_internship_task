import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
  Text,
  Link,
  HStack,
} from "@chakra-ui/react";

export default function Country(props: CountryResponse) {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={props.flags.png}
          alt={props.name.common}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{props.name.common}</Heading>
          <HStack>
            <Text>Region: </Text>
            <Text>{props.region}</Text>
          </HStack>
          <HStack>
            <Text>area: </Text>
            <Text>{props.area}</Text>
          </HStack>
          <HStack>
            <Text>Independence: </Text>
            <Text>{props.independent ? "Independent" : "Not independent"}</Text>
          </HStack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button variant="solid" colorScheme="tail">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
