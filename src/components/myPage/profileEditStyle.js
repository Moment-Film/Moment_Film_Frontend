import styled from "styled-components";

const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 50;
`;

// 모달 컨테이너박스
const ProfileWrap = styled.div`
  width: 730px;
  height: 442px;
  background-color: var(--white);
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  z-index: 51;
  padding: 0 20px 20px 20px;

  @media (max-width: 900px) {
    width: 80%;
    height: 70%;
    margin: 100px 0;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      box-sizing: border-box;
      background-color: var(--green1);
      border: 2px solid var(--green4);
    }
    &::-webkit-scrollbar-track {
      background-color: var(--whiteGray);
    }
  }
`;

// 클로즈버튼
const CloseSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;

  section {
    width: 98%;
    height: 20px;
  }
`;

const CloseBtn = styled.div`
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
  }
`;

const ProfileSection = styled.section`
  width: 100%;
  height: 378px;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  position: relative;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PicSection = styled.section`
  width: 236px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  padding-top: 25px;

  @media (max-width: 375px) {
    margin-left: 0;
  }
`;

const PicBox = styled.div`
  width: 200px;
  height: 252px;
  border: 2px solid;

  img {
    width: 200px;
    height: 252px;
    object-fit: cover;
  }
`;

const EditBtn = styled.label`
  cursor: pointer;

  img {
    max-width: 36px;
    max-height: 36px;
    cursor: pointer;
    position: absolute;
    bottom: 88px;
    left: 221px;
  }
`;

const PicInfoSection = styled.section`
  width: 236px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  span {
    font-size: 24px;
    line-height: 150%;
    color: var(--black);
    font-weight: 700;
  }

  div {
    font-size: 14px;
    line-height: 150%;
    color: var(--gray4);
    margin-top: 4px;
    margin-bottom: 8px;
  }
`;

const Info = styled.div`
  width: 410px;
  height: 377px;
  display: flex;
  flex-direction: column;
`;

const InfoSection = styled.section`
  display: flex;
  flex-direction: column;

  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 5%;
    margin-bottom: 19.5px;
    img {
      width: 24px;
    }
  }

  span {
    font-size: 14px;
    line-height: 150%;
  }

  hr {
    width: 99.5%;
    border: 1px solid var(--lightGray);
    margin-bottom: 19.5px;
  }
`;

const InfoInput = styled.section`
  width: 270px;
  height: 19px;
  border-bottom: 1px solid var(--green5);
  background-color: var(--green0);
  padding: 11px 16px;

  input {
    width: 85%;
    font-size: 16px;
    line-height: 150%;
    background: none;
    border: none;

    &:focus {
      outline: none;
      border: none;
    }
  }
`;

const PasswordSection = styled.section`
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    padding-bottom: 20px;
  }
`;

const PasswordWrap = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 5px;

  section {
    width: 370px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  span {
    font-size: 14px;
    line-height: 150%;
  }
`;

const SendBtn = styled.div`
  min-width: 87px;
  height: 23px;
  color: var(--gray4);
  font-size: 14px;
  line-height: 150%;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0 0 0;
  padding: 3px 5px;
  cursor: pointer;
`;

const TestBox = styled.div`
  width: 277px;
  height: 41px;
  background-color: var(--green0);
  border-bottom: 1px solid var(--green5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 16px;
`;

const TestInput = styled.input`
  font-size: 16px;
  line-height: 150%;
  background: none;
  border: none;

  &:focus {
    outline: none;
    border: none;
  }

  &::placeholder {
    font-size: 14px;
  }
`;

const TestBtn = styled.div`
  width: 25px;
  height: 17px;
  color: var(--gray4);
  font-size: 14px;
  line-height: 150%;
  border: 1px solid var(--lightGray);
  border-radius: 5px;
  background-color: var(--white);
  padding: 5px 10px;
  cursor: pointer;
`;

const Verify = styled.div`
  font-size: 12px;
  line-height: 150%;
  color: ${(props) =>
    props.isVerified ? "var(--green5)" : "var(--warningRed)"};
  margin: 5px 0 0 0;
  margin-bottom: ${(props) => props.marginBottom};
`;

const SaveBtn = styled.div`
  width: 49px;
  height: 17px;
  font-size: 14px;
  line-height: 150%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--green5);
  border-radius: 5px;
  background: var(--green1);
  color: var(--green5);
  padding: 5px 10px;
  margin-top: 13px;
  cursor: pointer;
`;

export {
  ModalBg,
  ProfileWrap,
  CloseSection,
  CloseBtn,
  ProfileSection,
  PicSection,
  PicBox,
  EditBtn,
  PicInfoSection,
  Info,
  InfoSection,
  InfoInput,
  PasswordSection,
  PasswordWrap,
  SendBtn,
  TestBox,
  TestInput,
  TestBtn,
  Verify,
  SaveBtn,
};
