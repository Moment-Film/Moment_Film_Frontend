import { useDispatch } from 'react-redux';
import { SetAccessToken } from '../redux/modules/AccessToken';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import CryptoJS from 'crypto-js'; 
import base64 from "base-64";
import { SetUserInfo } from '../redux/modules/User';

const useToken = () => {
    const dispatch = useDispatch();
    const [cookie, setCookie,removeCookie] = useCookies(['refresh']);
    const AccsessToken = useSelector((state) => state.AccessToken.accessToken);

    //env 폴더로 이동시킬예정 
    const secretKey = 'u4v9TvHDCECamunpCEqv';

    // access 토큰 저장  
    const saveAccessToken = async (accessToken) => {
        console.log(accessToken)
        if(accessToken){
            const ciphertext = CryptoJS.AES.encrypt(accessToken, secretKey).toString();
            await dispatch(SetAccessToken(ciphertext));
        }
        else{
            await dispatch(SetAccessToken(null));
        }

    };

    // refresh 토큰 저장  
    const saveRefreshToken = async (refreshToken) => {
        if(refreshToken){
            removeCookie('refresh')
            const ciphertext = CryptoJS.AES.encrypt(refreshToken, secretKey).toString();
            await setCookie('refresh', ciphertext); 
        }
        else{
            await setCookie('refresh', null); 
        } 

    };

    // access 토큰 가져오기  
    const getAccess = () => {
        if(!AccsessToken) return null;
        const bytes = CryptoJS.AES.decrypt(AccsessToken, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    };

    // refresh 토큰 가져오기  
    const getRefresh = () => {
        if(!cookie.refresh) return null;
        const bytes = CryptoJS.AES.decrypt(cookie.refresh, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    };

    //access 토큰 복호화해서 유저정보 저장하기 
    const saveUserInfo = (accessToken) => {
        const jwtPayload = accessToken.split(".")[1];        
        const decodedPayload = JSON.parse(base64.decode(jwtPayload));
        console.log(decodedPayload);
        dispatch(SetUserInfo(decodedPayload));
    };

    return {
        saveAccessToken,
        saveRefreshToken,
        getAccess,
        getRefresh,
        saveUserInfo
    };
};

export default useToken;
