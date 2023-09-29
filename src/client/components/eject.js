import React from "react";
import styled from "styled-components";
import C from "./code";
import RM from "./react-markdown";

export default function Eject() {
  return (
    <>
      <RM>
        {`In these RSC and RSC-SSR setups, the implementation details of the setup are hidden from you. They are installed through a node module in each case. That's why in previous code examples we have seen something like \`import {RSC} from "rsc-module/client";\` or \`import {RCC} from "rsc-ssr-module/server";\`, etc.`}
      </RM>
      <RM>
        You have the option to `eject`, which means copying the source code of
        the module into a folder in the root of the project, and updating
        references in the code to this modules. The project will run fine after
        that and you can customize everything about it.
      </RM>
      <RM>
        This process is reversible. You can delete the folder created and
        discard changes into your source code files, and the project will still
        run. Then you can `eject` again if you wish.
      </RM>
      <RM>To `eject` the project you just need to run in your terminal:</RM>
      <Code>{`npm run eject`}</Code>
    </>
  );
}

const Code = styled(C)`
  overflow-x: auto !important;
  border-radius: 10px;
`;
