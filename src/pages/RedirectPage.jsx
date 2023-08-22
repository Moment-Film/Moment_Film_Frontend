import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import useToken from '../hooks/useToken';
import { useLocation } from 'react-router-dom';
import useAuthAPI from '../api/nonToken/auth';

const RedirectPage = () => {

    const{
        socialLogin
    }=useAuthAPI()

    let social=''

    const navigate=useNavigate();

    const location=useLocation();
    const searchParams = new URLSearchParams(location.search)
    const code=searchParams.get('code');

    useEffect(()=>{
         if(location.pathname.includes('google')) social='google'
        else if (location.pathname.includes('kakao')) social='kakao'
    },[])

    const {
        saveAccessToken,
        saveRefreshToken,
        saveUserInfo
      }=useToken();
    
    const {data,isLoading,isError,isSuccess} = useQuery(`social`,()=>socialLogin({code,social}))

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