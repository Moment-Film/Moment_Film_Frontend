import React, { useState, useEffect, useRef } from 'react'
import * as S from './captureStyle'
import GridNav from '../frameSelectPage/GridNav'
import StyledButton from '../common/component/StyledButton'
import onAir from '../assets/images/onAir.svg'
import captureBtn from '../assets/icons/captureBtn.svg'
import deleteBtn from '../assets/icons/deleteBtn.svg'
import right_arrow from "../assets/images/right_arrow.svg";
import undo from '../assets/images/undo.svg'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const gridSizes = [
  { id: "down", innerWidth: 257, innerHeight: 356 },
  { id: "up", innerWidth: 270, innerHeight: 356 },
  { id: "wide", innerWidth: 767, innerHeight: 299.5 },
  { id: "narrow", innerWidth: 668, innerHeight: 356 },
]

function Capture() {
  const navigate= useNavigate();
  const gridId = useSelector((state)=>state.image.images).id;
  const thisGrid = gridSizes.find((grid)=>grid.id===gridId);
  const [capturedImages, setCapturedImages] = useState([]);
  const [currentImgOrder, setCurrentImgOrder] = useState(0);
  const [isCapturing, setIsCapturing] = useState(true);
  const slideRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef= useRef(null);
  useEffect(() => {
    const constraints = {
      video: {
        width: {ideal:thisGrid.innerWidth*2},
        height: {ideal:thisGrid.innerHeight*2},
      }
    }
    const enableWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
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

  useEffect(()=>{
    console.log(isCapturing);
    capturedImages.length>0 ? setCurrentImgOrder(capturedImages.length)
    : setCurrentImgOrder(0)
  },[capturedImages])
  useEffect(()=>{
    MoveSlider();
    if(capturedImages[currentImgOrder]||capturedImages.length===8) setIsCapturing(false);
    else setIsCapturing(true);
  }, [currentImgOrder, capturedImages])

  const handleCapture = (index) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, thisGrid.innerWidth, thisGrid.innerHeight);
    localStorage.setItem(
      `image${index}`,
      canvas.toDataURL("image/png")
    );
    setCapturedImages((prevImages) => [
      ...prevImages,
      prevImages[index] = canvas.toDataURL("image/png"),
    ]);
  };
  const MoveSlider = () => {
    if (slideRef.current !== null) { //즉시할당이 안될수있어서 그냥 옵셔널체이닝 느낌
      slideRef.current.style.transition = "all 0.5s ease-in-out"; //부드럽게 이동 
      slideRef.current.style.transform = `translateX(-${154.2*currentImgOrder}px)`;
    }
  }
  const removePhoto = (removeIndex) => {
    const newPhotos = capturedImages.filter((_, index)=> index !=removeIndex )
    setCapturedImages(newPhotos);
  } 
  const moveToNextSlide = () => {
    if (currentImgOrder === 7) return;
    setCurrentImgOrder(currentImgOrder + 1);
  };
  const moveToPrevSlide = () => {
    if (currentImgOrder === 0) return;
    setCurrentImgOrder(currentImgOrder - 1);
  };
  return (
    <S.MainBody>
      <GridNav data="photoGraphy" />
      <S.Body>
        <S.ButtonWrap>
          <S.MoveButton onClick={moveToPrevSlide}><img src={right_arrow} style={{scale:"-1"}}/></S.MoveButton>
          <S.MoveButton onClick={moveToNextSlide}><img src={right_arrow}/></S.MoveButton>
        </S.ButtonWrap>
        
        <S.WebCamUI>
          <S.HeadSection>
            <span>{capturedImages.length}/8컷</span>
            <img src={onAir} />
          </S.HeadSection>
          <S.VideoSection>
            <S.Video show={isCapturing} width={thisGrid.innerWidth} height={thisGrid.innerHeight} ref={videoRef} autoPlay />
            {!isCapturing && <img src={capturedImages[currentImgOrder]} alt=''/>}
          </S.VideoSection>
          <S.PreviewSection>
            <S.PreviewSlider ref={slideRef}>
              {Array(8).fill(null).map((item,index)=>{
                return (
                  <S.PreviewImg $type={currentImgOrder===index} src={capturedImages[index] && capturedImages[index]} key={index}
                  onClick={()=>{
                    if(capturedImages[index]&&currentImgOrder===index) removePhoto(index);
                    else setCurrentImgOrder(index);
                  }}>
                    <div>
                      {capturedImages[index]&&currentImgOrder===index&&
                        <>
                          <img src={undo} alt=""/>
                          <p>다시 촬영하기</p>
                        </>
                      }
                    </div>
                  </S.PreviewImg>
              )})}
            </S.PreviewSlider>
          </S.PreviewSection>
          <S.FootSection>
            <img className='cam' src={captureBtn}
            style={{ visibility : isCapturing ? "visible" : "hidden" }}
            onClick={()=>handleCapture(currentImgOrder)}/>
            <img src={deleteBtn} onClick={()=>{
              
              setCapturedImages([])
              localStorage.clear();
            }}/>
          </S.FootSection>
        </S.WebCamUI>
      </S.Body>
      <StyledButton width="134px" height="40px" title="완료하기" fontSize="18px" func={() => navigate(`option`)}/>
      <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width={thisGrid.innerWidth}
          height={thisGrid.innerHeight}
        ></canvas>
    </S.MainBody>
  )
}

export default Capture