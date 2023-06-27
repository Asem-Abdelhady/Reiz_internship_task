import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { BASE_URL } from "../../config/config";
import axios from "axios";

import CountriesList from "@/components/CountriesList/CountriesList";
import CustomPagination from "@/components/Pagination/Pagination";
import { useEffect, useReducer, useState } from "react";
import {
  useCountriesContext,
  useCurrentListContext,
  useHandleOperation,
  useStateContext,
} from "@/Context/CountriesContext";
import { useRouter } from "next/router";

function getTenCountries(
  countries: CountryResponse[],
  start: number
): CountryResponse[] {
  return countries.slice(start, start + 10);
}

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const handleOperation = useHandleOperation();
  const state = useStateContext();
  const countries = useCountriesContext();
  const currentList = useCurrentListContext();

  let initStart = ((router.query.page as unknown as number) - 1) * 10;
  const [start, setStart] = useState<number>(initStart ? initStart : 0);

  useEffect(() => {
    handleOperation(data, "INIT", 0);
  }, []);

  return (
    <>
      <Layout>
        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            colorScheme="teal"
            margin={"15px 0 15px 30px"}
          >
            Options
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup title="Order" type="radio">
              <MenuItemOption
                value="asc"
                isDisabled={state.isSortedAsc}
                onClick={() => {
                  handleOperation(data, "asc", start);
                  console.log("State: ", state);
                  console.log("CurrentList", currentList);
                }}
              >
                Ascending
              </MenuItemOption>
              <MenuItemOption
                value="des"
                isDisabled={state.isSortedDes}
                onClick={() => {
                  handleOperation(data, "des", start);
                  console.log("State: ", state);
                  console.log("CurrentList", currentList);
                }}
              >
                Descending
              </MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup title="Filteration" type="checkbox">
              <MenuItemOption
                value="by__region"
                onClick={() => {
                  handleOperation(data, "by__region", start);
                  console.log("State: ", state);
                  console.log("CurrentList", currentList);
                }}
              >
                By region
              </MenuItemOption>
              <MenuItemOption
                value="by__area"
                onClick={() => {
                  handleOperation(data, "by__area", start);
                  console.log("State: ", state);
                  console.log("CurrentList", currentList);
                }}
              >
                By area
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>

        <CountriesList countries={currentList} pageNumber={start} />
        <CustomPagination
          numOfPages={Math.ceil(countries.length / 10)}
          setStart={setStart}
          currPage={Number(router.query.page as unknown as number)}
          countriesData={countries}
        />
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const pages: { params: { page: string } }[] = [];
  for (let i = 1; i <= 25; i++) {
    pages.push({ params: { page: String(i) } });
  }
  return {
    paths: pages,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<{
  data: CountryResponse[];
}> = async (context) => {
  const URL = `${BASE_URL}/all?fields=name,region,area,flags,population,timezones,currencies,maps,independent`;
  const res = await axios.get<CountryResponse[]>(URL);
  const data = res.data;

  return {
    props: {
      data,
    },
  };
};
