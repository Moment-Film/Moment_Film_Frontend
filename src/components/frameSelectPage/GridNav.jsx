import React from "react";
import { styled } from "styled-components";

import mini_flower from "../assets/icons/mini_flower.png";
import info from "../assets/icons/info.png";

import CaptureGuidePage from "../webCam/CaptureGuidePage";

const GridNav = ({ data, showGuide, setShowGuide }) => {

  const modalHideHandler = () => {
    setShowGuide(!showGuide);
  };

  const steps = [
    { name: "gridSelect", text: "Grid Setting" },
    { name: "photoGraphy", text: "Photography" },
    { name: "photoSelect", text: "Photo Select" },
    { name: "filter", text: "Filter" },
    { name: "frameSetting", text: "Frame Setting" },
    { name: "finish", text: "Finish" },
  ];

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
        {steps.map((step) => {
            return data === step.name ? (
              <div style={{ height: "45px" }} key={step.name}>
                <span>{step.text}</span>
                <StepTitle
                  src={mini_flower}
                  alt="mini_flower"
                  style={{ paddingBottom: "10px" }}
                />
              </div>
            ) : (
              <span style={{ opacity: "0.3" }} key={step.name}>{step.text}</span>
            );
          })}
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
`;

const StepWrap = styled.div`
  width: 970px;
  border-bottom: 1px solid var(--lightGray);
  padding: 0 115px;
  margin: 0 100px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 15.5px;
  padding-top: 50px;
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
