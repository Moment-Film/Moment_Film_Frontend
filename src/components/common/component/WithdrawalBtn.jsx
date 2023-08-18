import React from 'react';
import useToken from '../../../hooks/useToken';
import { WithdrawalAPI } from '../../../api/snsUser';

const WithdrawalBtn = () => {

    const {
        getAccess,
        getRefresh,
        saveAccessToken,
        saveRefreshToken,
      }=useToken();

    const refreshToken=getRefresh();
    const accessToken=getAccess()

    const Withdrawal = async () => {
        const res = await WithdrawalAPI(accessToken, refreshToken);
        console.log(res);
        saveAccessToken(null)
        saveRefreshToken(null)
        alert("탈퇴되었습니다.")
    }

    return (
        <button onClick={Withdrawal}>
            회원탈퇴
        </button>
    );
};

export default WithdrawalBtn;