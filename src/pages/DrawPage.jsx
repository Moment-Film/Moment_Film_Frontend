import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SetResultImage } from "../redux/modules/ResultImage";
import { useNavigate } from "react-router-dom";
import domtoimage from "dom-to-image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import GridNav from "../components/frameSelectPage/GridNav";
import styled from "styled-components";
import hueImg from "../components/assets/icons/hue.png";
import saturationImg from "../components/assets/icons/saturation.png";
import lightnessImg from "../components/assets/icons/lightness.png";
import StyledButton from "../components/common/component/StyledButton";
import {
  HueSlider,
  SaturationSlider,
  LightnessSlider,
} from "react-slider-color-picker";

import uploadImg from "../components/assets/icons/upload.svg";
import delImg from "../components/assets/draw/del.svg";
import weight from "../components/assets/icons/weight.svg";

import * as Img from "../components/assets/draw/Image";

function DrawPage() {
  const thisbackGround = useSelector((state) => state.ResultImage);
  const FrameSize = useSelector((state) => state.image.images);
  //console.log(FrameSize.width);
  //console.log(FrameSize.height);

  const [color, setColor] = useState({ h: 180, s: 100, l: 100 });

  const changeColorHandler = (newColor) => {
    setColor(newColor);
  };

  const canvasRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [imglastX, setImgLastX] = useState(0);
  const [imglastY, setImgLastY] = useState(0);

  const [imageData, setImageData] = useState([]);

  const [eraser, setEraser] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 파일

  const [mode, setMode] = useState(false);
  const [penWeight, setPenWeight] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const objectUrl = URL.createObjectURL(thisbackGround);

  const drawingCanvasRef = useRef(null); // 그림을 그리는 캔버스
  const imageCanvasRef = useRef(null); // 이미지를 넣는 캔버스

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
  useEffect(() => {
    const canvas = imageCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = objectUrl;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [thisbackGround, imageData]);

  const drawImages = () => {
    const canvas = imageCanvasRef.current;
    const ctx = canvas.getContext("2d");

    imageData.forEach((item, index) => {
      const { image, x, y, width, height } = item;
      const img = new Image();
      img.src = URL.createObjectURL(image);

      img.onload = () => {
        //console.log(item);
        ctx.drawImage(img, x, y + index * 70, width, height);
      };
    });
  };

  useEffect(() => {
    drawImages();
  }, [imageData]);

  useEffect(() => {
    const canvas = imageCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = objectUrl;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [thisbackGround]);

  const startDrawing = (x, y) => {
    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
  };

  const startMoving = (x, y) => {
    setIsDrawing(true);
    setImgLastX(x);
    setImgLastY(y);
  };

  const draw = (x, y) => {
    if (!isDrawing) return;
    const canvas = drawingCanvasRef.current;
    const ctx = canvas.getContext("2d");
    //console.log(eraser);
    ctx.strokeStyle = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = penWeight;

    //지우개 모드일때
    if (eraser) {
      ctx.globalCompositeOperation = "destination-out"; //투명하게
      ctx.lineWidth = penWeight;
    } else {
      ctx.globalCompositeOperation = "source-over"; //원래대로
      ctx.strokeStyle = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
      ctx.lineWidth = penWeight;
    }

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    setLastX(x);
    setLastY(y);
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const handleMouseDraw = (e) => {
    draw(e.clientX, e.clientY);
  };

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

  const handleImageMove = (x, y) => {
    if (isDrawing) {
      const updatedImageData = imageData.map((item, i) =>
        i === selectedImage
          ? {
              ...item,
              x: item.x + x - imglastX,
              y: item.y + y - imglastY,
            }
          : item
      );
      setImageData(updatedImageData);
      setImgLastX(x);
      setImgLastY(y);
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

  const handleTouchDraw = (e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const canvas = canvasRef.current;
      const canvasRect = canvas.getBoundingClientRect();
      const touchX = touch.clientX - canvasRect.left;
      const touchY = touch.clientY - canvasRect.top;

      if (e.type === "touchstart") {
        startDrawing(touchX, touchY);
      } else if (e.type === "touchmove") {
        draw(touchX, touchY);
      } else if (e.type === "touchend" || e.type === "touchcancel") {
        endDrawing();
      }
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const canvas = canvasRef.current;
      const canvasRect = canvas.getBoundingClientRect();
      const touchX = touch.clientX - canvasRect.left;
      const touchY = touch.clientY - canvasRect.top;

      if (e.type === "touchstart") {
        startMoving(touchX, touchY);
      } else if (e.type === "touchmove") {
        handleImageMove(touchX, touchY);
      } else if (e.type === "touchend" || e.type === "touchcancel") {
        endDrawing();
      }
    }
  };

  return (
    <BackgroundGray>
      <WhiteContainer>
        <GridNav data="draw" />
        <DrawSection>
          <LeftBox>
            <div
              style={{ display: "flex", position: "relative" }}
              ref={canvasRef}
            >
              <img src={objectUrl} style={{ border: "1px blue" }} />
              <DrawCanvas
                ref={drawingCanvasRef}
                width={FrameSize.width}
                height={FrameSize.height}
                onMouseDown={
                  mode
                    ? (e) =>
                        startMoving(
                          e.nativeEvent.offsetX,
                          e.nativeEvent.offsetY
                        )
                    : (e) =>
                        startDrawing(
                          e.nativeEvent.offsetX,
                          e.nativeEvent.offsetY
                        )
                }
                onMouseMove={
                  mode
                    ? (e) =>
                        handleImageMove(
                          e.nativeEvent.offsetX,
                          e.nativeEvent.offsetY
                        )
                    : (e) => draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
                }
                onMouseUp={endDrawing}
                onTouchStart={mode ? handleTouchMove : handleTouchDraw}
                onTouchMove={mode ? handleTouchMove : handleTouchDraw}
                onTouchEnd={endDrawing}
                style={{
                  cursor: mode ? "move" : "auto",
                  boxShadow: "0 0 40px 0 rgba(0,0,0,0.1)",
                  zIndex: mode ? "50" : "100",
                }}
              />

              <ImageCanvas
                ref={imageCanvasRef}
                width={FrameSize.width}
                height={FrameSize.height}
                onMouseDown={
                  mode
                    ? (e) =>
                        startMoving(
                          e.nativeEvent.offsetX,
                          e.nativeEvent.offsetY
                        )
                    : (e) =>
                        startDrawing(
                          e.nativeEvent.offsetX,
                          e.nativeEvent.offsetY
                        )
                }
                onMouseMove={
                  mode
                    ? (e) =>
                        handleImageMove(
                          e.nativeEvent.offsetX,
                          e.nativeEvent.offsetY
                        )
                    : (e) => draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
                }
                onMouseUp={endDrawing}
                onTouchStart={mode ? handleTouchMove : handleTouchDraw}
                onTouchMove={mode ? handleTouchMove : handleTouchDraw}
                onTouchEnd={endDrawing}
                style={{
                  cursor: mode ? "move" : "auto",
                  boxShadow: "0 0 40px 0 rgba(0,0,0,0.1)",
                  zIndex: mode ? "49" : "50",
                }}
              />
            </div>

            {/* 슬라이더 위치 */}
            {/* 			<SlideComponent data={imageData} /> */}
          </LeftBox>
          <RightBox>
            <OptionSection>
              <div className="modeBtn">
                <ModeBtn state={!mode} onClick={() => setMode(false)}>
                  그리기
                </ModeBtn>
                <ModeBtn state={mode} onClick={() => setMode(true)}>
                  스티커
                </ModeBtn>
              </div>

              {!mode ? (
                <section className="rangeSlider">
                  
                  <OptionBtnSection >
                    <EraserBtn state={!eraser} onClick={() => setEraser(!eraser)}>
                      {eraser ? "지우개 on" : "지우개 off"}
                    </EraserBtn>

                    <EraserBtn state={!isScrollLocked} onClick={toggleScrollLock}>
                      {isScrollLocked ? "스크롤 off" : "스크롤 on"}
                    </EraserBtn>
                  </OptionBtnSection>

                  <div className="optionHeader">
                    <span>펜툴</span>
                  </div>
                  <p className="optionName">색조</p>
                  <div className="progess">
                    <img src={hueImg} />
                    <HueSlider
                      handleChangeColor={changeColorHandler}
                      color={color}
                    />
                  </div>
                  <p className="optionName">채도</p>
                  <div className="progess">
                    <img src={saturationImg} />
                    <SaturationSlider
                      handleChangeColor={changeColorHandler}
                      color={color}
                    />
                  </div>
                  <p className="optionName">밝기</p>
                  <div className="progess">
                    <img src={lightnessImg} />
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
                <StickerSection>

                  <EraserBtn state={!isScrollLocked} onClick={toggleScrollLock}>
                      {isScrollLocked ? "스크롤 on" : "스크롤 off"}
                  </EraserBtn>

                  <StickerInput className="StickerInput">
                    <span>이미지 불러오기 </span>
                    <input type="file" onChange={handleImageChange} />
                    <img src={uploadImg}></img>
                  </StickerInput>

                  <div className="optionHeader">
                    <span>스티커 선택</span>
                  </div>

                  <SelectedSection>
                    {imageData.map((image, index) => (
                      <Stickerbox
                        key={index}
                        className="InputImage"
                        select={index === selectedImage}
                      >
                        <Sticker select={index === selectedImage}>
                          <img
                            src={URL.createObjectURL(image.image)}
                            alt={`${index}`}
                            onClick={() => selectImage(index)}
                          />
                        </Sticker>

                        <div className="filterWrap"></div>

                        <div className="removeBtnWrap">
                          <button
                            className="removeBtn"
                            onClick={() => removeImage(index)}
                          >
                            <img src={delImg}></img>
                          </button>
                        </div>
                      </Stickerbox>
                    ))}
                  </SelectedSection>

                  <div className="optionHeader">
                  <span className="small">사진을 선택하셔야 개별조정이 가능합니다</span>
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
                </StickerSection>
              )}

              <section className="saveBtn">
                <StyledButton
                  width={"130px"}
                  height={"40px"}
                  title={"완료하기"}
                  func={handleSave}
                />
              </section>
            </OptionSection>
          </RightBox>
        </DrawSection>
      </WhiteContainer>
    </BackgroundGray>
  );
}

export default DrawPage;

const OptionSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding-top: 52px;

  .doneBtn {
    margin-top: 87px;
    display: flex;
    justify-content: center;
  }
  .optionName {
    text-align: right;
    color: rgb(80, 80, 80);
    font-size: 14px;
  }
  .progess {
    display: flex;
    width: 90%;
    align-items: center;
    gap: 10px;
  }
  .sizeProgress {
    display: flex;
    flex-direction: column;
    width: 60%;
    gap: 10px;
  }
  .sizeSection {
    display: flex;
    gap: 20px;
    width: 90%;
  }
  img {
    width: 38px;
  }

  .inputFile {
    margin-top: 31px;
  }

  .useMy {
    margin-left: auto;
    display: flex;
    flex-direction: column;
  }

  .rangeSlider {
    padding-top: 23.5px;
    display: flex;
    flex-direction: column;

  }



  .modeBtn {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    border-bottom: 1px solid rgb(217, 217, 217);
  }

  .saveBtn {
    display: flex;
    justify-content: center;
    margin-top: 30%;
  }
`;


const OptionBtnSection = styled.section`
  margin-left:auto;
`;

const StickerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 35.5px;

  .optionHeader {
    display:flex;
    flex-direction:column;
    .small{
      margin:auto;
      font-size:12px;
      color:var(--green5);
      font-weight:500;
    }

    font-size: 16px;
    font-weight: 500;
    line-height: 150%;
    color: var(--black);
  }
`;

const ModeBtn = styled.button`
  width: 80px;
  height: 27px;
  border: none;
  background: none;

  border-bottom: 2.5px solid
    ${(props) => (props.state ? "var(--green5)" : "var(--green1)")};
  color: ${(props) => (props.state ? "var(--green5)" : "var(--black)")};
  z-index: 10px;
  cursor: pointer;
`;

const EraserBtn = styled.button`
  width: 80px;
  height: 27px;

  color: ${(props) => (props.state ? "var(--green5)" : "white")};
  background-color: ${(props) =>
    props.state ? "rgb(246, 250, 240)" : "green"};
  border-radius: 5px;
  border: 1px solid rgb(96, 161, 14);
  padding: 0 10px 0 10px;
  margin-left: auto;
  margin-bottom: 10px;
`;

const BackgroundGray = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--whiteGray);
`;
const WhiteContainer = styled.div`
  width: 1170px;
  height: 100%;
  background-color: white;
  overflow: hidden;
`;
const DrawSection = styled.div`
  display: flex;
`;
const LeftBox = styled.div`
  width: 69%;
  max-width: 800px;
  max-height: 863px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 13%;

  background: var(--lightGray);
`;

const DrawCanvas = styled.canvas`
  position: absolute;
  background-color: rgba(255, 255, 255, 0);
`;

const ImageCanvas = styled.canvas`
  position: absolute;
  background-color: rgba(255, 255, 255, 0);
`;

const RightBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  width: 31%;
  max-width: 370px;
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

const StickerInput = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--green5);
  display: flex;
  margin-bottom: 20px;
  box-sizing: border-box;
  height: 35px;
  align-items: center;
  padding: 0 10px 0 10px;
  justify-content: space-between;
  background-color: var(--gray1);
  position: relative;

  span {
    font-size: 12px;
    color: rgb(204, 204, 204);
  }

  img {
    width: 22px;
    opacity: 0.5;
  }

  input {
    position: absolute;
    opacity: 0;
    background-color: var(--gray1);
    cursor: pointer;
    width: 100%;
  }
`;
const SelectedSection = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 280px;
  flex-wrap: wrap;
  gap: 30px;

  overflow-y: scroll;
  height: 150px;
  margin-top: 30px;
  position: relative;

  margin-bottom: 40px;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    box-sizing: border-box;
    background-color: var(--green1);
    border: 2px solid var(--green4);
  }
  &::-webkit-scrollbar-track {
    background-color: var(--white);
  }
`;

const Stickerbox = styled.div`
  width: 70px;
  height: 80px;

  .filterWrap {
    display: ${(props) => (props.select ? "block" : "none")};
    width: 70px;
    height: 80px;
    position: absolute;
    background-color: var(--green5);
    opacity: 0.5;
  }

  .removeBtnWrap {
    display: flex;
    margin-left: auto;
    justify-content: flex-end;

    .removeBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      border-radius: 50%;
      border: none;
      width: 35px;
      height: 35px;

      img {
        width: 100%;
      }
    }
  }
`;

const Sticker = styled.div`
  filter: ${(props) => (props.select ? "blur(2px) grayscale(5)" : "none")};

  position: absolute;
  box-sizing: border-box;

  width: 70px;
  height: 80px;

  img {
    width: 100%;
    height: 100%;
  }
`;

//////////////////////
