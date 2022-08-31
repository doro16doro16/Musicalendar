import React, { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useDispatch, useSelector } from "react-redux";
import { playlistSlice } from "../redux/slice/playlistSlice";
import styles from "../styles/Home.module.scss";
import { FastAverageColor } from "fast-average-color";
import Songs from "./Songs";
import { useSession } from "next-auth/react";
import Player from "./Player";

function Playlist() {
  const { playlist, playlistId } = useSelector((state) => state.playlist);
  const [color, setColor] = useState(null);
  const dispatch = useDispatch();
  const spotifyApi = useSpotify();

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((res) => {
        dispatch(playlistSlice.actions.setPlaylist(res.body));
        const fac = new FastAverageColor();
        fac
          .getColorAsync(res.body.images?.[0]?.url)
          .then((color) => {
            setColor(color.hex);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((err) => console.log("getPlaylist API error"));
  }, [dispatch, spotifyApi, playlistId]);

  return (
    <>
      <div className={styles.playlist}>
        <section
          className={styles.playlist__cover}
          style={{
            backgroundImage: `linear-gradient(to bottom, ${color}, 70%, black)`,
          }}
        >
          <img src={playlist?.images?.[0]?.url} alt="" />
          <div>
            <p>PLAYLIST</p>
            <h1>{playlist?.name}</h1>
            <p>{playlist?.description}</p>
            <p>
              좋아요 {playlist?.followers.total} 개 &#183;{" "}
              {playlist?.tracks.total} 곡
            </p>
          </div>
        </section>

        <Songs />
      </div>
    </>
  );
}

export default Playlist;
