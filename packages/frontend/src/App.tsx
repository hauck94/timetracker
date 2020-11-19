import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/GlobalStyle";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import "./styles.css";
import { theme } from "./theme";

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <DashboardPage />
        </Layout>
      </ThemeProvider>
    </>
  );
};
