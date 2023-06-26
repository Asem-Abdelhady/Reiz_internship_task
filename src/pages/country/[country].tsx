import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { BASE_URL } from "../../../config/config";
import {
  Card,
  Heading,
  CardBody,
  Stack,
  Box,
  Text,
  Image,
  Center,
  Button,
  CardFooter,
  Divider,
  Link,
} from "@chakra-ui/react";

export default function Country({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const country = data[0];
  return (
    <Center marginTop={"5%"}>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={country.flags.png}
            alt={country.name.common}
            height={"150px"}
            width={"400px"}
            borderRadius="lg"
            shadow={"md"}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{country.name.common}</Heading>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Region
              </Heading>
              <Text pt="2" fontSize="sm">
                {country.name.common} is in <b>{country.region}</b>
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Area
              </Heading>
              <Text pt="2" fontSize="sm">
                {country.name.common} is <b>{country.area}</b> M<sup>2</sup> in
                area
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Tiemzones
              </Heading>
              <Text pt="2" fontSize="sm">
                {country.name.common} has{" "}
                <b>{`{${country.timezones.toString()}}`}</b> timezones
              </Text>
            </Box>
            {country.borders ? (
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Borders
                </Heading>
                <Text pt="2" fontSize="sm">
                  {country.name.common} has the countires{" "}
                  <b>{`{${country.borders.toString()}}`}</b> around its borders
                </Text>
              </Box>
            ) : (
              <></>
            )}
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Capitals
              </Heading>
              <Text pt="2" fontSize="sm">
                {country.name.common} has{" "}
                <b>{`{${country.capital.toString()}}`}</b> as capitals
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link href={country.maps.googleMaps}>
            <Button variant="solid" colorScheme="teal">
              View on google maps
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </Center>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: CountryNameResponse[];
}> = async (context) => {
  let country = context.params?.country;
  const URL = `${BASE_URL}/name/${country}`;

  const res = await axios.get<CountryNameResponse[]>(URL);
  const data = res.data;
  return {
    props: {
      data,
    },
  };
};
