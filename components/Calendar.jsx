import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import Month from "./Month";
import styles from "../styles/Home.module.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { diarySlice } from "../redux/slice/diarySlice";

function Calendar() {
  const getMatrix = (month = dayjs().month()) => {
    const year = dayjs().year();
    // const firstDay = dayjs(dayjs()).startOf("M");
    // let currentMonthCount = 0 - firstDay.day();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const daysMatrix = new Array(5).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        currentMonthCount++;
        // return dayjs(firstDay).add(currentMonthCount, "d");
        return dayjs(new Date(year, month, currentMonthCount));
      });
    });

    return daysMatrix;
  };

  const [currenMatrix, setCurrentMatrix] = useState(getMatrix());
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const dispatch = useDispatch();

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleTodayMonth() {
    setMonthIndex(dayjs().month());
  }
  // 감상기록
  // const onClickWriteBtn = useCallback(() => {
  //   dispatch(diarySlice.actions.setSelectedDay(dayjs().toJSON()));
  // });
  useEffect(() => {
    setCurrentMatrix(getMatrix(monthIndex));
  }, [monthIndex]);

  return (
    <div className={styles.calendar}>
      <h1>Musicalendar</h1>
      <header>
        <button onClick={handleTodayMonth}>Today</button>
        {/* <button onClick={onClickWriteBtn}>감상 기록 +</button> */}
        <div>
          <button onClick={handlePrevMonth}>
            <BsChevronLeft />
          </button>
          <h2>
            {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
          </h2>
          <button onClick={handleNextMonth}>
            <BsChevronRight />
          </button>
        </div>
      </header>
      <Month month={currenMatrix} />
    </div>
  );
}

export default Calendar;
