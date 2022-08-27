import React, { useCallback, useEffect, useState } from "react";
import { current } from "@reduxjs/toolkit";
import styles from "../styles/Home.module.scss";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { diarySlice } from "../redux/slice/diarySlice";

function Day({ day, rowIdx }) {
  const { playingTrack } = useSelector((state) => state.player);
  const { selectedDay, isShown, savedDiary, writtenDiary } = useSelector(
    (state) => state.diary
  );
  const dispatch = useDispatch();
  // RTX 직렬화 불가. ISO8601 string으로 바꾸면서 시간차 발생
  const tmp = day.add(1, "day").toJSON();

  const onClickDay = useCallback(() => {
    dispatch(diarySlice.actions.setSelectedDay(tmp));
    dispatch(diarySlice.actions.setIsShown(true));
    dispatch(
      diarySlice.actions.setWrittenDiary(savedDiary?.find((d) => d.day === tmp))
    );
  }, [savedDiary, day]);

  const todayColor = {
    color: "rgb(110, 170, 248)",
  };

  return (
    <div className={styles.day} onClick={onClickDay}>
      {rowIdx === 0 && <h5>{day.format("ddd").toUpperCase()}</h5>}
      {day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? (
        <p style={todayColor}>{day.format("DD")}</p>
      ) : (
        <p>{day.format("DD")}</p>
      )}
      {savedDiary?.find((d) => d.day === tmp) ? (
        <>
          <img src={savedDiary?.find((d) => d.day === tmp)?.image} alt="" />
          <p style={{ color: "white", zIndex: 1, position: "absolute" }}>
            {
              savedDiary
                ?.find((d) => d.day === tmp)
                ?.day.split("T")[0]
                .split("-")[2]
            }
          </p>
        </>
      ) : null}
    </div>
  );
}

export default Day;
