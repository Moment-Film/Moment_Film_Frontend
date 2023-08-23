import React from 'react';
import styled from 'styled-components';
// 보안이 되는 폴더??? 그런게 있다면 옮겨보자 

const REDIRECT_URI = 'https://view-teal.vercel.app/user/google/callback'
const REST_API_KEY= '130079254258-jg9vkidldjsvjg5u1fkncj66hs5iep9v.apps.googleusercontent.com'
const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?
response_type=code&
scope=email profile&
client_id=${REST_API_KEY}&
redirect_uri=${REDIRECT_URI}`;


const GoogleLoginBtn = ({width , height}) => {

    const googleSocialLogin = ()=>{
        window.location.href=googleUrl;
    }
            
    return (
            <GoogleBtn onClick={googleSocialLogin}  >구글로 바로시작</GoogleBtn>
    );
};

export default GoogleLoginBtn;

const GoogleBtn = styled.button`
    background-color: var(--lightGray);
    color : black;
    width: 320px;
    height: 52px;
    border :1px solid gray;
    border-radius: 5px;
`