import React from "react";
import styles from "../styles/Home.module.scss";
import dayjs from "dayjs";

function Day({ day, rowIdx }) {
  const todayColor = {
    color: "rgb(110, 170, 248)",
  };
  return (
    // <div className={styles.day}>{day.format()}</div>
    <div className={styles.day}>
      <header>
        {rowIdx === 0 && <h5>{day.format("ddd").toUpperCase()}</h5>}
        {day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? (
          <p style={todayColor}>{day.format("DD")}</p>
        ) : (
          <p>{day.format("DD")}</p>
        )}
      </header>
    </div>
  );
}

export default Day;
