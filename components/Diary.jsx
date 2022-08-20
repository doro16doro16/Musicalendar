import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { playerSlice } from "../redux/slice/playerSlice";
import { FastAverageColor } from "fast-average-color";
import styles from "../styles/Home.module.scss";

function Diary() {
  const { playingTrack, isPlaying } = useSelector((state) => state.player);
  const [color, setColor] = useState("rgb(0,0,0");
  const diaryColor = {
    backgroundImage: `linear-gradient( ${color} 50%, rgb(240,240,240) 50%)`,
  };

  useEffect(() => {
    if (playingTrack?.images) {
      const fac = new FastAverageColor();
      fac
        .getColorAsync(playingTrack.images[0]?.url)
        .then((color) => {
          console.log(color);
          setColor(color.hexa);
        })
        .catch((e) => {
          console.error(e);
        });
    }
    if (playingTrack?.album) {
      const fac = new FastAverageColor();
      fac
        .getColorAsync(playingTrack.album.images[0]?.url)
        .then((color) => {
          setColor(color.hexa);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [playingTrack]);
  return (
    <div className={styles.diary} style={diaryColor}>
      <div className={styles.diary__img}>
        {/* 나중에 보호연산 뺄 것 */}
        {playingTrack?.images && (
          <img src={playingTrack?.images[0]?.url} alt="" />
        )}
        {playingTrack?.album && (
          <img src={playingTrack?.album.images[0]?.url} alt="" />
        )}
      </div>
      <div className={styles.diary__txt}>
        <h4>{playingTrack?.name}</h4>
        {playingTrack?.artists?.map((artist, i) => (
          <span key={artist.id}>
            {artist.name}
            {playingTrack?.artists.length === i + 1 ? "" : ", "}
          </span>
        ))}
      </div>
      <textarea placeholder="내용을 입력하세요.">
        {/* Hello there, this is some text in a text area Hello there, this is some
        text in a text areaHello there, this is some text in a text areaHello
        there, this is some text in a text areaHello there, this is some text in
        a text areaHello there, this is some text in a te */}
      </textarea>
    </div>
  );
}

export default Diary;
