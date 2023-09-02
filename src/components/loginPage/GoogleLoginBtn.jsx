import React from 'react';
import styled from 'styled-components';
import googleImg from '../assets/login/google.svg';
// 보안이 되는 폴더??? 그런게 있다면 옮겨보자 


const GoogleLoginBtn = ({width , height}) => {

    const googleSocialLogin = ()=>{
        window.location.href=process.env.REACT_APP_GOOGLE_URI;
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