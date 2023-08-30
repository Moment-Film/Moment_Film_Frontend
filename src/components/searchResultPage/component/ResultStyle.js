import styled from "styled-components";

const ResultWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const ResultSection = styled.section`
  width: 1170px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .nonResult {
  }
  .resultExist {
    display: flex;
    align-items: center;
    font-size: 28px;
    line-height: 150%;
    margin-top: 30px;

    span {
      color: var(--green5);
      background-color: none;
      font-weight: bold;
    }
  }

  .resultLine {
    width: 100%;
    height: 1px;
    background-color: var(--lightGray);
    margin-top: 20px;
    margin-bottom: 60px;
  }
`;

const ResultUser = styled.div`
  width: 970px;
  height: 332px;
  border: 1px solid var(--gray2);
  background-color: var(--gray1);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  padding: 40px 70px;

  .nullComment {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
  }
`;

const ProfileWrap = styled.div`
  width: ${(props) => props.width};
  height: 252px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: ${(props) => props.border};
  background-color: ${(props) => props.backgroundColor};
  padding: ${(props) => props.padding};

  .ImageSection {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: none;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .bar {
    width: 1px;
    height: 10px;
    background-color: var(--gray3);
  }

  .username {
    font-size: 24px;
    font-weight: 600;
    line-height: 150%;
  }
`;

const InfoBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .measure {
    font-size: 20px;
    font-weight: 600;
    line-height: 150%;
    color: var(--green5);
  }

  .infobox {
    width: 200px;
    height: 40px;
    border: none;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 21px;

    .value {
      font-size: 13px;
      font-weight: 150%;
      color: var(--gray5_a);
    }

    .infowrap {
      display: flex;
      align-items: center;
      gap: 20px;
      .bar {
        width: 1px;
        height: 10px;
        background-color: var(--gray3);
      }
    }
  }
`;

const PostWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;

  .semiNull {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
  }
`;

const ImgWrap = styled.div`
  width: 168px;
  border: 1px solid var(--gray2);
  border-radius: 5px;
  background: var(--white);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100%;
    border: none;
    border-radius: 5px;
  }

  .nullComment {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
  }
`;

const RecommendSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 28px;
  font-weight: 400;
  line-height: 150%;

  .recommendMent {
    font-size: 20px;
    font-weight: 400;
    line-height: 150%;
    color: var(--gray5);
    margin-top: 70px;
  }
`;

const NonResultWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 70px;
  gap: 30px;
`;

export {
  ResultWrap,
  ResultSection,
  ResultUser,
  ProfileWrap,
  InfoBoxWrap,
  PostWrap,
  ImgWrap,
  RecommendSection,
  NonResultWrap,
};
