import React from "react";
import styled from "styled-components";
import I from "./image";
import img1 from "../assets/rsc6.png";
import C from "./code";
import RM from "./react-markdown";

export default function IsClientProp() {
  return (
    <>
      <RM>
        The value of the `__isClient__` prop is the route relative to
        `src/client/` where the RCC is located, whithout the file extension at
        the end.
      </RM>
      <RM>So usually will be something like `components/my-component`.</RM>
      <RM>
        For this will help to take a look again at the files-folders structure:
      </RM>
      <Image src={img1} maxWidth="400px" borderRadius="10px" />
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
