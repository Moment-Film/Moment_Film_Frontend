import styled from "styled-components";

const ProfileSection = styled.div`
  margin: 20px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;
const ProfilePic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    max-width: 50%;
    max-height: 100%;
    border: 1px solid;
  }
`;
const Infos = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  hr {
    width: 410px;
    border: 1px solid var(--gray2);
  }
`;

const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  div {
    display: flex;
    justify-content: space-between;
  }
`;

const StyleInput = styled.div`
  width: 278px;
  height: 20px;
  border-bottom: 1px solid var(--green5);
  background-color: var(--green0);
  padding: 11px 16px;
`;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 50;
`;

const ProfileWrap = styled.div`
  position: fixed;
  width: 730px;
  height: 415px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  /* flex-direction: colmn; */
  background-color: white;
  z-index: 51;
  border-radius: 5px;
  padding: 20px 20px 0 20px;
`;

const PasswordEditSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const PwEditContainor = styled.div`

`

const EditBtn = styled.div`
  width: 49px;
  height: 17px;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--green5);
  border-radius: 5px;
  background: var(--green1);
  color: var(--green5);
  padding: 5px 10px;
`;

const PwEditWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CloseBtn = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: flex-end;
  /* position: absolute; */
`;

const SubmitBtn = styled.div`
  width: 45px;
  height: 27px;
  color: var(--gray4);
  font-size: 14px;
  line-height: 17px;
  background-color: var(--white);
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SendBtn = styled.div`
  min-width: 87px;
  height: 23px;
  color: var(--gray4);
  font-size: 14px;
  line-height: 17px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  padding: 3px 5px;
`;

const Verify = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 3px 0;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) =>
    props.isVerified ? "var(--green5)" : "var(--warningRed)"};
`;

const TestBox = styled.div`
  width: 310px;
  height: 42px;
  background-color: var(--green0);
  border-bottom: 1px solid var(--green5);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TestInput = styled.input`
  font-size: 16px;
  line-height: 20px;
  background: none;
  border: none;

  &:focus {
    outline: none;
    border: none;
  }
`;

const TestBtn = styled.div`
  width: 25px;
  height: 17px;
  color: var(--gray4);
  font-size: 14px;
  line-height: 17px;
  border: 1px solid var(--lightGray);
  border-radius: 5px;
  padding: 5px 10px;
`;

export {
  ProfileSection,
  ProfilePic,
  Infos,
  InfoSection,
  StyleInput,
  ModalBg,
  ProfileWrap,
  PasswordEditSection,
  PwEditContainor,
  EditBtn,
  PwEditWrap,
  CloseBtn,
  SendBtn,
  Verify,
  TestBox,
  TestInput,
  TestBtn,
};
