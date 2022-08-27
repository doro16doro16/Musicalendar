import React from "react";
import styles from "../styles/Home.module.scss";
import Logo from "../public/Spotify_logo.png";

function Alert({ onToggle }) {
  return (
    <div className={styles.modal__outer}>
      <div className={styles.alert}>
        <img
          src="Spotify_logo.png"
          layout="fill" // 상위 요소에 따라 이미지 크기 예약
          className="animate-pulse"
        />
        <p>노래를 먼저 선택해주세요.</p>
        <button onClick={onToggle}>Close</button>
      </div>
    </div>
  );
}

export default Alert;
