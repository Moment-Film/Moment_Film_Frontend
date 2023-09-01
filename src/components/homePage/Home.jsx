import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import StyledButton from "../common/component/StyledButton";

import Fir_check from "../assets/home/Fir_check.png";
import DIA40 from "../assets/home/40DIA.png";
import DIA_yel from "../assets/home/DIA_YEL.png";
import SPIN_FLOWER from "../assets/home/SPIN.png";
import backImg from "../assets/images/back.svg";

import girl from "../assets/images/girl.svg";
import card1 from "../assets/images/card1.svg";
import card2 from "../assets/images/card2.svg";
import man from "../assets/images/man.svg";
import thirdBack from "../assets/home/thirdBack.svg";
import thirdImg from "../assets/home/thirdImg.png";
import photo1 from "../assets/home/photo1.svg";
import photo2 from "../assets/home/photo2.svg";
import photo3 from "../assets/home/photo3.svg";
import fourthBack from "../assets/home/fourthBack.svg";
import vertor from "../assets/home/vector.svg";
import profile from "../assets/home/profile.svg";
import cardBackground from "../assets/home/cardBackground.svg";
const Homepage = () => {
  const navigate = useNavigate();

  const camBtnClickHandler = () => {
    navigate("/camera/frameSelect");
  };

  const boxWrapRef = useRef();
  const box1Ref = useRef();
  const box2Ref = useRef();
  const box3Ref = useRef();
  const [fadeIn, setFadeIn] = useState([false, false, false]);
  const boxRefs = [box1Ref, box2Ref, box3Ref];

  useEffect(() => {
    let progressBarHandler = () => {
      const nowScroll = window.scrollY;

      const updatedFadeIn = boxRefs.map((boxRef) => {
        const box = boxRef.current.getBoundingClientRect();
        const boxTopPosition = box.top;
        const boxBottomPosition = box.bottom;

        const isBoxVisible = boxTopPosition < nowScroll - boxTopPosition;

        return isBoxVisible;
      });

      console.log(updatedFadeIn);
      setTimeout(() => {
        setFadeIn(updatedFadeIn);
      }, 300);
    };

    window.addEventListener("scroll", progressBarHandler);

    return () => window.removeEventListener("scroll", progressBarHandler);
  }, [fadeIn]);

  return (
    <ContentContainor>
      <FirstAlign>
        <div className="Right">
          <img src={backImg} alt="" className="obj" />
          <img src={girl} className="girl" />
        </div>
        <Div />
        <FirstContentWrap>
          <LeftSpan>
            <div className="titleWrap">
              <span className="smallSpan">At Best Time</span>
              <span className="bigSpan">Take Your Moment</span>
            </div>

            <div className="starImg">
              <img className="smallstar" src={DIA40} alt="" />
              <img className="bigstar" src={DIA_yel} alt="" />
            </div>
          </LeftSpan>

          <LeftTxt>
            {/*       <Imgwrap> */}
            <img className="flowImg" src={SPIN_FLOWER} alt="" />
            {/*      </Imgwrap> */}

            <div className="ment">당신의 디자인을 만들어 보세요.</div>
            <div className="comment">
              <p>
                자신만의 작품을 만들어 포토크리에이터로 활동해보아요. 게시글을
                통해 사람들에게 공유하고, 다른 사람의 작품을 사용해 볼 수
                있습니다. 톡톡튀는 아이디어로 인기 크리에이터가 되어볼까요?
              </p>

              <StyledButton
                func={camBtnClickHandler}
                title={"촬영하기"}
                width={"116px"}
                height={"36px"}
                fontSize={"16px"}
                fontWeight={"600"}
              />
            </div>
          </LeftTxt>
        </FirstContentWrap>
      </FirstAlign>

      <SecondAlign>
        <SecondContent>
          <div className="secondTitle">
            <span className="bigSpan">
              Why Have <br /> To Moment
            </span>
            <img src={vertor}></img>
          </div>

          <CardSection>
            <div className="grid-container">
              <Card className="content withBackcontent">
                <p className="cardHeader">집밖에 나가기 싫어요!</p>
                <p className="cardcontent">
                  나는 친구들과 사진도 찍고, 추억도 쌓고 싶어요! 하지만 집순이라
                  나가기가 싫어서 고민이네요ㅠ
                </p>
                <p className="cardOwner">
                  김헛둘님의 고민
                  <img src={profile} />
                </p>
              </Card>

              <Card>
                <img src={card1} alt="" />
              </Card>

              <Card className="content">
                <p className="cardHeader">홈파티 기념을 남길래요!</p>
                <p className="cardcontent">
                  연말이나 기념일에 홈 파티를 하고 친구들과 기념사진을 남기고
                  싶은데 그때마다 특별한 추억이 없어서 아쉬웠어요!
                </p>
                <p className="cardOwner">
                  조현철님의 고민
                  <img src={profile} />
                </p>
              </Card>

              <Card className="content">
                <p className="cardHeader">집밖에 나가기 싫어요!</p>
                <p className="cardcontent">
                  나는 친구들과 이런것도 하고싶고 이런것도 하고 싶어요 근데
                  어쩌고 한데 다들 이렇다고 하라구요
                </p>
                <p className="cardOwner">
                  지존킹님의 고민
                  <img src={profile} />
                </p>
              </Card>

              <Card className="content">
                <p className="cardHeader">
                  내가 원하는 프레임을 찾을 수가 없어요!
                </p>
                <p className="cardcontent">
                  원하는 지점에 가서 사진을 찍고 싶어도 지방에 있는지라 찍지
                  못했는데 모먼트필름에서 다양하게 찍어볼 수 있다니 너무 좋아요!
                </p>
                <p className="cardOwner">
                  나용님의 고민
                  <img src={profile} />
                </p>
              </Card>
              <Card className="content withBackcontent">
                <p className="cardHeader">우리집 고양이랑 한컷!</p>
                <p className="cardcontent">
                  평소에 고양이와 함께 추억이 될 만 사진을 남기고 싶었는데.
                  이렇게 함께 찍어서 남길 수 있다니 너무 좋아요!
                </p>
                <p className="cardOwner">
                  지존킹님의 고민
                  <img src={profile} />
                </p>
              </Card>
              <Card>
                <img src={card2} alt="" />
              </Card>
              <Card className="content">
                <p className="cardHeader">집밖에 싫어요!</p>
                <p className="cardcontent">
                  모먼트 필름만의 특장점을 직접 사용해 보시고 느껴보세요. 순간을
                  기록하고 추억을 저장해 보세요!
                </p>
                <p className="cardOwner">
                  김헛둘님의 고민
                  <img src={profile} />
                </p>
              </Card>
            </div>
          </CardSection>
        </SecondContent>
      </SecondAlign>

      <ThirdAlign>
        <div className="thirdWrap">
          <div className="left">
            <LeftSpan>
              <div className="starImg">
                {/*              <img className="smallstar" src={DIA40} alt="" />
              <img className="bigstar" src={DIA_yel} alt="" /> */}
              </div>

              <div className="thirdContent">
                <span className="smallSpan">Your own</span>
                <span className="bigSpan">Custom Design</span>

                <div className="ment">커스텀 만들기</div>
                <div className="comment">
                  <p>
                    자신만의 작품을 만들어 포토크리에이터로 활동해보아요.
                    게시글을 통해 사람들에게 공유하고, 다른 사람의 작품을 사용해
                    볼 수 있습니다. 톡톡튀는 아이디어로 인기 크리에이터가
                    되어볼까요?
                  </p>
                </div>
                <StyledButton
                  func={camBtnClickHandler}
                  title={"촬영하기"}
                  width={"116px"}
                  height={"36px"}
                  fontSize={"16px"}
                  fontWeight={"500"}
                />
              </div>
            </LeftSpan>
          </div>

          <div className="right">
            <img src={thirdImg} />
          </div>
        </div>
      </ThirdAlign>

      <FourthAlign>
        <div className="thirdWrap">
          <div className="left">
            <LeftSpan>
              <div></div>

              <div className="thirdContent">
                <span className="bigSpan">Post my design</span>

                <div className="ment">게시글 자랑하기</div>
                <div className="comment">
                  <p>
                    나의 소중한 추억과 순간을 게시글을 통해 기록해 보아요!
                    커스텀 한 필터와 프레임을 다른사람들과 공유하고 사용해 볼 수
                    있습니다! 매력적인 커스텀으로 인기 크레이터가 돼볼까요?
                  </p>
                </div>
              </div>
            </LeftSpan>
          </div>

          <section className="boxWrap" ref={boxWrapRef}>
            <BoxSection className="boxSection">
              <BoxSection className="box-1" ref={box1Ref} fadeIn={fadeIn[0]}>
                <img src={photo1}></img>
                <p>촬영하기</p>
                <p>친구들과 함께 찰칵! 영원할 지금의 순간을 남겨보세요!</p>
              </BoxSection>

              <BoxSection className="box-2" ref={box2Ref} fadeIn={fadeIn[1]}>
                <img src={photo2}></img>
                <p>커스텀하기</p>
                <p>
                  특색있는 아이디어로 내 사진 꾸미기! 멋진 필터 멋진 스티커로
                  꾸며볼까요?
                </p>
              </BoxSection>

              <BoxSection className="box-3" ref={box3Ref} fadeIn={fadeIn[2]}>
                <img src={photo3}></img>
                <p>게시글로 뽐내기</p>
                <p>
                  커스텀 작업물을 사람들에게 자랑보아요! 소중한 추억에 대한
                  설명도 적으면 좋겠죠? 인기 크레이터에 등록되어볼까요?
                </p>
              </BoxSection>
            </BoxSection>
          </section>
        </div>
      </FourthAlign>
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

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1vw);
  }
