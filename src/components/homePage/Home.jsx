import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import StyledButton from "../common/component/StyledButton";


// import homeImg from "../assets/images/home_bgImg.png";
 import first from "../assets/images/first.svg";
// import third from "../assets/images/third.png";

import FirstSec from "../assets/home/FirstSec.png";
import Fir_back from "../assets/home/Fir_back.jpg";
import Fir_check from "../assets/home/Fir_check.png";
import Fir_img from "../assets/home/Fir_img.png";
import DIA40 from "../assets/home/40DIA.png";
import DIA56 from "../assets/home/56DIA.png";
import DIA_yel from "../assets/home/DIA_YEL.png";
import SPIN_FLOWER from "../assets/home/SPIN.png";

import recycle from "../assets/home/recycle.svg";

import ThirdSec from "../assets/home/ThirdSec.png";

const Homepage = () => {
  const navigate = useNavigate();

  const camBtnClickHandler = () => {
    navigate("/camera/frameSelect");
  };

  return (
    <ContentContainor>

      {/*        <video width="100%" height="auto" autoplay loop muted controls style={{position:"absolute" }} >
        <source src="https://finalimgbucket.s3.ap-northeast-2.amazonaws.com/61bd94a0-39e9-4aff-a677-dfc4167be03b" type="video/mp4"/>
        대체 텍스트
    </video> */}

      <FirstAlign>
        <Div />
        <img src={Fir_img} alt="" className="obj" />
        <FirstContentWrap>
            <LeftSpan>
              <span className="smallSpan">At Best Time</span>
              <span className="bigSpan">Take Your Moment</span>
              <img src={DIA40} alt="" className="DIA40" />
              <img src={DIA_yel} alt="" className="DIA_yel" />
            </LeftSpan>

            <LeftTxt>
              <Imgwrap>
                <img className="flowImg" src={SPIN_FLOWER} alt="" />
              </Imgwrap>

              <div className="ment">당신의 디자인을 만들어 보세요.</div>
              <div className="comment">
                <p>
                  당신의 순간을 기록하고 자랑해 보세요. 추억을 지절하고 자신만의
                  작품을 만들어 포토크리에이터로 활동해보아요! 나의 작품을
                  확인하고 공유하고 포인트를 적립할 수 있습니다.
                  포토크리에이터로 활동해 보세요!
                </p>
                <p>
                  나의 작품을 확인하고 공유하고 포인트를 적립할 수 있습니다.
                  포토크리에이터로 활동해보아요! 나의 작품을 확인하고 공유하고
                  포인트를 적립할 수 있습니다.
                </p>
              </div>
              <StyledButton
                func={camBtnClickHandler}
                title={"촬영하기"}
                width={"15vw"}
                height={"39px"}
                fontSize={"18px"}
                fontWeight={"500"}
              />
            </LeftTxt>
        </FirstContentWrap>
      </FirstAlign>

      <SecondAlign>
        <SecondContent>
          <h1 style={{ justifyContent: "left", width: "100%" }}>WHY HAVE <br /> TO MOMENT</h1>
          <CardSection>
            <Img src={first}></Img>
            <Img src={first}></Img>
            <Img src={first}></Img>
            <Img src={first}></Img>
          </CardSection>
          <CardSection>
            <Img src={first}></Img>
            <Img src={first}></Img>
            <Img src={first}></Img>
            <Img src={first}></Img>
          </CardSection>
        </SecondContent>
      </SecondAlign>



    </ContentContainor>
  );
};

export default Homepage;

const ContentContainor = styled.div`
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FirstAlign = styled.div`
  max-width: 100vw;
  background: linear-gradient(to top, #f2f1f2, #f6f2fe);
  display: flex;
  position: relative;
  height: 54vw;

  .obj {
    max-width: 100%;
    position: absolute;
    z-index: 11;
    top: 7vh;
  }
`;

const Div = styled.div`
  display: flex;
  width: 100%;
  height:100%;
  background-image: url(${Fir_check});
  position: absolute;
  background-size: contain;
  background-repeat: repeat;
`;

const FirstContentWrap = styled.div`
  height: 100vh;
  height: 20%;
  display: flex;
  flex-direction:column;
  padding-top: 5%;
  padding-left: 10%;
  gap: 5%;
  z-index: 12;
 /*  background-color:red; */
`;

const LeftContent = styled.div`
  margin-left: 40vh;
  width: 30%;
  height: 650px;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
`;

const LeftSpan = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .smallSpan {
    font-size: 3vw;
    line-height: 150%;
    font-family: "Abril Fatface", cursive;
  }

  .bigSpan {
    font-size: 4vw;
    line-height: 150%;
    font-family: "Abril Fatface", cursive;
    margin-bottom: 5%;
  }

  .DIA40 {
    width: 40px;
    position: absolute;
    top: 1vh;
    left: 51vh;
  }

  .DIA_yel {
    width: 56px;
    position: absolute;
    top: 6vh;
    left: 56vh;
  }
`;

const LeftTxt = styled.div`
  width: 30vw;
  border: 1px solid var(--black);
  border-radius: 5px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 35px 0;

  .ment {
    font-size: 2vw;
    font-weight: 600;
    line-height: 150%;
    border-bottom: 1px solid var(--black);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5% 8%;
  }

  .comment {
    margin: 20px 0 35px 0;
    p {
      padding: 0 30px;
      margin: 0;
      font-size: 0.1vw;
      font-weight: 400;
      line-height: 150%;
    }
  }
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Imgwrap = styled.div`
  display: flex;
  width: 20px;
  height: 25px;
  margin-left: auto;
  margin: -25px 0 0 auto;
`
const CardSection = styled.div`
  display:flex;
  justify-content:center;
  gap:20px;
`;

const Img = styled.img`
max-width:250px;
width:20%;
box-shadow: 0px 0px 40px -5px rgba(0, 0, 0, 0.5);

  .flowImg {
    width: 50px;
    height: 50px;
    animation: ${spinAnimation} 10s linear infinite;
  }
`;

const SecondAlign = styled.div`
  height: 1280px;
  /* background-color: #a3e784; */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

`;

const SecondContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ThirdAlign = styled.div`
  height: 1080px;
  background-color: #a34;
  display: flex;
  justify-content: center;
  align-items: center;
`;
