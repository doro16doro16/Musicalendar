import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlistId: null,
  playlist: null,
  library: null,
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylistId: (state, action) => {
      state.playlistId = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setLibrary: (state, action) => {
      state.library = action.payload;
    },
  },
});

export default playlistSlice.reducer;
