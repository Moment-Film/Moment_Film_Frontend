import { useNavigate } from "react-router";
import styled from "styled-components";

function Header() {
  const navigate = useNavigate();
  return(
    <HeaderBox>
      <Btn onClick={()=>navigate(`/`)}>Home</Btn>
      <Btn onClick={()=>navigate(`/signup`)}>Sign Up</Btn>
      <Btn onClick={()=>navigate(`/login`)}>Log In</Btn>
      <Btn onClick={()=>navigate(`/post`)}>Post</Btn>
      <Btn onClick={()=>navigate(`/post/1`)}>PostDetail</Btn>
      <Btn onClick={()=>navigate(`/camera/guide`)}>⚠️📸⚠️</Btn>
      
      <Btn onClick={()=>navigate(`/search`)} style={{marginLeft:'550px'}}>🔍</Btn>
      <Btn onClick={()=>navigate(`/mypage`)}>ᕙ༼◕ ᴥ ◕༽ᕗ</Btn>
    </HeaderBox>
  )
}
export default Header;

const HeaderBox = styled.header`
  height: 80px;
  width: 100%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const Btn = styled.button`
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: background-color 0.5s ease;
  &:hover {
    background-color: grey;
  }
`