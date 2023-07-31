import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { socialLogin } from '../../api/snsUser';

// 보안이 되는 폴더??? 그런게 있다면 옮겨보자 
const clientId = '130079254258-jg9vkidldjsvjg5u1fkncj66hs5iep9v.apps.googleusercontent.com'

const GoogleLoginBtn = ({width , height}) => {

    const navigate = useNavigate();

    const mutation = useMutation(socialLogin, {
        onSuccess: (response) => {
            navigate('/')
        },
        onError: (error)=>{
            console.log("에러")
        }
      })


    const handleOnSuccess = ({ credential }) => {
        const social='google';
        mutation.mutate({credential,social});
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin onSuccess={handleOnSuccess} width={width} height={height} />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginBtn;