import { SimpleGrid, VStack } from "@chakra-ui/react";
import Country from "../Country/Country";

interface Props {
  countries: CountryResponse[];
  pageNumber: number;
}

export default function CountriesList(props: Props) {
  console.log("Current List: ", props.countries);

  let countries = props.countries.map((country) => (
    <Country
      key={Math.random() + 0.5}
      name={country.name}
      region={country.region}
      area={country.area}
      independent={country.independent}
      flags={country.flags}
    />
  ));
  return (
    <VStack w="100%" justify={"left"}>
      <SimpleGrid w={"100%"} minChildWidth="300px" spacing="30px" padding={5}>
        {countries}
      </SimpleGrid>
    </VStack>
  );
}
