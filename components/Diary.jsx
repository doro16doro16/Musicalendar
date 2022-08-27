import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerSlice } from "../redux/slice/playerSlice";
import { diarySlice } from "../redux/slice/diarySlice";
import { FastAverageColor } from "fast-average-color";
import { AiOutlineClose, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import styles from "../styles/Home.module.scss";

function Diary() {
  const { playingTrack, isPlaying } = useSelector((state) => state.player);
  const { selectedDay, isShown, isEditable, savedDiary, writtenDiary } =
    useSelector((state) => state.diary);
  function getImageUrl() {
    if (writtenDiary && !isEditable) {
      return writtenDiary.image;
    }
    if (playingTrack?.images) {
      return playingTrack.images[0]?.url;
    }
    if (playingTrack?.album) {
      return playingTrack.album.images[0]?.url;
    }
  }
  const dispatch = useDispatch();
  const textRef = useRef(null);
  const [color, setColor] = useState("rgb(0,0,0");
  const [image, setImage] = useState(getImageUrl()); // 먼저 초기화 후 색깔 바꾸기
  const [name, setName] = useState(
    writtenDiary && !isEditable ? writtenDiary.name : playingTrack?.name
  );
  const [artists, setArtists] = useState(
    writtenDiary && !isEditable
      ? writtenDiary.artists
      : playingTrack?.artists?.map((artist, i) =>
          playingTrack.artists.length === i + 1
            ? artist.name
            : artist.name + ",\u00A0"
        )
  );
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  const onClose = useCallback(() => {
    dispatch(diarySlice.actions.setIsShown(false));
  });

  const onEdit = useCallback(() => {
    dispatch(diarySlice.actions.setIsEditable(true));
  });

  const onDelete = useCallback(() => {
    dispatch(diarySlice.actions.deleteDiary(writtenDiary));
    dispatch(diarySlice.actions.setIsShown(false));
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const savedForm = {
        id: writtenDiary ? writtenDiary.id : Date.now(),
        day: selectedDay,
        image,
        name,
        artists,
        content: textRef.current.value,
      };
      if (writtenDiary) {
        dispatch(diarySlice.actions.updateDiary(savedForm));
      } else {
        dispatch(diarySlice.actions.pushDiary(savedForm));
      }
      dispatch(diarySlice.actions.setIsShown(false));
      dispatch(diarySlice.actions.setIsEditable(false));

      console.log("savedForm", savedForm);
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
    textRef.current.value = writtenDiary ? writtenDiary.content : "";

    autoScroll(scrollRef1, 50);
    autoScroll(scrollRef2, 35);
    const fac = new FastAverageColor();
    fac
      .getColorAsync(image)
      .then((color) => {
        setColor(color.hexa);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [playingTrack]);

  return (
    <div className={styles.modal__outer}>
      <div className={styles.diary} style={diaryColor}>
        <p>
          {writtenDiary && <AiOutlineEdit onClick={onEdit} />}
          {writtenDiary && <AiOutlineDelete onClick={onDelete} />}
          <AiOutlineClose onClick={onClose} />
        </p>
        <form>
          <div className={styles.diary__txt}>
            <h3>{selectedDay?.split("T")[0]}</h3>
          </div>
          <div className={styles.diary__img}>
            {/* 나중에 보호연산 뺄 것 */}

            <img src={image} alt="" />
          </div>

          <div className={styles.diary__txt} ref={scrollRef1}>
            <h4>{name}</h4>
          </div>
          <div className={styles.diary__txt} ref={scrollRef2}>
            <span>{artists}</span>
          </div>

          <textarea
            placeholder="내용을 입력하세요."
            ref={textRef}
            id="content"
            name="content"
            maxLength="500"
            required
            {...(writtenDiary && !isEditable
              ? { disabled: true }
              : { disabled: false })}
          />
          {!writtenDiary || isEditable ? (
            <button type="submit" onClick={onSubmit}>
              저장
            </button>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default Diary;
