import axios from "axios";
import useToken from "../../hooks/useToken";

const useCustomAPI = () => {
  const {
    getAccess,
    getRefresh
  }=useToken();

  // axios 인터셉터 설정
axios.interceptors.request.use(
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

const getMyFilter = async() => {
    try {
      const response = await axios.get(`/api/filter`);
      return response;
    } catch (error) {
      return error;
    }
  }

  const applyFrame = async({frameId, accessToken, refreshToken}) => {
    try {
      const response = await axios.post(`/api/frame/${frameId}`,null)
      return response.data.data;
    } catch (error) {
      console.log("error", error.response.data);
    }
  }

  const applyFilter = async({filterId, accessToken, refreshToken}) => {
    try {
      const response = await axios.post(`/api/filter/${filterId}`,null)
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