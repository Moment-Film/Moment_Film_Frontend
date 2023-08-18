import { createSlice } from "@reduxjs/toolkit";

// 초기값 설정
const initialState = {
  id:"",
  frameName: "",
  imageUrl: "",
  image:null,
  hue: 180,
  saturation: 100,
  lightness: 100,

};

const FrameSlice = createSlice({
  name: 'Frame',
  initialState,
  reducers: {
    SetFrame: (state, action) => {
      console.log(action.payload);
      return { ...state, ...action.payload }
    },

    SetBackgroundImg: (state, action) => {
      console.log(action.payload);
      return { ...state, imageUrl: action.payload }
    },

    SetImgFile: (state, action) => {
      console.log(action.payload);
      return { ...state, image: action.payload }
    },

  }
});

export const { SetFrame, SetBackgroundImg,SetImgFile } = FrameSlice.actions
export default FrameSlice.reducer
