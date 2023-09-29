import React from "react";
import styled from "styled-components";
import DesktopLayout from "./desktop-layout.js";
import MobileLayout from "./mobile-layout.js";
import { useDeviceContext } from "../device-context.js";

export default function Layout({ title }) {
  const deviceType = useDeviceContext();
  const isMobileOrTablet = deviceType === "mobile" || deviceType === "tablet";
  const importmap = {
    imports: {
      "react-markdown": "https://esm.sh/react-markdown@7?bundle",
    },
  };
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="LPtzC0bUz5hkUwD8Bh0WFWV1SE4ROetaF3O-jKx2Bpo"
        />
        <title>{title}</title>
        <style
          dangerouslySetInnerHTML={{ __html: "p{margin:0px;} body{margin:0;}" }}
        />
      </head>
      <Body>
        {isMobileOrTablet ? <MobileLayout /> : <DesktopLayout />}
        <script
          type="importmap"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(importmap) }}
        />
      </Body>
    </html>
  );
}

const Body = styled.body`
  font-family: sans-serif;
`;
