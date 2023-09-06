import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const DrawCanvas = ({width,height,color,eraser,penWeight,mode}) => {

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const drawingCanvasRef = useRef(null); // 그림을 그리는 캔버스

  const startDrawing = (x, y) => {
    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
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


  const handleTouchDraw = (e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const canvas = drawingCanvasRef.current;
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

  return (
    <DCanvas
      ref={drawingCanvasRef}
      width={width}
      height={height}
      onMouseDown={
        mode
          ? null
          : (e) => startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      }
      onMouseMove={
        mode
          ? null
          : (e) => draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      }
      onMouseUp={endDrawing}
      onTouchStart={mode ? null : handleTouchDraw}
      onTouchMove={mode ? null : handleTouchDraw}
      onTouchEnd={endDrawing}
      style={{
        cursor: mode ? "move" : "auto",
        boxShadow: "0 0 40px 0 rgba(0,0,0,0.1)",
        zIndex: mode ? "49" : "50",
      }}
    />
  );
};

export default DrawCanvas;

const DCanvas = styled.canvas`
  position: absolute;
  background-color: rgba(255, 255, 255, 0);
`;
