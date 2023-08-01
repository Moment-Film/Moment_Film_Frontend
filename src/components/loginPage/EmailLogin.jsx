import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SetAccessToken } from '../../redux/modules/AccessToken';
import { useDispatch } from 'react-redux';
import { ELogin } from '../../api/snsUser';
import useInputValidation from '../../hooks/useInputValidation';

const EmailLogin = () => {
    
    const dispatch = useDispatch();

    const{email, password,emailError,passwordError,handleEmailChange,handlePasswordChange}=useInputValidation()

    //로그인 버튼 클릭 시  동작 
    const LoginHandler = async(e) => {
        e.preventDefault()
/*         const response = await ELogin({email,password})
        //이부분 수정하자 너무 막해놨음 
        //로그인 성공시 페이지 이동 추가할 것 
        console.log(response)
         if(response!=undefined)
            dispatch(SetAccessToken(response.data.token)) */
    };

    return (
        <StyledForm>
            <input
                placeholder='Email'
                type='email'
                value={email}
                onChange={handleEmailChange}
            />
            <div>{emailError}</div>

            <input
                placeholder='password'
                type='password'
                value={password}
                onChange={handlePasswordChange}
            />
            <div>{passwordError}</div>

            <button onClick={LoginHandler}>{'로그인 하기'}</button>
        </StyledForm>
    );
};

export default EmailLogin;

const StyledForm = styled.form`
    display:flex;
    flex-direction:column;
`