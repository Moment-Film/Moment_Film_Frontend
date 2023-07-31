import {PostSection} from './style'
import React from 'react'
import { useNavigate } from 'react-router'

function Post({images, id, filterId, frameId, commentCnt, likeCnt, viewCnt}) {
  const navigate=useNavigate();
  return (
    <PostSection onClick={()=>navigate(`/post/${id}`)}>
      <img src={images} alt='image'/>
      <p>{filterId}</p>
      <p>{frameId}</p>
      <p>댓글 {commentCnt}</p>
      <p>좋아요 {likeCnt}</p>
      <p>조회수 {viewCnt}</p>
    </PostSection>
  )
}

export default Post