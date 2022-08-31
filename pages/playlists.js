import React from "react";
import Head from "next/head";
import UserInfo from "../components/UserInfo";
import styles from "../styles/Home.module.scss";
import Playlist from "../components/Playlist";

function Playlists() {
  return (
    <>
      <Head>
        <title>Musicalendar - Playlist</title>
        <meta name="description" content="Musicalendar - Playlist" />
      </Head>

      <main className={styles.flex}>
        <Playlist />
        {/* <UserInfo /> */}
      </main>
    </>
  );
}

export default Playlists;
