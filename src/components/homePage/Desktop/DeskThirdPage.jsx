import React from "react";
import styled, { keyframes, css } from "styled-components";
import * as Img from "../../assets/home/Image";
import StyledButton from "../../common/component/StyledButton";
import { useNavigate } from "react-router-dom";

const DeskThirdPage = () => {

    const navigate = useNavigate();
    const goCamHandler = () => {
      navigate("/camera/frameSelect");
    };


  return (
    <PageSection page={"first"} background={Img.thirdBack}>
      <PageWrap>
        <ContentBox>
          <FontContentBox>
            <div className="title">
              <div className="titleWrap">
                <span className="bigSpan">Your own
                <img className="smallstar" src={Img.DIA40} alt="" /></span>
                <span className="bigSpan">Custom Design</span>
              </div>

            </div>

            <div className="mainBox">
                <span className="subTitleSpan">
                  커스텀만들기
                </span>
              <div className="boxContent">
                <p className="smallSpan">
                  나만의 커스텀 제작을 통해 창의력을 뽐내보세요! 친구의 사진을
                  가져와 같이 있는 모습을 연출 할 수 있습니다. 프레임 선택, 배경
                  사진 선택, 그리기 등 을 통해 참신하고 색다른 나만의 사진!
                  매력적인 사진으로 친구들에게 자랑해볼까요?
                </p>
              </div>

              <StyledButton
                func={goCamHandler}
                width={"130px"}
                height={"40px"}
                title={"완료하기"}
                fontSize={"18px"}
                fontWeight={"500"}
              />
            </div>
          </FontContentBox>
          <OtherImageWrap>
            <img src={Img.thirdImg} className="thirdImg" />
          </OtherImageWrap>
        </ContentBox>
      </PageWrap>
    </PageSection>
  );
};

export default DeskThirdPage;

const PageSection = styled.div`
  min-width: 1024px;
  max-width: 1920px;
  height: 1080px;
  display: flex;
  justify-content: center;

  background-image: ${(props) => `url(${props.background})`};

  background-repeat: no-repeat;
  background-position: bottom;
`;

const PageWrap = styled.div`
  max-width: 1024px;
  display: flex;
  justify-content: center;
`;

const ContentBox = styled.div`
  display: flex;

  width: 1024px;
  padding-top: 185px;
`;

const FontContentBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  .title {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
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
    margin-bottom:20px;
    font-size: 20px;
    line-height: 150%;
    font-weight: 600;
  }



  .smallstar {
    width: 40px;
    height: 40px;
  }


  .mainBox {
    width: 363px;
    height: 372px;
  }

  .boxTitleBox {
    display: flex;
    height: 66px;
    align-items: center;
  }

  .ment {
    font-size: 18px;
    font-weight: bold;
  }

  .boxContent {
    display: flex;
    flex-direction: column;
    width: 270px;
    height: 144px;

    gap: 20px;
    padding-bottom:55px;
    margin-top:20px;
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
  padding-top: 170px;
  .thirdImg {
    width: 100%;
  }
`;
