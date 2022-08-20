import Head from "next/head";
import React, { useEffect } from "react";
import UserInfo from "../components/UserInfo";
import Searchlist from "../components/Searchlist";
import styles from "../styles/Home.module.scss";
import Playlist from "../components/Playlist";
import Songs from "../components/Songs";
import Player from "../components/Player";
import playerSlice from "../redux/slice/playerSlice";

function Search() {
  return (
    <>
      <Head>
        <title>Musicalendar - Search</title>
        <meta name="description" content="Musicalendar - Home" />
      </Head>
      <main className={styles.flex}>
        <UserInfo />
        <Searchlist />
      </main>
    </>
  );
}

export default Search;
