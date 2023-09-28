import React from "react";
import Greeting from "./greeting.js";
import theme from "../../client/theme.js";
import RCC from "./rcc.js";

const title = "My app";

export default async function Router({ url, body: { props }, deviceType }) {
  switch (url.pathname.slice(1)) {
    case "":
      return (
        <RCC __isClient__="device-context" value={deviceType}>
          <RCC __isClient__="components/theme-provider" theme={theme}>
            <RCC __isClient__="slices">
              <RCC __isClient__="components/layout" title={title} />
            </RCC>
          </RCC>
        </RCC>
      );
    case "greeting":
      return <Greeting {...props} />;
    case "how":
      return <RCC __isClient__="components/how" {...props} />;
    case "is-client-prop":
      return <RCC __isClient__="components/is-client-prop" />;
    case "download-and-install":
      return <RCC __isClient__="components/download-and-install" />;
    case "react-suspense":
      return <RCC __isClient__="components/react-suspense" />;
    default:
      return <RCC />;
  }
}
