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

export const addReply = async ({commentId,accessToken, refreshToken,recomment}) => {
  console.log(commentId,recomment)
  try {
    const res = await axios.post(`/api/post/{postId}/comment/${commentId}/subcomment`,{content:recomment},
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

export const delComment  = async ({commentId,accessToken, refreshToken,postId}) => {
  console.log(commentId,postId)
  try {
    const res = await axios.delete(`/api/post/${postId}/comment/${commentId}`,
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