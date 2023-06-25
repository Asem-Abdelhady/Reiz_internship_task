import React, { useContext, useState } from "react";

const CountriesContext = React.createContext<CountryResponse[]>([]);
const CountriesSortContext = React.createContext(
  (countires: CountryResponse[], type: string) => {}
);
const CountriesFilterContext = React.createContext(
  (countires: CountryResponse[], type: string) => {}
);

const currentPageContext = React.createContext<number>(0);
export function useCountries() {
  return useContext(CountriesContext);
}
export function useSort() {
  return useContext(CountriesSortContext);
}

export function useFilter() {
  return useContext(CountriesFilterContext);
}
export default function CountriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [countriesData, setData] = useState<CountryResponse[]>([]);

  function sortCountries(countires: CountryResponse[], type: string): void {
    let fn = (a: CountryResponse, b: CountryResponse): number => {
      if (type == "asc") {
        if (a.name.common < b.name.common) return -1;
        else if (a.name.common > b.name.common) return 1;
        else return 0;
      } else if (type == "des") {
        if (b.name.common < a.name.common) return -1;
        else if (b.name.common > a.name.common) return 1;
        else return 0;
      }

      return 1;
    };
    const sorted = countires.sort(fn);
    console.log("Sorted: ", sorted);

    setData(sorted);
  }

  function filterCountries(countires: CountryResponse[], type: string): void {
    let fn = (country: CountryResponse) => {
      if (type == "by__region") {
        return country.region == "Oceania";
      } else if (type == "by__area") {
        return country.area < 65300;
      }
      return true;
    };

    let filtered = countires.filter(fn);
    setData(filtered);
  }
  return (
    <CountriesContext.Provider value={countriesData}>
      <CountriesSortContext.Provider value={sortCountries}>
        <CountriesFilterContext.Provider value={filterCountries}>
          {children}
        </CountriesFilterContext.Provider>
      </CountriesSortContext.Provider>
    </CountriesContext.Provider>
  );
}
