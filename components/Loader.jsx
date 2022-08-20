import { ThreeBounce } from "better-react-spinkit";
// import Image from "next/image";
import styles from "../styles/Home.module.scss";

function Loader() {
  return (
    <div className={styles.loader}>
      <span>
        <img
          src="Spotify_logo.png"
          layout="fill" // 상위 요소에 따라 이미지 크기 예약
          className="animate-pulse"
        />
      </span>
      <div>
        로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중
      </div>
      <ThreeBounce size={23} color="#15883e" />
    </div>
  );
}

export default Loader;
