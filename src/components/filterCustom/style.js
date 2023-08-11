import { styled } from "styled-components";

const BoxWrap = styled.div`
  width: 970px;
  height: 530px;
  display: flex;
  flex-direction: row;
  margin: 88px;
  box-shadow: 0px 0px 40px -5px rgba(0%, 0%, 0%, 0.1);
`;

const LeftBox = styled.div`
  width: 62%;
  height: 100%;
  background-color: var(--lightGray);
  border-top: 2px solid var(--black);
  border-bottom: 2px solid var(--black);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FrameImg = styled.div`
  width: ${(props) => props.width};
  flex-direction: ${(props) =>
    props.$bottomText ? "column-reverse" : "column"};
  height: 447px;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 5px;
  align-items: center;
  overflow: hidden;

  background-color: ${(props) =>
    `hsl(${props.$h}, ${props.$s}%, ${props.$l}%)`};

    background-image: ${(props) => `url(${props.$frameImg})`};
  background-size: cover;
  background-position: center;
  gap: ${(props) => props.$gap};
`;

const InnerImgWrap = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const RightBox = styled.div`
  width: 38%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
`;

const Title = styled.div`
  font-size: 24px;
  height: 84px;
  display: flex;
  align-items: center;
`;

const Section = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 30px;
  margin-bottom: 30px;
  border-top: 1px solid var(--lightGray);
  border-bottom: 1px solid var(--lightGray);
  gap: 10px;
`;

const SliderBox = styled.div`
  width: 100%;
`;

const UploadContainer = styled.div`
  width: 65%;
  height: 35px;
  color: var(--gray);
  border-bottom: 2px solid var(--black);
  background-color: var(--lightGray);
  /* margin-bottom: 40px; */
`;

const UploadLabel = styled.label`
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const UploadInput = styled.input`
  display: none;
`;

export {
  BoxWrap,
  LeftBox,
  FrameImg,
  InnerImgWrap,
  RightBox,
  Title,
  Section,
  SliderBox,
  UploadContainer,
  UploadLabel,
  UploadInput,
  
}