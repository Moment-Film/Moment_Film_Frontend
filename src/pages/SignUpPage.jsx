import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../api/user';
import { useMutation } from 'react-query';


function SignUpPage() {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [phoneNumWarning, setphoneNumWarning] = useState(false);

  const navigate = useNavigate();

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


  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassWordChange = (event) => {
    const newPassword = event.target.value;
    setPassWord(newPassword);

    // 비밀번호 길이 검증
    if (newPassword.length < 5) setPasswordWarning(true);
    else setPasswordWarning(false);

  };

  const handlePhoneNumChange = (event) => {
    const newphoneNum = event.target.value;
    setPhoneNum(newphoneNum);

    // 핸드폰번호 길이 검증
    if (newphoneNum.length < 11) setphoneNumWarning(true);

    else setphoneNumWarning(false);

  };
  
  const submitBtnHandler = async () => {
    const registerData = {
      username : userName,
      email,
      password : passWord,
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
          <InputForm value={userName} onChange={handleUserNameChange} placeholder='이름을 입력하세요.' />

          <InputForm value={email} onChange={handleEmailChange} placeholder='이메일을 입력하세요.' />

          <InputForm type='password' value={passWord} onChange={handlePassWordChange} placeholder='비밀번호를 입력하세요. ( 5자리 이상 )' />
          {passwordWarning && <WarningMessage>비밀번호는 5자리 이상이어야 합니다.</WarningMessage>}

          <InputForm value={phoneNum} onChange={handlePhoneNumChange} placeholder='(-) 를 제외한 핸드폰번호를 입력하세요.' />
          {phoneNumWarning && <WarningMessage>핸드폰번호는 11자리 이상이어야 합니다.</WarningMessage>}

          <SubmitBtn onClick={submitBtnHandler}>가입하기</SubmitBtn>
        </FormBox>
      </FormWrap>
    </>
  )
}

export default SignUpPage;

const FormWrap = styled.div`
  margin-top: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
`

const FormBox = styled.div`
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

const WarningMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 20px;
`

const SubmitBtn = styled.div`
  width: 276px;
  height: 25px;
  border: 1px solid green;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
`