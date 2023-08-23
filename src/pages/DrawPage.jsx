import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SetResultImage } from "../redux/modules/ResultImage";
import { useNavigate } from "react-router-dom";
import domtoimage from "dom-to-image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import GridNav from "../components/frameSelectPage/GridNav";
import styled from "styled-components";

import {
	HueSlider,
	SaturationSlider,
	LightnessSlider,
} from "react-slider-color-picker";

function DrawPage() {
	const thisbackGround = useSelector((state) => state.ResultImage);
	const FrameSize = useSelector((state) => state.image.images);
	console.log(FrameSize.width);
	console.log(FrameSize.height);

	const [color, setColor] = useState({ h: 180, s: 100, l: 100 });

	const changeColorHandler = (newColor) => {
		setColor(newColor);
	};

	const canvasRef = useRef(null);

	const [isDrawing, setIsDrawing] = useState(false);
	const [lastX, setLastX] = useState(0);
	const [lastY, setLastY] = useState(0);
	const [imglastX, setImgLastX] = useState(0);
	const [imglastY, setImgLastY] = useState(0);

	const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 파일
	const [imageX, setImageX] = useState(0); // 이미지 x 좌표
	const [imageY, setImageY] = useState(0); // 이미지 y 좌표

	const [mode, setMode] = useState(false);
	const [penWeight, setPenWeight] = useState(5);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const objectUrl = URL.createObjectURL(thisbackGround);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		const img = new Image();
		img.src = objectUrl;

		img.onload = () => {
			ctx.drawImage(
				img,
				0,
				0,
				canvas.width,
				canvas.height
			);
		};
	}, [thisbackGround, imageX, imageY]);

	useEffect(() => {
		if (selectedImage) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");

			const img1 = new Image();
			img1.src = URL.createObjectURL(selectedImage);

			img1.onload = () => {
				ctx.drawImage(
					img1,
					imageX,
					imageY,
					100,
					100
				);
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
		ctx.strokeStyle = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		ctx.lineWidth = penWeight;

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
			setImageX(
				imageX +
					(e.nativeEvent.offsetX -
						imglastX)
			);
			setImageY(
				imageY +
					(e.nativeEvent.offsetY -
						imglastY)
			);
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
		console.log(mode);
	};

	return (
		<BackgroundGray>
			<WhiteContainer>
				<GridNav data="draw" />
				<DrawSection>
					<LeftBox>
						<canvas
							ref={
								canvasRef
							}
							width={
								FrameSize.width
							}
							height={
								FrameSize.height
							}
							onMouseDown={
								mode
									? startMoving
									: startDrawing
							}
							onMouseMove={
								mode
									? handleImageMove
									: draw
							}
							onMouseUp={
								endDrawing
							}
							style={{
								cursor: selectedImage
									? "move"
									: "auto",
                boxShadow: "0 0 40px 0 rgba(0,0,0,0.1)"
							}}
						/>
					</LeftBox>
					<RightBox>
						<input
							type="file"
							onChange={handleImageChange} />
						<button onClick={handleSave}>Save Drawing</button>
						<button onClick={chagemode}>mode</button>
						<div>
							pen weight{" "}
							{penWeight}
						</div>
						<Slider
							style={{width: "250px"}}
							min={1}
							max={20}
							step={1}
							value={penWeight}
							onChange={(value) =>setPenWeight(value)
							}
							trackStyle={{
								backgroundColor:
									"rgba(203, 221, 90, 1)",
							}}
							handleStyle={{
								borderColor: "rgba(203, 221, 90, 1)",
								backgroundColor: "rgba(203, 221, 90, 1)",
								borderRadius: "10%",
								width: "10px",
								height: "20px",
								marginLeft: "-5px",
								marginTop: "-9px",
							}}
						/>
						<div>penColor</div>
						<div>색조</div>
						<HueSlider
							handleChangeColor={changeColorHandler}
							color={color}
						/>
						<div>채도</div>
						<SaturationSlider
							handleChangeColor={changeColorHandler}
							color={color}
						/>

						<div>밝기</div>
						<LightnessSlider
							handleChangeColor={changeColorHandler}
							color={color}
						/>
					</RightBox>
				</DrawSection>
			</WhiteContainer>
		</BackgroundGray>
	);
}

export default DrawPage;

const BackgroundGray = styled.div`
	display: flex;
	justify-content: center;
	background-color: var(--whiteGray);
`;
const WhiteContainer = styled.div`
	width: 1170px;
	height: 100%;
	background-color: white;
	overflow: hidden;
`;
const DrawSection = styled.div`
	display: flex;
	width: 100%;
	height: 700px;
`;
const LeftBox = styled.div`
	height: 100%;
  	width: 60%;
  	display: flex;
  	align-items: center;
  	justify-content: center;
	background: var(--lightGray);
`;
const RightBox = styled.div`
	display:flex;
	flex-direction:column;
	justify-content:center;
	gap:10px;
	width: 40%;
	height: 100%;
	background-color: white;
`;
