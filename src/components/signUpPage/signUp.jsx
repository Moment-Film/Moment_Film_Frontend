import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMutation } from "react-query";
import useInputValidation from "../../hooks/useInputValidation";
import StyledButton from "../common/component/StyledButton";
import InputField from "./InputField";
import useAuthAPI from "../../api/nonToken/auth";

function SignUp() {

  const {
    register
  }=useAuthAPI()

  const navigate = useNavigate();

  const {
    userName,
    phoneNum,
    email,
    password,
    userNameError,
    phoneNumError,
    emailError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleUserNameChange,
    handlePhoneNumChange,
  } = useInputValidation();

  const mutation = useMutation(register, {
    onSuccess: (data) => {
      alert("가입이 완료되었습니다!");
      navigate("/login");
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.msg;

      if (errorMsg) {
        alert(`${errorMsg}`);
        console.log(error);
      }
    },
  });

  const submitBtnHandler = async (event) => {
    event.preventDefault();
    if (userNameError || phoneNumError || emailError || passwordError) {
      let a = [userNameError, phoneNumError, emailError, passwordError]
      let signUpError = a.filter((item) => item !== '').join('\n')

      alert(signUpError)
      return 1;
    }

    const registerData = {
      username: userName,
      email,
      password,
      phone: phoneNum,
    };

    mutation.mutate(registerData);

  };

  return (
    <>
      <FormWrap>
        <SignUpTxt>회원가입</SignUpTxt>
        <FormBox>
          <InputField
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력하세요."
            label="이메일"
            // checkBtn={true}
            error={emailError}
          />

          <InputField
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력하세요. ( 6자리 이상 )"
            label="비밀번호"
            infoText="· 공백 없이 문자, 숫자 조합 필수 6 ~ 10자"
            error={passwordError}
          />

          <InputField
            name="phone"
            value={phoneNum}
            onChange={handlePhoneNumChange}
            placeholder="(-) 를 제외한 핸드폰번호를 입력하세요."
            label="휴대폰"
            error={phoneNumError}
          />

          <InputField
            name="username"
            value={userName}
            onChange={handleUserNameChange}
            placeholder="닉네임을 입력하세요."
            label="닉네임"
            // checkBtn={true}
            error={userNameError}
          />
        </FormBox>

        <div style={{ margin: "0 auto", marginBottom: "138px" }}>
          <StyledButton
            func={submitBtnHandler}
            title={"가입하기"}
            width={"172px"}
            height={"52px"}
            fontWeight={"500"}
          />
        </div>
      </FormWrap>
    </>
  );
}

export default SignUp;

const FormWrap = styled.div`
  margin-top: 120px;
  margin-bottom: 200px;
  max-width: 790px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
`;

const FormBox = styled.form`
  width: 790px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 2px solid var(--black);
  border-bottom: 2px solid var(--black);
  padding-top: 69px;
  padding-bottom: 77px;
  gap: 20px;
  margin-bottom: 50px;
`;

const SignUpTxt = styled.div`
  font-size: 24px;
  text-align: center;
  padding: 15px 15px 30px 15px;
  margin-top: 112px;
`;
