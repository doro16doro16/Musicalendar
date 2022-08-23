import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Month from "./Month";
import styles from "../styles/Home.module.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function Calendar() {
  const getMatrix = (month = dayjs().month()) => {
    month = Math.floor(month);
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

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  useEffect(() => {
    setCurrentMatrix(getMatrix(monthIndex));
  }, [monthIndex]);

  return (
    <div className={styles.calendar}>
      <header>
        <button>Today</button>
        <BsChevronLeft onClick={handlePrevMonth} />
        <h2>
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
        <BsChevronRight onClick={handleNextMonth} />
      </header>
      <Month month={currenMatrix} />
    </div>
  );
}

export default Calendar;
