import React from "react";
import styles from "../styles/Home.module.scss";
import Day from "./Day";

function Month({ month }) {
  return (
    <div className={styles.month}>
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day key={idx} day={day} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Month;
