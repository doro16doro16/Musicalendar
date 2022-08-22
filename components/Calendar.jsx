import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Month from "./Month";
import styles from "../styles/Home.module.scss";
import CalendarHeader from "./CalendarHeader";

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
  const [monthIndex, setMonthIndex] = useState(0);

  useEffect(() => {
    setCurrentMatrix(getMatrix(monthIndex));
  }, [monthIndex]);

  return (
    <div className={styles.calendar}>
      <CalendarHeader />
      <div>
        <Month month={currenMatrix} />
      </div>
    </div>
  );
}

export default Calendar;
