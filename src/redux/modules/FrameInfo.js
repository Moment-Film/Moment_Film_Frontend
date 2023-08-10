import { createSlice } from "@reduxjs/toolkit";

// 초기값 설정
const initialState = {
  color: { h: 180, s: 100, l: 100 },
  backgroundImg: 'none'
};

const FrameSlice = createSlice({
  name: 'Frame',
  initialState,
  reducers: {
    SetFrameColor: (state, action) => {
      console.log(action.payload);
      return { ...state, color: action.payload }
    },

    SetBackgroundImg: (state, action) => {
      console.log(action.payload);
      return { ...state, backgroundImg: action.payload }
    },
  }
});

export const { SetFrameColor, SetBackgroundImg } = FrameSlice.actions
export default FrameSlice.reducer
