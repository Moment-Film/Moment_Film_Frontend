import React from "react";
import * as a from "./style";
import * as s from "../frameSelectPage/style";
import GridNav from "../frameSelectPage/GridNav";
import StyledButton from "../common/component/StyledButton";
import { SetFrameColor } from "../../redux/modules/FrameInfo";
import upload from "../assets/icons/upload.svg";

import {
  HueSlider,
  SaturationSlider,
  LightnessSlider,
} from "react-slider-color-picker";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import styled from "styled-components";
import { SetBackgroundImg } from "../../redux/modules/FrameInfo";
=======
import { StyledSpan14 } from "../common/styles/StyledSpan";
>>>>>>> 7eb13c7841f41b8bae43ebe0027dac0b0385bd33

const FrameCustomMake = () => {
  
  const [color, setColor] = useState({ h: 180, s: 100, l: 100 });
  const [frameImg, setFrameImg] = useState(null);
  const [uploadedImg, setUploadedImg] = useState(null);
  const frameImgRef = useRef();

  const navigate = useNavigate();

  const thisGrid = useSelector((state) => state.image.images);
  const dispatch=useDispatch();

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
<<<<<<< HEAD
      dispatch(SetBackgroundImg(URL.createObjectURL(input.files[0])))
=======
      setUploadedImg(input.files[0].name);
>>>>>>> 7eb13c7841f41b8bae43ebe0027dac0b0385bd33
    }
  };

  const imageDeleteHandler = () => {
    setFrameImg(null);
    setUploadedImg(null);
  };


  const moveBtnHandler = async() => {
    await dispatch(SetFrameColor(color));
    navigate("/camera/capture/filter");
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
                            visibility: img === "null" ? "hidden" : "visible",
                          }}
                        >
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                            src={img}
                            alt=""
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
                <div style={{ width:'70%', display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                  <a.UploadContainer>
                  <a.UploadInput
                    id="fileInput"
                    accept="image/*"
                    type="file"
                    onChange={imageChangeHandler}
                    ref={frameImgRef}
                  />
                  <a.UploadLabel>
                    {uploadedImg ? (
                      <>
                        <a.UploadedImg color="var(--green5)">
                          {uploadedImg}
                        </a.UploadedImg>
                        <a.ImgDeleteBtn onClick={imageDeleteHandler}>
                          x
                        </a.ImgDeleteBtn>
                      </>
                    ) : (
                      <>
                        <a.UploadedImg color="var(--gray)">
                          이미지 불러오기
                        </a.UploadedImg>
                        <label htmlFor="fileInput">
                          <img
                            src={upload}
                            alt=""
                            style={{
                              width: "16px",
                              opacity: "0.5",
                              cursor: "pointer",
                            }}
                          />
                        </label>
                      </>
                    )}
                  </a.UploadLabel>
                </a.UploadContainer>
                <StyledSpan14 style={{ margin: '12px 0 35px 0', color: 'var(--lightGray)'}}>300px * 447px를 권장합니다.</StyledSpan14>
                </div>
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
};

export default FrameCustomMake;
