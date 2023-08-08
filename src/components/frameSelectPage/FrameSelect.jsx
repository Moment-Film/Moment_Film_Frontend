import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledButton from "../common/component/StyledButton";
import GridNav from "./GridNav";

import * as s from "./style";

import down from "../assets/images/double_down.png";
import up from "../assets/images/double_up.png";
import narrow from "../assets/images/mono_narrow.png";
import wide from "../assets/images/mono_wide.png";

import miniDIA from "../assets/icons/10DIA.png";
import middleDIA from "../assets/icons/9DIA.png";
import bigDIA from "../assets/icons/4DIA.png";
import { useDispatch } from "react-redux";
import { selectImage } from "../../redux/modules/imageSlice";

const FrameSelect = () => {
  const images = [
    { id: "down", src: down, width: "182px" },
    { id: "up", src: up, width: "182px" },
    { id: "wide", src: wide, width: "156px" },
    { id: "narrow", src: narrow, width: "127px" },
  ];

  const [hoveredImageId, setHoveredImageId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showGuide, setShowGuide] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveBtnHandler = () => {
    if (selectedImage !== null) {
      // 이미지가 선택되었는지 확인
      navigate("/camera/capture");
    }
  };

  const onMouseEnterGridHandler = (id) => {
    setHoveredImageId(id);
  };

  const onMouseLeaveGridHandler = (id) => {
    if (hoveredImageId === id) {
      setHoveredImageId(null);
    }
  };

  const onGridImgClickHandler = (image, e) => {
    dispatch(selectImage(image.id));
    setSelectedImage(image.src);
    e.stopPropagation(); // 이벤트의 전파를 막습니다.
  };

  const onOutsideClickHandler = () => {
    setSelectedImage(null); // 이미지 선택을 취소합니다.
  };

  /*
    그리드 선택 페이지에서 그리드 이미지를 선택하면 onClick 이벤트 함수가 실행되고 선택된 그리드 이미지를 사진 선택 페이지에서 불러올 수 있게 됨
  */

  return (
    <s.Wrap onClick={onOutsideClickHandler}>
      <s.Slider>
        <s.OptionWrap>
          <GridNav
            data={"gridSelect"}
            showGuide={showGuide}
            setShowGuide={setShowGuide}
          />
          <div style={{ fontSize: "30px", marginTop: "50px" }}>Pick Me!</div>
          <p>그리드를 선택하세요.</p>
          <s.ArrowWrap>
            <s.DiaAlign>
              <img src={bigDIA} alt="top_bigDIA" />
              <img src={miniDIA} alt="top_miniDIA" />
            </s.DiaAlign>

            <s.FrameWrap>
              {images.map((image) => (
                <s.FrameImg
                  key={image.id}
                  src={image.src}
                  width={image.width}
                  $isHovered={hoveredImageId === image.id}
                  $isSelected={selectedImage === image.src}
                  onClick={(e) => onGridImgClickHandler(image, e)}
                  onMouseEnter={() => onMouseEnterGridHandler(image.id)}
                  onMouseLeave={() => onMouseLeaveGridHandler(image.id)}
                />
              ))}
            </s.FrameWrap>

            <s.DiaAlign>
              <img src={miniDIA} alt="bot_miniDIA" style={{ height: "65px" }} />
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={middleDIA}
                  alt="bot_middleDIA"
                  style={{ height: "85px" }}
                />
                <img
                  src={miniDIA}
                  alt="bot_miniDIA"
                  style={{ height: "65px" }}
                />
              </div>
            </s.DiaAlign>
          </s.ArrowWrap>
          {/* {selectedImage === null ? <p style={{color:'#FC5B70', visiblity:'hidden'}}>그리드가 선택되지 않았습니다!</p> : null} */}
          <p
            style={{
              color: "#FC5B70",
              visibility: selectedImage === null ? "visible" : "hidden",
            }}
          >
            그리드가 선택되지 않았습니다!
          </p>

          <StyledButton
            func={() => selectedImage !== null && moveBtnHandler()}
            title={"촬영하러 가기"}
            width={"174px"}
            height={"52px"}
            fontSize={"18px"}
          />
        </s.OptionWrap>
      </s.Slider>
    </s.Wrap>
  );
};

export default FrameSelect;
