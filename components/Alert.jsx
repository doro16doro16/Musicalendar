import React from "react";
import styles from "../styles/Home.module.scss";
import logo_odd from "../public/logo_odd.png";
import Image from "next/image";

function Alert({ onToggle }) {
  return (
    <div className={styles.alert__outer}>
      <div className={styles.alert}>
        <div>
          <img src="logo_odd.png" className={styles.logo_left} alt="" />
          <img src="logo_odd.png" className={styles.logo_right} alt="" />
        </div>
        <div>
          <p>기록할 노래를 먼저 선택해주세요.</p>
          <button onClick={onToggle}>확인</button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
