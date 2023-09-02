import React, { useRef, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import * as Img from "../../assets/home/Image";

const DeskFourthPage = () => {
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
    <PageSection background={Img.fourthBack}>
      <PageWrap>
        <ContentBox>
          <FontContentBox>
            <div className="titleWrap">
              <span className="bigSpan">Post my design</span>
              <span className="subTitleSpan">게시글 자랑하기</span>
              <p className="smallSpan">
                나의 소중한 추억과 순간을 게시글을 통해 기록해 보아요! 커스텀 한
                필터와 프레임을 다른사람들과 공유하고 사용해 볼 수 있습니다!
                매력적인 커스텀으로 인기 크레이터가 돼볼까요?
              </p>
            </div>
            <CardSection>
              <div className="boxWrap" ref={boxWrapRef}>
                <BoxSection className="boxSection">
                  <BoxSection
                    className="box-1"
                    ref={box1Ref}
                    fadeIn={fadeIn[0]}
                  >
                    <img src={Img.photo1}></img>
                    <p className="title">촬영하기</p>
                    <p className="ment">
                      친구들과 함께 찰칵! 영원할 지금의 순간을 남겨보세요!
                    </p>
                  </BoxSection>

                  <BoxSection
                    className="box-2"
                    ref={box2Ref}
                    fadeIn={fadeIn[1]}
                  >
                    <img src={Img.photo2}></img>

                    <p className="title">커스텀하기</p>
                    <p className="ment">
                      특색있는 아이디어로 내 사진 꾸미기! 멋진 필터 멋진
                    </p>
                    <p className="ment">
                      스티커로 꾸미고 저장해볼까요?
                    </p>
                  </BoxSection>

                  <BoxSection
                    className="box-3"
                    ref={box3Ref}
                    fadeIn={fadeIn[2]}
                  >
                    <img src={Img.photo3}></img>

                    <p className="title">게시글로 뽐내기</p>
                    <p className="ment">
                    커스텀 작업물을 사람들에게 자랑보아요! 소중한 추억에 대한 설명도 적으면 좋겠죠?
                    </p>
                  </BoxSection>
                </BoxSection>
              </div>
            </CardSection>
          </FontContentBox>
        </ContentBox>
      </PageWrap>
    </PageSection>
  );
};

export default DeskFourthPage;

const PageSection = styled.div`
  min-width: 1366px;
  max-width: 1920px;
  height: 1920px;
  display: flex;
  justify-content: center;

  background-image: ${(props) => `url(${props.background})`};

  background-repeat: no-repeat;
  background-position: bottom;
`;

const PageWrap = styled.div`
  width: 1366px;
  display: flex;
  justify-content: center;
`;

//1이랑 패딩만달라짐
const ContentBox = styled.div`
  display: flex;

  width: 1170px;
  padding-top: 177px;
`;

const FontContentBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  /*   .title {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 35px;
  } */

  //첫번째는 컬럼임
  .titleWrap {
    display: flex;
    flex-direction: column;
    width: 570px;
    height: 192px;

    .subTitleSpan {
      margin: 30px 0 20px 0;
    }
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
    z-index: 10;
    background-color: var(--white);
  }

  .boxTitleBox {
    display: flex;
    height: 66px;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid black;
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
    position: absolute;
    left: 0;
    z-index: -1;
  }

  .girl {
    margin-top: 150px;
    width: auto;
    z-index: 4;
    cursor: pointer;

    &:hover {
      fill: var(--warningRed);
      animation: ${bounce} 0.6s;
    }
  }
`;

const CardSection = styled.div`
  display: flex;
  width: 100%;
  padding-top: 80px;

  .boxWrap {
    display: flex;
    width: 100%;
    flex-direction: column;
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

const BoxSection = styled.div`
  animation: ${(props) => (props.fadeIn ? fadeInUp : "none")} 1s;

  .box-1 {
    width: 370px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      object-fit: cover;
    }
    @media (max-width: 700px) {
      img {
        object-fit: cover;
        width: 100%;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .box-2 {
    width: 470px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;

    img {
      object-fit: cover;
    }
  }

  .box-3 {
    width: 570px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      object-fit: cover;
    }
  }

  .title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 150%;
  }

  .ment {
    margin-top: 0;
    font-size: 16px;
    line-height: 150%;
    margin:0;
  }
`;
