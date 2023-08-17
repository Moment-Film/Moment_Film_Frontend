import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SetResultImage } from "../redux/modules/ResultImage";
import { useNavigate } from "react-router-dom";
import domtoimage from "dom-to-image";

function DrawPage() {
  const thisbackGround = useSelector((state) => state.ResultImage);
  const FrameSize = useSelector((state) => state.image);
  console.log(FrameSize)
 
  const canvasRef = useRef(null);
  const picRef = useRef();

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [imglastX, setImgLastX] = useState(0);
  const [imglastY, setImgLastY] = useState(0);

  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 파일
  const [imageX, setImageX] = useState(0); // 이미지 x 좌표
  const [imageY, setImageY] = useState(0); // 이미지 y 좌표

  const [mode, setMode] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const objectUrl = URL.createObjectURL(thisbackGround);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = objectUrl;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [thisbackGround, imageX, imageY]);


  useEffect(() => {
    if (selectedImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const img1 = new Image();
      img1.src = URL.createObjectURL(selectedImage);

      img1.onload = () => {
        ctx.drawImage(img1, imageX, imageY, 100, 100);
      };
    }
  }, [selectedImage, imageX, imageY]);



  const startDrawing = (e) => {
    setIsDrawing(true);
    setLastX(e.nativeEvent.offsetX);
    setLastY(e.nativeEvent.offsetY);
  };

  const startMoving = (e) => {
    setIsDrawing(true);
    setImgLastX(e.nativeEvent.offsetX);
    setImgLastY(e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "blue";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
    setLastX(e.nativeEvent.offsetX);
    setLastY(e.nativeEvent.offsetY);
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleImageMove = (e) => {
    if (isDrawing) {
      setImageX(imageX + (e.nativeEvent.offsetX - imglastX));
      setImageY(imageY + (e.nativeEvent.offsetY - imglastY));
      setImgLastX(e.nativeEvent.offsetX);
      setImgLastY(e.nativeEvent.offsetY);
    }
  };

  const handleSave = async () => {
    if (!canvasRef.current) return;

    try {
      const card = canvasRef.current;
      domtoimage.toBlob(card).then((imageFile) => {
        dispatch(SetResultImage(imageFile));
        console.log(imageFile);
        navigate("/camera/capture/finish");

      });

    } catch (error) {
      console.error("Error saving canvas:", error);
    }
  };


  const chagemode = async () => {
    await setMode(!mode);
    if (mode === true) {
      const card = canvasRef.current;
      domtoimage.toBlob(card).then((imageFile) => {
        dispatch(SetResultImage(imageFile));
      });
    }
    console.log(mode)
  };


  return (
    <div ref={picRef}>
      <h1>자 그려 봅시다</h1>
      <input type="file" onChange={handleImageChange} />
      <canvas
        ref={canvasRef}
        width={300}
        height={400}
        onMouseDown={mode ? startMoving : startDrawing}
        onMouseMove={mode ? handleImageMove : draw}
        onMouseUp={endDrawing}
        style={{ cursor: selectedImage ? "move" : "auto" }}
      />
      <button onClick={handleSave}>Save Drawing</button>
      <button onClick={chagemode}>mode</button>
    </div>
  );
}

export default DrawPage;
