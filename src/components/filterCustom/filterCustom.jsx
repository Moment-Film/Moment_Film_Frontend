import React from "react";
import * as a from "./style";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import GridNav from "../frameSelectPage/GridNav";
import * as s from "../frameSelectPage/style";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useSelector ,useDispatch } from "react-redux";
import styled from "styled-components";
import { saveAs } from "file-saver";
import domtoimage from 'dom-to-image';
import { SetResultImage } from "../../redux/modules/ResultImage";

const FilterCustom = () => {
  const [frameImg, setFrameImg] = useState(null);
  const picRef=useRef();

  const navigate = useNavigate();
  const dispatch=useDispatch();
  const thisGrid = useSelector((state) => state.image.images);
  const FrameColor = useSelector((state) => state.FrameInfo.color);
  const thisbackGround = useSelector((state) => state.FrameInfo.backgroundImg);

  const [innerImg] = useState([
    localStorage.getItem(`image0`),
    localStorage.getItem(`image1`),
    localStorage.getItem(`image2`),
    localStorage.getItem(`image3`),
  ]);

  const [filterValue, setFilterValue] = useState({});

  const filterValueHandler = (key, value) => {
    const newValue = { ...filterValue, [key]: value };
    setFilterValue(newValue);
  };

  const handleDownload = async () => {
    if (!picRef.current) return;

    try {
      const card = picRef.current;
      domtoimage.toBlob(card).then(blob => {
        dispatch(SetResultImage(blob))
        saveAs(blob, 'card.png');
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
              <a.LeftBox >
                <a.FrameImg
                  ref={picRef}
                  width={thisGrid.width}
                  $bottomText={
                    thisGrid.id === "narrow" || thisGrid.id === "wide"
                  }
                h={FrameColor.h}
                s={FrameColor.s}
                l={FrameColor.l}
                  frameImg={thisbackGround}
                  gap={thisGrid.gap}
                >
                  <p
                    style={{
                       color: FrameColor.l > 50 ? "var(--black)" : "var(--whiteGray)",
                       fontFamily: "'Abril Fatface', cursive",
                    }}
                  >
                    moment film
                  </p>
                  <a.InnerImgWrap>
                    {
                    innerImg.map((img, index) => {
                      return (
                        <FilterImage
                          key={index}
                          width= {thisGrid.innerWidth}
                          height= {thisGrid.innerHeight}
                          blur={filterValue.blur}
                          brightness={filterValue.brightness}
                          saturate={filterValue.saturate}
                          grayscale={filterValue.grayscale}
                          contrast={filterValue.contrast}
                          huerotate={filterValue.huerotate}
                          sepia={filterValue.sepia}
                        >
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                            src={img}
                            alt=''
                          />
                        </FilterImage>
                      );
                    })
                    }
                  </a.InnerImgWrap>
                </a.FrameImg>
              </a.LeftBox>
              <a.RightBox>
              <OptionSection>
        <div>Filter</div>
        <div>
          <p>블러 {filterValue.blur || 0}px</p>
          <Slider
            style={{ width: "250px" }}
            min={0}
            max={10}
            step={0.1}
            value={filterValue.blur || 0}
            onChange={(value) => filterValueHandler("blur", value)}

            trackStyle={{ backgroundColor: 'rgba(203, 221, 90, 1)' }} // 트랙의 배경색을 변경

            handleStyle={{
              borderColor: 'rgba(203, 221, 90, 1)', // 핸들의 테두리 색상을 변경
              backgroundColor: 'rgba(203, 221, 90, 1)', // 핸들의 배경색을 변경
              borderRadius: '10%', // 원형 핸들로 모양 변경
              width: '10px',
              height: '20px',
              marginLeft: '-5px', // 핸들의 가로  가운데 정렬
              marginTop: '-9px', // 핸들의 세로  가운데 정렬
            }}
          />
        </div>
        <div>
          <p>밝기 {filterValue.brightness || 1}</p>
          <Slider
            style={{ width: "250px" }}
            min={0}
            max={5}
            step={0.1}
            value={filterValue.brightness || 1}
            onChange={(value) => filterValueHandler("brightness", value)}

            trackStyle={{ backgroundColor: 'rgba(203, 221, 90, 1)' }} // 트랙의 배경색을 변경

            handleStyle={{
              borderColor: 'rgba(203, 221, 90, 1)', // 핸들의 테두리 색상을 변경
              backgroundColor: 'rgba(203, 221, 90, 1)', // 핸들의 배경색을 변경
              borderRadius: '10%', // 원형 핸들로 모양 변경
              width: '10px',
              height: '20px',
              marginLeft: '-5px', // 핸들의 가로  가운데 정렬
              marginTop: '-9px', // 핸들의 세로  가운데 정렬
            }}
          />
        </div>
        <div>
          <p>채도 {filterValue.saturate || 100}%</p>
          <Slider
            style={{ width: "250px" }}
            min={0}
            max={200}
            value={filterValue.saturate || 100}
            onChange={(value) => filterValueHandler("saturate", value)}

            trackStyle={{ backgroundColor: 'rgba(203, 221, 90, 1)' }} // 트랙의 배경색을 변경

            handleStyle={{
              borderColor: 'rgba(203, 221, 90, 1)', // 핸들의 테두리 색상을 변경
              backgroundColor: 'rgba(203, 221, 90, 1)', // 핸들의 배경색을 변경
              borderRadius: '10%', // 원형 핸들로 모양 변경
              width: '10px',
              height: '20px',
              marginLeft: '-5px', // 핸들의 가로  가운데 정렬
              marginTop: '-9px', // 핸들의 세로  가운데 정렬
            }}
          />
        </div>
        <div>
          <p>흑백 {filterValue.grayscale || 0}%</p>
          <Slider
            style={{ width: "250px" }}
            min={0}
            max={100}
            value={filterValue.grayscale || 0}
            onChange={(value) => filterValueHandler("grayscale", value)}

            trackStyle={{ backgroundColor: 'rgba(203, 221, 90, 1)' }} // 트랙의 배경색을 변경

            handleStyle={{
              borderColor: 'rgba(203, 221, 90, 1)', // 핸들의 테두리 색상을 변경
              backgroundColor: 'rgba(203, 221, 90, 1)', // 핸들의 배경색을 변경
              borderRadius: '10%', // 원형 핸들로 모양 변경
              width: '10px',
              height: '20px',
              marginLeft: '-5px', // 핸들의 가로  가운데 정렬
              marginTop: '-9px', // 핸들의 세로  가운데 정렬
            }}
          />
        </div>
        <div>
          <p>대비 {filterValue.contrast || 100}%</p>
          <Slider
            style={{ width: "250px" }}
            min={0}
            max={200}
            value={filterValue.contrast || 100}
            onChange={(value) => filterValueHandler("contrast", value)}

            trackStyle={{ backgroundColor: 'rgba(203, 221, 90, 1)' }} // 트랙의 배경색을 변경

            handleStyle={{
              borderColor: 'rgba(203, 221, 90, 1)', // 핸들의 테두리 색상을 변경
              backgroundColor: 'rgba(203, 221, 90, 1)', // 핸들의 배경색을 변경
              borderRadius: '10%', // 원형 핸들로 모양 변경
              width: '10px',
              height: '20px',
              marginLeft: '-5px', // 핸들의 가로  가운데 정렬
              marginTop: '-9px', // 핸들의 세로  가운데 정렬
            }}
          />
        </div>
        <div>
          <p>hue-rotate {filterValue.huerotate || 0}deg</p>
          <Slider
            style={{ width: "250px" }}
            min={0}
            max={360}
            value={filterValue.huerotate || 0}
            onChange={(value) => filterValueHandler("huerotate", value)}

            trackStyle={{ backgroundColor: 'rgba(203, 221, 90, 1)' }} // 트랙의 배경색을 변경

            handleStyle={{
              borderColor: 'rgba(203, 221, 90, 1)', // 핸들의 테두리 색상을 변경
              backgroundColor: 'rgba(203, 221, 90, 1)', // 핸들의 배경색을 변경
              borderRadius: '10%', // 원형 핸들로 모양 변경
              width: '10px',
              height: '20px',
              marginLeft: '-5px', // 핸들의 가로  가운데 정렬
              marginTop: '-9px', // 핸들의 세로  가운데 정렬
            }}
          />
        </div>
        <div>
          <p>세피아 {filterValue.sepia || 0}%</p>
          <Slider
            style={{ width: "250px" }}
            min={0}
            max={100}
            value={filterValue.sepia || 0}
            onChange={(value) => filterValueHandler("sepia", value)}

            trackStyle={{ backgroundColor: 'rgba(203, 221, 90, 1)' }} // 트랙의 배경색을 변경

            handleStyle={{
              borderColor: 'rgba(203, 221, 90, 1)', // 핸들의 테두리 색상을 변경
              backgroundColor: 'rgba(203, 221, 90, 1)', // 핸들의 배경색을 변경
              borderRadius: '10%', // 원형 핸들로 모양 변경
              width: '10px',
              height: '20px',
              marginLeft: '-5px', // 핸들의 가로  가운데 정렬
              marginTop: '-9px', // 핸들의 세로  가운데 정렬
            }}
          />
        </div>
        <button onClick={handleDownload}>
          다음으로
        </button>

      </OptionSection>
              </a.RightBox>
            </a.BoxWrap>
          </s.OptionWrap>
        </s.Slider>
      </s.Wrap>
    </>
  );
}

export default FilterCustom;

const OptionSection = styled.section`
width:50%;
display:flex;
flex-direction:column;
align-items:center;
padding-top:30px;

`

const FilterImage = styled.div`
  width:${(props)=>props.width};
  height: ${(props)=>props.height};
  overflow: hidden;
  filter: blur(${(props) => props.blur || 0}px)
    saturate(${(props) => props.saturate || 100}%)
    brightness(${(props) => props.brightness || 1})
    grayscale(${(props) => props.grayscale || 0}%)
    contrast(${(props) => props.contrast || 100}%)
    hue-rotate(${(props) => props.huerotate || 0}deg)
    sepia(${(props) => props.sepia || 0}%);
`;