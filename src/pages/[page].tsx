import Head from "next/head";
import { Button } from "@chakra-ui/react";
import Layout from "@/components/Layout";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { BASE_URL } from "../../config/config";
import axios from "axios";

import { useRouter } from "next/router";
import CountriesList from "@/components/CountriesList/CountriesList";
import CustomPagination from "@/components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { useCountries, useFilter, useSort } from "@/Context/CountriesContext";

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const countriesData = useCountries();
  const sortCountries = useSort();
  const filterCountries = useFilter();

  const [isSortedAsc, setIsSortedAsc] = useState<boolean>(false);
  const [isSortedDes, setIsSortedDes] = useState<boolean>(false);
  const [isAreaFiltered, setIsAreaFiltered] = useState<boolean>(false);
  const [isRegionFiltrered, setIsRegionFiltered] = useState<boolean>(false);

  const router = useRouter();
  let pageNum = router.query.page as unknown as number;

  let start_n: number = (pageNum - 1) * 10;
  let current_list = countriesData.slice(start_n, start_n + 10);

  useEffect(() => {
    sortCountries(data, "");
  }, []);
  return (
    <>
      <Layout>
        <Button
          onClick={() => {
            sortCountries(countriesData, "asc");
            setIsSortedAsc(true);
          }}
        >
          Sort
        </Button>
        <Button
          onClick={() => {
            sortCountries(countriesData, "des");
            setIsSortedDes(true);
          }}
        >
          Sort des
        </Button>
        <Button
          onClick={() => {
            filterCountries(countriesData, "by__area");
          }}
        >
          Smaller than Lithuania
        </Button>
        <Button
          onClick={() => {
            filterCountries(countriesData, "by__region");
          }}
        >
          In Oceania
        </Button>
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
