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
