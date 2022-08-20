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
      <img src="Spotify_logo.png" alt="Spotify_logo" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Login with {provider.name}
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
