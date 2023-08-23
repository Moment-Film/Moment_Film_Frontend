import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import { useQuery } from "react-query";
import { useState } from "react";

import { popularUser } from "../../../api/nonToken/user";
import * as S from "../styles/StyledSpan";
import search from "../../assets/icons/Search.png";
import SearchModal from "./SearchModal";

const Search = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const saveSearchTermToLocalStorage = (term) => {
    let recentSearches = localStorage.getItem("recentSearches");
    if (recentSearches) {
      recentSearches = JSON.parse(recentSearches);
    } else {
      recentSearches = [];
    }
  
    const index = recentSearches.indexOf(term);
    if (index > -1) {
      recentSearches.splice(index, 1); // 중복 검색어 제거
    }
  
    if (recentSearches.length >= 5) { 
      recentSearches.pop(); // 5개 이상이면 가장 오래된 항목 제거
    }
  
    recentSearches.unshift(term); // 최근 검색어를 맨 앞에 추가
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  };

  const searchTermHandler = (event) => {
    setUsername(event.target.value);
  };

  const searchBtnHandler = () => {
    navigate(`/search/reseult/${username}`);
    saveSearchTermToLocalStorage(username);
    setModalOpen(false);
    setUsername("")

  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      navigate(`/search/reseult/${username}`);
      saveSearchTermToLocalStorage(username);
      setModalOpen(false);
      setUsername("")

    }
  };

  const onCloseHandler = () => {
    setModalOpen(false);
  };
  return (
    <SearchInputDiv>
      <input
        type="text"
        value={username}
        onClick={() => setModalOpen(true)}
        onChange={searchTermHandler}
        onKeyPress={handleKeyPress}
        placeholder="검색어를 입력해 주세요."
      />
      <div onClick={searchBtnHandler}>
        <img src={search} alt="" />
      </div>
      {isModalOpen && <SearchModal onClose={onCloseHandler} />}
    </SearchInputDiv>
  );
};

export default Search;

const SearchInputDiv = styled.div`
  display: flex;
  align-items: center;
  width: 370px;
  height: 40px;
  /* background-color: var(--green0); */
  border-bottom: 2px solid var(--green5);
  border-radius: 5px 5px 0px 0px;
  box-sizing: border-box;
  /* padding: 0 15px 0 10px; */
  /* margin-bottom: 60px; */

  div {
    display: flex;
    align-items: center;
    img {
      width: 19px;
    }
  }
  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    background: none;
    color: #60a10e;

    &::placeholder {
      color: var(--gray4);
      font-size: 14px;
    }
  }
`;