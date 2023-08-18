import React from 'react';
/* import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; */
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { socialLogin } from '../../api/snsUser';
import { useCookies } from 'react-cookie';
import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import useToken from '../../hooks/useToken';

// 보안이 되는 폴더??? 그런게 있다면 옮겨보자 
const clientId = '130079254258-jg9vkidldjsvjg5u1fkncj66hs5iep9v.apps.googleusercontent.com'

const GoogleLoginBtn = ({width , height}) => {

    const {
        getRefresh,
        saveRefreshToken,
        saveUserInfo
      }=useToken();


    const navigate = useNavigate();
    const [cookie,setCookie] = useCookies(['refresh']);
    const refreshToken = getRefresh();


    const mutation = useMutation(socialLogin,{
        onSuccess:async(response)=>{
/*             if(response.status===201){
    //엑세스 토큰 리프레쉬 토큰을 전달받을거임 
    //그때 아래 리프레시토큰저장하는 로직을 여기로 옮김 
                await dispatch(SetAccessToken(response.data.accessToken))
                navigate('/');
            } */
        },
        onError: (error)=>{
            alert('에러입니다');
        }
    })

    const handleOnSuccess = async({ credential }) => {
        // 아직 리프레쉬 토큰이랑 받는게 없어서 이렇게 둠 
        console.log(credential)
        //확인용임 추후 위로 올릴것
        await setCookie('refresh',credential);
        console.log(cookie.refresh);
        const social='google';
        const code= credential
        mutation.mutate({code,social});
    }

    return (
/*         <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
            onSuccess={(res) => {
                console.log(res);
            }}
            onFailure={(err) => {
                console.log(err);
            }}
        />
    </GoogleOAuthProvider> */
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin onSuccess={handleOnSuccess} width={width} height={height} />
        </GoogleOAuthProvider>

    );
};

export default GoogleLoginBtn;

