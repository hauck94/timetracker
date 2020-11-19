import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/GlobalStyle";
import { Layout } from "./components/Layout";
import { Message, MessageType } from "./components/Message";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import "./styles.css";
import { theme } from "./theme";

export interface JokeResponse {
  type: string;
  value: Value;
}

export interface Value {
  id: number;
  joke: string;
  categories: any[];
}

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
