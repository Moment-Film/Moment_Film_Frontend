import React from "react";
import styled from "styled-components";

const StyledButton = ({ func, title, width, height, fontSize, fontWeight }) => {
  return (
    <Outline>
      <WhiteBox width={width} height={height} />
      <MainBox
        onClick={func}
        width={width}
        height={height}
        fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {title}
      </MainBox>
    </Outline>
  );
};

export default StyledButton;

const Outline = styled.div`
  display: flex;
  margin-bottom: 10px;
  position: relative;
`;
const WhiteBox = styled.div`
  margin-left: 10px;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: #fff;
  border: 2px solid black;
  position: absolute;
  z-index: 0;
  box-sizing: border-box;
  max-width: 133px;
  max-height: 39px;
`;
const MainBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  max-width: 133px;
  max-height: 39px;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  border: 2px solid black;
  background-color: var(--lightGreen);
  box-sizing: border-box;

  cursor: pointer;

  z-index: 1;
`;
