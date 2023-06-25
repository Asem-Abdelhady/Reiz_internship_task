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

import { useRouter } from "next/router";
import CountriesList from "@/components/CountriesList/CountriesList";
import CustomPagination from "@/components/Pagination/Pagination";
import { useEffect, useReducer, useState } from "react";
import { useCountries, useHandleOperation } from "@/Context/CountriesContext";
import { type } from "os";

enum CountriesActionType {
  ASC = "asc",
  DES = "des",
  BY_AREA = "by__area",
  BY_REGION = "by__region",
}

interface CountriesAction {
  type: CountriesActionType;
}

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [countriesData, setData] = useState<CountryResponse[]>(data);
  const handleOperation = useHandleOperation();
  const [pagesNum, setPagesNum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let initalState: CountriesState = {
    isSortedAsc: false,
    isSortedDes: false,
    isAreaFiltered: false,
    isRegionFiltrered: false,
  };

  const [state, dispatch] = useReducer(
    (state: CountriesState, action: CountriesAction) => {
      setIsLoading(true);
      let newState = state;
      switch (action.type) {
        case CountriesActionType.ASC:
          newState.isSortedAsc = true;
          newState.isSortedDes = false;
          console.log("Inside Case: ", newState);
          break;

        case CountriesActionType.DES:
          newState.isSortedDes = true;
          newState.isSortedAsc = false;
          break;

        case CountriesActionType.BY_AREA:
          console.log("Here");

          newState.isAreaFiltered = !newState.isAreaFiltered;
          break;

        case CountriesActionType.BY_REGION:
          newState.isRegionFiltrered = !newState.isRegionFiltrered;
          break;
      }

      console.log("New State: ", newState);
      let d = handleOperation(data, newState);
      setData(d);
      setIsLoading(false);
      return newState;
    },
    initalState
  );

  const router = useRouter();
  let pageNum = router.query.page as unknown as number;
  pageNum = Number(pageNum);

  let start_n: number = (pageNum - 1) * 10;
  let current_list = countriesData.slice(start_n, start_n + 10);

  return (
    <>
      <Layout>
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} colorScheme="blue">
            Options
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup title="Order" type="radio">
              <MenuItemOption
                value="asc"
                onClick={() => {
                  dispatch({ type: CountriesActionType.ASC });
                }}
              >
                Ascending
              </MenuItemOption>
              <MenuItemOption
                value="des"
                onClick={() => {
                  dispatch({ type: CountriesActionType.DES });
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
                  dispatch({ type: CountriesActionType.BY_REGION });
                }}
              >
                By region
              </MenuItemOption>
              <MenuItemOption
                value="by__area"
                onClick={() => {
                  dispatch({ type: CountriesActionType.BY_AREA });
                }}
              >
                By area
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>

        <CountriesList countries={current_list} pageNumber={pageNum} />
        <CustomPagination
          currPage={pageNum}
          numOfPages={Math.ceil(countriesData.length / 10)}
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
