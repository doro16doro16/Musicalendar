import React, { useCallback, useEffect, useState } from "react";
import { current } from "@reduxjs/toolkit";
import styles from "../styles/Home.module.scss";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { diarySlice } from "../redux/slice/diarySlice";
import Alert from "./Alert";

function Day({ day, rowIdx }) {
  const { playingTrack } = useSelector((state) => state.player);
  const { selectedDay, isShown, savedDiary, writtenDiary } = useSelector(
    (state) => state.diary
  );
  const [alert, setAlert] = useState(false);

  const dispatch = useDispatch();
  // RTX 직렬화 불가. ISO8601 string으로 바꾸면서 시간차 발생
  const tmp = day.add(1, "day").toJSON();

  const onToggle = useCallback(() => {
    setAlert((prev) => !prev);
  }, []);

  const onClickDay = useCallback(() => {
    if (!playingTrack) {
      setAlert(true);
    } else {
      setAlert(false);
      dispatch(diarySlice.actions.setSelectedDay(tmp));
      dispatch(diarySlice.actions.setIsShown(true));
      dispatch(
        diarySlice.actions.setWrittenDiary(
          savedDiary?.find((d) => d.day === tmp)
        )
      );
    }
  }, [savedDiary, day, playingTrack]);

  const todayColor = {
    color: "rgb(110, 170, 248)",
  };

  return (
    <>
      <div className={styles.day} onClick={onClickDay}>
        <div>
          {rowIdx === 0 && <h5>{day.format("ddd").toUpperCase()}</h5>}
          {day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? (
            <p style={todayColor}>{day.format("DD")}</p>
          ) : (
            <p>{day.format("DD")}</p>
          )}

          {savedDiary?.find((d) => d.day === tmp) ? (
            <>
              <img src={savedDiary?.find((d) => d.day === tmp)?.image} alt="" />
              <p
                style={{
                  color: "white",
                  zIndex: 0,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
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
      </div>
      {alert && <Alert onToggle={onToggle} />}
    </>
  );
}

export default Day;
