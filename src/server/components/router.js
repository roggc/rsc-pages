import React from "react";
import Greeting from "./greeting.js";
import theme from "../../client/theme.js";
import RCC from "./rcc.js";

const title = "My app";

export default async function Router({ url, body: { props } }) {
  switch (url.pathname.slice(1)) {
    case "":
      return (
        <RCC __isClient__="../components/theme-provider.js" theme={theme}>
          <RCC __isClient__="../slices.js">
            <RCC __isClient__="../components/layout.js" title={title} />
          </RCC>
        </RCC>
      );
    case "greeting":
      return <Greeting {...props} />;
    case "how":
      return <RCC __isClient__="../components/how.js" {...props} />;
    case "is-client-prop":
      return <RCC __isClient__="../components/is-client-prop.js" />;
    case "download-and-install":
      return <RCC __isClient__="../components/download-and-install.js" />;
    case "react-suspense":
      return <RCC __isClient__="../components/react-suspense.js" />;
    default:
      return <RCC />;
  }
}
