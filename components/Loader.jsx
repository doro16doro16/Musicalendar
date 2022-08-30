import { ThreeBounce } from "better-react-spinkit";
import styles from "../styles/Home.module.scss";

function Loader() {
  return (
    <div className={styles.login}>
      <div className={styles.logo}>
        <img src="logo_odd.png" className={styles.logo_left} alt="" />
        <img src="logo_odd.png" className={styles.logo_right} alt="" />
      </div>
      <h1>Loading...</h1>
      <ThreeBounce size={23} color="#6EAAF8" />
    </div>
  );
}

export default Loader;
