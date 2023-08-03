import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SetAccessToken } from '../../redux/modules/AccessToken';
import { useDispatch } from 'react-redux';
import { ELogin } from '../../api/snsUser';
import useInputValidation from '../../hooks/useInputValidation';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import StyledButton from '../common/StyledButton';

const EmailLogin = () => {
    const navigate = useNavigate();
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

    const mutation = useMutation(ELogin, {
        onSuccess: async (response) => {
            if (response.status === 201) {
                await dispatch(SetAccessToken(response.data.token))
                navigate('/');
            }
        },
        onError: (error) => {
            alert('에러입니다');
        }
    })

    //로그인 버튼 클릭 시  동작 
    const LoginHandler = async (e) => {
        e.preventDefault()
        console.log("qwe")
         mutation.mutate({email,password})
    };

    return (
        <StyledForm>
            <InputSection>
                <StyledInput
                    placeholder='   Email'
                    type='email'
                    value={email}
                    onChange={handleEmailChange}
                />
                <ValidateResult>{emailError===''? <br/> : emailError}</ValidateResult>

                <StyledInput
                    placeholder='   password'
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                />
                <ValidateResult>{passwordError===''? <br/> : passwordError}</ValidateResult>
            </InputSection>

            <StyledButton func={LoginHandler} title={"로그인하기"} width={"369.9px"} height={'45px'}/>

        <FindInfoSection>
            <StyledLink>
                {'아이디를 잊으셨나요?'}
            </StyledLink>
            <StyledLink>
                {'비밀번호를 잊으셨나요?'}
            </StyledLink>
        </FindInfoSection>
        </StyledForm>
    );
};

export default EmailLogin;

const StyledForm = styled.form`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    gap:20px;
`
const InputSection = styled.section`
    width:100%;

`

const StyledInput = styled.input`
    width:100%;
    height:60px;
    font-size: 20px;
    background-color:rgba(248, 248, 248, 1);
    border:none;
    border-bottom:2px solid black;
    outline:none;


`

const StyledLink = styled(Link)`
    text-align:center;
    text-decoration:none;
    font-size: 16px;
    font-weight:bold;
`

const FindInfoSection = styled.section`
    display:flex;
    flex-direction:column;
    gap:5px;
    padding-bottom:20px;
`

const ValidateResult = styled.span`
    font-size:16px;
    padding:5px 0 5px 10px;
    margin-bottom:5px;
    color:rgba(252, 91, 112, 1);
    
`