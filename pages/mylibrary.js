import React from "react";
import Head from "next/head";
import UserInfo from "../components/UserInfo";
import styles from "../styles/Home.module.scss";
import Library from "../components/Library";
import Sidebar from "../components/Sidebar";

function MyLibrary() {
  return (
    <>
      <Head>
        <title>Musicalendar - Library</title>
        <meta name="description" content="Musicalendar - MyLibrary" />
      </Head>

      <main className={styles.flex}>
        <UserInfo />
        <Library />
      </main>
      <Sidebar />
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
export default MyLibrary;
