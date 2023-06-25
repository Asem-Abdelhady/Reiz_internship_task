interface CountryResponse {
  name: { common: string };
  region: string;
  area: number;
  independent: boolean;
  flags: {
    svg: string;
    png: string;
  };
}

interface CountryNameResponse extends CountryResponse {
  maps: {
    googleMaps: string;
    openStreeMaps: string;
  };
  timezones: string[];
  countries: string[];
  population: number;
  borders: string[];
}

interface CountriesState {
  isSortedAsc: boolean;
  isSortedDes: boolean;
  isAreaFiltered: boolean;
  isRegionFiltrered: boolean;
}
