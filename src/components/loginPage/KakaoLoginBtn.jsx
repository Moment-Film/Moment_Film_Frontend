import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import kakoImg from '../assets/login/kakao.svg'


const KakaoLoginBtn = ({width, height}) => {

    const code1 = new URL(window.location.toString()).searchParams.get("code")
    // 주소값에서 뽑아오는 부분 
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const keyword=searchParams.get('code')

    const handleLogin =()=>{
        window.location.href=process.env.REACT_APP_KAKAO_URI;
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
