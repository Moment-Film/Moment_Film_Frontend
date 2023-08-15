import React from 'react';
import { LogOutAPI } from '../../../api/snsUser';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { SetAccessToken } from '../../../redux/modules/AccessToken';

const LogoutBtn = () => {
    const [cookie,setCookie] = useCookies(['refresh']);
    const dispatch=useDispatch();
    const ACToken = useSelector((state) => state.AccessToken.accessToken);

    const LogOut=async()=>{
        const res = await LogOutAPI(ACToken,cookie.refresh);
        dispatch(SetAccessToken(null));
        alert("로그아웃이 완료되었습니다.")
    }

    return (
        <button onClick={LogOut}>
            로그아웃
        </button>
    );
};

export default LogoutBtn;