import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

// function initEvents() {
//   if (typeof window !== "undefined" && localStorage.getItem("savedDiary")) {
//     return JSON.parse(storageDiary);
//   }
//   return [];
// }
const initialState = {
  selectedDay: null,
  isShown: false,
  savedDiary: [],
};

export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    setIsShown: (state, action) => {
      state.isShown = action.payload;
    },
    setSavedDiary: (state, action) => {
      state.savedDiary.push(action.payload);
    },
  },
});

export default diarySlice.reducer;
