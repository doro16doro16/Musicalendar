import React, { useCallback, useEffect, useMemo, useState } from "react";
import { playlistSlice } from "../redux/slice/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import Album from "./Album";

function Library() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const { library } = useSelector((state) => state.playlist);
  const dispatch = useDispatch();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        dispatch(playlistSlice.actions.setLibrary(data.body.items));
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className={styles.library}>
      <h1>플레이리스트</h1>
      <div>
        {library?.map((playlist) => (
          <Album key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}

export default Library;
