import axios from "axios";

export const getAllPosts = async() => {
  const response = await axios.get(`/api/post`);
  return response;
}
export const getPostDetail = async(postId) => {
  const response = await axios.get(`/api/post/${postId}`);
  return response;
}
export const deletePost = async(postId) => {
  await axios.delete(`/api/post/${postId}`);
}
export const addPost = async(newPost)=>{
  try {
    await axios.post(`/api/post`,newPost);
  }
  catch(error){
    console.log("Error :", error);
  }
}