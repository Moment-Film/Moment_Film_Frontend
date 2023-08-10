import { createSlice } from "@reduxjs/toolkit";

// 초기값 설정
/* const initialState = {}; */

const ResultImageSlice = createSlice({
  name: 'ResultImage',
  initialState:{},
  reducers:{
    SetResultImage: (state,action)=>{
        console.log(action.payload)
        return state=action.payload
    },
  }
});

export const {SetResultImage} = ResultImageSlice.actions
export default ResultImageSlice.reducer
