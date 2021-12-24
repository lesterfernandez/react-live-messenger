import { ColorModeScript } from "@chakra-ui/color-mode";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
