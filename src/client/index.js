import { fillJSXwithClientComponents, parseJSX } from "./utils/index.js";
import { hydrateRoot } from "react-dom/client";

[...document.querySelectorAll("html>*")]
  .filter((elem) => !elem.matches("head,body"))
  .forEach((s) => {
    s.parentNode?.removeChild(s);
  });

async function getInitialClientJSX() {
  const clientJSX = JSON.parse(
    JSON.stringify(window.__INITIAL_CLIENT_JSX_STRING__),
    parseJSX
  );
  return await fillJSXwithClientComponents(clientJSX);
}

hydrateRoot(document, await getInitialClientJSX());
