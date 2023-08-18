import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { socialLogin } from '../api/snsUser';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { SetAccessToken } from '../redux/modules/AccessToken';
import base64 from "base-64"
import { SetUserInfo } from '../redux/modules/User';

const RedirectPage = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const code = new URL(window.location.toString()).searchParams.get("code")
    const social='kakao'
    const {data,isLoading,isError,isSuccess} = useQuery(`kakao`,()=>socialLogin({code,social}))
    const [cookie,setCookie] = useCookies(['refresh']);

    const saveToken=async()=>{
        console.log(data);
        const accesstoken=data.headers.accesstoken;
        const refreshtoken=data.headers.refreshtoken

        setCookie('refresh',refreshtoken);
        await dispatch(SetAccessToken(accesstoken));

        const jwtPayload = accesstoken.split(".")[1];
        const decodedPayload = JSON.parse(base64.decode(jwtPayload));
        console.log(decodedPayload);
        dispatch(SetUserInfo(decodedPayload))
        console.log('ac',accesstoken)
        console.log('rc',refreshtoken)
    }

    if(isSuccess){
        console.log(data);
        saveToken()
        navigate('https://view-teal.vercel.app/'); 
    }

    if(isError){
        alert("로그인 에러입니다 다시 시도해주세요");
    }

    return (
        <div>
            리다이렉트페이지입니다
        </div>
    );
};

export default RedirectPage;