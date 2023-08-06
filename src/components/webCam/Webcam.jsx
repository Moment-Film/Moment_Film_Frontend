import React, { useEffect, useRef, useState } from "react";
import * as S from "../common/styles/StyledSpan";
import GridNav from "../frameSelectPage/GridNav";
import right_arrow from "../assets/images/right_arrow.png";
import StyledButton from "../common/component/StyledButton";
import {
  WebcamBody,
  WebcamHeader,
  WebcamVideo,
  WindowUI,
  WindowHeader,
  PreviewPhotos,
  PreviewTxt,
  ImageSlider,
  CapturedPhotos,
} from "./style";
import { useNavigate } from "react-router-dom";

function Webcam() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);

  useEffect(() => {
    const enableWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
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
  };

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
            <video ref={videoRef} autoPlay />
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
              <S.StyledSpan16>전체 다시찍기</S.StyledSpan16>
            </div>
          </PreviewTxt>
          {capturedImages.length > 0 && (
            <CapturedPhotos>
              <button>
                <img src={right_arrow} style={{ transform: "scale(-1)" }} />
              </button>
              <ImageSlider>
                {capturedImages.map((image, index) => (
                  <div key={index}>
                    <div>
                      <S.StyledSpan14>{index + 1}컷</S.StyledSpan14>
                    </div>
                    <img src={image} alt={`Captured ${index}`} />
                  </div>
                ))}
              </ImageSlider>
              <button>
                <img src={right_arrow} />
              </button>
            </CapturedPhotos>
          )}
        </PreviewPhotos>
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width="640"
          height="480"
        ></canvas>
      </WebcamBody>
    </>
  );
}

export default Webcam;
