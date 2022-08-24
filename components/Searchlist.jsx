import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { playlistSlice } from "../redux/slice/playlistSlice";
import useSpotify from "../hooks/useSpotify";
import styles from "../styles/Home.module.scss";
import Searchbar from "./Searchbar";
import Card from "./Card";
import Songs from "./Songs";
import { useDispatch } from "react-redux";

function Searchlist() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const spotifyApi = useSpotify();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const dispatch = useDispatch();

  // 추가
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Search
  useEffect(() => {
    if (!search) return setSearchResults([]);

    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(
        res.body.tracks.items
        // res.body.tracks.items.map((track) => {
        //   return {
        //     id: track.id,
        //     artist: track.artists[0].name,
        //     title: track.name,
        //     uri: track.uri,
        //     albumUrl: track.album.images[0].url,
        //   };
        // })
      );
    });
  }, [session, spotifyApi, search]);

  // 최신 음악
  useEffect(() => {
    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items
        // res.body.albums.items.map((album) => {
        //   return {
        //     id: album.id,
        //     artist: album.artists[0].name,
        //     title: album.name,
        //     uri: album.uri, // 음악 재생
        //     albumUrl: album.images[0].url,
        //   };
        // })
      );
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
      <h1>최신음악</h1>
      <div className={styles.searchlist__cards}>
        {searchResults.length === 0
          ? newReleases
              .slice(0, 4)
              .map((track) => <Card key={track.id} track={track} />)
          : searchResults
              .slice(0, 4)
              .map((track) => <Card key={track.id} track={track} />)}
      </div>
      <h1>인기차트</h1>
      <Songs />
    </section>
  );
}

export default Searchlist;
