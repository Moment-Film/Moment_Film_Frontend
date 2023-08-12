import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import { useState } from "react";
import { searchUser } from "../../api/searchUser";
import * as S from "../common/styles/StyledSpan";
import { useSelector } from "react-redux";
import { popularUser } from "../../api/popularUser";

import upperArr from "../assets/icons/upperArr.svg";
import search from "../assets/icons/searchIcon.svg";

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const searchTermHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  const actoken = useSelector((state) => state.AccessToken.accessToken);
  const {
    data: popularUserData,
    isLoading: isPopularUserLoading,
    isError: isPopularUserError,
    error: popularUserError,
  } = useQuery("popularUser", () => popularUser({ actoken }), {
    enabled: !!actoken,
  });

  if (isPopularUserLoading) {
    alert("인기 사용자를 불러오고 있습니다!");
  } else if (isPopularUserError) {
    alert(`인기 사용자 로딩 중 오류 발생: ${popularUserError.message}`);
  } else {
    console.log(popularUserData);
  }

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
    <SearchWrap>
      <SearchSection>
        <Wrap>
          <S.StyledBoldSpan26
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#2E4D07",
              marginBottom: "35px",
              lineHeight:'24px',
            }}
          >
            무엇을 도와드릴까요?
          </S.StyledBoldSpan26>

          <SearchInputDiv>
            <input
              onChange={searchTermHandler}
              placeholder="검색어를 입력해 주세요."
            />
            <div onClick={searchBtnHandler}>
              <img src={search} alt="" />
            </div>
          </SearchInputDiv>

          <S.StyledSpan16 style={{ paddingLeft: "30px", lineHeight: "19px" }}>
            인기 크리에이터 보기
          </S.StyledSpan16>
          <RecommendSection>
            {popularUserData &&
              popularUserData.map((item, index) => {
                return (
                  <RecommendItem>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <div>{index + 1}위</div>
                      <div>크리에이터 {item.username}</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{lineHeight:'28px'}}>팔로워 {item.follower}명</div>
                      <div>
                        <img src={upperArr} alt="" />
                      </div>
                    </div>
                  </RecommendItem>
                );
              })}
          </RecommendSection>

          {/* <S.StyledBoldSpan20>나에게 맞는 크리에이터 보기</S.StyledBoldSpan20>
        <RecommendSection>
          {posts.map((item) => {
            return <Img src={item.images} alt="" />;
          })}
        </RecommendSection> */}
        </Wrap>
      </SearchSection>
    </SearchWrap>
  );
};

export default SearchUser;

const SearchWrap = styled.div`
  width: 1170px;
  background: #fff;
  margin: auto;
`

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 6.3%;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 790px;

  /* gap: 42pt; */

  @media only screen and (max-width: 900px) {
    width: 80%;
  }
`;

const SearchInputDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 54px;
  background-color: var(--green1);
  border-bottom: 2px solid var(--green4);
  border-radius: 5px 5px 0px 0px;
  box-sizing: border-box;
  padding: 0 15px 0 10px;
  margin-bottom: 60px;

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    background: none;
    color: #60a10e;

    &::placeholder {
      color: #60a10e;
    }
  }
`;

const RecommendSection = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--green3);
  margin-top: 30px;
  margin-bottom: 48%;
`;

const RecommendItem = styled.div`
  /*  flex:auto; */
  /* text-align: center; */
  /* border: 1px solid black; */
  height: 57px;
  color: var(--green5);
  border-bottom: 1px solid var(--green3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 2px; */
  font-size: 16px;
  line-height: 19px;
  min-width: 36px;
  box-sizing: border-box;
  padding: 15px 30px;

  img {
    padding: 0 40px 0 30px;
  }
`;
