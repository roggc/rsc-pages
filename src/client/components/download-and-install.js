import React from "react";
import styled from "styled-components";
import C from "./code";
import RM from "./react-markdown";

export default function DownloadAndInstall() {
  return (
    <>
      {/* <RM>
        To download the setup you must `git clone` the repository. For this, you
        must type in a terminal window:
      </RM>
      <Code>{`git clone https://github.com/roggc/rsc.git my-project-name`}</Code>
      <RM>
        for the RSC setup without SSR. For the RSC setup with SSR you must type:
      </RM>
      <Code>{`git clone https://github.com/roggc/rsc-ssr.git my-project-name`}</Code>
      <RM>
        This will create a project in your system (a folder). Then, in a
        terminal window, in the root of the project, type:
      </RM>
      <Code>{`npm i`}</Code>
      <RM>
        This will install the dependencies and create the node_modules folder in
        the project.
      </RM> */}
      <RM>
        To create a project with this setup you have to type in a terminal
        window:
      </RM>
      <Code>{`npx create-rsc-app@latest my-app`}</Code>
      <RM>
        This will create a RSC app without SSR. If you want it to be with SSR
        you must type:
      </RM>
      <Code>{`npx create-rsc-app@latest my-app --ssr`}</Code>
      <RM>That is, you pass the option `--ssr` to the command.</RM>
      <RM>
        After that you will have a project ready to be started for development.
        To do that you must type (in the root of the project):
      </RM>
      <Code>{`npm run dev`}</Code>
      <RM>
        This will run rollup (the bundler) in whatch mode. It will create the
        `dist` and `public` folders.
      </RM>
      <RM>Finally, in a new terminal window, type:</RM>
      <Code>{`npm start`}</Code>
      <RM>
        This will start the app. After that you can go to the browser and put
        `localhost:8080` in a tab to see the app up and running.
      </RM>
      <RM>
        If you do any changes to the source code, the app will recompile
        (update), but there is no `hot reloading`, so this means you must
        manually reload the app in the browser to see the changes. Also, if you
        create or delete files, you must re-run the bundler, that is, stop it
        and type again `npm run dev`.
      </RM>
    </>
  );
}

const Code = styled(C)`
  overflow-x: auto !important;
  border-radius: 10px;
`;
