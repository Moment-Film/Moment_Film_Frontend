import { createSlice } from "@reduxjs/toolkit";

// 초기값 설정
const initialState = {
    accessToken: null,
  };

const AccessTokenSlice = createSlice({
  name: 'AccessToken',
  initialState,
  reducers:{
    SetAccessToken: (state,action)=>{
        //console.log(action.payload)
        const accessToken = action.payload
        state.accessToken=accessToken;

/*         if(isTokenValid(accessToken)){
            state.accessToken=accessToken;
        }
        else{
            alert('잘못된 로그인 정보입니다')
        } */
    },
  }
});
/* 
const isTokenValid =({accessToken})=>
{
    // 현재 액세스 토큰이랑 리브레시 토큰이 동시에 전송되는 상황 
    // ??? 리프레시 토큰의 이유 희미 
    return true;
} */

export const {SetAccessToken} = AccessTokenSlice.actions
export default AccessTokenSlice.reducer
