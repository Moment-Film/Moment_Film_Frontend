import React from "react";
import styled, { keyframes, css } from "styled-components";
import * as Img from "../../assets/home/Image";
import StyledButton from "../../common/component/StyledButton";
import { useNavigate } from "react-router-dom";

const DeskSecondPage = () => {
  const navigate = useNavigate();
  const goCamHandler = () => {
    navigate("/camera/frameSelect");
  };

  return (
    <PageSection>
      <PageWrap>
        <ContentBox>
          <FontContentBox>
            <div className="titleWrap">
              <span className="bigSpan">Why Have To Moment?</span>
              <img src={Img.vertor} />
            </div>

            <CardSection>
              <div className="grid-container">
                <Card className="content withBackcontent">
                  <p className="cardHeader">집밖에 나가기 싫어요!</p>
                  <p className="cardcontent">
                    나는 친구들과 사진도 찍고, 추억도 쌓고 싶어요! 하지만
                    집순이라 나가기가 싫어서 고민이네요ㅠ
                  </p>
                  <p className="cardOwner">
                    김헛둘님의 고민
                    <img src={Img.profile} />
                  </p>
                </Card>

                <Card>
                  <img src={Img.card1} alt="" />
                </Card>

                <Card className="content">
                  <p className="cardHeader">홈파티 기념을 남길래요!</p>
                  <p className="cardcontent">
                    연말이나 기념일에 홈 파티를 하고 친구들과 기념사진을 남기고
                    싶은데 그때마다 특별한 추억이 없어서 아쉬웠어요!
                  </p>
                  <p className="cardOwner">
                    조현철님의 고민
                    <img src={Img.profile} />
                  </p>
                </Card>

                <Card className="content">
                  <p className="cardHeader">명절에 특별한 이벤트가 필요해요!</p>
                  <p className="cardcontent">
                    친척들과 집에서 할 만한 무언가가 있었으면 좋겠어요 거동이
                    불편한 사람도 다같이 특별한 사진을 찍고 싶어요
                  </p>
                  <p className="cardOwner">
                    지존킹님의 고민
                    <img src={Img.profile} />
                  </p>
                </Card>

                <Card className="content">
                  <p className="cardHeader">
                    내가 원하는 프레임을 찾을 수가 없어요!
                  </p>
                  <p className="cardcontent">
                    원하는 지점에 가서 사진을 찍고 싶어도 지방에 있는지라 찍지
                    못했는데 모먼트필름에서 다양하게 찍어볼 수 있다니 너무
                    좋아요!
                  </p>
                  <p className="cardOwner">
                    나용님의 고민
                    <img src={Img.profile} />
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
                    <img src={Img.profile} />
                  </p>
                </Card>
                <Card>
                  <img src={Img.card2} alt="" />
                </Card>
                <Card className="content">
                  <p className="goHeader">Go Get</p>
                  <p className="cardcontent">
                    모먼트 필름만의 특장점을 직접 사용해 보시고 느껴보세요.
                    순간을 기록하고 추억을 저장해 보세요!
                  </p>
                  <StyledButton
                    func={goCamHandler}
                    width={"142px"}
                    height={"39px"}
                    title={"나도 할래!"}
                  ></StyledButton>
                </Card>
              </div>
            </CardSection>
          </FontContentBox>
        </ContentBox>
      </PageWrap>
    </PageSection>
  );
};

export default DeskSecondPage;

const PageSection = styled.div`
  min-width: 1366px;
  height: 1080px;
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
  justify-content:center;
  width: 1366px;
  padding-top: 186px;
`;

const FontContentBox = styled.div`
  display: flex;
  flex-direction: column;

  //첫번째는 컬럼임
  .titleWrap {
    display: flex;
    width: 372px;
    height: 136px;
  }


  .bigSpan {
    font-size: 52px;
    line-height: 150%;
    font-family: "Abril Fatface", cursive;
  }

  .ment {
    font-size: 18px;
    font-weight: bold;
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


const CardSection = styled.div`
  margin-top: 26px;
  margin-bottom: 183px;

  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4개의 열을 생성 */
    grid-gap: 30px; /* 아이템 사이의 간격 설정 */
    grid-row-gap: 40px; /* 아이템 사이의 간격 설정 */
    grid-template-rows: 1fr 1fr; /* 3개의 행을 생성 */
  }

  .content {
    box-shadow: 0px 0px 40px -5px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--black);
    border-radius: 5px;
  }

  .withBackcontent {
    background-image: url(${Img.cardBackground});
    background-size: cover;
    p {
      color: var(--white);
    }
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 270px;
  height: 342px;
  box-sizing: border-box;

  padding: 0 30px 0 30px;
  img {
    width: 100%;
  }
  .cardHeader {
    font-weight: bold;
    font-size: 24px;
  }
  .cardcontent {
    font-size: 16px;
    line-height: 24px;
  }

  .goHeader{
    font-weight: bold;
    font-size: 24px;
    font-family: "Abril Fatface", cursive;
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
