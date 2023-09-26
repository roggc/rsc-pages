import React from "react";
import RM from "react-markdown";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Code from "./code";

export default function ReactMarkdown({ children, ...props }) {
  return (
    <RM
      components={{
        code: ({ node, ...props }) => (
          <strong>
            <Code
              isInline
              PreTag={({ children }) => children}
              style={materialLight}
              {...props}
            />
          </strong>
        ),
      }}
      {...props}
    >
      {children}
    </RM>
  );
}
