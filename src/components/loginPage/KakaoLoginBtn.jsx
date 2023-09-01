import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import kakoImg from '../assets/login/kakao.svg'

///안전한 폴더에서 모아서 관리 해보자 
const Rest_api_key ='2e877086c066dea8246d1b0796d4c68f'
const redirect_uri='https://view-teal.vercel.app/user/kakao/callback'
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

const KakaoLoginBtn = ({width, height}) => {

    const code1 = new URL(window.location.toString()).searchParams.get("code")
    // 주소값에서 뽑아오는 부분 
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const keyword=searchParams.get('code')

    const handleLogin =()=>{
        window.location.href=kakaoURL;
    }

    return (
            <KakaoBtn onClick={handleLogin} >
                <img src={kakoImg} alt="" />
            </KakaoBtn>
    );
};

export default KakaoLoginBtn;


const KakaoBtn = styled.div`
    width: 320px;
    height: 52px;
    img{
        width:100%;
    }
`
