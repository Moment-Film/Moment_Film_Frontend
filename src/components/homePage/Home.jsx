import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import StyledButton from "../common/component/StyledButton";

import homeImg from "../assets/images/home_bgImg.png";
import first from "../assets/images/first.svg";
import third from "../assets/images/third.png";

// import FirstSec from "../assets/home/FirstSec.png";
import Fir_back from "../assets/home/Fir_back.jpg";
import Fir_img from "../assets/home/Fir_img.png";
import ThirdSec from "../assets/home/ThirdSec.png";
import DIA40 from "../assets/home/40DIA.png";
import DIA56 from "../assets/home/56DIA.png";
import DIA_yel from "../assets/home/DIA_YEL.png";
import SPIN_FLOWER from "../assets/home/SPIN.png";
import recycle from "../assets/home/recycle.svg";

const Homepage = () => {
  const navigate = useNavigate();

  const camBtnClickHandler = () => {
    navigate("/camera/frameSelect");
  };

  // const customBtnClickHandler = () => {
  //   navigate("/camera/capture/frame");
  // };

  return (
    <ContentContainor>
      {/*        <video width="100%" height="auto" autoplay loop muted controls style={{position:"absolute" }} >
        <source src="https://finalimgbucket.s3.ap-northeast-2.amazonaws.com/61bd94a0-39e9-4aff-a677-dfc4167be03b" type="video/mp4"/>
        대체 텍스트
    </video> */}

      <FirstAlign>
        <img src={Fir_img} alt="" />
        <FirstContentWrap>
          <LeftContent>
            <span className="smallSpan">At Best Time</span>
            <span className="bigSpan">Take Your Moment</span>
            <img src={SPIN_FLOWER} alt="" />
            <LeftTxt>
              <div className="ment">당신의 디자인을 만들어 보세요.</div>
              <div className="comment">
                <p>
                  당신의 순간을 기록하고 자랑해 보세요. 추억을 지절하고 자신만의
                  작품을 만들어 포토크리에이터로 활동해보아요!
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
                width={"133px"}
                height={"39px"}
                fontSize={"18px"}
                fontWeight={"500"}
              />
            </LeftTxt>
          </LeftContent>
          <RightImg src="" />
        </FirstContentWrap>
      </FirstAlign>

      <SecondAlign>
        <SecondContent>
          <h1 style={{ justifyContent: "left", width: "100%" }}>
            WHY HAVE <br /> TO MOMENT
          </h1>
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

      <ThirdAlign>
        <ThirdLeft>
          <h1>
            Your own <br />
            Custom Design
          </h1>

          <Des>
            <div>Custom</div>
            1991년에 첫 번째 사이트가 게시된 이후 웹 디자인이 생기기까지는 오랜
            시간이 걸렸습니다.
            <br />
            오늘날 인터넷에 10억 개 이상의 웹사이트가 운영되고 있는 가운데,{" "}
            <br />
            웹디자인 산업이 성장하고 있는 것은 놀랄 일도 아닙니다. <br />
            Wix는 수천 명의 웹사이트 디자인전문가, 매니아 및 디자이너들이
            업계에서 새로운 일을 성취할 수 있도록 힘을 실어주는 놀라운 곳입니다.
            <br />
            따라서 웹 디자인의 세계에
          </Des>
          <StyledButton
            func={camBtnClickHandler}
            title={"촬영하러 가기"}
            width={"228px"}
            height={"72px"}
            fontSize={"24px"}
          />
        </ThirdLeft>
        <img src={third}></img>
      </ThirdAlign>
    </ContentContainor>
  );
};

export default Homepage;

const ContentContainor = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FirstAlign = styled.div`
  width: 100%;
  height: 1020px;
  background-image: url(${Fir_back});
  /* background-size: ; */
  background-position: center;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    position: absolute;
    /* height: 1048px; */
  }
`;

const FirstContentWrap = styled.div`
  height: 100vh;
  width: 1170px;
  height: 20%;
  display: flex;
  justify-content: center;
  padding: 100px 0;
  gap: 5%;
  z-index: 0;
`;

//////////////////////////////////////////
const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LeftContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  margin-bottom: 50px;
  padding: 50px;

  .smallSpan {
    font-size: 36px;
    line-height: 150%;
    font-family: "Abril Fatface", cursive;
  }

  .bigSpan {
    font-size: 52px;
    line-height: 150%;
    font-family: "Abril Fatface", cursive;
    margin-bottom: 65px;
  }

  img {
    width: 50px;
    height: 50px;
    animation: ${spinAnimation} 10s linear infinite;
    top: 410px;
    left: 580px;
  }
`;

// const LeftH = styled.div`
//   min-width: ${(props) => props.minWidth};
//   max-width: ${(props) => props.maxWidth};
//   min-height: 267px;
//   font-size: 64px;
//   font-family: "Abril Fatface", cursive;
//   line-height: 89px;
// `;

const LeftTxt = styled.div`
  width: 370px;
  height: 438px;
  border: 1px solid var(--black);
  border-radius: 5px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 25px 0;
  /* margin-bottom: 50px; */

  .ment {
    font-size: 20px;
    font-weight: 600;
    line-height: 150%;
    border-bottom: 1px solid var(--black);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 60px;
  }

  .comment {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0 35px 0;
    p {
      padding: 0 30px;
      margin: 0;
      font-size: 16px;
      font-weight: 400;
      line-height: 150%;
    }
  }
`;

const RightImg = styled.div`
  width: 45%;
  border: 1px solid lightgray;
  margin-bottom: 50px;
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

const CardSection = styled.div`
  display: flex;
  gap: 20px;
`;

const Img = styled.img`
  width: 250px;
  box-shadow: 0px 0px 40px -5px rgba(0, 0, 0, 0.5);
`;

const ThirdAlign = styled.div`
  height: 1080px;
  background-color: #a34;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThirdLeft = styled.div`
  height: 800px;
  width: 30%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;

const Des = styled.div`
  width: 50%;
  word-break: break-all;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
