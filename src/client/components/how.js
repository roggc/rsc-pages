import React from "react";
import C from "./code";
import styled from "styled-components";
import RM from "./react-markdown";
import img1 from "../assets/rsc5.png";
import I from "./image";

export default function How() {
  return (
    <>
      <Title>Intro</Title>
      <RM>
        In this setup you code normally as in any front-end app until you face a
        component that needs data from the server. In this situation you first
        code the RCC (React Client Component) that needs data from the server
        and then code a RSC (React Server Component) with the same name as the
        RCC, that will be encharged of fetching the data and call the RCC with
        the data. Also you need a mechanism to call the RSC from the client
        (from any RCC in the React tree). This will be done by the `RSC` RCC, a
        special RCC which its mission is to fetch the server for the RSC we tell
        him.
      </RM>
      <RM>Next is the files and folders structure of the setup:</RM>
      <Image src={img1} maxWidth="400px" borderRadius="10px" />
      <RM>
        So you will work on the `src/client` folder and on the
        `src/server/components` folder, that's all.
      </RM>
      <RM>
        On the `client` folder you will use RCC's. When you need a RSC, you will
        use `RSC` RCC to "call" (fetch) it. This, in turn, will return a RCC
        with the proper data, fetched from the server (from the RSC).
      </RM>
      <RM>This is best described in the rest of this page.</RM>
      <Title>The cycle of programming with this setup</Title>
      <RM>Let's say you need a `Greeting` RCC, like this:</RM>
      <Code>{`import React from "react";

export default function Greeting({ greeting }) {
  return <>{greeting}</>;
}`}</Code>
      <RM>
        It's just an RCC that receives a `greeting` prop and displays it in the
        screen. But this `greeting` prop must be retrieved from the server. So
        in this situation we code a `Greeting` RSC that will do the job:
      </RM>
      <Code>{`import React from "react";
import { RCC } from "rsc-module/server";

export default async function Greeting() {
  const value = Math.random() < 0.5;
  const greeting = await new Promise((r) =>
    setTimeout(() => {
      switch (value) {
        case true:
          return r("Whatsupp!!!");
        case false:
          return r("How r u doing?");
      }
    }, 500)
  );

  return <RCC __isClient__="components/greeting" greeting={greeting} />;
}`}</Code>
      <RM>
        First thing to notice is that the RSC is async. RSC's are async
        functions. Second thing, is the `return` statement:
      </RM>
      <Code>{`return <RCC __isClient__="components/greeting" greeting={greeting} />;`}</Code>
      <RM>
        `RCC` it's an RSC that does nothing. The important thing is the props we
        pass to it, the `__isClient__` prop and the `greeting` prop.
      </RM>
      <Code>{`export async function RCC() {
  return null;
}`}</Code>
      <RM>
        The `__isClient__` prop is to tell the client where to find this
        component. The `greeting` prop is the data for the `Greeting` RCC.
      </RM>
      <RM>
        Ok, we have a `Greeting` RCC and a `Greeting` RSC. The `Greeting` RSC
        calls the `Greeting` RCC. But how do we call the `Greeting` RSC? We need
        a mechanism to call the RSC from a RCC. This will be done by the `RSC`
        RCC:
      </RM>
      <Code>{`import React, { useEffect, useState } from "react";
import { fillJSXWithClientComponents, parseJSX } from "../utils/index.js";

export function RSC({
  componentName = "__no_component_name__",
  children = <>loading ...</>,
  errorJSX = <>something went wrong</>,
  ...props
}) {
  const [JSX, setJSX] = useState(children);
  const body = JSON.stringify({ props });

  useEffect(() => {
    setJSX(children);
    fetch(\`/\${componentName}\`, {
      method: "post",
      headers: { "content-type": "application/json" },
      body,
    })
      .then(async (response) => {
        const clientJSXString = await response.text();
        const clientJSX = JSON.parse(clientJSXString, parseJSX);
        const fixedClientJSX = await fillJSXWithClientComponents(clientJSX);
        setJSX(fixedClientJSX);
      })
      .catch(() => setJSX(errorJSX));
  }, [componentName, body]);

  return JSX;
}
`}</Code>
      <RM>
        These are implementation details. The only thing you need to do in your
        code to call a RSC from a RCC is:
      </RM>
      <Code>{`import React from "react";
import {RSC} from "rsc-module/client";

export default function SomeRCC() {
  // ...
  return (
    <>
      {/* ... */}
      <RSC componentName="greeting">loading greeting ...</RSC>
      {/* ... */}
    </>
  );
}`}</Code>
      <RM>
        Last thing to do is to connect the call to `greeting` route in the
        server to the `Greeting` RSC. This is done in the `Router` RSC:
      </RM>
      <Code>{`import React from "react";
import { RCC } from "rsc-module/server";
import Greeting from "./greeting.js";

export default async function Router({ componentName, props }) {
  switch (componentName) {
    case "greeting":
      return <Greeting {...props} />;
    default:
      return <RCC __isClient__="components/ups" />;
  }
}`}</Code>
      <RM>
        So there are basically four steps, create the `Greeting` RCC and the
        `Greeting` RSC, call the `Greeting` RSC from a RCC with the `RSC` RCC,
        and connect the call to `greeting` route in the server to the `Greeting`
        RSC (this is done in the `Router` RSC).
      </RM>
      <Title>Recap: the cycle of coding with this setup</Title>
      <RM>
        So let's repeat the steps just to have you clear how to do it (the
        cycle).
      </RM>
      <RM>First, code the `Greeting` RCC and the `Greeting` RSC:</RM>
      <Code>{`import React from "react";

export default function Greeting({ greeting }) {
  return <>{greeting}</>;
}`}</Code>
      <Code>{`import React from "react";
import { RCC } from "rsc-ssr-module/server";

export default async function Greeting() {
  const value = Math.random() < 0.5;
  const greeting = await new Promise((r) =>
    setTimeout(() => {
      switch (value) {
        case true:
          return r("Whatsupp!!!");
        case false:
          return r("How r u doing?");
      }
    }, 500)
  );

  return <RCC greeting={greeting} __isClient__="components/greeting" />;
}`}</Code>
      <RM>
        Second, add the route to the `Router` RSC to connect the call to the
        server to the `Greeting` RSC:
      </RM>
      <Code>{`import React from "react";
import Greeting from "./greeting.js";
import { RCC } from "rsc-ssr-module/server";
import theme from "../../client/theme.js";

const title = "My App";

const Router = async ({ componentName, props }) => {
  switch (componentName) {
    case "":
      return (
        <RCC __isClient__="components/theme-provider" theme={theme}>
          <RCC __isClient__="slices">
            <RCC __isClient__="components/layout" title={title}>
              <RCC __isClient__="components/app" />
            </RCC>
          </RCC>
        </RCC>
      );
    case "greeting":
      return <Greeting {...props} />;
    default:
      return <RCC __isClient__="components/ups" />;
  }
};

export default Router;`}</Code>
      <RM>And finally, call the RSC from a RCC, using the `RSC` RCC:</RM>
      <Code>{`import React from "react";
import {RSC} from "rsc-ssr-module/client";      

export default function SomeRCC() {
  // ...
  return (
    <>
      {/* ... */}
      <RSC componentName="greeting">loading greeting ...</RSC>
      {/* ... */}
    </>
  );
}`}</Code>
      <RM>
        This cycle (four steps), must be done for any RCC that needs data from
        the server. Notice how the `Greeting` RCC is not directly called from a
        RCC, but instead the `RSC` RCC is called.
      </RM>
      <Title>Passing props to the `RSC` RCC</Title>
      <RM>
        We can pass props to the call to the `RSC` RCC, this props will travel
        through the wire to the server and received in the `Greeting` RSC (or
        any RSC).
      </RM>
      <RM>
        Let's say for example we want a `SayHello` RCC that receives its data
        from the server. Then we need a `SayHello` RSC that will give this data.
        But suppose the data depends on a parameter `isFriend`. If `isFriend` is
        true, then the data will be `Whats upp!!!`. If `isFriend` is false the
        data will be `How are you doing?`. So this is done passing the
        `isFriend` prop from the call to the `RSC` RCC in the client:
      </RM>
      <Code>{`import React from "react";
import {RSC} from "rsc-module/client";

export default function SomeRCC() {
  // ...
  return (
    <>
      {/* ... */}
      <RSC componentName="say-hello" isFriend={true}>loading greeting ...</RSC>
      {/* ... */}
    </>
  );
}`}</Code>
      <RM>Then in the `SayHello` RSC we will have:</RM>
      <Code>{`import React from "react";
import {RCC} from "rsc-module/server";

export default async function SayHello({ isFriend }) {
  const data = await new Promise((r) =>
    setTimeout(() => {
      if (isFriend) {
        return r("Whats upp!!!");
      }
      return r("How are you doing?");
    }, 500)
  );
  return <RCC __isClient__="components/say-hello" message={data} />;
}`}</Code>
      <RM>The `SayHello` RCC will be just:</RM>
      <Code>{`import React from "react";

export default function SayHello({ message }) {
  return <>{message}</>;
}`}</Code>
      <RM>And the `Router` RSC will be like:</RM>
      <Code>{`import React from "react";
import SayHello from "./say-hello.js";

export default async function Router({ componentName, props }) {
  switch (componentName) {
    // ...
    case "say-hello":
      return <SayHello {...props} />;
    // ...
  }
}`}</Code>
      <RM>
        So props can be passed to the call of the `RSC` RCC. Except functions,
        that cannot be stringifyed. In that case, what you should do is use
        `react-context-slices`, included in the setup, to store the value in the
        global state and recover it in any RCC down the tree, bypassing this way
        the wall that the `RSC` RCC is for this type of values (functions).
      </RM>
      <Title>Nested `RSC` calls</Title>
      <RM>
        You can call the `RSC` RCC in any RCC. That means, that for example, in
        the `Greeting` RCC we defined above, you can call also `RSC` RCC. This
        will produce a waterfall effect, because nested calls would not start
        until previous calls are fulfilled. In the example above we call first
        `RSC` RCC from `SomeRCC` RCC. When `Greeting` RCC gets rendered, then
        nested call in `Greeting` RCC to `RSC` RCC will start.
      </RM>
    </>
  );
}

const Code = styled(C)`
  overflow-x: auto !important;
  border-radius: 10px;
`;

const Title = styled(RM)`
  font-weight: 700;
  font-size: 1.8rem;
`;

const Image = styled(I)`
  align-self: center;
`;
