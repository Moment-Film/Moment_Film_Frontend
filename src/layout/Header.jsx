import { useNavigate } from "react-router";
import styled from "styled-components";

function Header() {
  const navigate = useNavigate();
  return(
    <HeaderBox>Header
      <button onClick={()=>navigate(`/`)}>Home</button>
      <button onClick={()=>navigate(`/signup`)}>Sign Up</button>
      <button onClick={()=>navigate(`/login`)}>Log In</button>
      <button onClick={()=>navigate(`/post`)}>Post</button>
      <button onClick={()=>navigate(`/post/1`)}>PostDetail</button>
      <button onClick={()=>navigate(`/camera`)}>📸⚠️</button>
    </HeaderBox>
  )
}
export default Header;

const HeaderBox = styled.header`
  height: 80px;
  width: 100%;
  background-color: #eee;
`