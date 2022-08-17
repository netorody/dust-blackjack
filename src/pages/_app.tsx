import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import "../styles/styles.css";
// import "../components/dice/dice.css";
// import "../components/slot/slot.css";
// import "../components/coin/coin.css";
import "../components/blackjack/components/cardStyle.css";
// import "../components/rps/carouselStyle.css";
import { BetsProvider } from "../contexts/RouletteProvider";
import { CurrencyProvider } from "../contexts/CurrencyProvider";
import { PageContaier } from "../components/page-container";

export const CurrencyContext = React.createContext<{
  value: string;
  setValue?: (value: string) => void;
}>({
  value: "SOL",
});

const theme1 = createTheme({
  palette: {
    type: "dark",
  },
  overrides: {
    MuiButtonBase: {
      root: {
        justifyContent: "flex-start",
      },
    },
    MuiButton: {
      root: {
        textTransform: undefined,
        padding: "12px 16px",
      },
      startIcon: {
        marginRight: 8,
      },
      endIcon: {
        marginLeft: 8,
      },
    },
  },
});

const WalletConnectionProvider = dynamic(
  () => import("../providers/wallet-connection-provider"),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  const [value, setValue] = React.useState<string>("SOL");
  const router = useRouter();
  const { currency, r } = router.query;

  const handleRouteChange = (url: string) => {
    //@ts-ignore
    window.gtag("config", "[Tracking ID]", {
      page_path: url,
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (r && typeof r === "string") {
        localStorage.setItem("r", r);
      }
      if (currency && typeof currency === "string") {
        const newValue = currency.toUpperCase() || "SOL";
        localStorage.setItem("value", newValue);
        setValue(newValue);
      }
      const v: any = localStorage?.getItem("value") || "SOL";
      setValue(v);
    }
  }, [currency, r]);

  const handleValue = (v: any) => {
    setValue(v);
    if (typeof window !== "undefined") {
      localStorage.setItem("value", v);
    }
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <BetsProvider>
      <CurrencyProvider>
        <CurrencyContext.Provider
          value={{ value, setValue: (v: string) => handleValue(v) }}
        >
          <ThemeProvider theme={theme1}>
            <ChakraProvider theme={theme}>
              <DefaultSeo {...SEO} />
              <WalletConnectionProvider>
                <WalletDialogProvider>
                  <PageContaier>
                    <Component {...pageProps} />
                  </PageContaier>
                </WalletDialogProvider>
              </WalletConnectionProvider>
            </ChakraProvider>
          </ThemeProvider>
        </CurrencyContext.Provider>
      </CurrencyProvider>
    </BetsProvider>
  );
}

export default MyApp;
