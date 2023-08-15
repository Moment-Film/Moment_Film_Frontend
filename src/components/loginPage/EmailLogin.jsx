import React from "react";
import styled from "styled-components";
import { SetAccessToken } from "../../redux/modules/AccessToken";
import { useDispatch } from "react-redux";
import { ELogin } from "../../api/snsUser";
import useInputValidation from "../../hooks/useInputValidation";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import StyledButton from "../common/component/StyledButton";
import * as L from "../common/styles/StyledLink";
import { useCookies } from "react-cookie";

import base64 from "base-64";
import { SetUserInfo } from "../../redux/modules/User";
import right_arrow from "../assets/images/right_arrow.png";
import inputDelete from "../assets/icons/inputDelete.svg";
// import useRefreshToken from "../../hooks/useRefreshToken";

const EmailLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies(["refresh"]);

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

  const mutation = useMutation(ELogin, {
    onSuccess: async (response) => {
      if (response.status === 200) {
        console.log(response);
        const ACToken = response.headers.accesstoken;

        await dispatch(SetAccessToken(ACToken));
        setCookie("refresh", response.headers.refreshtoken);

        const jwtPayload = ACToken.split(".")[1];
        // payload 부분을 복호화한다.JWT는 base64방식으로 암호화 되어 있으므로 base64.decode로 복호화한 뒤
        // 복호화된 JSON 문자열을 쓸 수 있게 객체로 변환한다.
        const decodedPayload = JSON.parse(base64.decode(jwtPayload));
        console.log(decodedPayload);
        dispatch(SetUserInfo(decodedPayload));
        console.log("ac", ACToken);
        console.log("rc", cookie);
        /* navigate('/'); */
      }
    },
    onError: (error) => {
      alert("에러입니다");
    },
  });

  //로그인 버튼 클릭 시  동작
  const LoginHandler = async (e) => {
    e.preventDefault();
    console.log("qwe");
    mutation.mutate({ email, password });
    navigate(-1);
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
        {
          <ValidateResult>
            존재하지 않는 아이디나 비밀번호입니다.
          </ValidateResult>
        }
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

const AddressInput = styled.input`
  width: 100%;
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
