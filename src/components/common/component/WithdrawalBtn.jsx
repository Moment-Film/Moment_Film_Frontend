import React from "react";
import useToken from "../../../hooks/useToken";
import { WithdrawalAPI } from "../../../api/nonToken/auth";
import useAuthAPI from '../../../api/nonToken/auth';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const WithdrawalBtn = () => {
    const navigate = useNavigate();

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
    navigate('/');
  };

  return <Btn onClick={Withdrawal}>떠날래요</Btn>;
};

export default WithdrawalBtn;

const Btn = styled.button`
  border: none;
  background-color: var(--gray2_a);
  color: var(--gray4);
  font-size: 12px;
  line-height: 150%;
	margin-top: 12px;
  cursor: pointer;

  &:hover {
    color: var(--warningRed);
  }
`;
