import { createSlice, current } from "@reduxjs/toolkit";
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
  isEditable: false,
  savedDiary: initEvent(),
  writtenDiary: {},
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
    setIsEditable: (state, action) => {
      state.isEditable = action.payload;
    },
    pushDiary: (state, action) => {
      state.savedDiary.push(action.payload);
    },
    updateDiary: (state, action) => {
      state.savedDiary = state.savedDiary.map((x) =>
        x.id === action.payload.id ? action.payload : x
      );
    },
    deleteDiary: (state, action) => {
      state.savedDiary = state.savedDiary.filter(
        (x) => x.id !== action.payload.id
      );
    },
    setWrittenDiary: (state, action) => {
      state.writtenDiary = action.payload;
    },
  },
});

export default diarySlice.reducer;
