import React from 'react';
import styled from 'styled-components';
import googleImg from '../assets/login/google.svg';
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
            <GoogleBtn onClick={googleSocialLogin}  >
                <img src={googleImg} alt="" />
            </GoogleBtn>
    );
};

export default GoogleLoginBtn;

const GoogleBtn = styled.div`
    width: 320px;
    height: 52px;

    img{
        width:100%;
    }
`