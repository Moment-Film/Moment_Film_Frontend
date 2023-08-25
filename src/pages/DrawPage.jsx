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
import hueImg from '../components/assets/icons/hue.png'
import saturationImg from '../components/assets/icons/saturation.png';
import lightnessImg from '../components/assets/icons/lightness.png';
import StyledButton from "../components/common/component/StyledButton";
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

	const [imageData, setImageData] = useState([]);


	const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 파일


	const [mode, setMode] = useState(false);
	const [penWeight, setPenWeight] = useState(5);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const objectUrl = URL.createObjectURL(thisbackGround);

	const drawingCanvasRef = useRef(null);  // 그림을 그리는 캔버스
	const imageCanvasRef = useRef(null);    // 이미지를 넣는 캔버스


	useEffect(() => {
		const canvas = imageCanvasRef.current;
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
	}, [thisbackGround, imageData]);


	const drawImages = () => {
		const canvas = imageCanvasRef.current;
		const ctx = canvas.getContext("2d");

		imageData.forEach((item, index) => {
			const { image, x, y, width, height } = item;
			const img = new Image();
			img.src = URL.createObjectURL(image);

			img.onload = () => {
				console.log(item)
				ctx.drawImage(img, x, y + index * 70, width, height);
			};
		});
	};


	useEffect(() => {
		drawImages();
	}, [imageData]);


	useEffect(() => {
		const canvas = imageCanvasRef.current;
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
	}, [thisbackGround]);


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
		const canvas = drawingCanvasRef.current;
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

	const removeImage = (index) => {
		const updatedImages = imageData.filter((_, i) => i !== index);
		setImageData(updatedImages);
	};

	const selectImage = (index) => {
		setSelectedImage(index);
	};

	const handleImageChange = (e) => {
		if (e.target.files.length > 0) {
			const newImages = Array.from(e.target.files);
			const newImageData = newImages.map((image) => ({
				image,
				x: 0,
				y: 0,
				width: 50,
				height: 50,
			}));
			setImageData([...imageData, ...newImageData]);
		}
	};

	const handleStickerSize = (value, a) => {
		if (a === 'x') {
			const updatedImageData = imageData.map((item, i) =>
				i === selectedImage
					? { ...item, width: value }
					: item
			);
			setImageData(updatedImageData);
		}
		else if (a === 'y') {
			const updatedImageData = imageData.map((item, i) =>
				i === selectedImage
					? { ...item, height: value }
					: item
			);
			setImageData(updatedImageData);
		}
	};


	const handleImageMove = (e) => {
		if (isDrawing) {
			const updatedImageData = imageData.map((item, i) =>
				i === selectedImage
					? { ...item, x: item.x + e.nativeEvent.offsetX - imglastX, y: item.y + e.nativeEvent.offsetY - imglastY }
					: item
			);
			setImageData(updatedImageData);
			setImgLastX(e.nativeEvent.offsetX);
			setImgLastY(e.nativeEvent.offsetY);
		}
	};


	const handleSave = async () => {
		console.log(1);
		if (!canvasRef.current) return;

		try {
			const card = canvasRef.current;
			domtoimage.toBlob(card).then((imageFile) => {
				dispatch(SetResultImage(imageFile));
				console.log(imageFile);
				navigate("/camera/capture/finish");
			});
		} catch (error) {
			console.error("저장에러:", error);
		}
	};


	return (
		<BackgroundGray>
			<WhiteContainer>
				<GridNav data="draw" />
				<DrawSection>
					<LeftBox>
						<div style={{ display: "flex", position: "relative" }} ref={canvasRef}>
							<img src={objectUrl} style={{ border: "1px blue" }} />
							<DrawCanvas
								ref={
									drawingCanvasRef
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
										? (e) => handleImageMove(e, 0)
										: draw
								}

								onMouseUp={
									endDrawing
								}

								onTouchStart={
									mode 
										? startMoving 
										: startDrawing
								}
								
								onTouchMove={
									mode 
										? handleImageMove 
										: draw
								}

								onTouchEnd={endDrawing}

								style={{
									cursor: mode
										? "move"
										: "auto",
									boxShadow: "0 0 40px 0 rgba(0,0,0,0.1)",
									zIndex: mode
										? "50"
										: "100",
								}}
							/>

							<ImageCanvas
								ref={
									imageCanvasRef
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
										? (e) => handleImageMove(e, 0) 
										: draw
								}

								onMouseUp={
									endDrawing
								}

								onTouchStart={
									mode 
										? startMoving 
										: startDrawing
								}

								onTouchMove={
									mode 
										? handleImageMove 
										: draw
								}
								
								onTouchEnd={endDrawing}
								
								style={{
									cursor: mode
										? "move"
										: "auto",
									boxShadow: "0 0 40px 0 rgba(0,0,0,0.1)",
									zIndex: mode
										? "49"
										: "50"

								}}
							/>
						</div>
					</LeftBox>
					<RightBox>
						<OptionSection>
							<section className="rangeSlider">
								<div className="optionHeader">
									<span >프레임 커스텀</span>
								</div>
								<p className="optionName">색조</p>
								<div className="progess">
									<img src={hueImg} />
									<HueSlider
										handleChangeColor={changeColorHandler}
										color={color}
									/>
								</div>
								<p className="optionName">채도</p>
								<div className="progess">
									<img src={saturationImg} />
									<SaturationSlider
										handleChangeColor={changeColorHandler}
										color={color}
									/>
								</div>
								<p className="optionName">밝기</p>
								<div className="progess">
									<img src={lightnessImg} />
									<LightnessSlider
										handleChangeColor={changeColorHandler}
										color={color}
									/>
								</div>
								<p className="optionName">굵기</p>
								<div className="progess">
									<img src={lightnessImg} />
									<Slider
										min={1}
										max={20}
										step={1}
										value={penWeight}
										onChange={(value) => setPenWeight(value)
										}
										trackStyle={{
											backgroundColor:
												"rgba(203, 221, 90, 1)",
											height: "13px"

										}}
										handleStyle={{
											borderColor: "white",
											border: "5px solid white",
											boxShadow: "1px 1px 1px gray",
											backgroundColor: "rgba(203, 221, 90, 1)",
											borderRadius: "50%",
											width: "25px",
											height: "25px",
											marginLeft: "-5px",
											marginTop: "-9px",
										}}
									/>
								</div>
							</section>


							<section className="mode">
								<div className="optionHeader">
									<span >모드</span>
								</div>
								<div className="modeBtn">
									<ModeBtn state={mode} onClick={() => setMode(false)}>그리기</ModeBtn>
									<ModeBtn state={!mode} onClick={() => setMode(true)}>사진 옮기기</ModeBtn>
								</div>
							</section>



							<StickerSection className="mode">
								<div className="optionHeader">
									<span >스티커</span>
								</div>

								<div className="StickerInput">
									<input
										type="file"
										onChange={handleImageChange} />
								</div>

								<p className="optionName">스티커크기</p>
								<div className="progess">
									<img src={lightnessImg} />
									<Slider
										min={50}
										max={200}
										step={1}
										value={imageData[selectedImage]?.width}
										onChange={(value) => handleStickerSize(value, "x")
										}
										trackStyle={{
											backgroundColor:
												"rgba(203, 221, 90, 1)",
											height: "13px"

										}}
										handleStyle={{
											borderColor: "white",
											border: "5px solid white",
											boxShadow: "1px 1px 1px gray",
											backgroundColor: "rgba(203, 221, 90, 1)",
											borderRadius: "50%",
											width: "25px",
											height: "25px",
											marginLeft: "-5px",
											marginTop: "-9px",
										}}
									/>
									{/* 		{
										console.log(imageData[selectedImage].height)
									} */}
									<Slider
										min={50}
										max={100}
										step={1}
										value={imageData[selectedImage]?.height}
										onChange={(value) => handleStickerSize(value, "y")
										}
										trackStyle={{
											backgroundColor:
												"rgba(203, 221, 90, 1)",
											height: "13px"

										}}
										handleStyle={{
											borderColor: "white",
											border: "5px solid white",
											boxShadow: "1px 1px 1px gray",
											backgroundColor: "rgba(203, 221, 90, 1)",
											borderRadius: "50%",
											width: "25px",
											height: "25px",
											marginLeft: "-5px",
											marginTop: "-9px",
										}}
									/>
								</div>
							</StickerSection>

							<div className="selectImage" >

								<div style={{ display: "flex" }}>
									{
										imageData.map((image, index) => (
											<div key={index} className="selectedImage">
												<img src={URL.createObjectURL(image.image)} alt={`Selected ${index}`} />
												<button onClick={() => removeImage(index)}>Remove</button>
											</div>
										))
									}
								</div>

								<div style={{ display: "flex" }}>
									{
										imageData.map((image, index) => (
											<div key={index} className="selectedImage">
												<img src={URL.createObjectURL(image.image)} alt={`Selected ${index}`} />
												<button onClick={() => selectImage(index)}>선택</button>
											</div>
										))
									}
								</div>

							</div>
							<section className="saveBtn">
								<StyledButton
									width={"130px"}
									height={"40px"}
									title={"완료하기"}
									func={handleSave}
								/>
							</section>



						</OptionSection>
					</RightBox>
				</DrawSection>
			</WhiteContainer>
		</BackgroundGray>
	);
}

