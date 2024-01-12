import React from "react";
import styled, { keyframes, css } from "styled-components";
import * as Img from "../../assets/home/Image";
import StyledButton from "../../common/component/StyledButton";
import { useNavigate } from "react-router-dom";

const FirstPage = () => {
  
  const navigate=useNavigate();
  const goCamHandler = () => {
    navigate("/camera/frameSelect");
  };

  return (
    <PageSection page={"first"} background={Img.firstBack}>
      <PageWrap>
        <ContentBox>
          <FontContentBox>
            <div className="title">
              <div className="titleWrap">
                <span className="middleSpan">At Best Time</span>
                <span className="bigSpan">Take Your Moment</span>
                <span className="smallSpan">
                  톡톡튀는 아이디어로 인기 크리에이터가 되어볼까요?
                </span>
              </div>


              <div className="starImg">
                <img className="smallstar" src={Img.DIA40} alt="" />
                <img className="bigstar" src={Img.DIA_yel} alt="" />
              </div>
            </div>

            <div className="mainBox">
              <div className="boxTitleBox">
                <span className="subTitleSpan">
                  일상을 개성있게 남겨보세요!
                </span>
                <img className="flowImg" src={Img.SPIN_FLOWER} alt="" />
              </div>
              <div className="boxContent">
                <p className="smallSpan">
                  자신만의 작품을 만들어 포토크리에이터로 활동해보아요. 게시글을
                  통해 사람들에게 공유하고, 다른 사람의 작품을 사용해 볼 수
                  있습니다. 톡톡튀는 아이디어로 인기 크리에이터가 되어볼까요?
                </p>
                <p className="smallSpan">
                  많은 포인트를 적립해 다양한 사람들의 작품을 사용해 볼 수
                  있습니다. 게시글을 공유해 친구 들에게 자랑해보세요! 시간과
                  있었던 재미있는 사건을 적으면 더 좋겠죠? 순간을 기록하고
                  추억을 저장해보세요!
                </p>
              </div>
              <div className="buttonWrap">
                <StyledButton
                  func={goCamHandler}
                  width={"116px"}
                  height={"36px"}
                  title={"촬영하기"}
                  fontSize={"16px"}
                  fontWeight={"600"}
                />
              </div>
            </div>
          </FontContentBox>
          <OtherImageWrap>
            <img src={Img.girl} className="girl" />
          </OtherImageWrap>
        </ContentBox>
      </PageWrap>
    </PageSection>
  );
};

export default FirstPage;

const PageSection = styled.div`
  min-width: 1366px;
  display:flex;
  justify-content:center;

  background-image: ${(props) => `url(${props.background})`};

  background-repeat: no-repeat;
  background-position: bottom;

`;

const PageWrap = styled.div`
  max-width: 1366px;
  display:flex;
  justify-content:center;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content:center;
  width: 1366px;
  padding-top: 93px;
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;


const FontContentBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  .title {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 35px;
  }

  .titleWrap {
    display: flex;
    flex-direction: column;
  }
  .middleSpan {
    font-size: 36px;
    line-height: 150%;
    font-family: "Abril Fatface", cursive;
  }

  .bigSpan {
    font-size: 52px;
    line-height: 150%;
    font-family: "Abril Fatface", cursive;
  }

  .smallSpan {
    font-size: 16px;
    line-height: 150%;
    margin: 0;
  }

  .subTitleSpan {
    font-size: 20px;
    line-height: 150%;
    font-weight: 600;
  }

  .starImg {
    left: 93%;
    position: absolute;
  }

  .smallstar {
    margin-left: -30px;
    width: 40px;
    height: 40px;
  }

  .bigstar {
    width: 56px;
    height: 56px;
  }

  .mainBox {
    width: 370px;
    height: 443px;
    border: 1px solid var(--black);
    border-radius: 5px;
    box-sizing: border-box;
    z-index:10;
    background-color:var(--white);
  }
  

  .boxTitleBox {
    display: flex;
    height: 66px;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid black;

    .flowImg {
    position: absolute;
    margin-left:370px;
    margin-top:-60px;
    width: 3vw;
    height: 3vw;
    max-width: 50px;
    max-height: 50px;
    animation: ${spinAnimation} 10s linear infinite;

  }

  }

  .ment {
    font-size: 18px;
    font-weight: bold;
  }

  .boxContent {
    display: flex;
    flex-direction: column;

    gap: 20px;
    height: 236px;
    padding: 20px 30px 40px 30px;
  }

  .buttonWrap {
    display: flex;
    justify-content: center;
  }
  
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1vw);
  }
`;

const OtherImageWrap = styled.div`

  .obj {
    width: auto;
    position:absolute;
    left:0;
    z-index: -1;
  }

  .girl {
    padding-top:120px;
    width: auto;
    z-index: 4;
    cursor: pointer;

    &:hover {
      fill: var(--warningRed);
      animation: ${bounce} 0.6s;
    }
  }
`;
