import axios from 'axios';

export const addComment = async ({postId,accessToken, refreshToken,content}) => {
  console.log(postId,content)
  try {
    const res = await axios.post(`/api/post/${postId}/comment`,content,
    {
      headers: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      }
    });
 
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("addComment api error", error);
    throw error;
  }
}