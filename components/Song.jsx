import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { millisToMinutesAndSeconds } from "../lib/time";
import styles from "../styles/Home.module.scss";
import { AiFillHeart } from "react-icons/ai";
import { playerSlice } from "../redux/slice/playerSlice";

function Song({ track, order }) {
  const { playingTrack, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const clickPlay = () => {
    dispatch(playerSlice.actions.setPlayingTrack(track));
    if (track.uri === playingTrack.uri) {
      dispatch(playerSlice.actions.setIsPlaying(!isPlaying));
    }
  };
  const [hasLiked, setHasLiked] = useState(false);

  return (
    <div className={styles.song}>
      <div className={styles.song__left} onClick={clickPlay}>
        <p>{order + 1}</p>
        <img src={track.album.images[0].url} alt="" />
        <div>
          <span className={styles.song__name}>{track.name}</span>
          <span className={styles.song__artists}>
            {track.artists.map((artist, index) => (
              <span key={artist.id}>
                {" "}
                {artist.name}
                {track.artists.length == index + 1 ? "" : ","}
              </span>
            ))}
          </span>
        </div>
      </div>
      <div className={styles.song__right}>
        <p onClick={clickPlay}>{track.album.name}</p>
        <div className={styles.flex}>
          <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
          {hasLiked ? (
            <AiFillHeart
              className={styles.fillheart}
              onClick={() => setHasLiked(!hasLiked)}
            />
          ) : (
            <AiFillHeart
              className={styles.emptyheart}
              onClick={() => setHasLiked(!hasLiked)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Song;
