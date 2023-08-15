import React, { useEffect } from "react";
import * as a from "./style";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import GridNav from "../frameSelectPage/GridNav";
import * as s from "../frameSelectPage/style";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { saveAs } from "file-saver";
import domtoimage from "dom-to-image";
import { SetResultImage } from "../../redux/modules/ResultImage";
import { SetFilter } from "../../redux/modules/Filter";

const FilterCustom = () => {
  const picRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filterList, setFilterList] = useState([
    { key: "blur", label: "블러", max: 10, unit: "px" },
    { key: "brightness", label: "밝기", max: 5, unit: "" },
    { key: "saturate", label: "채도", max: 200, unit: "%" },
    { key: "grayscale", label: "흑백", max: 100, unit: "%" },
    { key: "contrast", label: "대비", max: 200, unit: "%" },
    { key: "huerotate", label: "hue-rotate", max: 360, unit: "deg" },
    { key: "sepia", label: "세피아", max: 100, unit: "%" },
  ])

  const [filterValue, setFilterValue] = useState({ filterName: "test" });

  const thisGrid = useSelector((state) => state.image.images);
  const FrameColor = useSelector((state) => state.FrameInfo.color);
  const thisbackGround = useSelector((state) => state.FrameInfo.backgroundImg);

  //로컬스토리지에서 사진 가져오기 
  const [innerImg] = useState([
    localStorage.getItem(`image0`),
    localStorage.getItem(`image1`),
    localStorage.getItem(`image2`),
    localStorage.getItem(`image3`),
  ]);


  const filterValueHandler = (key, value) => {
    const newValue = { ...filterValue, [key]: value };
    setFilterValue(newValue);
  };

  const handleDownload = async () => {
    if (!picRef.current) return;

    try {
      const card = picRef.current;
      domtoimage.toBlob(card).then((imageFile) => {
        dispatch(SetResultImage(imageFile));
        dispatch(SetFilter(filterValue));
        console.log(imageFile);
        saveAs(imageFile, "card.png");
        navigate(`/camera/capture/finish`);
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
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
                  ref={picRef}
                  width={thisGrid.width}
                  $bottomText={
                    thisGrid.id === "narrow" || thisGrid.id === "wide"
                  }
                  $h={FrameColor.h}
                  $s={FrameColor.s}
                  $l={FrameColor.l}
                  $frameImg={thisbackGround}
                  $gap={thisGrid.gap}
                >
                  <p
                    style={{
                      color:
                        FrameColor.l > 50 ? "var(--black)" : "var(--whiteGray)",
                      fontFamily: "'Abril Fatface', cursive",
                    }}
                  >
                    moment film
                  </p>
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
                          $grayscale={filterValue.grayscale}
                          $contrast={filterValue.contrast}
                          $huerotate={filterValue.huerotate}
                          $sepia={filterValue.sepia}
                        >
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                            src={img}
                            alt=""
                          />
                        </FilterImage>
                      );
                    })}
                  </a.InnerImgWrap>
                </a.FrameImg>
              </a.LeftBox>

              <a.RightBox>
                <OptionSection>
                  <div>Filter</div>
                    {
                      filterList.map((item) =>
                        <div key={item.key}>
                          <p>{`${item.label} ${filterValue[item.key] || 0}${item.unit}`}</p>

                          <Slider
                            style={{ width: "250px" }}
                            min={0}
                            max={item.max}
                            step={item.unit === "%" ? 1 : 0.1}
                            value={filterValue[item.key] || 0}
                            onChange={(value) => filterValueHandler(item.key, value)}
                            trackStyle={{ backgroundColor: "rgba(203, 221, 90, 1)" }}
                            handleStyle={{
                              borderColor: "rgba(203, 221, 90, 1)",
                              backgroundColor: "rgba(203, 221, 90, 1)",
                              borderRadius: "10%",
                              width: "10px",
                              height: "20px",
                              marginLeft: "-5px",
                              marginTop: "-9px",
                            }}
                          />
                        </div>
                      )
                    }

                  <button onClick={handleDownload}>다음으로</button>
                </OptionSection>
              </a.RightBox>
            </a.BoxWrap>
          </s.OptionWrap>
        </s.Slider>
      </s.Wrap>
    </>
  );
};

export default FilterCustom;

const OptionSection = styled.section`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

const FilterImage = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  overflow: hidden;
  filter: blur(${(props) => props.$blur || 0}px)
    saturate(${(props) => props.$saturate || 100}%)
    brightness(${(props) => props.$brightness || 1})
    grayscale(${(props) => props.$grayscale || 0}%)
    contrast(${(props) => props.$contrast || 100}%)
    hue-rotate(${(props) => props.$huerotate || 0}deg)
    sepia(${(props) => props.$sepia || 0}%);
`;
