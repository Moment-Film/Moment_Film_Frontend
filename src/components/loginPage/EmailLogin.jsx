import React, { useState } from "react";
import styled from "styled-components";
import { ELogin } from "../../api/snsUser";
import useInputValidation from "../../hooks/useInputValidation";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import StyledButton from "../common/component/StyledButton";
import * as L from "../common/styles/StyledLink";

import right_arrow from "../assets/images/right_arrow.png";
import inputDelete from "../assets/icons/inputDelete.svg";
import useToken from "../../hooks/useToken";


const EmailLogin = () => {
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const {
    email,
    password,
    emailError,
    passwordError,
    eMailDeleteHandler,
    passwordDeleteHandler,
    handleEmailChange,
    handlePasswordChange,
  } = useInputValidation();

  const {
    saveAccessToken,
    saveRefreshToken,
    saveUserInfo
  }=useToken();

  const mutation = useMutation(ELogin, {
    onSuccess: async (response) => {
      if (response.status === 200) {
        console.log(response);
        const ACToken = response.headers.accesstoken;

        //토큰 저장
        await saveAccessToken(ACToken);
        await saveRefreshToken(response.headers.refreshtoken);
        //토큰에서 유저정보 가져오기 
        await saveUserInfo(ACToken);

        setLoginError(null);
        navigate(-1);
      }
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.msg;

      if (errorMsg && errorMsg.includes("잘못된 로그인 정보입니다.")) {
        setLoginError("존재하지 않는 아이디나 비밀번호입니다.");
      } else {
        setLoginError("로그인 중 문제가 발생했습니다.");
      }
    },
  });

  //로그인 버튼 클릭 시  동작
  const LoginHandler = async (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      mutation.mutate({ email, password });
    }
  };

  return (
    <StyledForm>
      <InputSection>
        <LinkBox>
          <L.StyledLink14 to={"/signup"}>
            {"회원가입하기"}
            <img src={right_arrow} alt=""></img>
          </L.StyledLink14>
        </LinkBox>

        <InputWrap>
          <AddressInput
            placeholder={"아이디(이메일)"}
            value={email}
            onChange={handleEmailChange}
            type={"email"}
          />
          <img onClick={eMailDeleteHandler} src={inputDelete} alt="" />
        </InputWrap>

        <InputWrap>
          <AddressInput
            placeholder={"비밀번호"}
            value={password}
            onChange={handlePasswordChange}
            onKeyPress={handleKeyPress}
            type={"password"}
          />
          <img onClick={passwordDeleteHandler} src={inputDelete} alt="" />
        </InputWrap>
      </InputSection>
      <div
        style={{
          width: "70%",
          marginBottom: "25px",
        }}
      >
        {loginError && <ValidateResult>{loginError}</ValidateResult>}
      </div>
      <div style={{ width: "370px", marginBottom: "24px" }}>
        <StyledButton
          func={LoginHandler}
          title={"로그인"}
          width={"97%"}
          height={"45px"}
        />
      </div>

      <FindInfoSection>
        <div>{"아이디를 잊으셨나요?"}</div>
        <div>|</div>
        <div>{"비밀번호를 잊으셨나요?"}</div>
      </FindInfoSection>
    </StyledForm>
  );
};

export default EmailLogin;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputSection = styled.section`
  width: 70%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 22px;
`;

const LinkBox = styled.div`
  margin-left: auto;
`;

const InputWrap = styled.div`
  width: 100%;
  height: 60px;
  font-size: 20px;
  background-color: rgb(251, 252, 249);
  border: none;
  border-bottom: 2px solid var(--green5);
  outline: none;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 19px 18px;
`;

export const AddressInput = styled.input`
  width: 85%;
  font-size: 16px;
  line-height: 18px;
  background: none;
  border: none;

  &:focus {
    outline: none;
    border: none;
  }
`;
const FindInfoSection = styled.section`
  display: flex;
  gap: 15px;
  padding-bottom: 20px;
  text-decoration: none;

  div {
    font-size: 16px;
    text-align: center;
    color: var(--gray4);
  }
`;

const ValidateResult = styled.div`
  font-size: 16px;
  /* padding: 5px 0 5px 10px; */
  margin-bottom: 5px;
  color: rgba(252, 91, 112, 1);
`;
