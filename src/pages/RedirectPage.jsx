import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { socialLogin } from '../api/snsUser';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { SetAccessToken } from '../redux/modules/AccessToken';

const RedirectPage = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const code = new URL(window.location.toString()).searchParams.get("code")
    const social='kakao'
    const {data,isLoading,isError,isSuccess} = useQuery(`kakao`,()=>socialLogin({code,social}))
    const [cookie,setCookie] = useCookies(['refresh']);

    const saveToken=async()=>{
        console.log(data);
        setCookie('refresh',data.headers.refreshtoken);
        await dispatch(SetAccessToken(data.headers.accesstoken));
        
    }

    if(isSuccess){
        console.log(data);
        saveToken()
        navigate('/'); 
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