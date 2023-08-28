import { styled } from "styled-components";


const FrameImg = styled.div`
  width: ${(props) => props.width};
  flex-direction: ${(props) =>
    props.$bottomText ? "column-reverse" : "column"};
  height: 447px;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  align-items: center;
  overflow: hidden;
  background-color: ${(props) =>
    `hsl(${props.$h}, ${props.$s}%, ${props.$l}%)`};
  background-image: ${(props) => `url(${props.$frameImg})`};
  background-size: cover;
  background-position: center;
  gap: ${(props) => props.$gap};
  box-shadow: 0px 0px 40px -5px rgba(0, 0, 0, 0.3);
  justify-content: space-between;
  box-sizing: border-box;
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

export {
  FrameImg,
  InnerImgWrap,
}