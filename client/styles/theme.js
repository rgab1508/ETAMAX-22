// Add theme data here
// Font and color data will be decided later
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/lato";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";

const theme = extendTheme({
  fonts: {
    body: "Poppins",
    heading: "Poppins",
  },
});

export default theme;
