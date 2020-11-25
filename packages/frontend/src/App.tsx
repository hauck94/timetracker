import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/GlobalStyle";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import "./styles.css";
import { theme } from "./theme";

export const App = () => {
  useEffect(() => {
    (async function () {
      const helloRequest = await fetch("/api");
      const helloJson = await helloRequest.json();
      console.log(helloJson);
    })();
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <DashboardPage />
    </ThemeProvider>
  );
};
