import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SetAccessToken } from '../../redux/modules/AccessToken';
import { useDispatch } from 'react-redux';
import { ELogin } from '../../api/snsUser';
import useInputValidation from '../../hooks/useInputValidation';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const EmailLogin = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();

    const
    {
        email, 
        password,
        emailError,
        passwordError,
        handleEmailChange,
        handlePasswordChange
    } = useInputValidation()

    const mutation = useMutation(ELogin,{
        onSuccess:async(response)=>{
            if(response.status===201){
                await dispatch(SetAccessToken(response.data.token))
                navigate('/');
            }
        },
        onError: (error)=>{
            alert('에러입니다');
        }
    })

    //로그인 버튼 클릭 시  동작 
    const LoginHandler = async(e) => {
        e.preventDefault()
       /*  mutation.mutate({email,password}) */
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