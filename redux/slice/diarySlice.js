import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

function initEvent() {
  if (typeof window !== "undefined" && localStorage.getItem("savedDiary")) {
    return JSON.parse(localStorage.getItem("savedDiary"));
  }
  return [];
}
const initialState = {
  selectedDay: dayjs().toJSON(),
  isShown: false,
  savedDiary: initEvent(),
  writtenDiary: null,
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
    pushDiary: (state, action) => {
      state.savedDiary.push(action.payload);
    },
    updateDiary: (state, action) => {
      state.savedDiary.map((x) =>
        x.id === action.payload.id ? action.payload : x
      );
    },
    deleteDiary: (state, action) => {
      state.savedDiary.filter((x) => x.id !== action.payload.id);
    },
    setWrittenDiary: (state, action) => {
      state.writtenDiary = state.savedDiary.find(
        (x) => x.day === action.payload
      );
    },
  },
});

export default diarySlice.reducer;
