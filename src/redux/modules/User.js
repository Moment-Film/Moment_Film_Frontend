import { createSlice } from "@reduxjs/toolkit";

// 초기값 설정
const initialState = {
    sub: null,
    username:null,
    email:null,
    exp:null,
    iat:null,
  };

const UserSlice = createSlice({
  name: 'UserInfo',
  initialState,
  reducers:{
    SetUserInfo: (state,action)=>{
      if(action.payload===null){
        return {
          sub: null,
          username:null,
          email:null,
          exp:null,
          iat:null,
        }
      }
      else{
        //console.log(action.payload)
        return {...state ,...action.payload }
      }
    },
  }
});


export const {SetUserInfo} = UserSlice.actions
export default UserSlice.reducer
