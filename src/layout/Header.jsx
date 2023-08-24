import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SetLanguage } from "../redux/modules/Language";
import LogoutBtn from "../components/common/component/LogoutBtn";
import LOGO from "../components/assets/images/LOGO.svg";
import Search from "../components/common/component/Search";

import { Link } from "react-router-dom";


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
      {/* <Small>
        <StyledLink to={'/'}>홈</StyledLink>
        <Search />
        <StyledLink>마이페이지</StyledLink>
      </Small> */}
      
      <HeaderTitle>
          <div onClick={() => navigate(`/`)}>
            <img src={LOGO} alt="" />
          </div>
        </HeaderTitle>
      <HeaderWrap>

        <Search
          className="center"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        />{" "}

        <LinkSection>
          <NavBtn onClick={() => navigate(`/camera/frameSelect`)}>
            촬영하기
          </NavBtn>
          <NavBtn onClick={() => navigate(`/postlist/recent`)}>
            전체글보기
          </NavBtn>

          <span />

          {ACToken ? (
            <>
              <LogoutBtn />
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
                onClick={() => {
                  navigate(`/login`);
                }}
                color={"#505050"}
              >
                로그인
              </NavBtn>
              <NavBtn onClick={() => navigate(`/signup`)} color={"#505050"}>
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
  height: 84px;
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
  width: 100%;
  display: flex;

  justify-content: flex-end;

  span {
    width: 1px;
    height: 10px;
    background-color: var(--lightGray);
  }

  @media (max-width: 700px) {
    display:none;

}

`;

const HeaderTitle = styled.section`
padding-left:10%;
@media (max-width: 700px) {
    padding:0;

}

`


const LinkSection = styled.section`
  min-width: 309px;
  display: flex;
  align-items: center;
  gap: 20px;

 @media (max-width: 900px) {
    gap: 10px;

}

`;

export const NavBtn = styled.div`
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  background-color: none;
  transition: background-color 0.5s;
  color: ${(props) => props.color};

  &:hover {
    background-color: var(--lightGray);
  }
`;

const Small = styled.div`
  @media only screen and (min-width: 700px) {
    display:none;
  }

  @media only screen and (max-width: 700px) {
    display:flex;
    align-items:center;
    justify-content:center;
    gap:60%;
    position:fixed;
    height:50px;
    width:100vw;
    bottom:0;
  
    background-color:var(--white);

    border-top:1px solid black;
    font-size:20px;
  }

`

const StyledLink = styled(Link)`
  text-decoration:none;
`