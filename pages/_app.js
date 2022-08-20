import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import Head from "next/head";
import { store } from "../redux/store";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
import useSpotify from "../hooks/useSpotify";

function MyApp({ Component, pageProps }) {
  // // 추가
  // useEffect(() => {
  //   if (!accessToken) return;
  //   spotifyApi.setAccessToken(accessToken);
  // }, [accessToken]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <ReduxProvider store={store}>
          <Component {...pageProps} />
          <Sidebar />
          <Player />
        </ReduxProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
