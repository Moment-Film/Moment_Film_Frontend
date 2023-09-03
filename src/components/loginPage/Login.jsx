import React from "react";
import GoogleLoginBtn from "./GoogleLoginBtn";
import KakaoLoginBtn from "./KakaoLoginBtn";
import EmailLogin from "./EmailLogin";
import styled from "styled-components";
import line from "../assets/images/line.png";

import * as S from "../common/styles/StyledSpan";

const Login = () => {
  return (
      <LoginSection>
        <Wrap>
          <span className="title">
            {"로그인"}
          </span>
          <EmailLogin />
        </Wrap>

        <BoundaryLine>
          <Img src={line} /> <S.StyledSpan16>또는</S.StyledSpan16>
          <Img src={line} />
        </BoundaryLine>
        
        <SocialWrap>
        <GoogleLoginBtn width="380px" height="60px" />
        <KakaoLoginBtn width="380px" height="60px" />
        </SocialWrap>
      </LoginSection>
  );
};

export default Login;

const LoginSection = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 75px;

`;

const Wrap = styled.div`
  width: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 67px;

  padding:50px 35px 50px 35px; 
  background-color: #ffff;
  border-radius: 10px;
  border :1px solid var(--gray3);

  .title{
    font-size:24px;
    font-weight:600;
  }

  @media (max-width: 400px) {
    width:80%;
}
  
`;

const BoundaryLine = styled.div`
  display: flex;
  width: 370px;
  align-items: center;
  gap: 15px;
  margin-top:38.5px;
  margin-bottom:42.5px;
`;

const Img = styled.img`
  height: 1px;
  width: 0;
  flex-grow: 1;
`;

const SocialWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap:23px;
`;
