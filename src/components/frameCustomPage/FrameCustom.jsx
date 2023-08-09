import React from "react";
import * as a from "./style";
import {
  HueSlider,
  SaturationSlider,
  LightnessSlider,
} from "react-slider-color-picker";
import GridNav from "../frameSelectPage/GridNav";
import * as s from "../frameSelectPage/style";
import StyledButton from "../common/component/StyledButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

const FrameCustomMake = () => {
  const [color, setColor] = useState({ h: 180, s: 100, l: 100 });
  const [frameImg, setFrameImg] = useState(null);
  const frameImgRef = useRef();

  const navigate = useNavigate();

  const thisGrid = useSelector((state) => state.image.images);


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
            <a.BoxWrap>
              <a.LeftBox>
                <a.FrameImg
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
                  <a.InnerImgWrap>
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
                  </a.InnerImgWrap>
                </a.FrameImg>
              </a.LeftBox>
              <a.RightBox>
                <a.Title>Frame</a.Title>
                <a.Section>
                  <a.SliderBox>
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
                  </a.SliderBox>
                </a.Section>
                <a.UploadContainer>
                  <a.UploadInput
                    id="fileInput"
                    accept="image/*"
                    type="file"
                    onChange={imageChangeHandler}
                    ref={frameImgRef}
                  />
                  <a.UploadLabel htmlFor="fileInput">
                    <div>이미지 불러오기</div>
                    <div>클릭</div>
                  </a.UploadLabel>
                </a.UploadContainer>
                <StyledButton
                  func={moveBtnHandler}
                  title={"완료하기!"}
                  width={"130px"}
                  height={"40px"}
                  fontSize={"18px"}
                />
              </a.RightBox>
            </a.BoxWrap>
          </s.OptionWrap>
        </s.Slider>
      </s.Wrap>
    </>
  );
}

export default FrameCustomMake;