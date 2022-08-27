import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./Alert";
import Day from "./Day";
import styles from "../styles/Home.module.scss";

function Month({ month }) {
  const { playingTrack } = useSelector((state) => state.player);
  const [alert, setAlert] = useState(false);

  const onClickMonth = useCallback(() => {
    if (playingTrack) {
      setAlert(false);
    } else {
      setAlert(true);
    }
  }, [playingTrack]);

  const onToggle = useCallback(() => {
    setAlert((prev) => !prev);
  }, []);

  return (
    <>
      <div className={styles.month} onClick={onClickMonth}>
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day key={idx} day={day} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
      </div>
      {alert && <Alert onToggle={onToggle} />}
    </>
  );
}

export default Month;
