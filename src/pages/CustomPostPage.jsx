import { React, useEffect, useState } from 'react'
import { posts } from '../api/mockData'
import Post from '../components/customPostPage/Post'
import {PostWrapper} from '../components/customPostPage/style'
import {getAllPosts} from '../api/post'

function CustomPostPage() {
  // const [getPosts, setGetPosts] = useState([]);
  const getPost = posts;

  useEffect(()=>{
    // setGetPosts(getAllPosts());
  },[])
  return (
    <PostWrapper>
      {
        getPost.map(item => {
          return <Post key={item.id}
            id={item.id}
            images={item.images}
            filterId={item.filterId}
            frameId={item.frameId}
            commentCnt={item.commentCnt}
            likeCnt={item.likeCnt}
            viewCnt={item.viewCnt}></Post>
        })
      }
    </PostWrapper>
  )
}

export default CustomPostPage