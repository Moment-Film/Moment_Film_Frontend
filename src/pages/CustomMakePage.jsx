import React from "react";
import { styled } from "styled-components";
import {
  HueSlider,
  SaturationSlider,
  LightnessSlider,
} from "react-slider-color-picker";
import GridNav from "./../components/frameSelectPage/GridNav";
import * as s from "../components/frameSelectPage/style";
import StyledButton from "../components/common/component/StyledButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

function CustomMakePage() {
  const [color, setColor] = useState({ h: 180, s: 100, l: 100 });
  const [frameImg, setFrameImg] = useState(null);
  const frameImgRef = useRef();

  const navigate = useNavigate();

  const gridSizes = [
    {
      id: "down",
      width: "300px",
      innerWidth: "126.6px",
      innerHeight: "175.2px",
      gap: "4px",
    },
    {
      id: "up",
      width: "300px",
      innerWidth: "123.1px",
      innerHeight: "162.5px",
      gap: "28px",
    },
    {
      id: "wide",
      width: "259px",
      innerWidth: "202.9px",
      innerHeight: "78.7px",
      gap: "8px",
    },
    {
      id: "narrow",
      width: "211px",
      innerWidth: "147.2px",
      innerHeight: "78.7px",
      gap: "8px",
    },
  ];
  const gridId = useSelector((state) => state.image.selectedImage);
  const [thisGrid] = useState(
    gridSizes.filter((grid) => grid.id === gridId)[0]
  );

  const [innerImg] = useState([
    localStorage.getItem(`image0`),
    localStorage.getItem(`image1`),
    localStorage.getItem(`image2`),
    localStorage.getItem(`image3`),
  ]);

  const changeColorHandler = (newColor) => {
    setColor(newColor);
    console.log(newColor);
  };

  const imageChangeHandler = (e) => {
    const input = e.target;
    if (input.files && input.files[0]) {
      setFrameImg(URL.createObjectURL(input.files[0]));
    }
    console.log(frameImg);
  };

  const moveBtnHandler = () => {
    navigate("/camera/capture/finish");
  };

  return (
    <>
      <s.Wrap>
        <s.Slider>
          <s.OptionWrap>
            <GridNav data={"frameSetting"} />
            <BoxWrap>
              <LeftBox>
                <FrameImg
                  width={thisGrid.width}
                  $bottomText={
                    thisGrid.id === "narrow" || thisGrid.id === "wide"
                  }
                  color={color}
                  frameImg={frameImg}
                  gap={thisGrid.gap}
                >
                  <p
                    style={{
                      color: color.l > 50 ? "var(--black)" : "var(--whiteGray)",
                      fontFamily: "'Abril Fatface', cursive",
                    }}
                  >
                    moment film
                  </p>
                  <InnerImgWrap>
                    {innerImg.map((img, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            width: `${thisGrid.innerWidth}`,
                            height: `${thisGrid.innerHeight}`,
                          }}
                        >
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                            src={img}
                            alt=''
                          />
                        </div>
                      );
                    })}
                  </InnerImgWrap>
                </FrameImg>
              </LeftBox>
              <RightBox>
                <Title>Frame</Title>
                <Section>
                  <SliderBox>
                    <div>색조</div>
                    <HueSlider
                      handleChangeColor={changeColorHandler}
                      color={color}
                    />

                    <div>채도</div>
                    <SaturationSlider
                      handleChangeColor={changeColorHandler}
                      color={color}
                    />

                    <div>밝기</div>
                    <LightnessSlider
                      handleChangeColor={changeColorHandler}
                      color={color}
                    />
                  </SliderBox>
                </Section>
                <UploadContainer>
                  <UploadInput
                    id="fileInput"
                    accept="image/*"
                    type="file"
                    onChange={imageChangeHandler}
                    ref={frameImgRef}
                  />
                  <UploadLabel htmlFor="fileInput">
                    <div>이미지 불러오기</div>
                    <div>클릭</div>
                  </UploadLabel>
                </UploadContainer>
                <StyledButton
                  func={moveBtnHandler}
                  title={"완료하기!"}
                  width={"130px"}
                  height={"40px"}
                  fontSize={"18px"}
                />
              </RightBox>
            </BoxWrap>
          </s.OptionWrap>
        </s.Slider>
      </s.Wrap>
    </>
  );
}

export default CustomMakePage;

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
    `hsl(${props.color.h}, ${props.color.s}%, ${props.color.l}%)`};
  background-image: ${(props) => `url(${props.frameImg})`};
  background-size: cover;
  background-position: center;
  gap: ${(props) => props.gap};
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
