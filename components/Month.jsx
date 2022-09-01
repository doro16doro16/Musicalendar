import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./Alert";
import Day from "./Day";
import styles from "../styles/Home.module.scss";

function Month({ month }) {
  return (
    <>
      <div className={styles.month}>
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day key={idx} day={day} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default Month;
