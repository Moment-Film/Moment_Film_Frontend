import React, { useState } from "react";
import styled, { css } from "styled-components";

import mini_flower from "../assets/icons/mini_flower.svg";
import info from "../assets/icons/info.png";

import CaptureGuidePage from "../webCam/CaptureGuidePage";
import { StyledSpan15 } from "../common/styles/StyledSpan";

const steps = [
  { name: "gridSelect", text: "Grid Setting" },
  { name: "photoGraphy", text: "Photography" },
  { name: "photoSelect", text: "Photo Select" },
  { name: "frameSetting", text: "Frame Setting" },
  { name: "filter", text: "Filter" },
  { name: "draw", text: "Draw" },
  { name: "finish", text: "Finish" },
];

const GridNav = ({ data, autoShowModal = false }) => {

  const [showGuide, setShowGuide] = useState(autoShowModal);

  const modalHideHandler = () => {
    setShowGuide(!showGuide);
  };

  return (
    <>
      {showGuide && (
        <GuideModal>
          <CaptureGuidePage onClose={modalHideHandler} />
        </GuideModal>
      )}
      {showGuide && <ModalBG onClick={modalHideHandler} />}

      <StepWrap>
        <SelectStep>
          <ProccessLine />
          {steps.map((step, index) =>
            <TitleCont proceeded={ index <= steps.findIndex(i=>i.name===data) } key={step.name}>
              <StyledSpan15 select={step.name===data}>{step.text}</StyledSpan15>
              {step.name===data && <StepTitle
                src={mini_flower}
                alt="mini_flower"
              />}
            </TitleCont>
          )}
        </SelectStep>
        <div
          onClick={modalHideHandler}
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
    </>
  );
};

export default GridNav;

const GuideModal = styled.div`
  position: fixed;
  top: 176px;
  z-index: 100;
`;

const ModalBG = styled.div`
  position: fixed;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.15);
  /* margin-top: -60px; */
  top: 0;
`;

const StepWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid var(--lightGray);
  padding: 16px 60px 0 0;
  display: flex;
  justify-content: space-between;
`;
const ProccessLine = styled.div`
  width: 100px;
  height: 49px;
  border-bottom: 2px solid var(--green5);
`
const SelectStep = styled.div`
  display: flex;
  align-items: center;
`;
const TitleCont = styled.div`
  ${({ proceeded }) =>
    proceeded ? css`
    border-bottom: 2px solid var(--green5);
    ` : css`
    border-bottom: 2px solid white;
    `};
  height: 18px;
  padding: 15px;
`;
const StepTitle = styled.img`
  position: absolute;
  margin-top: -10px;
  height: 18px;
`;
