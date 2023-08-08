import { styled } from "styled-components";


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
  margin-top: 30px;
  margin-bottom: 90px;
  gap: 10px;
`;

const DiaAlign = styled.div`
  width: 970px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 45px;
  margin-bottom: 53px;
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
  box-shadow: 0px 0px 40px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.4s ease-in-out;
  transform: ${(props) => (props.isSelected ? 'scale(1.15)' : 'scale(1)')};
  transform-origin: bottom;
  opacity: ${(props) => (props.$isHovered || props.$isSelected ? '1' : '0.3')};

  &:hover {
    transform: scale(1.15);
  }
`;

export {
  Wrap,
  Slider,
  OptionWrap,
  ArrowWrap,
  DiaAlign,
  FrameWrap,
  FrameImg,
}