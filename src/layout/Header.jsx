import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SetLanguage } from "../redux/modules/Language";
import LogoutBtn from "../components/common/component/LogoutBtn";
import LOGO from "../components/assets/images/LOGO.svg";
import Search from "../components/common/component/Search";

function Header() {

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const language = useSelector((state) => state.Language.language);
  const userInfo = useSelector((state) => state.UserInfo);
  const ACToken = useSelector((state) => state.AccessToken.accessToken);

  return (
    <HeaderSection>
      <HeaderWrap>
        <HeaderTitle>
          <div onClick={() => navigate(`/`)}>
            <img src={LOGO} alt="" />
          </div>
        </HeaderTitle>
        <Search />
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
          {/* <NavBtn onClick={() => navigate(`/search`)}>
              <img src={main_search} alt="" />
            </NavBtn> */}
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
  width: 100vw;
  height: 84px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--white);
  position: sticky;
`;

const HeaderWrap = styled.div`
  width: 1170px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;

  span {
    width: 1px;
    height: 10px;
    background-color: var(--lightGray);
    /* border: 0.5; */
  }
`;

// const LinkBox = styled.div`
//   display: flex;
//   align-items: center;
//   /* gap: 28px; */
// `;

const HeaderTitle = styled.div``;

const LinkSection = styled.section`
  min-width: 309px;
  display: flex;
  align-items: center;

  /* justify-content: space-between; */
  gap: 20px;
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
