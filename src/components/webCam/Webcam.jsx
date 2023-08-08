
import React, { useEffect, useRef, useState } from "react";
import * as S from "../common/styles/StyledSpan";
import GridNav from "../frameSelectPage/GridNav";
import right_arrow from "../assets/images/right_arrow.png";
import StyledButton from "../common/component/StyledButton";
import {
  WebcamBody,
  WebcamVideo,
  StyledVideo,
  WindowUI,
  WindowHeader,
  PreviewPhotos,
  PreviewTxt,
  ImageSlider,
  CapturedPhotos,
  MoveButton,
  SlilderWrap,
} from "./style";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const gridSizes = [
  { id: "down", innerWidth: 257, innerHeight: 356 },
  { id: "up", innerWidth: 270, innerHeight: 356 },
  { id: "wide", innerWidth: 767, innerHeight: 299.5 },
  { id: "narrow", innerWidth: 668, innerHeight: 356 },
]

function Webcam() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const slideRef = useRef(null); //슬라이더의 돔을 참조하기위한 useRef
  const [capturedImages, setCapturedImages] = useState([]);
  const [currentImgOrder, setcCurrentImgOrder] = useState(0); // 페이지 구별을 위한 useState
  const gridId = useSelector((state)=>state.image.selectedImage);
  const thisGrid = gridSizes.filter((grid)=>grid.id===gridId)[0];
  useEffect(() => {
    const enableWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true, width: thisGrid.width, height: '300px'
        });
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      } catch (error) {
        console.error("웹캠을 사용할 수 없습니다:", error);
      }
    };
    enableWebcam();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    localStorage.setItem(
      `image${capturedImages.length}`,
      canvas.toDataURL("image/png")
    );
    setCapturedImages((prevImages) => [
      ...prevImages,
      canvas.toDataURL("image/png"),
    ]);
    setcCurrentImgOrder(1);
  };

  //슬라이더 영역을 이동시키기위함 
  const MoveSlider = () => {
    if (slideRef.current !== null) { //즉시할당이 안될수있어서 그냥 옵셔널체이닝 느낌
      slideRef.current.style.transition = "all 0.5s ease-in-out"; //부드럽게 이동 
      const size = capturedImages.length*173+15 // 내부슬라이더 요소의 가로길이 얻기 
      const element = document.querySelector(SlilderWrap);
      const slideWidth = size-element.offsetWidth;
      slideRef.current.style.transform = `translateX(-${(slideWidth) * currentImgOrder}px)`; //얻은 가로길이*페이지 로 x축 이동 
    }
  }

  //페이지 이동 버튼시 페이지 변경함수들 
  //페이지가 0,1 일때는 움직이지않음 이외에는 현재페이지 +-1로 움직임
  const moveToNextSlide = () => {
    if (currentImgOrder === 1) return;
    setcCurrentImgOrder(currentImgOrder + 1);
  };

  const moveToPrevSlide = () => {
    if (currentImgOrder === 0) return;
    setcCurrentImgOrder(currentImgOrder - 1);
  };

  //페이지변경시마다 슬라이더 이동 동작 
  useEffect(() => {
    MoveSlider();
  }, [currentImgOrder, capturedImages]);

  const removePhoto = (removeIndex) => {
    const newPhotos = capturedImages.filter((_, index)=> index !=removeIndex )
    setCapturedImages(newPhotos);
  } 
  return (
    <>
      <WebcamBody>
        <GridNav data={"photoGraphy"}/>
        <WebcamVideo>
          <WindowUI>
            <WindowHeader>
              <div>
                <S.StyledSpan14>{capturedImages.length}/8컷</S.StyledSpan14>
              </div>
            </WindowHeader>
            <div style={{display:'flex', width: '100%', height: '356px', alignItems: 'center', justifyContent: 'center'}}>
              <StyledVideo width={thisGrid.innerWidth} height={thisGrid.innerHeight} ref={videoRef} autoPlay />
            </div>
          </WindowUI>
          {capturedImages.length < 8 && (
            <button onClick={handleCapture}>
              <S.StyledSpan16>사진찍기</S.StyledSpan16>
            </button>
          )}
          <StyledButton
            width="360px"
            height="50px"
            title="완료하기"
            func={() => navigate(`option`)} 
          />
        </WebcamVideo>

        <PreviewPhotos>
          <PreviewTxt>
            <S.StyledBoldSpan16>PREVIEW</S.StyledBoldSpan16>
            <div>
              <S.StyledSpan16 onClick={()=>{
                setCapturedImages([])
                localStorage.clear();
              }}>전체 다시찍기</S.StyledSpan16>
            </div>
          </PreviewTxt>
          {capturedImages.length > 0 && (
            <CapturedPhotos>
            {capturedImages.length>5 && <MoveButton $hide={currentImgOrder===0} onClick={moveToPrevSlide}><img src={right_arrow} style={{ transform: "scale(-1)" }} /></MoveButton>}
            <SlilderWrap>{/* 전체 슬라이더 영역 범위 밖으로 넘어가면 안보여줄거임*/}
            <ImageSlider ref={slideRef}> {/* 내부 슬라이더 영역 */}
              {capturedImages.map((image, index) => (
                <div key={index}>
                  <S.StyledSpan14>{index + 1}컷</S.StyledSpan14>
                  <div onClick={()=>removePhoto(index)}><img src={image} alt={`Captured ${index}`}/></div>
                </div>
              ))}
            </ImageSlider>
            </SlilderWrap>
            {capturedImages.length>5 && <MoveButton $hide={currentImgOrder===1} onClick={moveToNextSlide}><img src={right_arrow} /></MoveButton>}
            </CapturedPhotos>
          )}
        </PreviewPhotos>
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width={thisGrid.innerWidth}
          height={thisGrid.innerHeight}
        ></canvas>
      </WebcamBody>
    </>
  );
}

export default Webcam;