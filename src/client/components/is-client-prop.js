import React from "react";
import styled from "styled-components";
import I from "./image";
import img1 from "../assets/rsc2.png";
import C from "./code";
import RM from "./react-markdown";

export default function IsClientProp() {
  return (
    <>
      <RM>
        This is the unique case where you need to know a litte bit about the
        implementation details. Remember that the `__isClient__` prop is used to
        tell the client where to find a RCC. RCC's cannot travel through the
        wire because they are functions, and functions cannot be stringified. So
        we use this prop to tell the client were to find the RCC.
      </RM>
      <RM>
        For this, you need to know a little bit about the implementation
        details, to know what exactly to put in the `__isClient__` prop.
      </RM>
      <RM>
        For this, an image of the files and folders structure will help to
        clarify:
      </RM>
      <Image src={img1} maxWidth="400px" borderRadius="10px" />
      <RM>
        So you see, the `fill-jsx-with-client-components.js` is where the
        utility function `fillJSXWithClientComponents` is defined. This is the
        function that dynamically imports the RCC's in the client. So in the
        `__isClient__` prop we must put the relative path of the RCC with
        respect this function, and because of the implementation details I have
        shown you and the files and folders structure in the client, this will
        be `../components/component-name.js`.
      </RM>
      <RM>
        That's why in the RSC's we have defined so far, the return statement
        was:
      </RM>
      <Code>
        {`export default async function Greeting() {
  // ...
  return <RCC __isClient__="../components/greeting.js" greeting={greeting} />;
}`}
      </Code>
    </>
  );
}

const Code = styled(C)`
  overflow-x: auto !important;
  border-radius: 10px;
`;

const Image = styled(I)`
  align-self: center;
`;
