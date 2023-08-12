import React, { useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import { useState } from "react";
import { debounce } from "lodash";
import { searchUser } from "../../api/searchUser";
import * as S from "../common/styles/StyledSpan";
import { popularUser } from "../../api/popularUser";

import upperArr from "../assets/icons/upperArr.svg";
import search from "../assets/icons/searchIcon.svg";

const SearchUser = () => {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const searchTermHandler = (event) => {
    setUsername(event.target.value);
  };

  const debouncedSearch = useCallback(debounce(searchTermHandler, 300), []);

  const { data: popularUserData } = useQuery("popularUser", () =>
    popularUser()
  );

  const {
    data: searchUserData,
    isLoading,
    isError,
    error,
  } = useQuery(["searchUser", username], 
  () => searchUser({ username }), 
  {
    enabled: username !== "",
  });

  if (searchUserData && searchUserData.body && searchUserData.body[0]) {
  }
    console.log(searchUserData);

  const searchBtnHandler = () => {
    if (isLoading) {
      alert("검색중입니다, 잠시만 기다려 주세요!");
    } else if (isError) {
      alert(`에러가 발생했습니다 : ${error.message}`);
    } else {
    navigate(`/search/reseult/${username}`, { state: { searchData: searchUserData } });
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
              lineHeight: "24px",
            }}
          >
            무엇을 도와드릴까요?
          </S.StyledBoldSpan26>

          <SearchInputDiv>
            <input
              onChange={debouncedSearch}
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
                      <div style={{ lineHeight: "28px" }}>
                        팔로워 {item.follower}명
                      </div>
                      <div>
                        <img src={upperArr} alt="" />
                      </div>
                    </div>
                  </RecommendItem>
                );
              })}
          </RecommendSection>
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
`;

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
  height: 57px;
  color: var(--green5);
  border-bottom: 1px solid var(--green3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  line-height: 19px;
  min-width: 36px;
  box-sizing: border-box;
  padding: 15px 30px;

  img {
    padding: 0 40px 0 30px;
  }
`;
