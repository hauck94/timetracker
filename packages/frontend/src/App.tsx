import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/GlobalStyle";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import DetailPage from "./pages/Detail/DetailPage";
import "./styles.css";
import { theme } from "./theme";

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Switch>
          <Route exact path="/task/:id" component={DetailPage}></Route>
          <Route exact path="/" component={DashboardPage}></Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
};
