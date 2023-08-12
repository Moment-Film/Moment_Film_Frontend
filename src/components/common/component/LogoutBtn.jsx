import React from 'react';
import { LogOutAPI } from '../../../api/snsUser';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

const LogoutBtn = () => {
    const [cookie,setCookie] = useCookies(['refresh']);
    const ACToken = useSelector((state) => state.AccessToken.accessToken);
    const LogOut=async()=>{
        const res = await LogOutAPI(ACToken,cookie.refresh);

    }

    return (
        <button onClick={LogOut}>
            로그아웃
        </button>
    );
};

export default LogoutBtn;