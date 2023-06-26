import React, { useContext } from "react";

const HandleOperationContext = React.createContext(
  (data: CountryResponse[], state: CountriesState): CountryResponse[] => {
    return [];
  }
);

export function useHandleOperation() {
  return useContext(HandleOperationContext);
}

export default function CountriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  function sortCountries(
    countires: CountryResponse[],
    type: string
  ): CountryResponse[] {
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
    return sorted;
  }

  function filterCountries(
    countires: CountryResponse[],
    type: string
  ): CountryResponse[] {
    let fn = (country: CountryResponse) => {
      if (type == "by__region") {
        return country.region == "Oceania";
      } else if (type == "by__area") {
        return country.area < 65300;
      }
      return true;
    };

    let filtered = countires.filter(fn);
    return filtered;
  }

  function handleOperation(
    data: CountryResponse[],
    state: CountriesState
  ): CountryResponse[] {
    let newData = data;
    if (state.isSortedAsc) {
      newData = sortCountries(newData, "asc");
    }

    if (state.isSortedDes) {
      newData = sortCountries(newData, "des");
    }

    if (state.isAreaFiltered) {
      newData = filterCountries(newData, "by__area");
    }

    if (state.isRegionFiltrered) {
      newData = filterCountries(newData, "by__region");
    }

    return newData;
  }
  return (
    <HandleOperationContext.Provider value={handleOperation}>
      {children}
    </HandleOperationContext.Provider>
  );
}
