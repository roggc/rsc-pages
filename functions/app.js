import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import { fillJSXwithClientComponents } from "../src/client/utils/index.js";
import Router from "../src/server/components/router.js";
import {
  renderJSXToClientJSX,
  stringifyJSX,
} from "../src/server/utils/index.js";
import React from "react";
import uaParser from "ua-parser-js";
import serverless from "serverless-http";

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/favicon.ico", (req, res, next) => {
  res.end("");
});

async function getJSX(url, req, deviceType) {
  const clientJSX = await renderJSXToClientJSX(
    <Router url={url} body={req.body} deviceType={deviceType} />
  );
  return {
    clientJSX,
    clientJSXString: JSON.stringify(clientJSX, stringifyJSX),
  };
}

app.use(async (req, res, next) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname === "/") {
      const userAgent = new uaParser(req.headers["user-agent"]);
      const { type } = userAgent.getDevice();
      const { clientJSX, clientJSXString } = await getJSX(
        url,
        req,
        type ?? "desktop"
      );
      const fixedJSX = await fillJSXwithClientComponents(clientJSX);
      const bootstrapScriptContent = `window.__INITIAL_CLIENT_JSX_STRING__ = ${clientJSXString};`;
      const { pipe } = renderToPipeableStream(fixedJSX, {
        bootstrapModules: ["src/client/index.js"],
        bootstrapScriptContent,
        onShellReady() {
          res.setHeader("content-type", "text/html");
          pipe(res);
        },
      });
    } else {
      const { clientJSXString } = await getJSX(url, req);
      res.setHeader("Content-Type", "application/json");
      res.end(clientJSXString);
    }
  } catch (err) {
    next(err);
  }
});

app.use(function (err, req, res) {
  console.error(err);
  res.status(err.status || 500);
  res.end();
});

export const handler = serverless(app);
