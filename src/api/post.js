import axios from "axios";
import ourAxios from "./ourAxios";

export const getAllPosts = async() => {
  const response = await axios.get(`/api/post`);
  return response.data.body;
}
export const getPostSort = async({sort}) => {
  const response = await axios.get(`/api/post/${sort}`,{
    sort
  });
  return response.data.body;
}
export const getPostDetail = async(postId) => {
  const response = await axios.get(`/api/post/${postId}`);
  return response;
}
export const deletePost = async(postId) => {
  await axios.delete(`/api/post/${postId}`);
}
export const addPost = async(accessToken, refreshToken,newPost)=>{
  console.log({
    acc : accessToken,
    refresh : refreshToken,
    data: newPost,
  })
  try {
    await axios.post(`/api/post`,newPost, {
      headers : {
        'accessToken' : accessToken,
        'refreshToken' : refreshToken,
      }
    });
    console.log("POST SUCCESS!!!!!!!!");
  }
  catch(error){
    console.log("Error :", error);
  }
}