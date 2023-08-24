import { styled } from "styled-components";

const Wrap = styled.div`
  background-color: var(--whiteGray);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled.div`
  width: 1170px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 0;
`;

const OptionWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${(props) => props.bottom || "50px"};
  position: relative;
  background-image: url(${(props) => props.url});
  background-size: cover;

  span {
    opacity: 1;
    color: var(--black);
    margin-top: 50px;
    font-size: 30px;
  }

  .Select {
    color: #949494;
    font-weight: 400;
  }
`;

const NonSelect = styled.p`
  color: #fc5b70;
  visibility: ${(props) =>
    props.selectedImage === null ? "visible" : "hidden"};
  font-weight: 500;
  margin: 0;
  margin-bottom: 10px;
  line-height: 150%;
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
  margin-top: 20px;
  margin-bottom: 30px;
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
  display: inline-block;
  width: ${(props) => props.width};
  height: 270px;
  border: ${(props) => (props.$isSelected ? "2px solid var(--green5)" : "")};
  border-radius: 5px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  box-shadow: 0px 0px 40px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.4s ease-in-out;
  transform: ${(props) => (props.$isSelected ? "scale(1.15)" : "scale(1)")};
  transform-origin: bottom;
  opacity: ${(props) => (props.$isHovered || props.$isSelected ? "1" : "0.3")};

  &:hover {
    /* transform: scale(1.15); */
  }

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 40px 10px rgba(0, 0, 0, 0.05);
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
  NonSelect,
};
