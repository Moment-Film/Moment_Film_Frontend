import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const ImageCanvas = ({ width,height,mode, selectedImage, imageData, setImageData }) => {
  console.log(imageData);
  console.log(mode);

  const canvasRef = useRef(null);

  const [isMoving, setIsMoving] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);



  const imageCanvasRef = useRef(null); // 이미지를 넣는 캔버스

  const drawImages = () => {
    const canvas = imageCanvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height); // 이미지를 모두 지웁니다.

    imageData.forEach((item) => {
      const { image, x, y, width, height } = item;
      const img = new Image();
      img.src = URL.createObjectURL(image);

      img.onload = () => {
        ctx.drawImage(img, x, y, width, height);
      };
    });
  };

  useEffect(() => {
    drawImages();
  }, [imageData]);


  const startMoving = (x, y) => {
    setIsMoving(true);
    setLastX(x);
    setLastY(y);
  };

  const endMoving = () => {
    setIsMoving(false);
  };

  const handleImageMove = (x, y) => {
    if (isMoving) {
      const updatedImageData = imageData.map((item, i) =>
        i === selectedImage
          ? {
              ...item,
              x: item.x + x - lastX,
              y: item.y + y - lastY,
            }
          : item
      );
      setImageData(updatedImageData);
      setLastX(x);
      setLastY(y);

      // 캔버스를 지우고 이미지를 다시 그립니다.
      drawImages();
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
        endMoving();
      }
    }
  };

  return (
    <ICanvas
      ref={imageCanvasRef}
      width={width}
      height={height}
      onMouseDown={
        mode
          ? (e) => startMoving(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
          : null
      }
      onMouseMove={
        mode
          ? (e) => handleImageMove(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
          : null
      }
      onMouseUp={endMoving}
      onTouchStart={mode ? handleTouchMove : null}
      onTouchMove={mode ? handleTouchMove : null}
      onTouchEnd={endMoving}
      style={{
        cursor: mode ? "move" : "auto",
        boxShadow: "0 0 40px 0 rgba(0,0,0,0.1)",
        zIndex: mode ? "50" : "49",
      }}
    />
  );
};

export default ImageCanvas;

const ICanvas = styled.canvas`
  position: absolute;
  background-color: rgba(255, 255, 255, 0);

`;
