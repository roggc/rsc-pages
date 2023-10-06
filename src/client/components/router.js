import React from "react";
import Home from "./home";
import Ups from "./ups";
import { useSlice } from "../slices";

export default function Router() {
  const [page] = useSlice("page");

  switch (page.name) {
    case "home":
      return <Home {...page.props} />;
    case "how":
      return null;
    case "is-client-prop":
      return null;
    case "download-and-install":
      return null;
    case "react-suspense":
      return null;
    case "eject":
      return null;
    case "dotenv-ready":
      return null;
    default:
      return <Ups />;
  }
}
