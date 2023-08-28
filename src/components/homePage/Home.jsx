import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import StyledButton from "../common/component/StyledButton";
import homeImg from "../assets/images/home_bgImg.png";
import first from '../assets/images/first.svg';
import third from '../assets/images/third.png'


const Homepage = () => {

  const navigate = useNavigate();

  const camBtnClickHandler = () => {
    navigate("/camera/frameSelect");
  };

  const customBtnClickHandler = () => {
    navigate("/camera/capture/frame");
  };

  return (
    <ContentContainor>

      {/*        <video width="100%" height="auto" autoplay loop muted controls style={{position:"absolute" }} >
        <source src="https://finalimgbucket.s3.ap-northeast-2.amazonaws.com/61bd94a0-39e9-4aff-a677-dfc4167be03b" type="video/mp4"/>
        대체 텍스트
    </video> */}

      <FirstAlign>
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

      <ThirdAlign>
        <ThirdLeft>
          <h1>Your own <br />Custom Design</h1>

          <Des>
            <div>Custom</div>
            1991년에 첫 번째 사이트가 게시된 이후 웹 디자인이 생기기까지는 오랜 시간이 걸렸습니다.<br />
            오늘날 인터넷에 10억 개 이상의 웹사이트가 운영되고 있는 가운데, <br />
            웹디자인 산업이 성장하고 있는 것은 놀랄 일도 아닙니다. <br />
            Wix는 수천 명의 웹사이트 디자인전문가, 매니아 및 디자이너들이 업계에서 새로운 일을 성취할 수 있도록 힘을 실어주는 놀라운 곳입니다.<br />
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
  height:1080px;
  background-image: url(${homeImg});
  background-size: cover;
  display: flex;
  justify-content: center;
`;

const FirstContentWrap = styled.div`
  height: 100vh;
  width: 1170px;
  height: 20%;
  display: flex;
  justify-content: center;
  padding: 100px 0;
  gap: 5%;
`;

//////////////////////////////////////////

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

const SecondAlign = styled.div`
  height:1280px;
  background-color: #a3e784;
  display: flex;
  justify-content:center;
  align-items:center;
  gap:10px;
`;

const SecondContent = styled.div`
  display: flex;
  flex-direction:column;
  gap:20px;
`;

const CardSection = styled.div`
display:flex;
justify-content:center;
gap:20px;
`;

const Img = styled.img`
max-width:250px;
width:20%;
box-shadow: 0px 0px 40px -5px rgba(0, 0, 0, 0.5);
`;

const ThirdAlign = styled.div`
  height:1080px;
  background-color: #a34;
  display: flex;
  justify-content:center;
  align-items:center;

`;

const ThirdLeft = styled.div`
  height:800px;
  width:30%;
  display: flex;
  align-items:center;
  flex-direction:column;
  justify-content:space-between;
`;

const Des = styled.div`
  width:50%;
  word-break:break-all;
  display:flex;
  flex-direction:column;
  gap:10px;
`;