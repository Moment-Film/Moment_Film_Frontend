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

import frame_setting from "../assets/images/frame_setting.png";
import mini_flower from "../assets/icons/mini_flower.png";

import miniDIA from "../assets/icons/10DIA.png";
import middleDIA from "../assets/icons/9DIA.png";
import bigDIA from "../assets/icons/4DIA.png";

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
          <StepWrap>
            <SelectStep>
              <div style={{ height: "38px" }}>
                <StepTitle src={frame_setting} alt="frame_setting" />
                <StepTitle
                  src={mini_flower}
                  alt="mini_flower"
                  style={{ paddingBottom: "10px" }}
                />
              </div>

              <StepTitle src={frame_setting} alt="frame_setting" />
              <StepTitle src={frame_setting} alt="frame_setting" />
              <StepTitle src={frame_setting} alt="frame_setting" />
            </SelectStep>
            <div
              onClick={moveBtnHandler}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: "11px",
              }}
            >
              촬영가이드
              <img src={info} alt="info" />
            </div>
          </StepWrap>

          <ArrowWrap>
            <DiaAlign style={{padding:'20'}}>
              <img src={bigDIA} alt="top_bigDIA" style={{ height: "100px" }} />
              <img src={miniDIA} alt="top_miniDIA" style={{ height: "65px" }} />
            </DiaAlign>

            <FrameWrap>
              <FrameImg width={"182px"} src={down} alt="" />
              <FrameImg width={"182px"} src={up} alt="" />
              <FrameImg width={"156px"} src={narrow} alt="" />
              <FrameImg width={"127px"} src={wide} alt="" />
            </FrameWrap>

            <DiaAlign style={{bottom:'0'}}>
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

const StepWrap = styled.div`
  width: 1230px;
  border-bottom: 1px solid var(--lightGray);
  display: flex;
  justify-content: space-around;
  padding-bottom: 25.5px;
`;

const SelectStep = styled.div`
  height: 18px;
  display: flex;
  align-items: center;
  gap: 30px;
`;

const StepTitle = styled.img`
  height: 18px;
`;

const ArrowWrap = styled.div`
  min-width: 970px;
  height: 480px;
  border-top: 2px solid var(--black);
  border-bottom: 2px solid var(--black);
  background-color: #f0f0f0;
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
  margin-top:46px;
  margin-bottom:54px;
`;

const FrameWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
  gap: 27px;
`;

const FrameImg = styled.img`
  display: flex;
  width: ${(props) => props.width};
  height: 270px;
  transition: transform 0.4s ease-in-out;
  transform: scale(1);
  transform-origin: bottom;

  &:hover {
    transform: scale(1.15);
  }
`;
