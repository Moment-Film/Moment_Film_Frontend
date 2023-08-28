import axios from "axios";


export const getProfile = async (userId) => {
    console.log(userId);
  
      const res = await axios.get(`/api/user/profile/${userId}`)
  
      console.log(res);
  
      return res.data.data;
}

export const searchUser = async ({username}) => {
  try {
    const res = await axios.get(`/api/user/search?userKeyword=${username}`);
    console.log(res)
    return res.data.data.content;
  } catch (error) {
    console.log("searchUser api error", error.response.data.msg);
    return error.response.data.msg;
  }
};

export const recommendUser = async () => {
    try {
      const res = await axios.get('/api/recommend-user')
      console.log(res);
      return res.data;
    } catch (error) {
      console.error("searchUser api error", error);
      throw error;
    }
}

export const popularUser = async () => {
    try {
      const res = await axios.get('/api/user/popular')
      return res.data.data;
    } catch (error) {
      console.error("popularUser api error", error);
      throw error;
    }
}