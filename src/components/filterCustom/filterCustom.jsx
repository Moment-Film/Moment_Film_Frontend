import React, { useEffect } from "react";
import * as a from "./style";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import GridNav from "../frameSelectPage/GridNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import domtoimage from "dom-to-image";
import { SetResultImage } from "../../redux/modules/ResultImage";
import { SetFilter } from "../../redux/modules/Filter";
import StyledButton from "../common/component/StyledButton";
import LOGO from "../assets/images/LOGO.svg";

import * as Img from "../assets/filter/Image";

const FilterCustom = () => {
  const picRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const thisGrid = useSelector((state) => state.image.images);
  const Frame = useSelector((state) => state.FrameInfo);
  const filter = useSelector((state) => state.Filter);

  const [filterList, setFilterList] = useState([
    { key: "blur", label: "블러", max: 10, unit: "px" },
    { key: "brightness", label: "밝기", max: 5, unit: "" },
    { key: "saturate", label: "채도", max: 200, unit: "%" },
    { key: "contrast", label: "대비", max: 200, unit: "%" },
    { key: "sepia", label: "세피아", max: 100, unit: "%" },
  ]);

  const [filterImg, setFilterImg] = useState([
    Img.blur,
    Img.brightness,
    Img.saturate,
    Img.contrast,
    Img.sepia,
  ]);

  const [filterValue, setFilterValue] = useState(
    /* filter */
    {
      blur: parseInt(filter.blur),
      brightness: parseInt(filter.brightness),
      saturate: parseInt(filter.saturate),
      contrast: parseInt(filter.contrast),
      sepia: parseInt(filter.sepia),
    }
  );

  console.log(filterValue);

  //로컬스토리지에서 사진 가져오기
  const [innerImg] = useState([
    localStorage.getItem(`image0`),
    localStorage.getItem(`image1`),
    localStorage.getItem(`image2`),
    localStorage.getItem(`image3`),
  ]);



  const filterValueHandler = async (key, value) => {
    // 상태 업데이트와 리덕스 저장을 한 번에 처리
    await setFilterValue((prevValue) => {
      const newValue = { ...prevValue, [key]: value };
      
      // 리덕스에 변경된 값을 저장
      dispatch(SetFilter(newValue));
  
      return newValue;
    });
  };

  const handleDownload = async () => {
    if (!picRef.current) return;

    try {
      const card = picRef.current;
      domtoimage.toBlob(card).then((imageFile) => {
        console.log(typeof(imageFile))
        dispatch(SetResultImage(imageFile));
        dispatch(SetFilter(filterValue));
        //console.log(imageFile);
        /*    navigate("/camera/capture/finish"); */
        navigate(`/DrawPage`);
      });
    } catch (error) {
      console.error("Error make Image:", error);
    }
  };

  const resetFilter = () => {
    setFilterValue({
      blur: 0,
      brightness: 0,
      saturate: 0,
      contrast: 0,
      sepia: 0,
    });
  };

  return (
    <BackgroundGray>
      <WhiteContainer>
        <GridNav data="filter" />
        <DrawSection>
          <LeftBox>
            <a.FrameImg
              ref={picRef}
              width={thisGrid.width}
              $bottomText={thisGrid.id === "narrow" || thisGrid.id === "wide"}
              $h={Frame.hue}
              $s={Frame.saturation}
              $l={Frame.lightness}
              $frameImg={Frame.imageUrl}
              $gap={thisGrid.gap}
            >
              <img
                src={LOGO}
                alt=""
                style={{ filter: Frame.lightness < 50 && "invert(100%)" }}
              />
              <a.InnerImgWrap>
                {innerImg.map((img, index) => {
                  return (
                    <FilterImage
                      key={index}
                      width={thisGrid.innerWidth}
                      height={thisGrid.innerHeight}
                      $blur={filterValue.blur}
                      $brightness={filterValue.brightness}
                      $saturate={filterValue.saturate}
                      $contrast={filterValue.contrast}
                      $sepia={filterValue.sepia}
                    >
                      <img src={img} alt="" />
                    </FilterImage>
                  );
                })}
              </a.InnerImgWrap>
            </a.FrameImg>
          </LeftBox>

          <RightBox>
            <OptionSection>
              <div className="optionHeader">
                <span>필터조정</span>
                <img onClick={resetFilter} src={Img.reset} />
              </div>

              <section className="sliderWrap">
                {filterList.map((item, index) => (
                  <div key={item.key}>
                    <p className="optionName">{item.label}</p>

                    <div className="progess">
                      <img src={filterImg[index]} />
                      <Slider
                        className="slider"
                        style={{ width: "80%" }}
                        min={0}
                        max={item.max}
                        step={item.unit === "%" ? 1 : 0.1}
                        value={filterValue[item.key] || 0}
                        onChange={(value) =>
                          filterValueHandler(item.key, value)
                        }
                        trackStyle={{ backgroundColor: "rgb( 96, 161, 14)" }}
                        handleStyle={{
                          borderColor: "rgb( 96, 161, 14)",
                          backgroundColor: "white",
                          border: "3px solid rgb( 96, 161, 14)",
                          borderRadius: "50%",
                          width: "13px",
                          height: "13px",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </section>
              <div className="doneBtn">
                <StyledButton
                  func={handleDownload}
                  title={"다음으로"}
                  width={"130px"}
                  height={"40px"}
                  fontSize={"18px"}
                />
              </div>
            </OptionSection>
          </RightBox>
        </DrawSection>
      </WhiteContainer>
    </BackgroundGray>
  );
};

export default FilterCustom;

const OptionSection = styled.section`
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;

  .doneBtn {
    margin-top: 87px;
  }
  .optionName {
    text-align: right;
    color: rgb(80, 80, 80);
    font-size: 14px;
  }
  .progess {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  img {
    width: 38px;
    height: 38px;
  }
  .sliderWrap {
    width: 100%;
  }
`;

const FilterImage = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  overflow: hidden;
  filter: blur(${(props) => props.$blur || 0}px)
    saturate(${(props) => props.$saturate || 100}%)
    brightness(${(props) => props.$brightness || 1})
    contrast(${(props) => props.$contrast || 100}%)
    sepia(${(props) => props.$sepia || 0}%);

  img {
    width: 100%;
    height: 100%;
  }
`;

const BackgroundGray = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--whiteGray);
`;
const WhiteContainer = styled.div`
  width: 1170px;
  height: 100%;
  background-color: white;
  overflow: hidden;
`;
const DrawSection = styled.div`
  display: flex;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
  }
`;
const LeftBox = styled.div`
  height: 863px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--lightGray);
`;
const RightBox = styled.div`
  display: flex;
  padding-top: 81.5px;
  justify-content: center;
  gap: 10px;
  width: 40%;

  background-color: white;

  .optionHeader {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 40px;
    border-bottom: 1px solid rgb(217, 217, 217);
    padding-bottom: 9px;

    span {
      font-weight: 500;
      font-size: 16px;
    }
    img {
      width: 21px;
      height: 21px;
      cursor: pointer;
      transition: transform 0.3s ease;
      &:hover {
        transform: rotate(-90deg);
      }
    }
  }
`;
