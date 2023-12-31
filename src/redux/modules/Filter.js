import { createSlice } from "@reduxjs/toolkit";

// 초기값 설정
const initialState = {
    filterName: "test",
    blur:0,
    brightness:0,
    saturate:0,
    contrast:0,
    sepia:0,
};

const FilterSlice = createSlice({
  name: 'Filter',
  initialState,
  reducers: {
    SetFilter: (state, action) => {
      //console.log(action.payload);
      //console.log(state);
      //console.log({...state,...action.payload});
      return { ...state, ...action.payload }
    }
  }
});

export const {SetFilter} = FilterSlice.actions
export default FilterSlice.reducer
