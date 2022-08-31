import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlistId: "37i9dQZEVXbNxXF4SkHj9F",
  playlist: null,
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
  },
});

export default playlistSlice.reducer;
