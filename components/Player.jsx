import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpotifyWebPlayer from "react-spotify-web-playback";
import useSpotify from "../hooks/useSpotify";
import styles from "../styles/Home.module.scss";
import { playerSlice } from "../redux/slice/playerSlice";
import { useSession } from "next-auth/react";

function Player() {
  const { playingTrack, isPlaying } = useSelector((state) => state.player);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const accessToken = session?.user.accessToken;

  useEffect(() => {
    if (playingTrack) {
      dispatch(playerSlice.actions.setIsPlaying(true));
    }
  }, [playingTrack]);

  if (!accessToken) return null;

  return (
    <section className={styles.player}>
      <SpotifyWebPlayer
        styles={{
          activeColor: "#fff",
          bgColor: "#181818",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
          height: "70px",
          sliderTrackColor: "#535353",
          sliderTrackBorderRadius: "4px",
          sliderHandleColor: "#fff",
          errorColor: "#fff",
        }}
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          // setPlay(state.isPlaying);
          dispatch(playerSlice.actions.setIsPlaying(state.isPlaying));
        }}
        play={isPlaying}
        uris={playingTrack.uri ? [playingTrack.uri] : []} // uris string | string[]
        // uris={trackUri ? [trackUri] : []} // uris string | string[]
        magnifySliderOnHover={true}
        autoPlay={true}
      />
    </section>
  );
}

export default Player;
