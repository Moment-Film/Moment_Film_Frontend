import { useNavigate } from "react-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SetLanguage } from "../redux/modules/Language";

function SmallHeader() {
    const navigate = useNavigate();
    const language = useSelector((state) => state.Language.language)
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
                <Btn onClick={() => dispatch(SetLanguage(`${language === 'ko' ? 'en' : 'ko'}`))}>Language</Btn>

            </LinkBox>

            <LinkBox>
                <Btn onClick={() => navigate(`/search`)}>🔍</Btn>
                <Btn onClick={() => navigate(`/mypage`)}>ᕙ༼◕ ᴥ ◕༽ᕗ</Btn>
            </LinkBox>
        </HeaderSection>

    )
}
export default SmallHeader;

const HeaderSection = styled.header`

  top:0px;
  width:100%;
 height:30px;
 display:flex;
 justify-content: space-around;
 align-items:center;

 opacity:-1;

 background-color:rgba(238, 238, 238, 1);
 transition: height 0.3s ease;

 &:hover{
  top:0px;
  height: 60px; /* 호버 상태일 때 높이 증가 */

  display:flex;
  opacity:11;
 }

`

const LinkBox = styled.div`

`

const HeaderTitle = styled.div`

`

const Btn = styled.button`

`