import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import search from "../../assets/icons/Search.png";
import SearchModal from "./SearchModal";
import { useSelector } from "react-redux";

const Search = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const userInfo = useSelector((state) => state.UserInfo);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const saveSearchTermToLocalStorage = (term) => {
    let recentSearches = localStorage.getItem(`${userInfo.username}`);
    if (recentSearches) {
      recentSearches = JSON.parse(recentSearches);
    } else {
      recentSearches = [];
    }

    const index = recentSearches.indexOf(term);
    if (index > -1) {
      recentSearches.splice(index, 1); // 중복 검색어 제거
    }

    recentSearches.unshift(term); // 최근 검색어를 맨 앞에 추가
    localStorage.setItem(
      `${userInfo.username}`,
      JSON.stringify(recentSearches)
    );
  };

  const searchTermHandler = (event) => {
    setUsername(event.target.value);
  };

  const searchBtnHandler = () => {

    if (username.trim() === "") {
      alert("공백 문자열은 검색할 수 없습니다.");
    } else {
      navigate(`/search/reseult/${username}`);
      saveSearchTermToLocalStorage(username);
      setModalOpen(false);
      setUsername("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      if (username.trim() === "") {
        alert("공백 문자열은 검색할 수 없습니다.");
      } else {
        navigate(`/search/reseult/${username}`);
        saveSearchTermToLocalStorage(username);
        setModalOpen(false);
        setUsername("");
      }
    }
  };

  const onCloseHandler = () => {
    setModalOpen(false);
  };
  
  return (
    <SearchInputDiv ref={searchRef}>
      <input
        type="text"
        value={username}
        onClick={() => setModalOpen(true)}
        onChange={searchTermHandler}
        onKeyPress={handleKeyPress}
        placeholder="검색어를 입력해 주세요."
      />
      <div onClick={searchBtnHandler}>
        <img src={search} alt="" className="img" />
      </div>
      {isModalOpen && (
        <SearchModal onClose={onCloseHandler} username={userInfo.username} />
      )}
    </SearchInputDiv>
  );
};

export default Search;

const SearchInputDiv = styled.div`
  display: flex;
  align-items: center;
  width: 370px;
  height: 40px;
  border-bottom: 3px solid var(--green5);
  border-radius: 5px 5px 0px 0px;
  box-sizing: border-box;
  margin-left: -185px;
  position: absolute;
  left: 50%;

  div {
    display: flex;
    align-items: center;
    .img {
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
