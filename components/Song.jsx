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
    dispatch(playerSlice.actions.setPlayingTrack(track.track));
    if (track.track.uri === playingTrack.uri) {
      dispatch(playerSlice.actions.setIsPlaying(!isPlaying));
    }
  };
  const [hasLiked, setHasLiked] = useState(false);

  return (
    <div className={styles.song} onClick={clickPlay}>
      <div className={styles.song__left}>
        <p>{order + 1}</p>
        <img src={track.track.album.images[0].url} alt="" />
        <div>
          <span className={styles.song__name}>{track.track.name}</span>
          {/* <p className={styles.song__artists}>{track.track.artists[0].name}</p> */}
          <span className={styles.song__artists}>
            {track.track.artists.map((artist, index) => (
              <span key={artist.id}>
                {" "}
                {artist.name}
                {track.track.artists.length == index + 1 ? "" : ","}
              </span>
            ))}
          </span>
        </div>
      </div>
      <div className={styles.song__right}>
        <p>{track.track.album.name}</p>
        <div className={styles.flex}>
          <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
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
