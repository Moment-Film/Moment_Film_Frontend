import axios from "axios";

export const socialLogin = async ({ code, social }) => {
  // 아직 주소 안정해짐 

  console.log(code, social)
  const response = await axios.post(`/api/user/kakao/callback?code=${code}`);

  console.log(response.headers.accesstoken)
  console.log(response.headers.refreshtoken)
  //성공이면 로그인 화면 or 홈화면을 보내버리자
  if (response.status === 200) {
    return response;
  }
  else
    alert("로그인 실패한 이유")
}


export const ELogin = async ({ email, password }) => {
  // 아직 주소 안정해짐 
  console.log(email, password)
  const response = await axios.post('/api/user/login',
    {
      email: email,
      password: password
    }
  );

  console.log(response)
  console.log(response.headers.refreshtoken)
  //성공이면 로그인 화면 or 홈화면을 보내버리자
  if (response.status === 200) {
    return response;
  }
  else
    alert("로그인 실패한 이유")
}


export const LogOutAPI = async (ACToken, REToken) => {
  console.log(ACToken, REToken)
  const response = await axios.post('/api/user/logout', null
    ,
    {
      headers: {
        accessToken: ACToken,
        refreshToken: REToken
      },
    }
  );

  //성공이면 로그인 화면 or 홈화면을 보내버리자
  if (response.status === 200) {
    return response;
  }
  else
    alert("로그인 실패한 이유")
}


export const WithdrawalAPI = async (ACToken, REToken) => {
  console.log(ACToken, REToken)
  const response = await axios.delete('/api/user/withdrawal', null,
    {
      headers: {
        accessToken: ACToken,
        refreshToken: REToken
      },
    }
  );

  //성공이면 로그인 화면 or 홈화면을 보내버리자
  if (response.status === 200) {
    return response;
  }
  else
    alert("로그인 실패한 이유")
}

//팔로우 요청 및 취소 
export const FolllowAPI = async (userId, ACToken, REToken) => {
  const response = await axios.post(`/api/follow/${userId}`, null,
    {
      headers: {
        accessToken: ACToken,
        refreshToken: REToken
      },
    }
  );
  
  //팔로우 성공과 이미 팔로우되어서 안된경우도 200으로옴
  if (response.status === 200) {

    // 이미 팔로우 한 사용자라면 취소하기
    if (response.data.msg === "이미 팔로우한 사용자입니다.") {
      const CancelResponse = await axios.delete(`/api/follow/${userId}`,
        {
          headers: {
            accessToken: ACToken,
            refreshToken: REToken
          },
        }
      );
      alert(CancelResponse.data.msg)
      return CancelResponse;
    }
    //팔로우안되어 있을 경우
    else{
      alert(response.data.msg)
      return response;
    }

  }
  else
    alert("로그인 실패한 이유")
}

