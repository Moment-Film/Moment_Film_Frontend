import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

import { WithdrawalAPI } from '../../../api/snsUser';

const WithdrawalBtn = () => {
    const [cookie, setCookie] = useCookies(['refresh']);
    const ACToken = useSelector((state) => state.AccessToken.accessToken);

    const Withdrawal = async () => {
        const res = await WithdrawalAPI(ACToken, cookie.refresh);
        alert("탈퇴되었습니다.")
    }

    return (
        <button onClick={Withdrawal}>
            회원탈퇴
        </button>
    );
};

export default WithdrawalBtn;