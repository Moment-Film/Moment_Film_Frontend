import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

function NotFound() {
  const navigate = useNavigate();

  return (
    <NotFoundWrap>
      <div onClick={() => navigate(-1)} className="back">{`⬅뒤로 가기`}</div>
      <div className="notFound">
        <h1>💀404 Not Found💀</h1>
        <p>요청하신 페이지를 찾을 수 없습니다.</p>
      </div>
    </NotFoundWrap>
  );
}

export default NotFound;

const NotFoundWrap = styled.div`

  .back {
    cursor: pointer;
    font-weight: 500;
  }

  .notFound {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
