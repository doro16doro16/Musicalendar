import React from "react";
import { useSelector } from "react-redux";
import Song from "./Song";
import styles from "../styles/Home.module.scss";

function Songs() {
  const { playlist } = useSelector((state) => state.playlist);

  return (
    <div className={styles.songs}>
      {playlist?.tracks.items.map((track, i) => (
        <Song key={track.track.id} track={track.track} order={i} />
      ))}
    </div>
  );
}

export default Songs;
