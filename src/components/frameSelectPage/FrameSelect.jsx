import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StyledButton from "../common/component/StyledButton";

import down from "../assets/images/double_down.png";
import up from "../assets/images/double_up.png";
import narrow from "../assets/images/mono_narrow.png";
import wide from "../assets/images/mono_wide.png";

import miniDIA from "../assets/icons/10DIA.png";
import middleDIA from "../assets/icons/9DIA.png";
import bigDIA from "../assets/icons/4DIA.png";

import GridNav from "./GridNav";

const FrameSelect = () => {
  const images = [
    { id: "down", src: down, width: "182px" },
    { id: "up", src: up, width: "182px" },
    { id: "wide", src: wide, width: "156px" },
    { id: "narrow", src: narrow, width: "127px" },
  ];

  const [showGuide, setShowGuide] = useState(true);
  const [hoveredImageId, setHoveredImageId] = useState(null);


  const navigate = useNavigate();

  const moveBtnHandler = () => {
    navigate("/camera/capture");
  };

  const modalHideHandler = () => {
    setShowGuide(!showGuide);
  };

  const onMouseEnterGridHandler = (id) => {
    setHoveredImageId(id);
  }

  const onMouseLeaveGridHandler = (id) => {
    if (hoveredImageId === id) {
      setHoveredImageId(null);
    }
  }

  return (
    <Wrap>
      <Slider>
        <OptionWrap>
        <GridNav data={'gridSelect'} />

          <ArrowWrap>
            <DiaAlign>
              <img src={bigDIA} alt="top_bigDIA" style={{ height: "100px" }} />
              <img src={miniDIA} alt="top_miniDIA" style={{ height: "65px" }} />
            </DiaAlign>

            <FrameWrap>
              {images.map((image) => (
                <FrameImg
                  key={image.id}
                  src={image.src}
                  width={image.width}
                  isHovered={hoveredImageId === image.id}
                  onMouseEnter={() => onMouseEnterGridHandler(image.id)}
                  onMouseLeave={() => onMouseLeaveGridHandler(image.id)}
                />
              ))}
            </FrameWrap>

            <DiaAlign>
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
            </DiaAlign>
          </ArrowWrap>

          <StyledButton
            func={moveBtnHandler}
            title={"촬영하러 가기"}
            width={"174px"}
            height={"52px"}
          />
        </OptionWrap>
      </Slider>
    </Wrap>
  );
};

export default FrameSelect;

const Wrap = styled.div`
  background-color: var(--whiteGray);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled.div`
  width: 1200px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  z-index: 0;
`;

const OptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  position: relative;
`;

const ArrowWrap = styled.div`
  min-width: 970px;
  height: 480px;
  border-top: 2px solid var(--black);
  border-bottom: 2px solid var(--black);
  background-color: #f0f0f0;
  box-shadow: 0px 0px 40px -5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 95px;
  margin-bottom: 90px;
  gap: 10px;
`;

const DiaAlign = styled.div`
  width: 970px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 46px;
  margin-bottom: 54px;
`;

const FrameWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 27px;
`;

const FrameImg = styled.img`
  display: flex;
  width: ${(props) => props.width};
  height: 270px;
  box-shadow: 0px 0px 40px -5px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease-in-out;
  transform: scale(1);
  transform-origin: bottom;
  opacity: ${(props) => (props.isHovered ? "1" : "0.3")};

  &:hover {
    transform: scale(1.15);
  }
`;
