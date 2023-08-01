import React,{useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { socialLogin } from '../../api/snsUser';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

///안전한 폴더에서 모아서 관리 해보자 
const Rest_api_key ='2e877086c066dea8246d1b0796d4c68f'
const redirect_uri='http://localhost:3000/login'
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

const KakaoLoginBtn = ({width, height}) => {
    // 주소값에서 뽑아오는 부분 
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const keyword=searchParams.get('code')
    
    console.log(keyword);

    const navigate = useNavigate();

    const mutation = useMutation(socialLogin, {
        onSuccess: (response) => {
            navigate('/')
        },
        onError: (error)=>{
            console.log("에러")
        }
    })


    const handleLogin =()=>{
        window.location.href=kakaoURL;
    }

    useEffect(()=>{
        if(keyword!==null){
            const social='kakao';
            const credential = keyword;
            mutation.mutate({credential,social});
        }
    },[])

    return (
            <KakaoBtn onClick={handleLogin} width={width} height={height}>{'카카오로 바로시작'}</KakaoBtn>
    );
};

export default KakaoLoginBtn;


const KakaoBtn = styled.button`
    background-color: yellow;
    color : black;
    width: ${(props=>props.width)};
    height: ${(props=>props.height)};
    border:none;
`
