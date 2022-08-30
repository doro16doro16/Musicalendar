import React, { useEffect } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";
import Loader from "../components/Loader";

function login({ providers }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  if (session) return <Loader />;

  return (
    <div className={styles.login}>
      <div className={styles.logo}>
        <img src="logo_odd.png" className={styles.logo_left} alt="" />
        <img src="logo_odd.png" className={styles.logo_right} alt="" />
      </div>
      <h1>Musicalendar</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            {provider.name} 로 시작하기
          </button>
        </div>
      ))}
    </div>
  );
}

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
