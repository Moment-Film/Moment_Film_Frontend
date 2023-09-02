import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SetLanguage } from "../redux/modules/Language";
import LogoutBtn from "../components/common/component/LogoutBtn";
import LOGO from "../components/assets/images/LOGO.svg";
import Search from "../components/common/component/Search";

import { Link } from "react-router-dom";
import * as Img from "../components/assets/header/Image";

function Header({ onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const language = useSelector((state) => state.Language.language);
  const userInfo = useSelector((state) => state.UserInfo);
  const ACToken = useSelector((state) => state.AccessToken.accessToken);

  const handleHeaderClick = (e) => {
    if (isModalOpen && !e.target.closest(".center")) {
      setIsModalOpen(false);
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <HeaderSection onClick={handleHeaderClick}>
      <SmallBottomNav>
        <StyledLink to={"/"} className="option">
          <img src={Img.home}></img>
          <span>홈</span>
        </StyledLink>
        <StyledLink to={"/camera/capture"} className="option">
          <img src={Img.photo}></img>
          <span>촬영</span>
        </StyledLink>
        <StyledLink to={"/postlist/recent"} className="option">
          <img src={Img.post}></img>
          <span>조회</span>
        </StyledLink>

        {ACToken ? (
          <StyledLink to={`/profile/${userInfo.sub}`} className="option">
            <img src={Img.my}></img>
            <span>마이페이지</span>
          </StyledLink>
        ) : (
          <StyledLink to={`/login`} className="option">
            <img src={Img.my}></img>
            <span>로그인/가입</span>
          </StyledLink>
        )}

      </SmallBottomNav>

      <HeaderWrap>
        <HeaderTitle >
          <div onClick={() => navigate(`/`)}>
            <img src={LOGO} alt="" />
          </div>
        </HeaderTitle>

        <Search
          className="searchBar"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        />
        <LinkSection>
          <NavBtn
            className="boldOption"
            onClick={() => navigate(`/camera/frameSelect`)}
          >
            촬영하기
          </NavBtn>
          <NavBtn
            className="boldOption"
            onClick={() => navigate(`/postlist/recent`)}
          >
            전체글보기
          </NavBtn>

          <span />

          {ACToken ? (
            <>
              {/* <LogoutBtn /> */}
              <NavBtn
                onClick={() => navigate(`/profile/${userInfo.sub}`)}
                color={"#505050"}
              >
                마이페이지
              </NavBtn>
            </>
          ) : (
            <>
              <NavBtn
                className="normalOption"
                onClick={() => {
                  navigate(`/login`);
                }}
                color={"#505050"}
              >
                로그인
              </NavBtn>
              <NavBtn
                className="normalOption"
                onClick={() => navigate(`/signup`)}
                color={"#505050"}
              >
                회원가입
              </NavBtn>
            </>
          )}
          {/* <Btn
          onClick={() =>
            dispatch(SetLanguage(`${language === "ko" ? "en" : "ko"}`))
          }
        >
          Language
        </Btn> */}
        </LinkSection>
      </HeaderWrap>
    </HeaderSection>
  );
}
export default Header;

const HeaderSection = styled.header`
  min-height: 50px;
  height: 5vw;
  max-height: 84px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid var(--green5);

  background-color: var(--white);
  position: sticky;
  top: 0px;
  z-index: 1000;
  
`;

const HeaderWrap = styled.div`
  width: 65%;
  gap: 5%;
  display: flex;
  align-items: center;

  justify-content: space-between;

  span {
    display: block;
    width: 1px;
    height: 10px;
    background-color: var(--lightGray);
  }

  .searchBar {
  }
`;

const HeaderTitle = styled.section`
  cursor:pointer;
  @media (max-width: 1024px) {
    padding: 0;
  }
`;

const LinkSection = styled.section`
  display: flex;
  align-items: center;
  gap: 3%;

  @media (max-width: 1024px) {
    display: none;
  }
  .boldOption {
    font-weight: 500;
  }
  .normalOption {
    font-weight: 300;
    color: var(--gray5);
  }
`;

export const NavBtn = styled.div`
  display: flex;
  justify-content: center;
  min-width: 70px;
  font-size: 14px;
  line-height: 150%;
  cursor: pointer;
  background-color: none;
  transition: background-color 0.5s;
  color: ${(props) => props.color};

  &:hover {
    color: var(--green5);
  }
`;

const SmallBottomNav = styled.div`
  border-top: 1px solid var(--gray2);

  .option {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 15%;
    border-radius: 50%;
    img {
    }

    span {
      color: var(--green5);
      font-size: 12px;
    }
  }
  @media only screen and (min-width: 1024px) {
    display: none;
  }

  @media only screen and (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: space-around;

    position: fixed;
    height: 60px;
    width: 100%;
    bottom: 0;

    background-color: var(--white);

    border-top: 1px solid (--gray2);

    font-size: 20px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
