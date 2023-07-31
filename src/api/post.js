import axios from "axios";

export const getAllPosts = async() => {
  const response = await axios.get(`/api/post`);
  return response;
}
export const getPostDetail = async(postId) => {
  const response = await axios.get(`/api/post/${postId}`);
  return response;
}