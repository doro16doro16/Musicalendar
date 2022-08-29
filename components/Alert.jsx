import React from "react";
import styles from "../styles/Home.module.scss";
import logo_odd from "../public/logo_odd.png";
import Image from "next/image";

function Alert({ onToggle }) {
  return (
    <div className={styles.modal__outer}>
      <div className={styles.alert}>
        <div>
          {/* <Image src={logo_odd} alt="" className={styles.logo_left} /> */}
          <img src="logo_odd.png" className={styles.logo_left} alt="" />
          <img src="logo_odd.png" className={styles.logo_right} alt="" />
        </div>
        <div>
          <p>노래를 먼저 선택해주세요.</p>
          <button onClick={onToggle}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
