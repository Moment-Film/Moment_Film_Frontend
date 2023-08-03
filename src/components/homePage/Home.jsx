import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Homepage = () => {
  const navigate = useNavigate();

  const camBtnClickHandler = () => {
    navigate("/camera/guide");
  };
  return (
    <>
      <ContentWrap>
        <LeftContent>
          <LeftH>dummy text 1dummy text 1dummy text 1</LeftH>
          <LeftTxt>
            dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy
            text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text
            2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy
            text 2dummy text 2dummy text 2dummy text 2
          </LeftTxt>

          <div>
            <Square />
            <SquareBtn onClick={camBtnClickHandler}>촬영하러 가기</SquareBtn>
          </div>
        </LeftContent>
        <RightImg src="" />
      </ContentWrap>
    </>
  );
};

export default Homepage;

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 100px 0 100px 0;
  gap: 5%;
`;

const LeftContent = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  margin-bottom: 50px;
  padding: 50px;
  gap: 50px;
`;

const LeftH = styled.div`
  font-size: 50px;
  font-weight: bold;
`;

const LeftTxt = styled.div`
  width: 68%;
`;

const RightImg = styled.div`
  width: 45%;
  border: 1px solid lightgray;
  margin-bottom: 50px;
`;

const Square = styled.div`
  width: 245px;
  height: 50px;
  background-color: white;
  position: relative;
  top: -5px;
  left: 10px;
  border: 2px solid black;
`;

const SquareBtn = styled.div`
  width: 215px;
  height: 25px;
  position: relative;
  border: 2px solid black;
  background-color: #c2f87e;
  padding: 15px;
  top: -47px;
  left: 0px;
  text-align: center;
  cursor: pointer;
`;

// const CamBtn = styled.div`
//   width: 130px;
//   height: 40px;
//   border: 1px solid grey;
//   background-color: yellowgreen;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
// `
