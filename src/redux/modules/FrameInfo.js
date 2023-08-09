import { createSlice } from "@reduxjs/toolkit";

// 초기값 설정
const initialState = {
    color: { h: 180, s: 100, l: 100 },
  };

const FrameSlice = createSlice({
  name: 'Frame',
  initialState,
  reducers:{
    SetFrameColor: (state,action)=>{
        console.log(action.payload);
        return {color:{...state.color ,...action.payload}}
    },
  }
});

export const {SetFrameColor} = FrameSlice.actions
export default FrameSlice.reducer
