import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";
import styled from "styled-components";

export default function Code({ children, isInline = false, ...props }) {
  return isInline ? (
    <SyntaxHighlighter language="javascript" style={materialDark} {...props}>
      {children}
    </SyntaxHighlighter>
  ) : (
    <Container>
      <SyntaxHighlighter language="javascript" style={materialDark} {...props}>
        {children}
      </SyntaxHighlighter>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100%;
`;
