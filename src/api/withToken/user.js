import axios from "axios";
import useToken from "../../hooks/useToken";

const useUserAPI = () => {
  const {
    getAccess,
    getRefresh
  }=useToken();

  //axios 객체 
  const userAxios = axios.create();
  // axios 인터셉터 설정
  userAxios.interceptors.request.use(
  function (config) {
      // 여기서 토큰을 가져와서 헤더에 삽입
      const refreshToken = getRefresh();
      const accessToken = getAccess();

      console.log(accessToken)

      console.log(refreshToken)

      if (refreshToken) {
          config.headers.refreshToken = refreshToken;
          config.headers.accessToken = accessToken;
      }
      return config;
  },
  function (error) {
      return Promise.reject(error);
  }
);

  //팔로우 요청 및 취소 
  const FollowAPI = async (userId) => {
    console.log(userId)
    try { //팔로우가 되어있지않아서 팔로우할때
      const response = await userAxios.post(`/api/follow/${userId}`, null,);

      alert(response.data.msg)
      return response;

    }
    catch (error) { //팔로우가 이미 되어있어서 팔로우취소할때

      if (error.response.data.msg === '이미 팔로우한 사용자입니다.') {
        const CancelResponse = await userAxios.delete(`/api/follow/${userId}`,);

        alert(CancelResponse.data.msg)
        return CancelResponse;
      }

      alert(error.response.data)
    }
  }

  // 회원정보 조회 api
const getPrivateInfo = async () => {
  const res = await userAxios.get(`/api/user/info`);
  console.log(res);
  return res;
};

// 회원정보 수정 api
const putEditInfo = async ({editName, editPhone }) => {
  const res = await userAxios.put(
    `/api/user/info`,
    {
      username: editName,
      phone: editPhone,
    },
  );
  return res;
};

// 회원 이메일로 인증 코드 전송 api
const sendEmail = async ({ accessToken, refreshToken }) => {
  const res = await userAxios.post(`/api/user/email`, null);
  return res.data.msg;
};

// 회원 비밀번호 수정 api
const replacePassword = async ({
  accessToken,
  refreshToken,
  newPassword,
  code,
}) => {
  const res = await userAxios.put(
    `/api/user/password-reset?code=${code}`,
    {
      password: newPassword,
    },
    {
      headers: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    }
  );
  return res;
};

const likePost = async ( {postId }) => {
  try {
      console.log(postId)
/*       console.log(accessToken)

      console.log(refreshToken) */

      const res = await userAxios.post(`/api/post/${postId}/likes`,null);
      console.log(res);
      return res.data.data;

  } catch (error) {
      throw error;
  }
};


  return {
    FollowAPI,
    getPrivateInfo,
    putEditInfo,
    sendEmail,
    replacePassword,
    likePost
  };

};
export default useUserAPI;