import React, { useState, useEffect, useRef } from 'react';
import { DndProvider, useDrop, useDrag } from 'react-dnd';
import {TouchBackend} from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import GridNav from '../frameSelectPage/GridNav'
import right_arrow from '../assets/images/right_arrow.png'
import StyledButton from '../common/component/StyledButton'
import {
  InnerGrids,
  GridContainer,
  GridBackground,
} from './style'
import * as S from '../common/styles/StyledSpan'
import * as C from './captureStyle';
import { useSelector } from 'react-redux';
import LOGO from '../assets/images/LOGO.svg'

const ImagePiece = ({ imageSrc, isPlaced, clickFunc , index}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'imagePiece',
    item: { imageSrc },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      alt=""
      onClick={()=>clickFunc(index)}
      style={{
        cursor: "pointer",
        width: "153.2px",
        height: "108px",
        opacity: isDragging ? 0.5 : 1,
        display: isPlaced ? 'none' : 'block',
        backgroundColor: "var(--black)",
        backgroundImage: `url(${imageSrc})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        boxSizing: "border-box",
        zIndex:11,
      }}
    />
  );
};

const GridInner = ({ onDrop, imageSrc, width, height, boardIndex, clickFunc }) => {
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: 'imagePiece',
    drop: (item) => {
      onDrop(item.imageSrc);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={dropRef}
      onClick={()=>clickFunc(boardIndex)}
      style={{
        width: width,
        height: height,
        background: 'var(--lightGray)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: imageSrc===null ? "default":"pointer"
      }}
    >
      {imageSrc && <img style={{width:width}}src={imageSrc} alt="" />}
    </div>
  );
};

const SetCount = () => {
  const slideRef = useRef(null);
  const navigate = useNavigate();
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  const [capturedImages] = useState([
    localStorage.getItem(`image0`),
    localStorage.getItem(`image1`),
    localStorage.getItem(`image2`),
    localStorage.getItem(`image3`),
    localStorage.getItem(`image4`),
    localStorage.getItem(`image5`),
    localStorage.getItem(`image6`),
    localStorage.getItem(`image7`),
  ]);

  const thisGrid = useSelector((state)=>state.image.images)
  const [currentImgOrder, setCurrentImgOrder] = useState(0);
  const [setImage, setSetImage] = useState(0);

  const moveToNextSlide = () => {
    if (currentImgOrder === 1) return;
    setCurrentImgOrder(currentImgOrder + 1);
  };

  const moveToPrevSlide = () => {
    if (currentImgOrder === 0) return;
    setCurrentImgOrder(currentImgOrder - 1);
  };

  const setInnerImage = (index) => {
    if(boardImages[index]===null) {
      setSetImage(setImage+1);
    }
  }
  useEffect(() => {
    MoveSlider();
  }, [currentImgOrder]);

  const MoveSlider = () => {
    if (slideRef.current !== null) { //즉시할당이 안될수있어서 그냥 옵셔널체이닝 느낌
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      const totalLength = (capturedImages.length-setImage)*153.2 + (capturedImages.length-setImage-1);
      slideRef.current.style.transform = `translateX(-${(totalLength-770)*currentImgOrder}px)`; //얻은 가로길이*페이지 로 x축 이동 
    }
  }
  const finishButtonHandler = () => {
    if (setImage===4){
      Array(8).fill(null).map((_,index)=>{
      localStorage.removeItem(`image${index}`)
      })
      boardImages.map((item,index)=> localStorage.setItem(`image${index}`,item));
      navigate(`../camera/capture/frame`);
    }
    else alert("프레임을 빈 칸 없이 채워주세요!");
  }

  const [boardImages, setBoardImages] = useState(Array(4).fill(null));

  const handleDrop = (imageSrc, index) => {
    setInnerImage(index);
    const newBoardImages = [...boardImages];
    newBoardImages[index] = imageSrc;
    setBoardImages(newBoardImages);
  };

  const setImageClick = (imageIndex) => {
    if(setImage<4){
      let currentBoard = [...boardImages];
      currentBoard[currentBoard.indexOf(null)]=capturedImages[imageIndex];
      setBoardImages(currentBoard);
      setSetImage(setImage+1);
    }
  }
  const resetImageClick = (index) => {
    if(boardImages[index]!==null){
      let currentBoard = [...boardImages];
      currentBoard[index] = null;
      setBoardImages(currentBoard);
      setSetImage(setImage-1);
    }
  }

  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      <C.MainBody>
      <GridNav data='photoSelect'/>
      <C.Body>
        <C.ButtonWrap top={772} >
          <C.MoveButton $hide={currentImgOrder===0} onClick={moveToPrevSlide}><img src={right_arrow} alt='' style={{ transform: "scale(-1)" }} /></C.MoveButton>
          <C.MoveButton onClick={moveToNextSlide}><img src={right_arrow} alt='' /></C.MoveButton>
        </C.ButtonWrap>
      <GridContainer>
        <GridBackground width={thisGrid.width} $gap={thisGrid.gap}$bottomText={thisGrid.id==='narrow' || thisGrid.id==='wide'}>
          <img src={LOGO} alt="" />
          <InnerGrids>
          {boardImages.map((imageSrc, index) => (
            <GridInner
              key={index}
              clickFunc={resetImageClick}
              boardIndex={index}
              onDrop={(imgSrc) => handleDrop(imgSrc, index)}
              imageSrc={imageSrc}
              width={thisGrid.innerWidth}
              height={thisGrid.innerHeight}></GridInner>
            ))}
          </InnerGrids>
          
        </GridBackground>
          <C.PreviewSection>
            <C.PreviewSlider style={{padding:0, margin:0}}ref={slideRef}>
              {capturedImages?.map((item,index)=>{
                return (
                  <ImagePiece clickFunc={setImageClick} key={index} index={index} imageSrc={item} isPlaced={boardImages.includes(item)}/>
              )})}
            </C.PreviewSlider>
          </C.PreviewSection>
      </GridContainer>
      </C.Body>
      <StyledButton func={finishButtonHandler} title={"완료하기"} width={'130px'} height={'49px'} fontSize={'16px'} />
      <S.StyledSpan16 className="reset"
        onClick={()=>{
          setBoardImages(Array(4).fill(null))
          setSetImage(0);
        }}>전체 다시 선택</S.StyledSpan16>
      </C.MainBody>
        
    </DndProvider>
  );
};

export default SetCount;