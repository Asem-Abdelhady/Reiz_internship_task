import React, { useContext, useReducer, useState } from "react";

let initalState: CountriesState = {
  isSortedAsc: false,
  isSortedDes: false,
  isAreaFiltered: false,
  isRegionFiltrered: false,
};

const HandleOperationContext = React.createContext(
  (data: CountryResponse[], type: string, start: number): void => {}
);

const StateContext = React.createContext(initalState);
const CountiresContext = React.createContext<CountryResponse[]>([]);
const CurrentListContext = React.createContext<CountryResponse[]>([]);
const SetCurrentListContext = React.createContext(
  (countries: CountryResponse[]) => {}
);

export function useHandleOperation() {
  return useContext(HandleOperationContext);
}
export function useStateContext() {
  return useContext(StateContext);
}
export function useCountriesContext() {
  return useContext(CountiresContext);
}

export function useCurrentListContext() {
  return useContext(CurrentListContext);
}

export function useSetCurrentList() {
  return useContext(SetCurrentListContext);
}

export default function CountriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [countries, setCountries] = useState<CountryResponse[]>([]);
  const [state, setState] = useState<CountriesState>(initalState);
  const [currentList, setCurrentList] = useState<CountryResponse[]>([]);
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

  function changeState(type: string) {
    let newState = state;
    switch (type) {
      case "asc":
        newState.isSortedAsc = true;
        newState.isSortedDes = false;
        break;
      case "des":
        newState.isSortedDes = true;
        newState.isSortedAsc = false;
        break;
      case "by__area":
        newState.isAreaFiltered = !state.isAreaFiltered;
        break;
      case "by__region":
        newState.isRegionFiltrered = !state.isRegionFiltrered;
        break;
    }

    setState(newState);
  }

  function getTenCountries(
    countries: CountryResponse[],
    start: number
  ): CountryResponse[] {
    return countries.slice(start, start + 10);
  }

  function setList(countries: CountryResponse[]) {
    setCurrentList(countries);
  }

  function handleOperation(
    data: CountryResponse[],
    type: string,
    start: number
  ): void {
    let newData = data;
    changeState(type);
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

    setCountries(newData);
    setCurrentList(getTenCountries(newData, start));
  }

  return (
    <HandleOperationContext.Provider value={handleOperation}>
      <StateContext.Provider value={state}>
        <CountiresContext.Provider value={countries}>
          <CurrentListContext.Provider value={currentList}>
            <SetCurrentListContext.Provider value={setList}>
              {children}
            </SetCurrentListContext.Provider>
          </CurrentListContext.Provider>
        </CountiresContext.Provider>
      </StateContext.Provider>
    </HandleOperationContext.Provider>
  );
}
