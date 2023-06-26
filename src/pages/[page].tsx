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
import { useHandleOperation } from "@/Context/CountriesContext";
import { useRouter } from "next/router";

enum CountriesActionType {
  ASC = "asc",
  DES = "des",
  BY_AREA = "by__area",
  BY_REGION = "by__region",
}

interface CountriesAction {
  type: CountriesActionType;
  payLoad: {
    start: number;
  };
}

function getTenPages(
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

  let initStart = ((router.query.page as unknown as number) - 1) * 10;
  const [start, setStart] = useState<number>(initStart ? initStart : 0);
  const [currentList, setCurrentList] = useState<CountryResponse[]>(
    getTenPages(data, start)
  );

  let initalState: CountriesState = {
    isSortedAsc: false,
    isSortedDes: false,
    isAreaFiltered: false,
    isRegionFiltrered: false,
    didRender: false,
    countriesData: data,
  };

  const [state, setState] = useState<CountriesState>(initalState);

  // const [state, dispatch] = useReducer(
  //   (state: CountriesState, action: CountriesAction) => {
  //     let newState = state;
  //     if (newState.didRender) {
  //       newState.didRender = false;
  //       newState.countriesData = handleOperation(data, newState);
  //       setCurrentList(
  //         getTenPages(newState.countriesData, action.payLoad.start)
  //       );
  //       return newState;
  //     }
  //     switch (action.type) {
  //       case CountriesActionType.ASC:
  //         newState.isSortedAsc = true;
  //         newState.isSortedDes = false;
  //         break;

  //       case CountriesActionType.DES:
  //         newState.isSortedDes = true;
  //         newState.isSortedAsc = false;
  //         break;

  //       case CountriesActionType.BY_AREA:
  //         newState.isAreaFiltered = !newState.isAreaFiltered;
  //         break;

  //       case CountriesActionType.BY_REGION:
  //         newState.isRegionFiltrered = !newState.isRegionFiltrered;

  //         break;
  //     }

  //     newState.didRender = true;
  //     return newState;
  //   },
  //   initalState
  // );

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
                  let newState = state;
                  newState.isSortedAsc = true;
                  newState.isSortedDes = false;
                  let countriesData = handleOperation(data, newState);
                  newState.countriesData = countriesData;
                  setState(newState);
                  setCurrentList(getTenPages(countriesData, start));
                }}
              >
                Ascending
              </MenuItemOption>
              <MenuItemOption
                value="des"
                isDisabled={state.isSortedDes}
                onClick={() => {
                  let newState = state;
                  newState.isSortedAsc = false;
                  newState.isSortedDes = true;
                  let countriesData = handleOperation(data, newState);
                  newState.countriesData = countriesData;
                  setState(newState);
                  setCurrentList(getTenPages(countriesData, start));
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
                  let newState = state;
                  newState.isRegionFiltrered = !newState.isRegionFiltrered;
                  let countriesData = handleOperation(data, newState);
                  newState.countriesData = countriesData;
                  setState(newState);
                  setCurrentList(getTenPages(countriesData, start));
                }}
              >
                By region
              </MenuItemOption>
              <MenuItemOption
                value="by__area"
                onClick={() => {
                  let newState = state;
                  newState.isAreaFiltered = !newState.isAreaFiltered;
                  let countriesData = handleOperation(data, newState);
                  newState.countriesData = countriesData;
                  setState(newState);
                  setCurrentList(getTenPages(countriesData, start));
                }}
              >
                By area
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <CustomPagination
          numOfPages={Math.ceil(state.countriesData.length / 10)}
          setStart={setStart}
          setCurrentList={setCurrentList}
          currPage={
            Number(router.query.page as unknown as number)
              ? Number(router.query.page as unknown as number)
              : 1
          }
          countriesData={data}
        />
        <CountriesList countries={currentList} pageNumber={start} />
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
