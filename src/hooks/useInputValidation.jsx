import { useState } from "react";

// 이메일 형식의 검사
// 비밀번호가 5자리 이상인지 검사 
// 각 이메일과 패스워드의 useState 존재 
// 유효성검사의 결과가 들어갈( userNameError, phoneNumError, emailError , passwordError ) useState존재 

const useInputValidation = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userName, setUserName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [phoneNumError, setPhoneNumError] = useState('');

    ////////////////// 유효성 검사////////////////////// 

    // 이메일 유효성검사
    const validateEmail = (input) => {
        
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!input) {
          setEmailError('이메일을 입력해주세요.');
        } 
        else if (!emailPattern.test(input)) {
          setEmailError('유효한 이메일 주소를 입력해주세요.');
        } 
        else {
          setEmailError('');
        }
      };

    // 패스워드 유효성 검사
      const validatePassword = (input) => {
        if (!input) {
          setPasswordError('비밀번호를 입력해주세요.');
        } 
        else if (input.length < 6) {
          setPasswordError('비밀번호는 최소 6자 이상이어야 합니다.');
        } 
        else {
          setPasswordError('');
        }
      };
      
      // 닉네임 유효성 검사
      const validateUserName = (input) => {
        const userNamePattern = /^[a-zA-Z]{2,10}$/;
        if (!input) {
          setUserNameError('이름을 입력해주세요.');
        } 
        else if (!userNamePattern.test(input)) {
          setUserNameError('이름은 2-10자리 알파벳 문자만 가능합니다.');
        } 
        else {
          setUserNameError('');
        }
      };

      // 전화번호 유효성 검사
      const validatePhoneNum = (input) => {
        if (!input) {
          setPhoneNumError('전화번호를 입력해주세요.');
        } 
        else if (input.length !== 11) {
          setPhoneNumError('전화번호는 11자리 숫자여야 합니다.');
        } 
        else {
          setPhoneNumError('');
        }
      };
      ////////////////// 변경 함수////////////////////// 

      const handleEmailChange = (e) => {
        console.log(email)
        setEmail(e.target.value);
        validateEmail(e.target.value);
      };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validatePassword(e.target.value);
      };
    
      const handleUserNameChange = (e) => {
        setUserName(e.target.value);
        validateUserName(e.target.value);
      };

      const handlePhoneNumChange = (e) => {
          setPhoneNum(e.target.value);
          validatePhoneNum(e.target.value);
      };

      const eMailDeleteHandler = () => {
        setEmail("")
      }

      const passwordDeleteHandler = () => {
        setPassword("")
      }

      return {
        userName,
        phoneNum,
        email,
        password,
        userNameError,
        phoneNumError,
        emailError,
        passwordError,
        eMailDeleteHandler,
        passwordDeleteHandler,
        handleEmailChange,
        handlePasswordChange,
        handleUserNameChange,
        handlePhoneNumChange,
      };
}

export default useInputValidation;