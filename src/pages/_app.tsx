import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import CountriesProvider from "@/Context/CountriesContext";
import { Provider } from "jotai";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CountriesProvider>
        <Component {...pageProps} />
      </CountriesProvider>
    </ChakraProvider>
  );
}
