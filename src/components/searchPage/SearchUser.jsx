import React from "react";
import { styled } from "styled-components";
import { posts } from "../../api/mockData";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import { useState } from "react";
import { searchUser } from "../../api/searchUser";
import * as S from '../common/styles/StyledSpan'

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const searchTermHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  const { data, isLoading, isError, error } = useQuery(
    ["searchUser", searchTerm],
    () => searchUser({ username: searchTerm }),
    {
      enabled: searchTerm !== "", // searchTerm이 비어있지 않을 때만 쿼리를 수행합니다.
    }
  );

  const searchBtnHandler = () => {
    if (isLoading) {
      alert("검색중입니다, 잠시만 기다려 주세요!");
    } else if (isError) {
      alert(`에러가 발생했습니다 : ${error.message}`);
    } else {
      console.log(data);
      navigate("/searchresult");
    }
  };

  return (
    <SearchSection>
      <Wrap>
        <S.StyledBoldSpan26>무엇을 도와드릴까요?</S.StyledBoldSpan26>

        <SearchInputDiv>
          <SearchInput
            onChange={searchTermHandler}
            placeholder="검색어를 입력해 주세요."
          ></SearchInput>
          <div onClick={searchBtnHandler}>🔍</div>
        </SearchInputDiv>

        <S.StyledBoldSpan20>추천 검색어</S.StyledBoldSpan20>
        <RecommendSection>
          {posts.map((item) => {
            return <RecommendItem>{item.id}</RecommendItem>;
          })}
        </RecommendSection>

        <S.StyledBoldSpan20>나에게 맞는 크리에이터 보기</S.StyledBoldSpan20>
        <RecommendSection>
          {posts.map((item) => {
            return <Img src={item.images} alt="" />;
          })}
        </RecommendSection>
      </Wrap>
    </SearchSection>
  );
};

export default SearchUser;

const SearchSection = styled.div`
  
  display: flex;
  flex-direction:column;
  align-items:center;

  padding-top:6.3%;
`;

const Wrap = styled.div`
  display:flex;
  flex-direction:column;
  width:790px;

  gap:42pt;

  @media only screen and (max-width: 900px) {
        width:80%;
  }
`;

const SearchInputDiv = styled.div`
  display:flex;
  align-items:center;
  
  border:1px solid var(--black);
  width:100%;
  height:54px;

  padding:0 15px 0 10px;
`;

const SearchInput = styled.input`
  width:100%;
  border:none;
  outline:none;
  font-size:16px;
`;

const RecommendSection = styled.div`
  display:flex;
  gap:10px;
  flex-wrap:wrap;

  justify-content:center;
`;

const RecommendItem = styled.div`
 /*  flex:auto; */
  text-align:center;
  border: 1px solid black;
  padding:2px;
  font-size:18px;
  min-width:36px;
  padding:8px 21px 8px 21px;
`;

const Img = styled.img`
  width:32.4%;
  min-width:256.6px;



  @media only screen and (max-width: 900px) {
        width:49%;
  }
  @media only screen and (max-width: 700px) {
        width:100%;
  }
`;
