import React from 'react';
import styled from 'styled-components';
import { SetAccessToken } from '../../redux/modules/AccessToken';
import { useDispatch } from 'react-redux';
import { ELogin } from '../../api/snsUser';
import useInputValidation from '../../hooks/useInputValidation';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../common/component/StyledButton';
import * as L from '../common/styles/StyledLink';
import * as I from '../common/styles/StyledInput';
import { useCookies } from 'react-cookie';

import base64 from "base-64"
import { SetUserInfo } from '../../redux/modules/User';

const EmailLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cookie,setCookie] = useCookies(['refresh']);

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
            if (response.status === 200) {
                console.log(response);
                const ACToken=response.headers.accesstoken;
  
                await dispatch(SetAccessToken(ACToken))
                setCookie('refresh',response.headers.refreshtoken);


                const jwtPayload = ACToken.split(".")[1];
                // payload 부분을 복호화한다.JWT는 base64방식으로 암호화 되어 있으므로 base64.decode로 복호화한 뒤
                // 복호화된 JSON 문자열을 쓸 수 있게 객체로 변환한다.
                const decodedPayload = JSON.parse(base64.decode(jwtPayload));
                console.log(decodedPayload);
                dispatch(SetUserInfo(decodedPayload))
                console.log('ac',ACToken)
                console.log('rc',cookie)
                /* navigate('/'); */
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
        mutation.mutate({ email, password })
    };

    return (
        <StyledForm>
            <InputSection>
                <I.StyledShortInput 
                    placeholder={'Email'}
                    value={email}
                    onChange={handleEmailChange}
                    type={'email'}
                    width={'50%'}
                />
                <ValidateResult>{emailError === '' ? <br /> : emailError}</ValidateResult>

                <I.StyledShortInput 
                    placeholder={'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    type={'password'}
                    width={'80%'}
                />
                <ValidateResult>{passwordError === '' ? <br /> : passwordError}</ValidateResult>
            </InputSection>

            <StyledButton func={LoginHandler} title={"로그인하기"} width={"369.9px"} height={'45px'} />

            <FindInfoSection>
                <L.StyledBoldLink16>
                    {'아이디를 잊으셨나요?'}
                </L.StyledBoldLink16>
                <L.StyledBoldLink16>
                    {'비밀번호를 잊으셨나요?'}
                </L.StyledBoldLink16>
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
    text-align:center;
`

const StyledInput = styled.input`
    width:380px;
    height:60px;
    font-size: 20px;
    background-color:rgba(248, 248, 248, 1);
    border:none;
    border-bottom:2px solid black;
    outline:none;
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