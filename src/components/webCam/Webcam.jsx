import React, { useEffect, useRef, useState } from 'react';
import * as S from '../common/styles/StyledSpan'
import right_arrow from '../assets/images/right_arrow.png'
import StyledButton from '../common/component/StyledButton';
import { WebcamBody, WebcamHeader, WebcamVideo, WindowUI, WindowHeader, PreviewPhotos, PreviewTxt, ImageSlider, CapturedPhotos } from './style'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Webcam() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const slideRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [currentImgOrder, setcCurrentImgOrder] = useState(0);


  useEffect(() => {
    const enableWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      } catch (error) {
        console.error('웹캠을 사용할 수 없습니다:', error);
      }
    };
    enableWebcam();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    localStorage.setItem(`image${capturedImages.length}`, canvas.toDataURL('image/png'))
    setCapturedImages(prevImages => [...prevImages, canvas.toDataURL('image/png')]);
  };

  const MoveSlider = () => {
    if (slideRef.current !== null) {
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      const size = slideRef.current.getBoundingClientRect().width
      slideRef.current.style.transform = `translateX(-${(size) * currentImgOrder}px)`;
    }
  }

  const moveToNextSlide = () => {
    if (currentImgOrder === 1) return;
    setcCurrentImgOrder(currentImgOrder + 1);
  };

  const moveToPrevSlide = () => {
    if (currentImgOrder === 0) return;
    setcCurrentImgOrder(currentImgOrder - 1);
  };

  useEffect(() => {
    MoveSlider();

  }, [currentImgOrder]);

  return (
    <WebcamBody>
      <WebcamHeader><h3>사진 촬영</h3></WebcamHeader>
      <WebcamVideo>
        <WindowUI>
          <WindowHeader><div><S.StyledSpan14>{capturedImages.length}/8컷</S.StyledSpan14></div></WindowHeader>
          <video ref={videoRef} autoPlay />

        </WindowUI>
        {capturedImages.length < 8 && <button onClick={handleCapture}><S.StyledSpan16>사진찍기</S.StyledSpan16></button>}
        <StyledButton width="360px" height="50px" title="완료하기" func={() => navigate(`option`)} />
      </WebcamVideo>

      <PreviewPhotos>
        <PreviewTxt>
          <S.StyledBoldSpan16>PREVIEW</S.StyledBoldSpan16>
          <div>
            <S.StyledSpan16>전체 다시찍기</S.StyledSpan16>
          </div>
        </PreviewTxt>
        {capturedImages.length > 0 && (
          <CapturedPhotos>
            <button onClick={moveToPrevSlide}><img src={right_arrow} style={{ transform: "scale(-1)" }} /></button>
            <SlilderWrap>
            <ImageSlider ref={slideRef}>
              {capturedImages.map((image, index) => (
                <div key={index}>
                 <S.StyledSpan14>{index + 1}컷</S.StyledSpan14>
                  <div><img src={image} alt={`Captured ${index}`}/></div>
                </div>
              ))}
            </ImageSlider>
            </SlilderWrap>
            <button onClick={moveToNextSlide}><img src={right_arrow} /></button>
          </CapturedPhotos>
        )}
      </PreviewPhotos>
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
    </WebcamBody>
  );
}

export default Webcam;

const SlilderWrap = styled.div`
  width: 85%;
  height: 200px;
  overflow: hidden;
  border-top: 3px solid;
  border-bottom: 3px solid;
`
