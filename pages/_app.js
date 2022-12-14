import "../styles/globals.scss";
import React, { useEffect, useState } from "react";

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { signOut, useSession } from "next-auth/react";

import Head from "next/head";
import { store } from "../redux/store";
import Player from "../components/Player";
import MetaDecorator from "../components/Util/MetaDecorator";
const content = require("../variables/content.json");

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    return () => {
      signOut({ callbackUrl: "https://musicalendar.vercel.app/login" });
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <MetaDecorator
          title={content.title}
          description={content.description}
          imageUrl={content.imageUrl}
          imageAlt={content.imageAlt}
          domain={content.domain}
        />
      </Head>
      <SessionProvider session={pageProps.session}>
        <ReduxProvider store={store}>
          <Component {...pageProps} />
          <Player />
        </ReduxProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
