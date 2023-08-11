import React from "react";
import * as s from "../frameSelectPage/style";
// import KakaoShareBtn from '../common/component/KakaoShareBtn'
import GridNav from "./../frameSelectPage/GridNav";
import { styled } from "styled-components";
import point from "../assets/images/point.svg";
import { useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router";

const CustomFinish = () => {
  const navigate = useNavigate();
  const reusultImg = useSelector((state) => state.ResultImage);
  var objectURL = window.URL.createObjectURL(reusultImg);

  return (
    <>
      <s.Wrap>
        <s.Slider>
          <s.OptionWrap>
            <GridNav data={"finish"} />
            <ContentWrap>
              <TextWrap>
                <div>Finish!</div>
                <span>
                  친구들에게 자랑해 보아요! 공유할 시 포인트가 지급됩니다.
                </span>
              </TextWrap>
              <ImgWrap>
                <CustomImg><img src={objectURL} alt="" /></CustomImg>
                <BtnWrap>
                  <MoveBtn>이미지 다운로드</MoveBtn>
                  <MoveBtn onClick={()=>navigate('write')}>게시글 등록</MoveBtn>
                </BtnWrap>
                <Point src={point} alt="point"></Point>
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
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const TextWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div {
    font-size: 52px;
    line-height: 70px;
    font-family: "Abril Fatface", cursive;
  }

  span {
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 75px;
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
  bottom: 28.7px;
  right: 490px;
`;

const CustomImg = styled.div`
  height: 450px;
  margin-bottom: 32px;
`;

const BtnWrap = styled.div`
  width: 305px;
  height: 40px;
  display: flex;
  gap: 15px;
`;

const MoveBtn = styled.div`
  font-size: 14px;
  width: 145px;
  height: 40px;
  color: var(--green6);
  background-color: var(--green1);
  border: 1px solid var(--green4);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;
