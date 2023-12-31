import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import search from "../../assets/icons/Search.png";
import SearchModal from "./SearchModal";
import { useSelector } from "react-redux";

const Search = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const userInfo = useSelector((state) => state.UserInfo);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsModalOpen(false);
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
      setIsModalOpen(false);
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
        setIsModalOpen(false);
        setUsername("");
      }
    }
  };

  const openModalHandler = () => {
    setIsModalOpen(true);
    window.addEventListener("scroll", closeModalHandler);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    window.removeEventListener("scroll", closeModalHandler);
  };

  return (
    <SearchInputDiv ref={searchRef}>
      <input
        type="text"
        value={username}
        onClick={openModalHandler}
        onChange={searchTermHandler}
        onKeyPress={handleKeyPress}
        placeholder="크리에이터를 검색해 보세요!"
      />
      <div onClick={searchBtnHandler}>
        <img src={search} alt="" className="img" />
      </div>
      {isModalOpen && (
        <SearchModal onClose={closeModalHandler} username={userInfo.username} />
      )}
    </SearchInputDiv>
  );
};

export default Search;

const SearchInputDiv = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 300px;

  width: 30%;

  height: 40px;
  border-bottom: 2px solid var(--green5);
  border-radius: 5px 5px 0px 0px;
  box-sizing: border-box;

  div {
    display: flex;
    align-items: center;
    .img {
      width: 19px;
      cursor: pointer;
    }
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    background: none;
    color: var(--black);

    &::placeholder {
      color: var(--gray4);
      font-size: 14px;
    }
  }

  input::placeholder {
    color: var(--gray3);
  }
  input::-webkit-input-placeholder {
    color: var(--gray3);
  }
  input:-ms-input-placeholder {
    color: var(--gray3);
  }

  textarea::placeholder {
    color: var(--gray3);
  }
  textarea::-webkit-input-placeholder {
    color: var(--gray3);
  }
  textarea:-ms-input-placeholder {
    color: var(--gray3);
  }
`;
