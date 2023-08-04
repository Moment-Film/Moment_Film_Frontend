import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CaptureGuidePage from "../webCam/CaptureGuidePage";
import styled from "styled-components";
import StyledButton from "../common/component/StyledButton";
import info from "../assets/icons/info.png";
import down from "../assets/images/double_down.png";
import up from "../assets/images/double_up.png";
import narrow from "../assets/images/mono_narrow.png";
import wide from "../assets/images/mono_wide.png";

const FrameSelect = () => {
  const [showGuide, setShowGuide] = useState(true);
  const navigate = useNavigate();

  const moveBtnHandler = () => {
    navigate("/camera/capture");
  };

  const modalHideHandler = () => {
    setShowGuide(!showGuide);
  };

  return (
    <Wrap>
      {showGuide && (
        <GuideModal>
          <CaptureGuidePage onClose={modalHideHandler} />
        </GuideModal>
      )}
      <Slider>
        <OptionWrap>
          <div>
            <div>
              <div>
                
              </div>
              <div>
                
              </div>
              <div>
                
              </div>
            </div>
            <div
              onClick={moveBtnHandler}
              style={{
                display: "flex",
                gap: "7px",
                marginBottom: "18px",
                cursor: "pointer",
              }}
            >
              촬영가이드
              <img src={info} alt="info" />
            </div>
          </div>

          <ArrowWrap>
            <FrameWrap>
              <FrameImg src={down} alt="" />
              <FrameImg src={up} alt="" />
              <FrameImg src={narrow} alt="" />
              <FrameImg src={wide} alt="" />
            </FrameWrap>
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

const GuideModal = styled.div`
  position: fixed;

  top: 176px;
  z-index: 100;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled.div`
  width: 1200px;
  background-color: white;
  display: flex;
  justify-content: center;
  z-index: 0;
`;

const OptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 137px;
  margin-bottom: 50px;
`;

const ArrowWrap = styled.div`
  height: 480px;
  border-top: 2px solid var(--black);
  border-bottom: 2px solid var(--black);
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  padding: 0 103px 0 100px;
  margin-top: 28px;
  margin-bottom: 43px;
  gap: 10px;
`;

const FrameWrap = styled.div`
  display: flex;
  gap: 27px;
`;

const FrameImg = styled.img`
  display: flex;
  height: 270px;
  transition: transform 0.4s ease-in-out;
  transform: scale(1);
  transform-origin: bottom;

  &:hover {
    transform: scale(1.15);
  }
`;