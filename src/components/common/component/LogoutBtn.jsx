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
      alert(res.data);
      navigate("/");
    }
  };

  return (
    <NavBtn onClick={LogOut} color={"#505050"}>
      로그아웃
    </NavBtn>
  );
};

export default LogoutBtn;

export const NavBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 150%;
  cursor: pointer;
  background-color: none;
  transition: background-color 0.5s;
  color: ${(props) => props.color};
  min-width: 70px;
`;
