import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BiSearch, BiLibrary } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import styles from "../styles/Home.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { playlistSlice } from "../redux/slice/playlistSlice";
import Player from "./Player";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  // const [isHide, setIsHide] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
        // setIsHide(true);
      });
    }
  }, [session, spotifyApi]);

  return (
    <>
      <div className={styles.sidebar}>
        <Link href="/">
          <button>
            <AiFillHome className={styles.icon} />
            <p className={styles.home__text}>홈</p>
          </button>
        </Link>
        <Link href="/search">
          <button>
            <BiSearch className={styles.icon} />
            <p>검색하기</p>
          </button>
        </Link>
        <Link href="/library">
          <button>
            <BiLibrary className={styles.icon} />
            <p>내 라이브러리</p>
          </button>
        </Link>
        <hr />

        {/* Playlists... */}
        {playlists.map((playlist) => (
          <Link href="/library">
            <p
              key={playlist.id}
              className={styles.sidebar__playlist}
              onClick={() =>
                dispatch(playlistSlice.actions.setPlaylistId(playlist.id))
              }
            >
              {playlist.name}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
