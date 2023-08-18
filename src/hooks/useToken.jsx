import React from 'react';
import { useDispatch } from 'react-redux';
import { SetAccessToken } from '../redux/modules/AccessToken';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import CryptoJS from 'crypto-js'; // Correct import statement for crypto-js

const useToken = () => {
    const dispatch = useDispatch();
    const [cookie, setCookie] = useCookies(['refresh']);
    const AccsessToken = useSelector((state) => state.AccessToken.accessToken);

    const secretKey = 'u4v9TvHDCECamunpCEqv';

    // access 토큰 저장  
    const saveAccessToken = async (accessToken) => {
        const ciphertext = CryptoJS.AES.encrypt(accessToken, secretKey).toString();
        await dispatch(SetAccessToken(ciphertext));
    };

    // refresh 토큰 저장  
    const saveRefreshToken = async (refreshToken) => {
        const ciphertext = CryptoJS.AES.encrypt(refreshToken, secretKey).toString();
        await setCookie('refresh', ciphertext); // Set the encrypted refresh token in cookies
    };

    // access 토큰 가져오기  
    const getAccess = () => {
        const bytes = CryptoJS.AES.decrypt(AccsessToken, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    };

    // refresh 토큰 가져오기  
    const getRefresh = () => {
        const bytes = CryptoJS.AES.decrypt(cookie.refresh, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    };

    //토큰 복호화해서 유저정보 저장하기 
    const saveUserInfo = () => {
        const bytes = CryptoJS.AES.decrypt(cookie.refresh, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    };


    return {
        saveAccessToken,
        saveRefreshToken,
        getAccess,
        getRefresh
    };
};

export default useToken;
