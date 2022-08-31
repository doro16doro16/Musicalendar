import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "./slice/playlistSlice";
import playerReducer from "./slice/playerSlice";
import diaryReducer from "./slice/diarySlice";

export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    player: playerReducer,
    diary: diaryReducer,
  },
});
