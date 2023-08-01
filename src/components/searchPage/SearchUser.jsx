import React from "react";
import { styled } from "styled-components";
import { posts } from "../../api/mockData";
import { useNavigate } from "react-router";

const SearchUser = () => {

  const navigate = useNavigate();

  const searchBtnHandler = () => {
    navigate('/searchreseult');
  }
  return (
    <>
      <ContentWrap>
        <Align>
          <What>무엇을 도와드릴까요?</What>
          <SearchWrap>
            <Search placeholder="검색어를 입력해 주세요."></Search>
            <SearchBtn onClick={searchBtnHandler}>🔍</SearchBtn>
          </SearchWrap>
          <div>추천 검색어</div>
          <TagBox>
            {posts.map((item) => {
              return <Tag>{item.id}</Tag>;
            })}
          </TagBox>
          <div>나에게 맞는 크리에이터 보기</div>
          <ImgBox>
            {posts.map((item) => {
              return (
                <Img src={item.images} alt=""/>
              );
            })}
          </ImgBox>
        </Align>
      </ContentWrap>
    </>
  );
};

export default SearchUser;

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 100px 0 100px 0;
`;

const Align = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`;

const What = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const SearchWrap = styled.div`
  display: flex;
`

const Search = styled.input`
  width: 98%;
  padding: 10px;
  background-color: #ececec;
  border: none;
  border-bottom: 3px solid grey;
  outline: none;
`;

const SearchBtn = styled.div`
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;
`

const TagBox = styled.div`
  display: flex;
  gap: 5px;
`;

const Tag = styled.div`
  padding: 5px;
  background-color: grey;
`;

const ImgBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4%;
`

const Img = styled.img`
  width: 48%;
`