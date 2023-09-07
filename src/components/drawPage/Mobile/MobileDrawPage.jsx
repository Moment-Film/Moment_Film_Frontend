import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SetResultImage } from "../../../redux/modules/ResultImage";
import { useNavigate } from "react-router-dom";
import domtoimage from "dom-to-image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import GridNav from "../../frameSelectPage/GridNav";
import styled from "styled-components";
import StyledButton from "../../common/component/StyledButton";
import {
  HueSlider,
  SaturationSlider,
  LightnessSlider,
} from "react-slider-color-picker";

import uploadImg from "../../../components/assets/icons/upload.svg";
import delImg from "../../../components/assets/draw/del.svg";

import * as Img from "../../assets/draw/Image";
import * as S from "../Desktop/style";

import DrawCanvas from "../Desktop/DrawCanvas";
import ImageCanvas from "../Desktop/ImageCanvas";

function DrawPage() {
  const thisbackGround = useSelector((state) => state.ResultImage);
  const FrameSize = useSelector((state) => state.image.images);

  const [color, setColor] = useState({ h: 180, s: 100, l: 100 });

  const changeColorHandler = (newColor) => {
    setColor(newColor);
  };

  const canvasRef = useRef(null);

  const [imageData, setImageData] = useState([]);

  const [eraser, setEraser] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 파일

  const [mode, setMode] = useState(false);
  const [penWeight, setPenWeight] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*   const objectUrl = URL.createObjectURL(thisbackGround); */

  /////////////////////////////////////////////////////////////
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  // 스크롤 이벤트 핸들러
  const handleScroll = (e) => {
    if (isScrollLocked) {
      e.preventDefault();
    }
  };

  // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 추가
  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = "hidden"; // 스크롤을 숨김
    } else {
      document.body.style.overflow = "auto"; // 스크롤을 다시 표시
    }

    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollLocked]);

  const toggleScrollLock = () => {
    setIsScrollLocked(!isScrollLocked);
  };
  ///////////////////////////////////////////////////////////////

  const removeImage = (index) => {
    const updatedImages = imageData.filter((_, i) => i !== index);
    setImageData(updatedImages);
  };

  const selectImage = (index) => {
    setSelectedImage(index);
  };

  const handleImageChange = (e) => {
    //console.log(1);
    if (e.target.files.length > 0) {
      //console.log(imageData.length);
      const newImages = Array.from(e.target.files);
      const newImageData = newImages.map((image) => ({
        image,
        x: 0,
        y: 0,
        width: 50,
        height: 50,
      }));
      setImageData([...imageData, ...newImageData]);
    }
  };

  const handleStickerSize = (value, a) => {
    if (a === "x") {
      const updatedImageData = imageData.map((item, i) =>
        i === selectedImage ? { ...item, width: value } : item
      );
      setImageData(updatedImageData);
    } else if (a === "y") {
      const updatedImageData = imageData.map((item, i) =>
        i === selectedImage ? { ...item, height: value } : item
      );
      setImageData(updatedImageData);
    }
  };

  const handleSave = async () => {
    //console.log(1);
    if (!canvasRef.current) return;

    try {
      const card = canvasRef.current;
      domtoimage.toBlob(card).then((imageFile) => {
        dispatch(SetResultImage(imageFile));
        //console.log(imageFile);
        navigate("/camera/capture/finish");
      });
    } catch (error) {
      console.error("저장에러:", error);
    }
  };

  return (
    <S.BackgroundGray>
      <S.WhiteContainer>
        <GridNav data="draw" />
        <DrawSection>
          <LeftBox>
            <div
              style={{ display: "flex", position: "relative" }}
              ref={canvasRef}
            >
              {thisbackGround && (
                <img src={thisbackGround} style={{ border: "1px blue" }} />
              )}

              <DrawCanvas
                width={FrameSize.width}
                height={FrameSize.height}
                eraser={eraser}
                color={color}
                penWeight={penWeight}
                mode={mode}
              />

              <ImageCanvas
                width={FrameSize.width}
                height={FrameSize.height}
                mode={mode}
                selectedImage={selectedImage}
                imageData={imageData}
                setImageData={setImageData}
              />
            </div>
          </LeftBox>
          <RightBox>
            <S.OptionSection>
              <div className="modeBtn">
                <S.ModeBtn state={!mode} onClick={() => setMode(false)}>
                  그리기
                </S.ModeBtn>
                <S.ModeBtn state={mode} onClick={() => setMode(true)}>
                  스티커
                </S.ModeBtn>
              </div>

              {!mode ? (
                <section className="rangeSlider">
                  <S.OptionBtnSection>
                    <S.EraserBtn
                      state={!eraser}
                      onClick={() => setEraser(!eraser)}
                    >
                      {eraser ? "지우개 on" : "지우개 off"}
                    </S.EraserBtn>

                    <S.EraserBtn
                      state={!isScrollLocked}
                      onClick={toggleScrollLock}
                    >
                      {isScrollLocked ? "스크롤 off" : "스크롤 on"}
                    </S.EraserBtn>
                  </S.OptionBtnSection>

                  <div className="optionHeader">
                    <span>펜툴</span>
                  </div>
                  <p className="optionName">색조</p>
                  <div className="progess">
                    <img src={Img.hue} />
                    <HueSlider
                      handleChangeColor={changeColorHandler}
                      color={color}
                    />
                  </div>
                  <p className="optionName">채도</p>
                  <div className="progess">
                    <img src={Img.saturation} />
                    <SaturationSlider
                      handleChangeColor={changeColorHandler}
                      color={color}
                    />
                  </div>
                  <p className="optionName">밝기</p>
                  <div className="progess">
                    <img src={Img.lightness} />
                    <LightnessSlider
                      handleChangeColor={changeColorHandler}
                      color={color}
                    />
                  </div>
                  <p className="optionName">굵기</p>
                  <div className="progess">
                    <img src={Img.weight} />
                    <Slider
                      min={1}
                      max={20}
                      step={1}
                      value={penWeight}
                      onChange={(value) => setPenWeight(value)}
                      trackStyle={{
                        backgroundColor: "rgba(203, 221, 90, 1)",
                        height: "13px",
                      }}
                      handleStyle={{
                        borderColor: "white",
                        border: "5px solid white",
                        boxShadow: "1px 1px 1px gray",
                        backgroundColor: "rgba(203, 221, 90, 1)",
                        borderRadius: "50%",
                        width: "25px",
                        height: "25px",
                        marginLeft: "-5px",
                        marginTop: "-9px",
                      }}
                    />
                  </div>
                </section>
              ) : (
                <S.StickerSection>
                  <S.EraserBtn
                    state={!isScrollLocked}
                    onClick={toggleScrollLock}
                  >
                    {isScrollLocked ? "스크롤 on" : "스크롤 off"}
                  </S.EraserBtn>

                  <S.StickerInput className="StickerInput">
                    <span>이미지 불러오기 </span>
                    <input type="file" onChange={handleImageChange} />
                    <img src={uploadImg}></img>
                  </S.StickerInput>

                  <div className="optionHeader">
                    <span>스티커 선택</span>
                  </div>

                  <S.SelectedSection>
                    {imageData.map((image, index) => (
                      <S.Stickerbox
                        key={index}
                        className="InputImage"
                        select={index === selectedImage}
                      >
                        <S.Sticker select={index === selectedImage}>
                          <img
                            src={URL.createObjectURL(image.image)}
                            alt={`${index}`}
                            onClick={() => selectImage(index)}
                          />
                        </S.Sticker>

                        <div className="filterWrap"></div>

                        <div className="removeBtnWrap">
                          <button
                            className="removeBtn"
                            onClick={() => removeImage(index)}
                          >
                            <img src={delImg}></img>
                          </button>
                        </div>
                      </S.Stickerbox>
                    ))}
                  </S.SelectedSection>

                  <div className="optionHeader">
                    <span className="small">
                      사진을 선택하셔야 개별조정이 가능합니다
                    </span>
                    <span>크기 조정</span>
                  </div>

                  <section className="sizeSection">
                    <div className="sizeProgress">
                      <span>가로</span>
                      <Slider
                        min={10}
                        max={500}
                        step={1}
                        value={imageData[selectedImage]?.width}
                        onChange={(value) => handleStickerSize(value, "x")}
                        trackStyle={{
                          backgroundColor: "var(--green5)",
                        }}
                        handleStyle={{
                          borderColor: "var(--green5)",
                          border: "2px solid var(--green5)",
                          boxShadow: "1px 1px 1px gray",
                          borderRadius: "50%",
                          width: "12px",
                          height: "12px",
                          marginLeft: "-5px",
                          marginTop: "-5px",
                        }}
                      />
                    </div>
                    <div className="sizeProgress">
                      <span>세로</span>
                      <Slider
                        min={10}
                        max={500}
                        step={1}
                        value={imageData[selectedImage]?.height}
                        onChange={(value) => handleStickerSize(value, "y")}
                        trackStyle={{
                          backgroundColor: "var(--green5)",
                        }}
                        handleStyle={{
                          borderColor: "var(--green5)",
                          border: "2px solid var(--green5)",
                          boxShadow: "1px 1px 1px gray",
                          borderRadius: "50%",
                          width: "12px",
                          height: "12px",
                          marginLeft: "-5px",
                          marginTop: "-5px",
                        }}
                      />
                    </div>
                  </section>
                </S.StickerSection>
              )}

              <section className="saveBtn">
                <StyledButton
                  width={"130px"}
                  height={"40px"}
                  title={"완료하기"}
                  func={handleSave}
                />
              </section>
            </S.OptionSection>
          </RightBox>
        </DrawSection>
      </S.WhiteContainer>
    </S.BackgroundGray>
  );
}

export default DrawPage;

export const DrawSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LeftBox = styled.div`
  max-width: 800px;
  max-height: 863px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 13%;

  background: var(--lightGray);
  position: relative;
`;

export const RightBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  max-height: 863px;
  height: 863px;
  background-color: white;

  .optionHeader {
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid rgb(217, 217, 217);
    padding-bottom: 9px;
    margin-bottom: 14px;

    span {
      font-size: 16px;
      font-weight: 500;
    }

    img {
      width: 21px;
    }
  }
`;
