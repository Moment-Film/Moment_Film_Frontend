import axios from "axios";
//try / catch 안 if 문을 사용하는게 좋을까?
import useToken from "../../hooks/useToken";

// 회원가입 api
const axiosInstance = axios.create();
const useAuthAPI = () => {

  const {
    saveAccessToken,
    saveRefreshToken,
    saveUserInfo
  } = useToken();


  // 응답 인터셉터 설정
  axiosInstance.interceptors.response.use(
    (response) => {
      // 응답에서 토큰 추출하여 처리
      const accessToken = response.headers.accesstoken;
      const refreshToken = response.headers.refreshtoken
      console.log("ac",accessToken);
      console.log("rc",refreshToken);

      saveAccessToken(accessToken)
      saveRefreshToken(refreshToken)
      saveUserInfo(accessToken)

      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const register = async ({ username, password, email, phone }) => {
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

  const ELogin = async ({ email, password }) => {
    const response = await axiosInstance.post('/api/user/login',
      {
        email: email,
        password: password
      }
    );

    //성공이면 로그인 화면 or 홈화면을 보내버리자
    if (response.status === 200) {
      console.log(response);
      return response;
    }
    else
      alert("로그인 실패한 이유")
  }

  const socialLogin = async ({ code, social }) => {

    const response = await axiosInstance.post(`/api/user/${social}/callback?code=${code}`);

    //성공이면 로그인 화면 or 홈화면을 보내버리자
    if (response.status === 200) {
      return response;
    }
    else
      alert("로그인 실패한 이유")
  }

  const LogOutAPI = async (ACToken, REToken) => {
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

  const WithdrawalAPI = async (ACToken, REToken) => {
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
    } catch (error) {
      return error;
    }
  }

  return {
    register,
    ELogin,
    socialLogin,
    LogOutAPI,
    WithdrawalAPI,
  };

}

export default useAuthAPI;