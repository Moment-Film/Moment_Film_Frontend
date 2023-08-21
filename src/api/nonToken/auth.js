import axios from "axios";
//try / catch 안 if 문을 사용하는게 좋을까?
//인터셉터로 요청받은후 데이터를 암호화 및 복호해서 저장하는것을 여기서 진행할까? 
// 회원가입 api
export const register = async ({ username, password, email, phone }) => {
    try {
      const res = await axios.post("/api/user/signup", {
        username,
        email,
        password,
        phone,
      });
      return res.data;
    } catch (error) {
      console.error("resitster api error", error);
      throw error;
    }
};

export const ELogin = async ({ email, password }) => {
    const response = await axios.post('/api/user/login',
      {
        email: email,
        password: password
      }
    );
  
    //성공이면 로그인 화면 or 홈화면을 보내버리자
    if (response.status === 200) {
      return response;
    }
    else
      alert("로그인 실패한 이유")
  }
  
  export const socialLogin = async ({ code, social }) => {
  
    const response = await axios.post(`/api/user/${social}/callback?code=${code}`);

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
    try {
      const response = await axios.delete('/api/user/withdrawal',
        {
          headers: {
            accessToken: ACToken,
            refreshToken: REToken
          },
        }
      );
      return response;
    } catch(error) {
      return error;
    }
  }

  