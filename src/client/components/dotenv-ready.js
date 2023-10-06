import React from "react";
// import styled from "styled-components";
// import C from "./code";
import RM from "./react-markdown";

export default function DotenvReady() {
  return (
    <>
      <RM>
        This setup is `dotenv` ready, meaning you just have to define a `.env`
        file and you can use environment variables with `process.env.MY_VAR`
      </RM>
    </>
  );
}
