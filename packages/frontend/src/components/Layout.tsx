import React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";

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
  color: ${(props) => props.theme.colors.primary};
`;

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header>
        <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
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
              Task S
            </span>
            ystem
          </div>
        </Link>
        <NavigationList></NavigationList>
      </Header>
      <Main>{children}</Main>
      <Footer>© 2020 Task System</Footer>
    </>
  );
};
