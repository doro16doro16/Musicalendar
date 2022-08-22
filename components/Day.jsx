import React from "react";
import styles from "../styles/Home.module.scss";

function Day({ day, rowIdx }) {
  return (
    <div>{day.format()}</div>
    // <div className={styles.day}>
    //   <header>
    //     {rowIdx === 0 && <p>{day.format("ddd").toUpperCase()}</p>}
    //     <p>{day.format("DD")}</p>
    //   </header>
    // </div>
  );
}

export default Day;
