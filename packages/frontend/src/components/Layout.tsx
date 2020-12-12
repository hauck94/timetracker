import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const headerHeight = '85px';
const footerHeight = '50px';

export const MaxWidthCSS = css`
  max-width: 860px;
  margin: auto;
`;
const Header = styled.header`
  height: ${headerHeight};
  width: 100%;
  display: flex;
  font-size: x-large;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  align-items: center;
  padding: 0 25px;
  margin-bottom: 1rem;
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

const Title = styled.div`
  padding: 5px 5px 5px 5px;
  border-radius: 10px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  transition: height 0.5s;
  -webkit-transition: height 0.5s;

  &:focus,
  &:hover {
    transform: scale(1.2);
  }
`;

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
          <div
            css={`
              font-size: 25px;
              letter-spacing: 2.3px;
              flex: 1;
            `}
          >
            <Title>
              <svg
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                className="bi bi-house"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                <path d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
              </svg>
              Task System
            </Title>
          </div>
        </Link>
        <NavigationList />
      </Header>
      <Main>{children}</Main>
      <Footer>© 2020 Task System</Footer>
    </>
  );
};
