import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerSlice } from "../redux/slice/playerSlice";
import { diarySlice } from "../redux/slice/diarySlice";
import { FastAverageColor } from "fast-average-color";
import { AiOutlineClose } from "react-icons/ai";
import styles from "../styles/Home.module.scss";

function Diary() {
  const { playingTrack, isPlaying } = useSelector((state) => state.player);
  const { selectedDay, isShown, savedDiary } = useSelector(
    (state) => state.diary
  );
  const dispatch = useDispatch();
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("rgb(0,0,0");
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  const onClose = useCallback(() => {
    dispatch(diarySlice.actions.setIsShown(false));
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const savedForm = {
        id: Date.now(),
        day: selectedDay,
        image,
        name: playingTrack?.name,
        artists: playingTrack?.artists[0]?.name, // 임시
        content,
      };
      dispatch(diarySlice.actions.setSavedDiary(savedForm));
      dispatch(diarySlice.actions.setIsShown(false));
      console.log("눌림");
      console.log(savedForm);
    },
    [playingTrack, selectedDay]
  );
  const autoScroll = (scrollRef, time) => {
    console.log("test", scrollRef?.current);
    let intervalId = setInterval(() => {
      if (Math.floor(scrollRef?.current?.scrollWidth) === 332) {
        clearInterval(intervalId);
      }
      scrollRef?.current?.scrollTo(scrollRef?.current?.scrollLeft + 1, 0);
      // console.log("체크");
      if (
        Math.floor(
          scrollRef?.current?.scrollWidth - scrollRef?.current?.scrollLeft
        ) === 332
      ) {
        clearInterval(intervalId);
        scrollRef?.current?.scrollTo(scrollRef?.current?.scrollLeft - 1000, 0);
      }
    }, time);
  };

  const diaryColor = {
    backgroundImage: `linear-gradient( ${color} 48%, rgb(240,240,240) 48% 100%)`,
  };

  useEffect(() => {
    localStorage.setItem("savedDiary", JSON.stringify(savedDiary));
  }, [savedDiary]);

  useEffect(() => {
    autoScroll(scrollRef1, 50);
    autoScroll(scrollRef2, 35);
    if (playingTrack?.images) {
      const fac = new FastAverageColor();
      fac
        .getColorAsync(playingTrack.images[0]?.url)
        .then((color) => {
          console.log(color);
          setColor(color.hexa);
          setImage(playingTrack.images[0]?.url);
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
          setImage(playingTrack.album.images[0]?.url);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [playingTrack]);

  return (
    <div className={styles.diary} style={diaryColor}>
      <p>
        <AiOutlineClose onClick={onClose} />
      </p>
      <form>
        <div className={styles.diary__txt}>
          <h3>{selectedDay?.split("T")[0]}</h3>
        </div>
        <div className={styles.diary__img}>
          {/* 나중에 보호연산 뺄 것 */}
          {playingTrack?.images && (
            <img src={playingTrack?.images[0]?.url} alt="" />
          )}
          {playingTrack?.album && (
            <img src={playingTrack?.album.images[0]?.url} alt="" />
          )}
        </div>

        <div className={styles.diary__txt} ref={scrollRef1}>
          <h4>{playingTrack?.name}</h4>
        </div>
        <div className={styles.diary__txt} ref={scrollRef2}>
          <span>
            {playingTrack?.artists?.map((artist, i) =>
              playingTrack.artists.length === i + 1
                ? artist.name
                : artist.name + ",\u00A0"
            )}
          </span>
        </div>

        <textarea
          placeholder="내용을 입력하세요."
          name="content"
          value={content}
          maxLength="500"
          requiredss
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" onClick={onSubmit}>
          저장
        </button>
      </form>
    </div>
  );
}

export default Diary;
