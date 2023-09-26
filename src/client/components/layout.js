import React from "react";
import L from "./link.js";
import { useNavigation } from "../hooks/index.js";
import styled from "styled-components";
import Router from "./router.js";
import RSC from "./rsc.js";

export default function Layout({ title }) {
  const page = useNavigation();
  const importmap = {
    imports: {
      "react-markdown": "https://esm.sh/react-markdown@7?bundle",
    },
  };
  return (
    <html>
      <head>
        <title>{title}</title>
        <style dangerouslySetInnerHTML={{ __html: "p{margin:0px;}" }} />
      </head>
      <Body>
        <SupraContainer>
          <Nav>
            <Header>
              <Link page={{ name: "home" }}>THE RSC SETUP</Link>
            </Header>
            <Link page={{ name: "home" }} cssIsActive="color:orange;">
              Home
            </Link>
            <Link page={{ name: "how" }} cssIsActive="color:orange;">
              How you code
            </Link>
            <Link page={{ name: "is-client-prop" }} cssIsActive="color:orange;">
              The __isClient__ prop
            </Link>
            <Link page={{ name: "react-suspense" }} cssIsActive="color:orange;">
              React.Suspense
            </Link>
            <Link
              page={{ name: "download-and-install" }}
              cssIsActive="color:orange;"
            >
              Download and run
            </Link>
          </Nav>
          <SecondContainer>
            <Container pageName={page.name}>
              <Router />
              <RSC componentName={page.name} {...page.props} />
            </Container>
          </SecondContainer>
        </SupraContainer>
        <script
          type="importmap"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(importmap) }}
        />
      </Body>
    </html>
  );
}

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => `gap: ${theme.gap}px;`}
  min-width:100px;
`;

const SupraContainer = styled.div`
  display: flex;
  height: 97vh;
`;

const Header = styled.div`
  display: flex;
`;

const Body = styled.body`
  font-family: sans-serif;
`;

const Container = styled(({ pageName, ...props }) => <div {...props} />)`
  display: flex;
  flex-direction: column;
  ${({ pageName }) =>
    pageName === "home"
      ? "justify-content: space-around;align-items: center;"
      : "gap:20px;"}
  flex: 1;
  max-height: 100%;
  overflow: auto;
  padding: 10px 10px 0 0;
  max-width: 910px;
`;

const SecondContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Link = styled(L)`
  padding: 10px;
`;

const Title = styled.div`
  padding: 10px;
`;
