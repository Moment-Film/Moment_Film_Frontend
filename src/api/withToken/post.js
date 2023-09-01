import axios from "axios";
import useToken from "../../hooks/useToken";
import { useSelector } from "react-redux";
const usePostAPI = () => {

  const a = useSelector((state) => state.UserInfo);

  const {
    getAccess,
    getRefresh,
    saveAccessToken
  } = useToken();

  //axios 객체 생성
  const postAxios = axios.create();
  // axios 인터셉터 설정
  postAxios.interceptors.request.use(
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


  postAxios.interceptors.response.use(
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
    const deletePost = async (postId) => {
      try{
        const res = await postAxios.delete(`/api/post/${postId}`);
        alert(res.data.msg);
      }
      catch(error) {
        alert("error", error);
      }
    }

  const addPost = async (formData) => {
    try {
      await postAxios.post(`/api/post`, formData);
      console.log("POST SUCCESS!!!!!!!!");
    }
    catch (error) {
      console.log("Error :", error);
    }
  }

  const addFrame = async (formData) => {
    try {
      const response = await postAxios.post(`/api/frame`, formData);
      console.log("Frame SUCCESS!!!!!!!!");
      console.log(response.data.data.id);
      return response.data.data.id
    }
    catch (error) {
      console.log("Error :", error);
    }
  }

  const addFilter = async (formData) => {
    try {
      const response = await postAxios.post(`/api/filter`, formData);
      console.log("filter SUCCESS!!!!!!!!");
      console.log(response.data.data.id);
      return response.data.data.id
    }
    catch (error) {
      console.log("Error :", error);
    }
  }

  const getMyFrame = async () => {
    try {
      const response = await postAxios.get(`/api/frame`);
      return response;
    } catch (error) {
      return error;
    }
  }

  const addComment = async ({
    postId,
    accessToken,
    refreshToken,
    comment,
  }) => {
    console.log(postId, comment);
    try {
      const res = await postAxios.post(`/api/post/${postId}/comment`, { content: comment });

      console.log(res);
      return res.data.data;
    } catch (error) {
      console.error("addComment api error", error);
      throw error;
    }
  };

  const addReply = async ({
    commentId,
    replay,
  }) => {
    console.log(commentId, replay);
    try {
      const res = await postAxios.post(
        `/api/post/{postId}/comment/${commentId}/subcomment`,
        { content: replay });

      console.log(res);
      return res;
    } catch (error) {
      alert(error)
      console.error("addComment api error", error);
      throw error;
    }
  };

  const delComment = async ({
    commentId,
    accessToken,
    refreshToken,
    postId,
  }) => {
    console.log(commentId, postId);
    try {
      const res = await postAxios.delete(`/api/post/${postId}/comment/${commentId}`, {
        headers: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });

      console.log(res);
      return res.data;
    } catch (error) {
      console.error("addComment api error", error);
      throw error;
    }
  };

  const delReply = async ({
    commentId,
    accessToken,
    refreshToken,
    postId,
    replyId,
  }) => {
    console.log(commentId, postId, replyId);
    try {
      const res = await postAxios.delete(
        `/api/post/${postId}/comment/${commentId}/subcomment/${replyId}`,
        {
          headers: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        }
      );

      console.log(res);
      return res.data;
    } catch (error) {
      console.error("addComment api error", error);
      throw error;
    }
  };


  return {
    deletePost,
    addPost,
    addFrame,
    addFilter,
    getMyFrame,
    addComment,
    addReply,
    delComment,
    delReply
  };

};
export default usePostAPI;