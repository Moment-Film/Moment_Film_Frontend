import axios from "axios";

export const getAllPosts = async ({sort,page}) => {
    console.log(sort,page)
    //넘겨온 파라미터를 주소에 바로 심을 수 있지만 가독성이 이게 더 나아보임
    if (sort === 'recent') {
      const response = await axios.get(`/api/post?id=&size=20&page=${page}`);
      console.log(response.data.data)
      return response.data.data;
    }
    else if (sort === 'likes') {
      const response = await axios.get(`/api/post/like?id=&size=20&page=${page}`);
      console.log(response)
      return response.data.data;
    }
    else if (sort === 'view') {
      const response = await axios.get(`/api/post/view?id=&size=20&page=${page}`);
      console.log(response)
      return response.data.data;
    }
  
  }

  export const getPostDetail = async (postId) => {
    const response = await axios.get(`/api/post/${postId}`);
    console.log(response.data)
    return response.data.data;
  }