import { useDispatch } from "react-redux";
import { SetAccessToken } from "../redux/modules/AccessToken";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { decode } from "base-64";
import { SetUserInfo } from "../redux/modules/User";

const useToken = () => {
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(["refresh"]);
  const AccsessToken = useSelector((state) => state.AccessToken.accessToken);

  //env 폴더로 이동시킬예정
  const secretKey = process.env.REACT_APP_SECRET_KEY;

  // access 토큰 저장
  const saveAccessToken = async (accessToken) => {
    //console.log(accessToken);
    if (accessToken) {
      const ciphertext = CryptoJS.AES.encrypt(
        accessToken,
        secretKey
      ).toString();
      await dispatch(SetAccessToken(ciphertext));
    } else {
      await dispatch(SetAccessToken(null));
    }
  };

  // refresh 토큰 저장
  const saveRefreshToken = async (refreshToken) => {
    if (refreshToken) {
      removeCookie("refresh");
      const ciphertext = CryptoJS.AES.encrypt(
        refreshToken,
        secretKey
      ).toString();
      await setCookie("refresh", ciphertext,{ expires: 0 });

      const jwtPayload = refreshToken.split(".")[1];

      const base64DecodedPayload = decode(jwtPayload);
      const utf8DecodedPayload = new TextDecoder().decode(
        Uint8Array.from(base64DecodedPayload, (c) => c.charCodeAt(0))
      );
      const decodedPayload = JSON.parse(utf8DecodedPayload);
      //console.log(decodedPayload.exp); // 만료시간

      // 현재 시간을 밀리초로 얻어옵니다.
      const currentMilliseconds = new Date().getTime();

      // 밀리초를 초로 변환합니다.
      const currentUnixTimestamp = Math.floor(currentMilliseconds / 1000);
      //console.log(decodedPayload.exp - currentUnixTimestamp - 300);

      const time = parseInt((decodedPayload.exp - currentUnixTimestamp)*1000) 
      console.log( time)

      setTimeout(() => {
        alert("5분 뒤 로그아웃됩니다 다시 로그인해주세요");
      }, time-300);

      setTimeout(async() => {
        alert("로그아웃 되었습니다 다시 로그인 해주세요");
        await removeCookie("refresh");
        await dispatch(SetAccessToken(null));
      }, time);
      
    } else {
      await setCookie("refresh", null,{ expires: 0 });
    }
  };

  // access 토큰 가져오기
  const getAccess = () => {
    //console.log(AccsessToken);
    if (!AccsessToken) return null;
    const bytes = CryptoJS.AES.decrypt(AccsessToken, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

  // refresh 토큰 가져오기
  const getRefresh = () => {
    if (!cookie.refresh) return null;
    const bytes = CryptoJS.AES.decrypt(cookie.refresh, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

  //access 토큰 복호화해서 유저정보 저장하기
  const saveUserInfo = (accessToken) => {
    const jwtPayload = accessToken.split(".")[1];

    const base64DecodedPayload = decode(jwtPayload);
    const utf8DecodedPayload = new TextDecoder().decode(
      Uint8Array.from(base64DecodedPayload, (c) => c.charCodeAt(0))
    );
    const decodedPayload = JSON.parse(utf8DecodedPayload);
    //console.log(decodedPayload);
    dispatch(SetUserInfo(decodedPayload));
  };

  return {
    saveAccessToken,
    saveRefreshToken,
    getAccess,
    getRefresh,
    saveUserInfo,
  };
};

export default useToken;
