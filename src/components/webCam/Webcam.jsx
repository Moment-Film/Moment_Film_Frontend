import React, { useEffect, useRef, useState } from 'react';

import {WebcamBody, CapturedPhotos} from './style'
import { useNavigate } from 'react-router-dom';


function Webcam() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);

  useEffect(() => {
    const enableWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('웹캠을 사용할 수 없습니다:', error);
      }
    };

    enableWebcam();
  }, []);

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // 비디오 화면을 캔버스에 그립니다.
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    localStorage.setItem(`image${capturedImages.length}`, canvas.toDataURL('image/png'))

    // 캡처된 이미지 데이터를 배열에 추가합니다.
    setCapturedImages(prevImages => [...prevImages, canvas.toDataURL('image/png')]);
  };

  return (
    <WebcamBody>
      <video ref={videoRef} autoPlay />
      {capturedImages.length<8 &&  <button onClick={handleCapture}>찰 칵</button>}
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