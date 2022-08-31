import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { playlistSlice } from "../redux/slice/playlistSlice";
import Link from "next/link";

function Album({ playlist }) {
  const dispatch = useDispatch();

  const onClickAlbum = useCallback(() => {
    dispatch(playlistSlice.actions.setPlaylistId(playlist.id));
  }, []);

  return (
    <div onClick={onClickAlbum}>
      <Link href="/playlists">
        <img src={playlist.images[0]?.url} alt="" />
      </Link>
      <p>{playlist.name}</p>
      <p>{playlist.description}</p>
    </div>
  );
}

export default Album;
