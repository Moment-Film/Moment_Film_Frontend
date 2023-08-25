import React from "react";
import { useDispatch } from "react-redux";
import { SetAccessToken } from "../../../redux/modules/AccessToken";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import useToken from "../../../hooks/useToken";
import useAuthAPI from "../../../api/nonToken/auth";
import { SetUserInfo } from "../../../redux/modules/User";

const LogoutBtn = () => {
  const { LogOutAPI } = useAuthAPI();

  const { getAccess, getRefresh, saveUserInfo } = useToken();
  const refreshToken = getRefresh();
  const accessToken = getAccess();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogOut = async () => {
    const res = await LogOutAPI(accessToken, refreshToken);

    await dispatch(SetAccessToken(null));
    await dispatch(SetUserInfo(null));
    console.log(accessToken);
    navigate("/");
  };

  return <NavBtn onClick={LogOut} color={"#505050"}>로그아웃</NavBtn>;
};

export default LogoutBtn;

export const NavBtn = styled.div`
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  background-color: none; /* 초기 색상 */
  transition: background-color 0.5s;
  color: ${props => props.color};

  &:hover {
    background-color: var(--lightGray);
  }
`;
