import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  Button,
  Image,
  Text,
  HStack,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { IoEarthSharp } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";

export default function Country(props: CountryResponse) {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={props.flags.png}
          alt={props.name.common}
          height={"150px"}
          width={"400px"}
          borderRadius="lg"
          shadow={"md"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{props.name.common}</Heading>
          <HStack w={"100%"} bg="white" justifyContent={"space-between"}>
            <Text fontSize="l" fontFamily="Work sans">
              {props.independent ? "Independent" : "Not independent"}
            </Text>
            <Text fontSize="l" fontFamily="Work sans">
              {" "}
              {props.area} M<sup>2</sup>
            </Text>
          </HStack>
          <HStack w={"100%"} bg="white" justifyContent={"space-between"}>
            <HStack>
              <Text fontSize="l" fontFamily="Work sans">
                {props.region}
              </Text>
              <Icon as={IoEarthSharp} />
            </HStack>
            <HStack>
              <Text fontSize="l" fontFamily="Work sans">
                {props.population}
              </Text>
              <Icon as={BsFillPeopleFill} />
            </HStack>
          </HStack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link href={`/country/${props.name.common}`}>
          <Button variant="solid" colorScheme="teal">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
