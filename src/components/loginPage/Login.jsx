import React from 'react';
import GoogleLoginBtn from './GoogleLoginBtn';
import KakaoLoginBtn from './KakaoLoginBtn';
import EmailLogin from './EmailLogin';
import styled from 'styled-components';

const Login = () => {
    return (
        <LoginSection>
            <Wrap>
            <EmailLogin />
            <GoogleLoginBtn width='100%' height='50px'/>
            <KakaoLoginBtn width='100%' height='50px'/>
            </Wrap>
        </LoginSection>
    );
};

export default Login;

const LoginSection = styled.section`
    display:flex;
    justify-content:center;
    align-items:center;
`

const Wrap = styled.div`
    display:flex;
    flex-direction:column;
    width:70%;

`