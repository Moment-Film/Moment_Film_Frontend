import React from "react";
import useToken from "../../../hooks/useToken";
import { WithdrawalAPI } from "../../../api/nonToken/auth";
import { styled } from "styled-components";
import useAuthAPI from '../../../api/nonToken/auth';

const WithdrawalBtn = () => {

    const {
        WithdrawalAPI
    }=useAuthAPI()

    const {
        getAccess,
        getRefresh,
        saveAccessToken,
        saveRefreshToken,
      }=useToken();

const refreshToken = getRefresh();
  const accessToken = getAccess();
  const Withdrawal = async () => {
    const res = await WithdrawalAPI(accessToken, refreshToken);
    console.log(res);
    saveAccessToken(null);
    saveRefreshToken(null);
    alert("탈퇴되었습니다.");
  };

  return <WithdrawalBox onClick={Withdrawal}>회원탈퇴</WithdrawalBox>;
};

export default WithdrawalBtn;

const WithdrawalBox = styled.section`
  text-decoration: underline;
  color: var(--gray4);
  font-size: 12px;
  line-height: 150%;
	/* margin-top: 8px; */
  cursor: pointer;

  &:hover {
    color: var(--warningRed);
  }
`;
