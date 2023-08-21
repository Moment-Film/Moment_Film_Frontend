import React from "react";
import { LogOutAPI } from "../../../api/nonToken/auth";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { SetAccessToken } from "../../../redux/modules/AccessToken";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import useToken from "../../../hooks/useToken";

const LogoutBtn = () => {
  const {
    getAccess,
    getRefresh
  }=useToken();

  const refreshToken = getRefresh()
  const accessToken = getAccess()
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const LogOut = async () => {
    const res = await LogOutAPI(accessToken, refreshToken);

    await dispatch(SetAccessToken(null));
    console.log(accessToken);
    navigate("/");
  };

  return <NavBtn onClick={LogOut}>로그아웃</NavBtn>;
};

export default LogoutBtn;

export const NavBtn = styled.div`
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  background-color: none; /* 초기 색상 */
  transition: background-color 0.5s;

  &:hover {
    background-color: var(--lightGray);
  }
`;
