import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { socialLogin } from '../api/snsUser';
import useToken from '../hooks/useToken';

const RedirectPage = () => {

    const navigate=useNavigate();

    const {
        saveAccessToken,
        saveRefreshToken,
        saveUserInfo
      }=useToken();

    const code = new URL(window.location.toString()).searchParams.get("code")
    const social='kakao'
    const {data,isLoading,isError,isSuccess} = useQuery(`kakao`,()=>socialLogin({code,social}))

    const saveToken=async()=>{

        saveRefreshToken(data.headers.refreshtoken)
        saveAccessToken(data.headers.accesstoken);
        saveUserInfo(data.headers.accesstoken)
    }

    useEffect(()=>{
        if(isSuccess){
            console.log(data);
            saveToken()
            navigate('/'); 
        }
    },[isSuccess])


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