import styled from "styled-components";

export const OptionSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding-top: 52px;

  .doneBtn {
    margin-top: 87px;
    display: flex;
    justify-content: center;
  }
  .optionName {
    text-align: right;
    color: rgb(80, 80, 80);
    font-size: 14px;
  }
  .progess {
    display: flex;
    width: 90%;
    align-items: center;
    gap: 10px;
  }
  .sizeProgress {
    display: flex;
    flex-direction: column;
    width: 60%;
    gap: 10px;
  }
  .sizeSection {
    display: flex;
    gap: 20px;
    width: 90%;
  }
  img {
    width: 38px;
  }

  .inputFile {
    margin-top: 31px;
  }

  .useMy {
    margin-left: auto;
    display: flex;
    flex-direction: column;
  }

  .rangeSlider {
    padding-top: 23.5px;
    display: flex;
    flex-direction: column;
  }

  .modeBtn {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    border-bottom: 1px solid rgb(217, 217, 217);
  }

  .saveBtn {
    display: flex;
    justify-content: center;
    margin-top: 30%;
  }
`;

export const OptionBtnSection = styled.section`
  margin-left: auto;
`;

export const StickerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 35.5px;

  .optionHeader {
    display: flex;
    flex-direction: column;
    .small {
      margin: auto;
      font-size: 12px;
      color: var(--green5);
      font-weight: 500;
    }

    font-size: 16px;
    font-weight: 500;
    line-height: 150%;
    color: var(--black);
  }
`;

export const ModeBtn = styled.button`
  width: 80px;
  height: 27px;
  border: none;
  background: none;

  border-bottom: 2.5px solid
    ${(props) => (props.state ? "var(--green5)" : "var(--green1)")};
  color: ${(props) => (props.state ? "var(--green5)" : "var(--black)")};
  z-index: 10px;
  cursor: pointer;
`;

export const EraserBtn = styled.button`
  width: 80px;
  height: 27px;

  color: ${(props) => (props.state ? "var(--green5)" : "white")};
  background-color: ${(props) =>
    props.state ? "rgb(246, 250, 240)" : "green"};
  border-radius: 5px;
  border: 1px solid rgb(96, 161, 14);
  padding: 0 10px 0 10px;
  margin-left: auto;
  margin-bottom: 10px;
`;

export const BackgroundGray = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--whiteGray);
`;
export const WhiteContainer = styled.div`
  width: 1170px;
  height: 100%;
  background-color: white;
  overflow: hidden;
`;
export const DrawSection = styled.div`
  display: flex;
`;
export const LeftBox = styled.div`
  width: 69%;
  max-width: 800px;
  max-height: 863px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 13%;

  background: var(--lightGray);
  position: relative;
`;

export const RightBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  width: 31%;
  max-width: 370px;
  max-height: 863px;
  height: 863px;
  background-color: white;

  .optionHeader {
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid rgb(217, 217, 217);
    padding-bottom: 9px;
    margin-bottom: 14px;

    span {
      font-size: 16px;
      font-weight: 500;
    }

    img {
      width: 21px;
    }
  }
`;

export const StickerInput = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--green5);
  display: flex;
  margin-bottom: 20px;
  box-sizing: border-box;
  height: 35px;
  align-items: center;
  padding: 0 10px 0 10px;
  justify-content: space-between;
  background-color: var(--gray1);
  position: relative;

  span {
    font-size: 12px;
    color: rgb(204, 204, 204);
  }

  img {
    width: 22px;
    opacity: 0.5;
  }

  input {
    position: absolute;
    opacity: 0;
    background-color: var(--gray1);
    cursor: pointer;
    width: 100%;
  }
`;
export const SelectedSection = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 280px;
  flex-wrap: wrap;
  gap: 30px;

  overflow-y: scroll;
  height: 150px;
  margin-top: 30px;
  position: relative;

  margin-bottom: 40px;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    box-sizing: border-box;
    background-color: var(--green1);
    border: 2px solid var(--green4);
  }
  &::-webkit-scrollbar-track {
    background-color: var(--white);
  }
`;

export const Stickerbox = styled.div`
  width: 70px;
  height: 80px;

  .filterWrap {
    display: ${(props) => (props.select ? "block" : "none")};
    width: 70px;
    height: 80px;
    position: absolute;
    background-color: var(--green5);
    opacity: 0.5;
  }

  .removeBtnWrap {
    display: flex;
    margin-left: auto;
    justify-content: flex-end;

    .removeBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      border-radius: 50%;
      border: none;
      width: 35px;
      height: 35px;

      img {
        width: 100%;
      }
    }
  }
`;

export const Sticker = styled.div`
  filter: ${(props) => (props.select ? "blur(2px) grayscale(5)" : "none")};

  position: absolute;
  box-sizing: border-box;

  width: 70px;
  height: 80px;

  img {
    width: 100%;
    height: 100%;
  }
`;