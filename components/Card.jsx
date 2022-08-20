import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Home.module.scss";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { playerSlice } from "../redux/slice/playerSlice";
import { FastAverageColor } from "fast-average-color";

function Card({ track }) {
  const { playingTrack, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const clickPlay = () => {
    dispatch(playerSlice.actions.setPlayingTrack(track));
    if (track.uri === playingTrack.uri) {
      dispatch(playerSlice.actions.setIsPlaying(!isPlaying));
    }
  };
  return (
    <div className={styles.card} onClick={clickPlay}>
      {track.images && <img src={track.images[0]?.url} alt="" />}
      {track.album && <img src={track.album.images[0]?.url} alt="" />}

      <div className={styles.card__description}>
        <div className={styles.circle__white}>
          {track.uri === playingTrack.uri && isPlaying ? (
            <BsFillPauseFill className={styles.pause} />
          ) : (
            <BsFillPlayFill className={styles.play} />
          )}
        </div>
        <div>
          <h4>{track.name}</h4>
          {/* <h4>{track.artists[0].name}</h4> */}
          {track.artists.map((artist, i) => (
            <span key={artist.id}>
              {artist.name}
              {track.artists.length === i + 1 ? "" : ", "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