`;

const FirstAlign = styled.div`
  background: linear-gradient(to top, #f2f1f2, #f6f2fe);
  max-height: 1080px;
  height: 52vw;
  position: relative;

  @media (max-width: 900px) {
    height: 100%;
  }

  .Right {
    @media (max-width: 900px) {
      display: none;
    }
  }

  .obj {
    width: 100%;
    position: absolute;
    z-index: 1;
  }

  .girl {
    position: absolute;
    width: 25%;
    left: 48vw;
    top: 13vw;
    z-index: 4;
    cursor: pointer;

    &:hover {
      fill: var(--warningRed);
      animation: ${bounce} 0.6s;
    }
  }
`;

const Div = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url(${Fir_check});
  position: absolute;
  background-size: contain;
  background-repeat: repeat;
`;

const FirstContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3%;
  padding-left: 17%;
  gap: 5%;
  z-index: 12;

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10%;
  }
`;

const LeftSpan = styled.div`
  display: flex;
  position: relative;

  div {
    display: flex;
    flex-direction: column;

    @media (max-width: 900px) {
      align-items: center;
    }
  }

  .starImg {
    top: 20%;
    left: 62%;
    position: absolute;

    @media (max-width: 900px) {
      display: none;
    }
  }

  .smallstar {
    margin-left: 11.5vw;

    width: 2vw;
  }

  .bigstar {
    margin-left: 13vw;
    width: 3vw;
  }

  .smallSpan {
    font-size: 3vw;
    line-height: 150%;
    font-family: "Abril Fatface", cursive;

    @media (max-width: 900px) {
      font-size: 38px;
    }
  }

  .bigSpan {
    font-size: 3vw;

    line-height: 150%;
    font-family: "Abril Fatface", cursive;
    margin-bottom: 5%;

    @media (max-width: 900px) {
      font-size: 38px;
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

const LeftTxt = styled.div`
  /* min-width:200px; */
  width: 25vw;
  //height:23vw;
  border: 1px solid var(--black);
  border-radius: 5px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: space-around;
  z-index: 2;

  @media (max-width: 900px) {
    width: 90%;
  }

  .ment {
    font-size: max(1.2vw, 20px);
    font-weight: 600;
    line-height: 150%;
    border-bottom: 1px solid var(--black);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5% 8%;
    width: 80%;
  }

  .flowImg {
    position: absolute;
    width: 3vw;
    height: 3vw;
    max-width: 50px;
    max-height: 50px;

    left: 23.5vw;
    top: -1.5vw;
    animation: ${spinAnimation} 10s linear infinite;

    @media (max-width: 900px) {
      width: 5vw;
      height: 5vw;
      min-width: 30px;
      min-height: 30px;
      left: 67vw;
      top: -3vw;
    }
  }

  .comment {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1vw 0 1.2vw 0;
    gap: 0.8vw;
    overflow: hidden;
    p {
      padding: 5% 0 35 0;
      margin: 0 0 20;
      width: 80%;
      font-weight: 400;
      line-height: 150%;
      font-size: min(1.3vw, 16px);

      @media (max-width: 900px) {
        font-size: 16px;
      }
    }
  }
`;

const CardSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1vw;

  .content {
    box-shadow: 0px 0px 40px -5px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--black);
    border-radius: 5px;
  }

  .withBackcontent {
    background-image: url(${cardBackground});
    background-size: cover;
    p {
      color: var(--white);
    }
  }
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 270px;
  /*   width:15vw; */
  height: 340px;
  box-sizing: border-box;

  padding: 0 30px 0 30px;
  img {
    width: 100%;
  }
  .cardHeader {
    font-weight: bold;
  }
  .cardcontent {
    font-size: 16px;
    line-height: 24px;
  }

  .cardOwner {
    display: flex;
    justify-content: space-around;
    align-items: end;
    font-size: 14px;
    color: var(--gray4);

    img {
      width: 25%;
      border-radius: 50%;
      border: 1px solid black;
    }
  }

  &:hover {
    transform: scale(1.05); /* 호버 시 스케일 증가 */
  }
`;

const SecondAlign = styled.div`
  min-height: 1080px;
  /* background-color: #a3e784; */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 5% 5% 5% 5%;

  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4개의 열을 생성 */
    grid-gap: 30px; /* 아이템 사이의 간격 설정 */
    grid-row-gap: 40px; /* 아이템 사이의 간격 설정 */
    grid-template-rows: 1fr 1fr; /* 3개의 행을 생성 */

    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

const SecondContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1170px;
  width: 100%;
  gap: 20px;

  .secondTitle {
    display: flex;
  }

  .bigSpan {
    font-size: max(3vw, 38px);
    font-family: "Abril Fatface", cursive;
  }

  @media (max-width: 900px) {
    align-items: center;

    .bigSpan {
      font-size: 38px;
      font-family: "Abril Fatface", cursive;
    }
  }
`;

const ThirdAlign = styled.div`
  height: 100vh;
  display: flex;
  background-image: url(${thirdBack});
  background-size: cover;
  background-position: center;
  justify-content: center;

  @media (max-width: 1000px) {
    align-items: center;
  }

  .left {
    width: 30%;
    @media (max-width: 1000px) {
      width: 100%;
    }
  }

  .comment {
    padding-bottom: 5vw;
  }

  .thirdWrap {
    display: flex;

    align-items: center;
    width: 80%;
    gap: 10%;

    @media (max-width: 1000px) {
      flex-direction: column;
      gap: 5%;
    }
  }
  .right {
    height: 80%;
    display: flex;
    align-items: end;
    width: 50%;
    min-width: 500px;

    @media (max-width: 1000px) {
      flex-direction: column;

      min-width: 300px;
    }
  }

  img {
    width: 100%;
  }
`;

const fadeInUp = keyframes`
0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
}
to {
    opacity: 1;
    transform: translateZ(0);
}

`;

const FourthAlign = styled.div`
  background-image: url(${fourthBack});
  width: 100%;
  padding-top: 10%;
  display: flex;
  flex-direction: column;

  .left {
    width: 80%;
  }

  .thirdsection {
    display: flex;
    width: 80%;
  }

  .thirdWrap {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 10%;
  }

  .boxWrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .boxSection {
      width: calc(100% - 10px);
      max-width: 900px;
      display: flex;
      flex-direction: column;

      gap: 1vw;
    }
  }
`;

const BoxSection = styled.div`
  animation: ${(props) => (props.fadeIn ? fadeInUp : "none")} 1s;

  .box-1 {
    img {
      object-fit: cover;
    }
    @media (max-width: 700px) {
      img {
        object-fit: cover;
        width: 80%;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .box-2 {
    margin-left: auto;

    img {
      object-fit: cover;
    }

    @media (max-width: 700px) {
      img {
        object-fit: cover;
        width: 80%;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 0;
    }
  }

  .box-3 {
    img {
      object-fit: cover;
    }
    @media (max-width: 700px) {
      img {
        object-fit: cover;
        width: 80%;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
