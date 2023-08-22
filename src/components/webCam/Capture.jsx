import React, { useState, useEffect, useRef } from 'react'
import * as S from './captureStyle'
import GridNav from '../frameSelectPage/GridNav'
import StyledButton from '../common/component/StyledButton'
import onAir from '../assets/images/onAir.svg'
import captureBtn from '../assets/icons/captureBtn.svg'
import deleteBtn from '../assets/icons/deleteBtn.svg'
import right_arrow from "../assets/images/right_arrow.svg";
import { useSelector } from 'react-redux'

const gridSizes = [
  { id: "down", innerWidth: 257, innerHeight: 356 },
  { id: "up", innerWidth: 270, innerHeight: 356 },
  { id: "wide", innerWidth: 767, innerHeight: 299.5 },
  { id: "narrow", innerWidth: 668, innerHeight: 356 },
]

function Capture() {
  const gridId = useSelector((state)=>state.image.images).id;
  const thisGrid = gridSizes.find((grid)=>grid.id===gridId);
  const [capturedImages, setCapturedImages] = useState([]);
  const [currentImgOrder, setcCurrentImgOrder] = useState(0);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef= useRef(null);
  useEffect(() => {
    const enableWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
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
  return (
    <S.MainBody>
      <GridNav data="photoGraphy" />
      <S.Body>
        <S.MoveButton><img src={right_arrow} style={{scale:"-1"}}/></S.MoveButton>
        <S.WebCamUI>
          <S.HeadSection>
            <span>3/4컷</span>
            <img src={onAir} />
          </S.HeadSection>
          <S.VideoSection>
            <S.Video ref={videoRef} autoPlay />
          </S.VideoSection>
          <S.PreviewSection>
            <S.PreviewSlider>
              {Array(8).fill(null).map((item,index)=>{
                return (
                  <S.PreviewImg key={index}>
                    <span>{index+1}컷</span>
                  </S.PreviewImg>
              )})}
            </S.PreviewSlider>
          </S.PreviewSection>
          <S.FootSection>
            <img className='cam' src={captureBtn} onClick={handleCapture}/>
            <img src={deleteBtn} onClick={()=>{
              setCapturedImages([])
                localStorage.clear();
            }}/>
          </S.FootSection>
        </S.WebCamUI>
        <S.MoveButton><img src={right_arrow}/></S.MoveButton>
      </S.Body>
      <StyledButton width="134px" height="40px" title="완료하기" fontSize="18px"/>
      <div>
        {capturedImages.map((item,index)=>{
          return <img key={index} src={item} />
        })}
      </div>
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