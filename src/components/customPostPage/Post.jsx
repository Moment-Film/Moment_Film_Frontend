import { React, useState } from 'react'
import InfiniteScroll from '../common/component/InfinityScroll'
import styled from 'styled-components'
import mini_flower from '../assets/icons/mini_flower.svg'
import bannerImg from '../assets/images/banner.svg'
import { StyledBoldSpan28, StyledSpan14 } from '../common/styles/StyledSpan';

function Post() {

  const [sort,setSort]=useState('recent');

  const HandelSort = (key)=>{
    setSort(key);
  }
  
  return (
    <>
      <PostPage>
        <PostHeaderSection>
            <img src={bannerImg} alt="" />
        </PostHeaderSection>
        <PostNav>
          <StyledBoldSpan28 className='postTitle'>Post Page <img src={mini_flower}/></StyledBoldSpan28>
          <SortItem state={sort}>
            <StyledSpan14>
              정렬방식:
            </StyledSpan14>
            <StyledSpan14 className="recent" onClick={()=>HandelSort("recent")}>
              최신순
            </StyledSpan14>
            <StyledSpan14 className="likes" onClick={()=>HandelSort("likes")}>
              인기순
            </StyledSpan14>
            <StyledSpan14 className="view" onClick={()=>HandelSort("view")}>
              조회순
            </StyledSpan14>
          </SortItem>
        </PostNav>

        <PostWrapper>
          <InfiniteScroll sort={sort}/>
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

const PostHeaderSection = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;

  background-color:var(--gray1);
  
  img{
    width:100%;
    height:100%;
    min-height:400px;
    object-fit:cover;

    @media (max-width: 800px) {
      min-height:350px;
}

@media (max-width: 800px) {
      min-height:300px;
}

@media (max-width: 550px) {
      min-height:300px;
}
  }
`

const PostWrapper = styled.div`
    display:flex;
    justify-content:center;
    width:90%;
    max-width:1170px;

`

const PostNav = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    gap:30px;
    width:90%;
    max-width:1170px;
    border-bottom:1px solid var(--black);

    .postTitle{
      margin:auto;
      font-size:28px;
      font-weight: 700;
    }

    div{
      cursor:pointer;
    }

`
const SortItem = styled.div`
    display:flex;
    margin-left:auto;
    gap:22px;
    padding-bottom:10px;
    height:17px;

    .recent{
      color : ${(props)=>props.state==='recent' ? "var(--black)" : "var(--gray3)"};
      cursor:pointer;
    }

    .likes{
      color : ${(props)=>props.state==='likes' ? "var(--black)" : "var(--gray3)"};
      cursor:pointer;
    }

    .view{
      color : ${(props)=>props.state==='view' ? "var(--black)" : "var(--gray3)"};
      cursor:pointer;
    }
`;


const OptionCount = styled.div`
    display:flex;
    gap:5px;
    font-size:12px;
    font-weight: 400;
    margin-left:auto; 
    `