import { useSlice } from "../slices";
import React from "react";
import styled from "styled-components";

export default function Link({ page, children, onClickExtension, ...props }) {
  const [pageSelected, setPage] = useSlice("page");
  const isSamePage = pageSelected.name === page.name;

  return (
    <A
      href=""
      onClick={(e) => {
        e.preventDefault();
        if (!isSamePage) {
          history.pushState(page, null, "");
          setPage(page);
        }
        onClickExtension?.();
      }}
      isActive={isSamePage}
      {...props}
    >
      {children}
    </A>
  );
}

const A = styled(({ isActive, cssIsActive = "", ...props }) => (
  <a {...props} />
))`
  text-decoration: none;
  font-weight: 700;
  ${({ isActive, cssIsActive }) => (isActive ? cssIsActive : "")}
`;
