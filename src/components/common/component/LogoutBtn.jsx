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
    const logoutSure = window.confirm("로그아웃하시겠습니까?");
    if (logoutSure) {
      const res = await LogOutAPI(accessToken, refreshToken);

      await dispatch(SetAccessToken(null));
      await dispatch(SetUserInfo(null));
      console.log(accessToken);
      alert("로그아웃되었습니다");
      navigate("/");
    }
  };
  return <button onClick={LogOut} color={"#505050"}>로그아웃</button>;
};

export default LogoutBtn;