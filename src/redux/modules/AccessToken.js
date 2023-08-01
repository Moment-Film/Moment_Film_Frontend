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
        console.log(action.payload)
        const accessToken = action.payload
      
        if(isTokenValid(accessToken)){
            state.accessToken=accessToken;
        }
        else{
            alert('잘못된 로그인 정보입니다')
        }
    },
  }
});

const isTokenValid =({accessToken})=>
{
    //복호화해서 유효성 검증진행예정
    //구글 카카오 이메일 각 토큰들이 암호화 되어있는 방식이 달라서
    // 복호화하는법 고민 해봐야할 듯  
    return true;
}

export const {SetAccessToken} = AccessTokenSlice.actions
export default AccessTokenSlice.reducer
