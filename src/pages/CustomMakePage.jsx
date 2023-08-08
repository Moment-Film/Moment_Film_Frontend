import React from "react";
import { styled } from "styled-components";
import {
  HueSlider,
  SaturationSlider,
  LightnessSlider,
} from "react-slider-color-picker";
import GridNav from "./../components/frameSelectPage/GridNav";
import * as s from "../components/frameSelectPage/style";
import StyledButton from "../components/common/component/StyledButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// interface Color {
//   h: number;
//   s: number;
//   l: number;
// }

function CustomMakePage() {
  const [color, setColor] = useState({ h: 180, s: 100, l: 50 });

  const navigate = useNavigate();

  const changeColorHandler = (newColor) => {
    setColor(newColor);
    console.log(newColor);
  };

  const moveBtnHandler = () => {
    navigate("/camera/capture/finish");
  };

  return (
    <>
      <s.Wrap>
        <s.Slider>
          <s.OptionWrap>
            <GridNav data={"frameSetting"} />
            <BoxWrap>
              <LeftBox>
                <FrameImg
                  style={{
                    backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
                  }}
                >
                  응애 ㅜㅜ
                </FrameImg>
              </LeftBox>
              <RightBox>
                <Title>Frame</Title>
                <div>
                  <div>
                    <HueSlider
                      handleChangeColor={changeColorHandler}
                      color={color}
                    />
                    <SaturationSlider
                      handleChangeColor={changeColorHandler}
                      color={color}
                    />

                    <LightnessSlider
                      handleChangeColor={changeColorHandler}
                      color={color}
                    />
                  </div>
                  <StyledButton
                    func={moveBtnHandler}
                    title={"완료하기!"}
                    width={"174px"}
                    height={"52px"}
                    fontSize={"18px"}
                  />
                </div>
              </RightBox>
            </BoxWrap>
          </s.OptionWrap>
        </s.Slider>
      </s.Wrap>
    </>
  );
}

export default CustomMakePage;

const BoxWrap = styled.div`
  width: 970px;
  display: flex;
  flex-direction: row;
  margin: 88px;
  box-shadow: 0px 0px 40px -5px rgba(0%, 0%, 0%, 0.1);
`;

const LeftBox = styled.div`
  width: 62%;
  height: 530px;
  background-color: var(--lightGray);
  border-top: 2px solid var(--black);
  border-bottom: 2px solid var(--black);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FrameImg = styled.div`
  width: 300px;
  height: 447px;
`;

const RightBox = styled.div`
  width: 38%;
  height: 532px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
  height: 84px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--lightGray);
`;
const RainbowBar = styled.div`
  height: 5px;
  background: linear-gradient(
    90deg,
    #ff0000,
    orange,
    #ffff00,
    green,
    #0000ff,
    indigo,
    violet
  );
`;
