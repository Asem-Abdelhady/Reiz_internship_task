interface CountryResponse {
  name: { common: string };
  region: string;
  area: number;
  independent: boolean;
  flags: {
    svg: string;
    png: string;
  };
  population: number;
}

interface CountryNameResponse extends CountryResponse {
  maps: {
    googleMaps: string;
    openStreeMaps: string;
  };
  timezones: string[];
  borders: string[];
  capital: string[];
}

interface CountriesState {
  isSortedAsc: boolean;
  isSortedDes: boolean;
  isAreaFiltered: boolean;
  isRegionFiltrered: boolean;
}

enum CountriesActionType {
  ASC = "asc",
  DES = "des",
  BY_AREA = "by__area",
  BY_REGION = "by__region",
}

interface CountriesAction {
  type: CountriesActionType;
}
