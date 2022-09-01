import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import UserInfo from "../components/UserInfo";
import styles from "../styles/Home.module.scss";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Player from "../components/Player";
import Loader from "../components/Loader";
import Calendar from "../components/Calendar";
import Diary from "../components/Diary";
import Alert from "../components/Alert";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Home() {
  // 임시 제거
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/login");
    },
  });

  if (status === "loading") {
    return <Loader />;
  }
  const { playingTrack } = useSelector((state) => state.player);
  const { isShown, savedDiary } = useSelector((state) => state.diary);
  const [is500px, setIs500px] = useState(false);

  const resizingHandler = () => {
    if (window.innerWidth <= 500) {
      setIs500px(true);
    } else {
      setIs500px(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 500) {
      setIs500px(true);
    }
    window.addEventListener("resize", resizingHandler);
    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  }, []);

  // 모달 닫기때문에 index.js에서 함
  useEffect(() => {
    localStorage.setItem("savedDiary", JSON.stringify(savedDiary));
  }, [savedDiary]);

  return (
    <>
      <Head>
        <title>Musicalendar - Home</title>
        <meta name="description" content="Musicalendar - Home" />
      </Head>
      <>
        <div className={styles.index}>
          {!is500px || (is500px && !isShown) ? (
            <>
              <Calendar /> <UserInfo />
            </>
          ) : null}

          {isShown && playingTrack ? <Diary /> : null}
        </div>
        <Sidebar />
      </>
    </>
  );
}

// export const getServerSideProps = async (context) => {
//   // 페이지를 렌더링하기전에 반드시 fetch 해야할 데이터가 있을 때 사용
//   // 매 페이지 요청시마다 호출되므로 getStaticProps보다 느리지만, 빌드 이후에도 페이지 요청마다 실행
//   // pre-rendering the user on the server which will give us the access token
//   // before it hits the client
//   const session = await getSession(context);
//   return {
//     props: { session },
//   };
// };
export default Home;
