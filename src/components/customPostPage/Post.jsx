import { React, useEffect, useState } from 'react'
import InfiniteScroll from '../common/component/InfinityScroll'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { StyledBoldSpan42 } from '../common/styles/StyledSpan'

function Post() {
  // const [getPosts, setGetPosts] = useState([]);
  const a = [1, 2, 3, 4];
  const [sortType, setSortType] = useState(null);

  useEffect(() => {
    // setGetPosts(getAllPosts());
  }, [])
  
  const Card = ({ item }) => {
    return (
      <ContentsItem>
        <StyledLink>
          <Img src={'https://pbs.twimg.com/media/Fi3MBQvaMAAMymZ.jpg'}></Img>
        </StyledLink>
        <ItemInfo>
          <OptionCount>
            <div>b {'123'}</div>
            <div>C {'123'}</div>
          </OptionCount>
          <div>● 유저이름</div>
        </ItemInfo>
      </ContentsItem>
    )
  }

  return (
    <>
      <PostTitle>
        <StyledBoldSpan42>How About</StyledBoldSpan42>
        <span>인기 크리에이터의 작품과 모먼트 필름의 그리드 방향을 추천합니다</span>
      </PostTitle>
      <PostPage>

        <PostHeaderSection>
          <PostHeader>
            <SImg src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmJcGGiZhQYnrTUPV1Wpcxp04QT-XnCMq2a1N43NouznMPcJeFp0IMLUZPShxbUSOQHqA&usqp=CAU' />
            <PostTop5>
              {
                a.map((item, index) => {
                  return (<Card key={index}>asd</Card>)
                })
              }
            </PostTop5>
          </PostHeader>
        </PostHeaderSection>
        <PostNav>
          <div>게시글</div>
          <SortItem>
            <div>
              정렬방식
            </div>
            <div onClick={()=>setSortType(null)}>
              최신순
            </div>
            <div onClick={()=>setSortType("likes")}>
              인기순
            </div>
            <div onClick={()=>setSortType("view")}>
              조회순
            </div>
          </SortItem>
        </PostNav>

        <PostWrapper>
          <InfiniteScroll sortType={sortType}/>
        </PostWrapper>

      </PostPage>
    </>
  )
}

export default Post

const PostPage = styled.div`
  display:flex;
  gap:50px;
  align-items:center;
  flex-direction:column;
`
const PostTitle = styled.div`
  display:flex;
  flex-direction:column;
  padding:48px 0 20px 20%;
  
`
const PostHeaderSection = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  height:708px;
  background-color:var(--gray1);
`

const PostHeader = styled.div`
  display: flex;
  width:55%;
  gap: 29px;

  margin-top:59px;
  margin-bottom:59px;

`
const SImg = styled.img`
  width:40%;
  height:590px;
`

const PostTop5 = styled.div`
  display: grid;
  grid-template-columns: 49% 49%;
  grid-template-rows: 45% 45%;
  width: 100%;

  grid-row-gap: 10%;
 grid-column-gap:4%;

`
const StyledLink = styled(Link)`
text-decoration:none;
    
`

const ContentsItem = styled.div`
  width:100%;

  background-color:var(--white);

  border-top-right-radius:5px;
  border-top-left-radius:5px;
  box-shadow: 0px 0px 40px -5px rgba(0, 0, 0, 0.3);
`
const Img = styled.img`
    width:100%;
   height:210px;
   border-top-right-radius:5px;
  border-top-left-radius:5px;
`

const ItemInfo = styled.div`
    display:flex;
    flex-direction:column;
    padding:0 10px 0 10px;
    
`


const PostWrapper = styled.div`
    display:flex;
    width:60%;

`

const PostNav = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    width:60%;
    height:60px;
    border-bottom:1px solid black;

`

const SortItem = styled.div`
    display:flex;
    margin-left:auto;
    gap:10px;
    padding-bottom:10px;

`

const OptionCount = styled.div`
    display:flex;
    gap:5px;
    font-size:12px;
    font-weight:normal;
    margin-left:auto;

`

