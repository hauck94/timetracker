import React from "react";
import { GlobalStyle } from "./components/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { DetailPage } from "./pages/Detail/DetailPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Switch>
      <Route exact={true} path="/task/:taskId" component={DetailPage} />
      <Route exact={true} path="/" component={DashboardPage} />
      </Switch>
    </ThemeProvider>
    </BrowserRouter>
  );
};
