import ourAxios from './ourAxios';

export const addComment = async ({postId, content}) => {
  try {
    const res = await ourAxios.post(`/api/post/${postId}/comment`, {
      content,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("addComment api error", error);
    throw error;
  }
}