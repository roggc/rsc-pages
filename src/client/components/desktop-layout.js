import React from "react";
import Router from "./router.js";
import RSC from "./rsc.js";
import L from "./link.js";
import styled from "styled-components";
import { useNavigation } from "../hooks/index.js";

export default function DesktopLayout() {
  const page = useNavigation();

  return (
    <>
      <SupraContainer>
        <Nav>
          <Header>
            <Link page={{ name: "home" }}>THE RSC SETUP</Link>
          </Header>
          <Link page={{ name: "home" }} cssIsActive="color:orange;">
            Home
          </Link>
          <Link page={{ name: "how" }} cssIsActive="color:orange;">
            How you code in this setup
          </Link>
          <Link page={{ name: "is-client-prop" }} cssIsActive="color:orange;">
            The __isClient__ prop
          </Link>
          <Link page={{ name: "react-suspense" }} cssIsActive="color:orange;">
            React.Suspense
          </Link>
          <Link page={{ name: "eject" }} cssIsActive="color:orange;">
            Eject
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
    </>
  );
}

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
  margin: 10px;
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

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => `gap: ${theme.gap}px;`}
  min-width:100px;
`;

const SupraContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
`;
