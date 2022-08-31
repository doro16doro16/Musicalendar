import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { playlistSlice } from "../redux/slice/playlistSlice";
import useSpotify from "../hooks/useSpotify";
import styles from "../styles/Home.module.scss";
import Searchbar from "./Searchbar";
import Card from "./Card";
import Songs from "./Songs";
import { useDispatch } from "react-redux";
import Song from "./Song";

function Searchlist() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const spotifyApi = useSpotify();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const dispatch = useDispatch();

  // Search
  useEffect(() => {
    if (!search) return setSearchResults([]);
    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(res.body.tracks.items);
    });
  }, [session, spotifyApi, search]);

  // 최신 음악
  useEffect(() => {
    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(res.body.albums.items);
      // dispatch(playlistSlice.actions.setPlaylist(res.body));
    });
  }, [session, spotifyApi]);

  // 인기 음악
  useEffect(() => {
    spotifyApi
      .getPlaylist("37i9dQZEVXbNxXF4SkHj9F")
      .then((res) => {
        dispatch(playlistSlice.actions.setPlaylist(res.body));
      })
      .catch((err) => console.log("getPlaylist API error"));
  }, [dispatch, spotifyApi]);

  return (
    <section className={styles.searchlist}>
      <Searchbar search={search} setSearch={setSearch} />

      {searchResults.length === 0 ? (
        <>
          <h1>최신 음악</h1>
          <div className={styles.searchlist__cards}>
            {newReleases.slice(0, 4).map((track) => (
              <Card key={track.id} track={track} />
            ))}
          </div>
          <h1>인기 차트</h1>
          <Songs />
        </>
      ) : (
        <>
          <h1>상위 결과</h1>
          <div className={styles.searchlist__cards}>
            {searchResults.slice(0, 4).map((track) => (
              <Card key={track.id} track={track} />
            ))}
          </div>
          <h1>곡</h1>
          <div className={styles.songs}>
            {searchResults.slice(4, searchResults.length).map((track, i) => (
              <Song key={track.id} track={track} order={i} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Searchlist;
