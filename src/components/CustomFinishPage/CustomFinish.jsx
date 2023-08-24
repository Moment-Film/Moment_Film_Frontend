import React from "react";
import * as s from "../frameSelectPage/style";
// import KakaoShareBtn from '../common/component/KakaoShareBtn'
import GridNav from "./../frameSelectPage/GridNav";
import { styled } from "styled-components";
import point from "../assets/images/point.svg";
import { useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router";
import { saveAs } from "file-saver";
import finishBG from '../assets/images/finishBG.jpg'

const CustomFinish = () => {
  const navigate = useNavigate();
  const reusultImg = useSelector((state) => state.ResultImage);
  var objectURL = window.URL.createObjectURL(reusultImg);

  const save=()=>{
      saveAs(reusultImg, "drawing.png")
  }
  return (
    <>
      <s.Wrap>
        <s.Slider>
          <GridNav data={"finish"} />
          <s.OptionWrap url={finishBG} bottom="102px">
            <ContentWrap>
              <TextWrap>
                <div>Finish!</div>
                <span>
                  친구들에게 자랑해 보아요! 게시글 등록 시 포인트가 지급됩니다.
                </span>
              </TextWrap>
              <ImgWrap>
                <CustomImg><img src={objectURL} alt="" /></CustomImg>
                <BtnWrap>
                  <button className="down" onClick={save}>이미지 다운로드</button>
                  <button className="up" onClick={()=>navigate('write')}>게시글 등록</button>
                  <Point src={point} alt="point"></Point>
                </BtnWrap>
              </ImgWrap>
            </ContentWrap>
          </s.OptionWrap>
        </s.Slider>
      </s.Wrap>

      {/* <KakaoShareBtn/> */}
    </>
  );
};

export default CustomFinish;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-top: 21.5px;

  div {
    font-size: 52px;
    line-height: 68px;
    font-family: "Abril Fatface", cursive;
  }

  span {
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 71px;
  }
`;

const ImgWrap = styled.div`
  width: 305px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Point = styled.img`
  position: absolute;
  left: 50%;
  margin-top: -20px;
  margin-left: 160px;
`;

const CustomImg = styled.div`
  height: 446px;
  border-radius: 5px;
  margin-bottom: 32px;
  box-shadow: 0 0 40px rgba(0,0,0,0.1);
`;

const BtnWrap = styled.div`
  width: 305px;
  height: 40px;
  display: flex;
  gap: 15px;

  button {
    box-sizing: border-box;
    width: 145px;
    height: 40px;
    color: var(--green6);
    border: 2px solid var(--green5);
    line-height: 17px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  .down {
    background-color: var(--green1);
  }
  .up {
    background-color: #CBE7A1;
  }
`;