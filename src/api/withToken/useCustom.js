import axios from "axios";
import useToken from "../../hooks/useToken";

const useCustomAPI = () => {
  const {
    getAccess,
    getRefresh,
    saveAccessToken
  } = useToken();

  //axios 객체 생성
  const customAxios = axios.create();
  // axios 인터셉터 설정
  customAxios.interceptors.request.use(
    function (config) {
      // 여기서 토큰을 가져와서 헤더에 삽입
      const refreshToken = getRefresh();
      const accessToken = getAccess();

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

  customAxios.interceptors.response.use(
    function (response) {
      console.log(response.headers.accessToken)
      /*       const timestampInSeconds = 1693186240; // 주어진 유닉스 타임스탬프 (초 단위)
          const timestampInMilliseconds = timestampInSeconds * 1000; // 밀리초 단위로 변환
      
          const date = new Date(timestampInMilliseconds);
          const dateInKoreaTimeZone = new Date(date.getTime() + (9 * 60 * 60 * 1000)); // 한국 표준시로 변환 (GMT+0900)
      
          console.log(dateInKoreaTimeZone); */

      if (response.headers.accessToken) {
        alert("변경됨")
        const accessToken = response.headers.accesstoken;
        saveAccessToken(accessToken)
      }
       return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  const getMyFilter = async () => {
    try {
      const response = await customAxios.get(`/api/filter`);
      return response;
    } catch (error) {
      return error;
    }
  }

  const applyFrame = async ({ frameId, accessToken, refreshToken }) => {
    try {
      const response = await customAxios.post(`/api/frame/${frameId}`, null)
      return response.data.data;
    } catch (error) {
      console.log("error", error.response.data);
    }
  }

  const applyFilter = async ({ filterId, accessToken, refreshToken }) => {
    try {
      const response = await customAxios.post(`/api/filter/${filterId}`, null)
      return response.data.data;
    } catch (error) {
      console.log("error", error.response.data);
    }
  }

  return {
    getMyFilter,
    applyFrame,
    applyFilter

  };

};
export default useCustomAPI;