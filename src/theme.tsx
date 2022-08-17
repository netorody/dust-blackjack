import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const colors = {
  green: "#FF134B",
  white: "#ffffff",
  yellow: "#FF134B",
  darkGreen: "#1E1E1E",
  lighterBorders: "#252927",
  linearBorders: "linear-gradient(180deg, #6DD05D 0%, #E0A501 100%)",
};

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const styles = {
  global: {
    body: {
      fontFamily: "'GolosUIWebBold' !important",
      background: "transparent",
      backgroundImage: 'url("/img/background.png") ',
      backgroundRepeat: "no-repeat",
      
      backgroundPosition: "center top",
      backgroundColor: "#000",
      color: "#fff",
    },
  },
};

const theme = extendTheme({
  colors,
  styles,
  breakpoints,
});

export default theme;
