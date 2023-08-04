import { createSlice } from "@reduxjs/toolkit";

// 초기값 설정
const initialState = {
    language: 'ko',
  };

const LanguageSlice = createSlice({
  name: 'Language',
  initialState,
  reducers:{
    SetLanguage: (state,action)=>{
        state.language=action.payload;
    },
  }
});

export const {SetLanguage} = LanguageSlice.actions
export default LanguageSlice.reducer
