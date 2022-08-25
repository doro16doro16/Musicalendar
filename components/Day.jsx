import React, { useCallback } from "react";
import styles from "../styles/Home.module.scss";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { diarySlice } from "../redux/slice/diarySlice";

function Day({ day, rowIdx }) {
  const { selectedDay, isShown } = useSelector((state) => state.diary);
  const dispatch = useDispatch();
  const tmp = day.add(1, "day").toJSON();
  // RTX 직렬화 불가. ISO8601 string으로 바꾸면서 시간차 발생
  const onClickDay = useCallback(() => {
    dispatch(diarySlice.actions.setSelectedDay(tmp));
    dispatch(diarySlice.actions.setIsShown(true));
  }, [day]);

  const todayColor = {
    color: "rgb(110, 170, 248)",
  };
  return (
    // <div className={styles.day}>{day.format()}</div>
    <div className={styles.day} onClick={onClickDay}>
      {rowIdx === 0 && <h5>{day.format("ddd").toUpperCase()}</h5>}
      {day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? (
        <p style={todayColor}>{day.format("DD")}</p>
      ) : (
        <p>{day.format("DD")}</p>
      )}
    </div>
  );
}

export default Day;
