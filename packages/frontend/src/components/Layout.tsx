import React from "react";
import styled, { css } from "styled-components/macro";
import { LabelProvider } from "../contexts/LabelContext";

const headerHeight = "85px";
const footerHeight = "50px";

export const MaxWidthCSS = css`
  max-width: 860px;
  margin: auto;
`;
const Header = styled.header`
  height: ${headerHeight};
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 25px;
`;

const Main = styled.main`
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  padding: 0 25px;
  ${MaxWidthCSS}
`;

const Footer = styled.footer`
  height: ${footerHeight};
  padding: 0 25px;
  ${MaxWidthCSS};
`;

const NavigationList = styled.ul`
  list-style: none;
`;
const NavigationItem = styled.li`
  color: ${(props : any) => props.theme.colors.primary};
`;

export const Layout: React.FC = ({ children }) => {
  return (
    <LabelProvider>
      <Header>
        <div
          css={`
            font-size: 25px;
            letter-spacing: 2.3px;
            flex: 1;
          `}
        >
          <span
            css={`
              text-decoration: underline overline;
            `}
          >
            AWD
          </span>
          20
        </div>
        <NavigationList>
          <NavigationItem>Home</NavigationItem>
        </NavigationList>
      </Header>
      <Main>{children}</Main>
      <Footer>© 2020 AWD Lecture</Footer>
      </LabelProvider>
  );
};
