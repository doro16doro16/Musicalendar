import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playingTrack: "",
  isPlaying: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayingTrack: (state, action) => {
      state.playingTrack = action.payload;
    },
    setIsPlaying: (state, action) => {
      // state.isPlaying = !state.isPlaying;
      state.isPlaying = action.payload;
    },
  },
});

export default playerSlice.reducer;