export default DrawPage;

const OptionSection = styled.section`
  display: flex;
  flex-direction: column;

  padding-top: 30px;

  .doneBtn{
    margin-top:87px;
    display:flex;
    justify-content:center;
  }
  .optionName{
    text-align:right;
    color:rgb(80, 80, 80);
    font-size:14px;
  }
  .progess{
    display:flex;
    align-items:center;
    gap:10px;
  }
  img{
    width:38px;
  }

  .inputFile{
    margin-top:31px;
  }

  .useMy{
    margin-left:auto;
    display:flex;
    flex-direction:column;
  }

  .rangeSlider{
    padding :41px 0 41px 0;
  }


.modeBtn{
	padding-top:19.5px;
	padding-bottom:40px;
	display:flex;
	justify-content:center;
	gap:20px;

  }
  
  .saveBtn{
	display:flex;
	justify-content:center;
  }



`;


const StickerSection = styled.div`
	display: flex;
	flex-direction:column;

	.StickerInput{
		padding-top:19.5px;
	display:flex;
	justify-content:center;


  }
`;



const ModeBtn = styled.button`
	width:100px;
	height:27px;
	border-radius:5px;
	border: 1px solid var(--green5);
	background-color:${(props) => props.state ? 'var(--green1)' : 'var(--green5)'};
	color:${(props) => props.state ? 'var(--green5)' : 'var(--green1)'};

`;


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
`;
const LeftBox = styled.div`
  height:863px;
  	width: 60%;
  	display: flex;
  	align-items: center;
  	justify-content: center;
	background: var(--lightGray);


`;

const DrawCanvas = styled.canvas`
	position:absolute;
	background-color:rgba(255,255,255,0);
`;

const ImageCanvas = styled.canvas`
	position:absolute;
	background-color:rgba(255,255,255,0);
`;

const RightBox = styled.div`
	display:flex;
	justify-content:center;
	gap:10px;
	width: 40%;
  height:863px;
	background-color: white;

  .optionHeader{
    display:flex;
    width:290px;
    justify-content:space-between;
    border-bottom:1px solid rgb(217, 217, 217);
    padding-bottom:9px;
    font-size:16px;

    img{
      width:21px;
    }
  }
`;
