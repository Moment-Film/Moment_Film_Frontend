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
export const WithdrawalBtn = styled.section`
  text-decoration: underline;
  color: var(--gray4);
  font-size: 12px;
  line-height: 14px;
	margin-top: 12px;
`;


// const FrameImg = styled.div`
//   width: ${(props) => props.width};
//   flex-direction: ${(props) =>
//     props.$bottomText ? "column-reverse" : "column"};
//   height: 447px;
//   align-items: center;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   border-radius: 5px;
//   align-items: center;
//   overflow: hidden;
//   background-color: ${(props) =>
//     `hsl(${props.color.h}, ${props.color.s}%, ${props.color.l}%)`};
//   background-image: ${(props) => `url(${props.$frameImg})`};
//   background-size: cover;
//   background-position: center;
//   gap: ${(props) => props.gap};
// `;
const FrameImg = styled.div`
  display: flex;
  width: ${props => props.width || '150px' };
  height: 447px;
  flex-direction: ${props => props.$bottomText ? 'column-reverse': 'column'};
  gap: ${props => props.$gap};
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${(props) =>
  `hsl(${props.color.h}, ${props.color.s}%, ${props.color.l}%)`};
  background-image: ${(props) => `url(${props.$frameImg})`};
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  box-shadow: 0px 0px 40px -5px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 15px;
  img {
    width: 148px;
    margin: 5px auto;
  }
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
  /* box-sizing: border-box; */
  padding-bottom: 50px;
`;

const Title = styled.div`
  font-size: 24px;
  line-height: 150%;
  height: 64px;
  margin: 20px 0 12px 0;
  display: flex;
  align-items: center;
`;

const Section = styled.div`
  width: 80%;
  height: 215px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 30px;
  margin-bottom: 30px;
  gap: 10px;
`;

const SliderBox = styled.div`
  width: 100%;
  font-size:10px
`;

const UploadContainer = styled.div`
  width: 100%;
  height: 35px;
  color: var(--gray);
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 2px solid var(--black);
  background-color: var(--whiteGray);
  /* margin-bottom: 10px; */
`;

const UploadLabel = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const UploadInput = styled.input`
  display: none;
  height:35px;
`;

const UploadedImg = styled.div`
  font-size: 14px;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.color};
`;

const ImgDeleteBtn = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid var(--green5);
  border-radius: 50%;
  display: flex;
  align-content: center;
  justify-content: center;
  color: var(--green5);
  cursor: pointer;
`;

const Notice = styled.div`
  font-size: 16px;
  background-color: pink;
`

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
  UploadedImg,
  ImgDeleteBtn,
  Notice,
};