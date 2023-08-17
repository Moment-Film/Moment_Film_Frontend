import React from 'react';
import { LogOutAPI } from '../../../api/snsUser';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { SetAccessToken } from '../../../redux/modules/AccessToken';
import { useNavigate } from 'react-router';

const LogoutBtn = () => {
    const [cookie,setCookie] = useCookies(['refresh']);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const ACToken = useSelector((state) => state.AccessToken.accessToken);

    const LogOut=async()=>{
        const res = await LogOutAPI(ACToken,cookie.refresh);

        await dispatch(SetAccessToken(null));
        console.log(ACToken);
        navigate("/")
    }

    return (
        <button onClick={LogOut}>
            로그아웃
        </button>
    );
};

export default LogoutBtn;