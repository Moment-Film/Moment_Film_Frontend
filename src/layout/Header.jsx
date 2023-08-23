import { useNavigate } from "react-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SetLanguage } from "../redux/modules/Language";
import LogoutBtn from "../components/common/component/LogoutBtn";
import main_search from "../components/assets/icons/main_search.svg";
import LOGO from "../components/assets/images/LOGO.svg";

function Header() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const language = useSelector((state) => state.Language.language);
  const userInfo = useSelector((state) => state.UserInfo);
  const ACToken = useSelector((state) => state.AccessToken.accessToken);

  return (
    <HeaderSection>
      <HeaderWrap>
        <LinkBox>

        </LinkBox>

        <HeaderTitle>
          <span onClick={() => navigate(`/`)}>
            <img src={LOGO} alt="" />
          </span>
        </HeaderTitle>
        
        <section className="searchWrap">
        <NavBtn onClick={() => navigate(`/search`)}>
          <img src={main_search} alt="" />
        </NavBtn>
        </section>

        <LinkBox>
          {ACToken ? (
            <>
              <NavBtn onClick={() => navigate(`/camera/frameSelect`)}>
                촬영하기
              </NavBtn>
              <NavBtn onClick={() => navigate(`/postlist/recent`)}>
                전체글보기
              </NavBtn>
              <LogoutBtn />
              <NavBtn onClick={() => navigate(`/profile/${userInfo.sub}`)}>
                마이페이지
              </NavBtn>
            </>
          ) : (
            <>
              <NavBtn onClick={() => navigate(`/camera/frameSelect`)}>
                촬영하기
              </NavBtn>
              <NavBtn onClick={() => navigate(`/postlist/recent`)}>
                전체글보기
              </NavBtn>
              <NavBtn onClick={() => { navigate(`/login`); }}>
                로그인
              </NavBtn>
              <NavBtn onClick={() => navigate(`/signup`)}>
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
        </LinkBox>
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

  background-color: rgba(238, 238, 238, 1);
`;

const HeaderWrap = styled.div`
  width: 1170px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
`;

const LinkBox = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;

const HeaderTitle = styled.div``;

export const NavBtn = styled.div`
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  background-color: none;
  transition: background-color 0.5s;

  &:hover {
    background-color: var(--lightGray);
  }
`;
