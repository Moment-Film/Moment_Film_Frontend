import { React } from "react"
import styled from "styled-components"
import { useParams } from "react-router"
import { getPostDetail } from "../api/post"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import DetailContent from "../components/detailPage/DetailContent";
import Comment from "../components/detailPage/Comment"

function DetailPage() {

  //변수 선언부 
  const param = useParams();
  const navigate = useNavigate();

  //리액트 쿼리
  const { data, isLoading, isError, isSuccess } = useQuery(`Detail${param.id}`, () => getPostDetail(param.id));

  //리액트 쿼리 상태 처리 부분 
  if (isLoading) {
    return <div>aa</div>
  }

  if (isError) {
    alert("다시 시도해주세요")
    return navigate('/');
  }

  return (
    <DetailSection style={{ backgroundColor: "var(--whiteGray)" }}>
      <DetailContent data={data} />
      <Comment data={data} isSuccess={isSuccess} />
    </DetailSection>
  )
}

export default DetailPage

const DetailSection = styled.section`
  display:flex;
  max-width: 1170px;
  margin: 0 auto;
  flex-direction:column;
  align-items:center;
  background-color: white;
`