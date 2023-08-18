import axios from "axios";

export const addComment = async ({
  postId,
  accessToken,
  refreshToken,
  comment,
}) => {
  console.log(postId, comment);
  try {
    const res = await axios.post(`http://52.78.24.117:8080/api/post/${postId}/comment`,{content:comment},
    {
      headers: {
        accessToken: accessToken,
        refreshToken: refreshToken,

      }
    });

    console.log(res);
    return res.data.data;
  } catch (error) {
    console.error("addComment api error", error);
    throw error;
  }
};

export const addReply = async ({
  commentId,
  accessToken,
  refreshToken,
  replay,
}) => {
  console.log(commentId, replay);
  try {
    const res = await axios.post(
      `/api/post/{postId}/comment/${commentId}/subcomment`,
      { content: replay },
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
    alert(error)
    console.error("addComment api error", error);
    throw error;
  }
};

export const delComment = async ({
  commentId,
  accessToken,
  refreshToken,
  postId,
}) => {
  console.log(commentId, postId);
  try {
    const res = await axios.delete(`/api/post/${postId}/comment/${commentId}`, {
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

export const delReply = async ({
  commentId,
  accessToken,
  refreshToken,
  postId,
  replyId,
}) => {
  console.log(commentId, postId, replyId);
  try {
    const res = await axios.delete(
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
