import React, { useState } from "react";
import Router from "./router.js";
import RSC from "./rsc.js";
import L from "./link.js";
import styled from "styled-components";
import { useNavigation } from "../hooks/index.js";

export default function MobileLayout() {
  const page = useNavigation();
  const [isShown, setIsShown] = useState(false);
  const toggleIsShown = () => setIsShown((iS) => !iS);

  return (
    <>
      <SupraContainer>
        <Header>
          <button onClick={toggleIsShown}>menu</button>
          <Link
            page={{ name: "home" }}
            onClickExtension={() => setIsShown(false)}
          >
            THE RSC SETUP
          </Link>
        </Header>
        <SecondContainer>
          <Nav isShown={isShown}>
            <Link
              page={{ name: "home" }}
              cssIsActive="color:orange;"
              onClickExtension={toggleIsShown}
            >
              Home
            </Link>
            <Link
              page={{ name: "how" }}
              cssIsActive="color:orange;"
              onClickExtension={toggleIsShown}
            >
              How you code in this setup
            </Link>
            <Link
              page={{ name: "is-client-prop" }}
              cssIsActive="color:orange;"
              onClickExtension={toggleIsShown}
            >
              The __isClient__ prop
            </Link>
            <Link
              page={{ name: "react-suspense" }}
              cssIsActive="color:orange;"
              onClickExtension={toggleIsShown}
            >
              React.Suspense
            </Link>
            <Link
              page={{ name: "eject" }}
              cssIsActive="color:orange;"
              onClickExtension={toggleIsShown}
            >
              Eject
            </Link>
            <Link
              page={{ name: "dotenv-ready" }}
              cssIsActive="color:orange;"
              onClickExtension={toggleIsShown}
            >
              Dotenv ready
            </Link>
            <Link
              page={{ name: "download-and-install" }}
              cssIsActive="color:orange;"
              onClickExtension={toggleIsShown}
            >
              create-rsc-app
            </Link>
          </Nav>
          <Container pageName={page.name} onClick={() => setIsShown(false)}>
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
  margin: 0 10px 10px 10px;
  max-width: 910px;
`;

const SecondContainer = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  overflow: auto;
  justify-content: center;
`;

const Link = styled(L)`
  padding: 10px;
`;

const Title = styled.div`
  padding: 10px;
`;

const Nav = styled(({ isShown, ...props }) => <div {...props} />)`
  display: flex;
  flex-direction: column;
  ${({ theme }) => `gap: ${theme.gap}px;`}
  min-width:100px;
  position: absolute;
  left: ${({ isShown }) => (isShown ? "0px" : "-1000px")};
  border-right: 2px solid red;
  --border-top: 2px solid red;
  transition: left 500ms;
  transition-delay: 250ms;
  background-color: white;
  height: calc(100% - 10px);
  z-index: 9999;
  --margin: 10px 0 0;
  box-sizing: border-box;
`;

const SupraContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  margin: 10px;
`;
