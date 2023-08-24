import { React } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import DetailContent from "../components/detailPage/DetailContent";
import Comment from "../components/detailPage/Comment"
import { getPostDetail } from "../api/nonToken/post"
import { useState } from "react"
import { useEffect } from "react"


function DetailPage() {

  const param = useParams();
  const navigate = useNavigate();
  console.log(param.id)
  const [dataComment, setDataComment] = useState(null);
  //리액트 쿼리
  const { data, isLoading, isError, isSuccess } = useQuery(`Detail${param.id}`, () => getPostDetail(param.id));
  console.log(data);
  useEffect(()=>{
    isSuccess && setDataComment(data.commentList.reverse());
  },[isSuccess,data]);

  //리액트 쿼리 상태 처리 부분 
  if (isLoading) {
    return <div>aa</div>
  }

  if (isError) {
    alert("다시 시도해주세요")
    return navigate('/');
  }

  return (
    <Detail>
      <DetailContent data={data} isSuccess={isSuccess}/>
      <Comment data={dataComment}/>
    </Detail>
  )
}

export default DetailPage

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`