import { useNavigate } from "react-router";
import styled from "styled-components";
import { useSelector,useDispatch } from "react-redux";
import { SetLanguage } from "../redux/modules/Language";

function Header() {
  const navigate = useNavigate();

  const language = useSelector((state)=>state.Language.language)
  const dispatch = useDispatch();

  return (
    <HeaderSection>
      <HeaderTitle>
        <span onClick={() => navigate(`/`)} >Momonet Film</span>
      </HeaderTitle>

      <LinkBox>
        <Btn onClick={() => navigate(`/`)}>Home</Btn>
        <Btn onClick={() => navigate(`/signup`)}>Sign Up</Btn>
        <Btn onClick={() => navigate(`/login`)}>Log In</Btn>
        <Btn onClick={() => navigate(`/post`)}>Post</Btn>
        <Btn onClick={() => navigate(`/post/1`)}>PostDetail</Btn>
        <Btn onClick={() => navigate(`/camera/frameSelect`)}>⚠️📸⚠️</Btn>
        <Btn onClick={() =>dispatch(SetLanguage(`${language==='ko' ? 'en' : 'ko'}`))}>Language</Btn>

      </LinkBox>

      <LinkBox>
        <Btn onClick={() => navigate(`/search`)}>🔍</Btn>
        <Btn onClick={() => navigate(`/mypage`)}>ᕙ༼◕ ᴥ ◕༽ᕗ</Btn>
      </LinkBox>
    </HeaderSection>

  )
}
export default Header;

const HeaderSection = styled.header`
 height:60px;
 display:flex;
 justify-content: space-around;
 align-items:center;

 background-color:rgba(238, 238, 238, 1);

`

const LinkBox = styled.div`

`

const HeaderTitle = styled.div`

`

const Btn = styled.button`

`