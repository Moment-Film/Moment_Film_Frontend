import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../api/user';
import { useMutation } from 'react-query';
import useInputValidation from './../hooks/useInputValidation';


function SignUpPage() {

  const navigate = useNavigate();

  const {
    userName,
    phoneNum,
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleUserNameChange,
    handlePhoneNumChange,
  } = useInputValidation();

  const mutation = useMutation( register, {
    onSuccess: (data) => {
      if (data) {
        alert("회원가입 성공!");
        navigate('/login');
      }
    },
    onError: (error) => {
      alert("회원가입 오류입니다.");
      console.log(error)
    },
  });

  
  const submitBtnHandler = async (event) => {
    event.preventDefault();
    const registerData = {
      username : userName,
      email,
      password,
      phone : phoneNum,
    };

    mutation.mutate(registerData);
    alert('가입이 완료되었습니다!')
    navigate('/login')
  }

  return (
    <>
      <FormWrap>
        <FormBox>
          <SignUp>회원가입</SignUp>
          <InputForm name="username" value={userName} onChange={handleUserNameChange} placeholder='이름을 입력하세요.' />
          <InputForm name="email" value={email} onChange={handleEmailChange} placeholder='이메일을 입력하세요.' />
          <InputForm name="password" type='password' value={password} onChange={handlePasswordChange} placeholder='비밀번호를 입력하세요. ( 5자리 이상 )' />
          <InputForm name="phone" value={phoneNum} onChange={handlePhoneNumChange} placeholder='(-) 를 제외한 핸드폰번호를 입력하세요.' />
          <SubmitBtn onClick={submitBtnHandler}>가입하기</SubmitBtn>
        </FormBox>
      </FormWrap>
    </>
  )
}

export default SignUpPage;

const FormWrap = styled.div`
  margin-top: 150px;
  margin-bottom: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
`

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const SignUp = styled.div`
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  padding: 15px;
`

const InputForm = styled.input`
  width: 300px;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 5px;
`

// const WarningMessage = styled.div`
//   color: red;
//   font-size: 12px;
//   margin-bottom: 20px;
// `

const SubmitBtn = styled.div`
  width: 276px;
  height: 25px;
  border: 1px solid green;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
`