import React from "react";
import GoogleLoginBtn from "./GoogleLoginBtn";
import KakaoLoginBtn from "./KakaoLoginBtn";
import EmailLogin from "./EmailLogin";
import styled from "styled-components";
import line from "../assets/images/line.png";

import * as S from "../common/styles/StyledSpan";

const Login = () => {
  return (
    <ContentWrap>
      <LoginSection>
        <Wrap>
          <S.StyledBoldSpan20 margin={"50px 0 58px 0"}>
            {"로그인"}
          </S.StyledBoldSpan20>
          <EmailLogin />
        </Wrap>

        <BoundaryLine>
          <Img src={line} /> <S.StyledSpan16>또는</S.StyledSpan16>
          <Img src={line} />
        </BoundaryLine>
        <GoogleLoginBtn width="380px" height="60px" />
        <KakaoLoginBtn width="380px" height="60px" />
      </LoginSection>
    </ContentWrap>
  );
};

export default Login;

const ContentWrap = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
`;

const LoginSection = styled.section`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 75px;
  height: 100vh;
  gap: 20px;
`;

const Wrap = styled.div`
  width: 470px;
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 520px;
  gap: 10px;

  background-color: #ffff;
  border-radius: 10px;
`;

const BoundaryLine = styled.div`
  display: flex;
  width: 37%;
  align-items: center;
  gap: 15px;
`;

const Img = styled.img`
  height: 1px;
  width: 0;
  flex-grow: 1;
`;
