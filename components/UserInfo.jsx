import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import styles from "../styles/Home.module.scss";
import { BsChevronDown } from "react-icons/bs";

function UserInfo() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  return (
    <header className={styles.userInfo}>
      <div
        onClick={() =>
          signOut({ callbackUrl: "https://musicalendar.vercel.app/login" })
        }
      >
        <img src={session?.user.image} alt="" />
        <p>{session?.user.name}</p>
        <BsChevronDown className={styles.icon} />
      </div>
    </header>
  );
}

export default UserInfo;
