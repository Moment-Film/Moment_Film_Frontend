import { useNavigate } from "react-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SetLanguage } from "../redux/modules/Language";
import LogoutBtn from "../components/common/component/LogoutBtn";
import WithdrawalBtn from "../components/common/component/WithdrawalBtn";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const language = useSelector((state) => state.Language.language);
  const userInfo = useSelector((state) => state.UserInfo);
  const ACToken = useSelector((state) => state.AccessToken.accessToken);

  return (
    <HeaderSection>
      <LinkBox>
        {ACToken ? (
          <>
            <LogoutBtn />
            <WithdrawalBtn />
          </>
        ) : (
          <>
            <Btn
              onClick={() => {
                navigate(`/login`);
              }}
            >
              Log In
            </Btn>
            <Btn onClick={() => navigate(`/signup`)}>Sign Up</Btn>
          </>
        )}
        <Btn onClick={() => navigate(`/postlist/recent`)}>Post</Btn>
        <Btn onClick={() => navigate(`/post/1`)}>PostDetail</Btn>
        <Btn onClick={() => navigate(`/camera/frameSelect`)}>⚠️📸⚠️</Btn>
        <Btn
          onClick={() =>
            dispatch(SetLanguage(`${language === "ko" ? "en" : "ko"}`))
          }
        >
          Language
        </Btn>
      </LinkBox>

      <HeaderTitle>
        <span onClick={() => navigate(`/`)}>Moment Film</span>
      </HeaderTitle>

      <LinkBox>
        <Btn onClick={() => navigate(`/search`)}>🔍</Btn>
        {ACToken ? (
          <>
            <Btn onClick={() => navigate(`/profile/${userInfo.sub}`)}>
              ᕙ༼◕ ᴥ ◕༽ᕗ{userInfo.username}
            </Btn>
          </>
        ) : (
          <></>
        )}
      </LinkBox>
    </HeaderSection>
  );
}
export default Header;

const HeaderSection = styled.header`
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  background-color: rgba(238, 238, 238, 1);
`;

const LinkBox = styled.div``;

const HeaderTitle = styled.div``;

const Btn = styled.button``;
