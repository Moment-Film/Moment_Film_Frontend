import React, { useEffect, useRef, useState } from 'react';
import * as S from '../common/styles/StyledSpan'
import {WebcamBody, WebcamHeader, WebcamVideo, WindowUI, WindowHeader, CapturedPhotos} from './style'
import { useNavigate } from 'react-router-dom';


function Webcam() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);

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

  return (
    <WebcamBody>
      <WebcamHeader><h3>사진 촬영</h3></WebcamHeader>
      <WebcamVideo>
        <WindowUI>
          <WindowHeader><div><S.StyledSpan14>{capturedImages.length}/8컷</S.StyledSpan14></div></WindowHeader>
          <video ref={videoRef} autoPlay />
          <div>
            {capturedImages.length<8 &&  <button onClick={handleCapture}>찰 칵</button>}
            <button>다시 찍기</button>
          </div>
        </WindowUI>
      </WebcamVideo>
      
      {capturedImages.length > 0 && (
        <CapturedPhotos>
          {capturedImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Captured ${index}`} />
            </div>
          ))}
        </CapturedPhotos>
      )}
      {/* 비디오 화면을 그리기 위한 캔버스 */}
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
      <button onClick={()=>navigate(`option`)}>다음</button>
    </WebcamBody>
  );
}

export default Webcam;