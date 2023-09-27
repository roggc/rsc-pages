import React, { useState } from "react";
import styled from "styled-components";
import img1 from "../assets/react.png";
import { useSlice } from "../slices";
import Image from "./image";
import RSC from "./rsc";

export default function Home() {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useSlice("count1");
  const [count2, reduxDispatch, { increment }] = useSlice("count2");

  return (
    <>
      <Title>THE RSC SETUP</Title>
      <Image src={img1} borderRadius="10px" maxWidth="80%" alt="react" />
      <Div>
        <button onClick={() => setCount((c) => c + 1)}>
          get Greeting of the Day (from server)
        </button>
        {count > 0 && <RSC componentName="greeting" key={count} />}
      </Div>
      <Counters>
        <div>
          <button onClick={() => setCount1((c) => c + 1)}>+</button>
          {count1}
        </div>
        <div>
          <button onClick={() => reduxDispatch(increment())}>+</button>
          {count2}
        </div>
      </Counters>
      <Div>This is a setup for RSC (React Server Components) development.</Div>
      <Div>
        You can use it{" "}
        <A href="https://github.com/roggc/rsc-ssr" target="_blank">
          with SSR
        </A>{" "}
        (Server Side Rendering) or{" "}
        <A href="https://github.com/roggc/rsc" target="_blank">
          without SSR
        </A>
        .
      </Div>
      <Div>
        It has included{" "}
        <A href="https://styled-components.com/" target="_blank">
          styled-components
        </A>{" "}
        and{" "}
        <A href="https://react-context-slices.github.io/" target="_blank">
          react-context-slices
        </A>
        , a library to manage state that seamlessly integrates both Redux and
        React Context with zero-boilerplate.
      </Div>
      <Div>
        With this setup you can build SPA's with secret keys to fetch an API
        hidden from the client (browser) or fetch some database in the server
        with{" "}
        <A href="https://www.prisma.io/react-server-components" target="_blank">
          Prisma
        </A>
        .
      </Div>
    </>
  );
}

const Div = styled.div`
  text-align: center;
`;

const Title = styled(Div)`
  font-weight: 700;
  font-size: 2rem;
`;

const Counters = styled.div`
  display: flex;
  gap: 10px;
`;

const A = styled.a`
  text-decoration: none;
  font-weight: 700;
`;
