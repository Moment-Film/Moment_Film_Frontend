import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import StyledButton from "../common/component/StyledButton";
import { useSelector } from "react-redux";
import homeImg from "../assets/images/home_bgImg.png";

const Homepage = () => {
  const actoken = useSelector((state) => state.AccessToken);
  console.log(actoken)

  const navigate = useNavigate();

  const camBtnClickHandler = () => {
    navigate("/camera/frameSelect");
  };

  const customBtnClickHandler = () => {
    navigate("/camera/capture/frame");
  };
  return (
    <>
      <FirstContentWrap>
        <LeftContent>
          <LeftH $minWidth={"347px"}>Take Your Moment at Best Time</LeftH>
          <LeftTxt>
            dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy
            text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text
            2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy
            text 2dummy text 2dummy text 2dummy text 2
          </LeftTxt>

          <StyledButton
            func={camBtnClickHandler}
            title={"촬영하러 가기"}
            width={"228px"}
            height={"72px"}
            fontSize={"24px"}
          />
        </LeftContent>
        <RightImg src="" />
      </FirstContentWrap>
      <SecondContentWrap>
        <div>
          <LeftH $maxWidth={"486px"}>Your own Custom Design</LeftH>
          <BottomWrap>
            <LeftContent>
              <div style={{ width: "141px", height: "53px", fontSize: "24px" }}>
                Custom
              </div>
              <LeftTxt>
                dummy text 2dummy text 2dummy text 2dummy text 2dummy text
                2dummy text 2dummy text 2dummy text 2dummy text 2dummy text
                2dummy text 2dummy text 2dummy text 2dummy text 2dummy text
                2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2
              </LeftTxt>
              <StyledButton
                func={customBtnClickHandler}
                title={"촬영하러 가기"}
                width={"228px"}
                height={"72px"}
                fontSize={"24px"}
              />
            </LeftContent>
            <CardWrap>
              <Card>아무카드</Card>
              <Card>아무카드</Card>
              <Card>아무카드</Card>
            </CardWrap>
          </BottomWrap>
        </div>
      </SecondContentWrap>
    </>
  );
};

export default Homepage;

// const ContentContainor = styled.div`
//   display: flex;
//   flex-direction: column;
// `

const FirstContentWrap = styled.div`
  background-image: url(${homeImg});
  background-size: cover;
  height: 100vh;
  width: 100%;
  height: 20;
  display: flex;
  justify-content: center;
  padding: 100px 0;
  gap: 5%;
`;

const LeftContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  margin-bottom: 50px;
  padding: 50px;
`;

const LeftH = styled.div`
  min-width: ${(props) => props.minWidth};
  max-width: ${(props) => props.maxWidth};
  min-height: 267px;
  font-size: 64px;
  /* font-weight: bold; */
  font-family: "Abril Fatface", cursive;
  line-height: 89px;
`;

const LeftTxt = styled.div`
  width: 68%;
  min-width: 243px;
  min-height: 222px;
`;

const RightImg = styled.div`
  width: 45%;
  border: 1px solid lightgray;
  margin-bottom: 50px;
`;

const SecondContentWrap = styled.div`
  box-sizing: border-box;
  height: 100vh;
  padding: 370px 20% 0 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #a3e784;
`;

const BottomWrap = styled.div`
  display: flex;
`;

const CardWrap = styled.div`
  display: flex;
  gap: 30px;
`;

const Card = styled.div`
  width: 278px;
  height: 449px;
  background-color: var(--lightGray);
`;
