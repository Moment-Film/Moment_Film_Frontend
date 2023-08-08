import React, { useState, useEffect, useRef } from 'react';
import { DndProvider, useDrop, useDrag } from 'react-dnd';
import {TouchBackend} from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import GridNav from '../frameSelectPage/GridNav'
import right_arrow from '../assets/images/right_arrow.png'
import {
  CapturedPhotos,
  MoveButton,
  SlilderWrap,
  ImageSlider,
  InnerGrids,
  GridContainer,
  GridBackground,
} from './style'
import * as S from '../common/styles/StyledSpan'
import { useSelector } from 'react-redux';

const ImagePiece = ({ imageSrc, onDrop, isPlaced }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'imagePiece',
    item: { imageSrc },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <img
      ref={dragRef}
      src={imageSrc}
      alt="CapturedImage"
      style={{
        cursor: "pointer",
        width: '168px',
        opacity: isDragging ? 0.5 : 1,
        display: isPlaced ? 'none' : 'block',
        borderRight: "3px solid black",
        borderLeft: "3px solid black",
        boxSizing: "border-box"
      }}
    />
  );
};

const GridInner = ({ onDrop, imageSrc, width, height }) => {
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: 'imagePiece',
    drop: (item, monitor) => {
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
      style={{
        width: width,
        height: height,
        background: 'var(--lightGray)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {imageSrc && <img style={{width:width}}src={imageSrc} alt="Puzzle Piece" />}
    </div>
  );
};

const SetCount = () => {
  const slideRef = useRef(null);
  const navigate = useNavigate();
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  const [capturedImages, setCapturedImages] = useState([
    { id: 1, src: localStorage.getItem(`image0`) },
    { id: 2, src: localStorage.getItem(`image1`)  },
    { id: 3, src: localStorage.getItem(`image2`)  },
    { id: 4, src: localStorage.getItem(`image3`)  },
    { id: 5, src: localStorage.getItem(`image4`)  },
    { id: 6, src: localStorage.getItem(`image5`)  },
    { id: 7, src: localStorage.getItem(`image6`)  },
    { id: 8, src: localStorage.getItem(`image7`)  },
  ]);
  
  const gridSizes = [
    { id: "down", width: '300px', innerWidth: '126.6px', innerHeight: '175.2px', gap:'4px' },
    { id: "up", width: '300px', innerWidth: '123.1px', innerHeight: '162.5px', gap:'28px' },
    { id: "wide", width: '259px', innerWidth: '202.9px', innerHeight: '78.7px', gap:'8px' },
    { id: "narrow", width: '211px', innerWidth: '147.2px', innerHeight: '78.7px', gap:'8px' },
  ]
  const gridId = useSelector((state)=>state.image.selectedImage);
  const [thisGrid, setThisGrid] = useState(gridSizes.filter((grid)=>grid.id===gridId)[0])
  
  const [imgCnt, setImgCnt] = useState(capturedImages.length);
  const [currentImgOrder, setCurrentImgOrder] = useState(0);

  const moveToNextSlide = () => {
    if (currentImgOrder === 1) return;
    setCurrentImgOrder(currentImgOrder + 1);
  };

  const moveToPrevSlide = () => {
    if (currentImgOrder === 0) return;
    setCurrentImgOrder(currentImgOrder - 1);
  };

  useEffect(() => {
    MoveSlider();
  }, [currentImgOrder, capturedImages]);

  const MoveSlider = () => {
    if (slideRef.current !== null) { //즉시할당이 안될수있어서 그냥 옵셔널체이닝 느낌
      slideRef.current.style.transition = "all 0.5s ease-in-out"; //부드럽게 이동 
      const size = imgCnt*173+15 // 내부슬라이더 요소의 가로길이 얻기 
      const element = document.querySelector(SlilderWrap);
      const slideWidth = element.offsetWidth? size-element.offsetWidth : null;
      slideRef.current.style.transform = `translateX(-${(slideWidth) * currentImgOrder}px)`; //얻은 가로길이*페이지 로 x축 이동 
    }
  }

  const [boardImages, setBoardImages] = useState(Array(4).fill(null));

  const handleDrop = (imageSrc, index) => {
    const newBoardImages = [...boardImages];
    newBoardImages[index] = imageSrc;
    setBoardImages(newBoardImages);
  };

  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      <div style={{display:"flex", width:"1170px", flexDirection: "column", alignItems:" center", margin:"0 auto", backgroundColor: "white", overflow: "hidden"}}>
        <GridNav data='photoSelect'/>
      <GridContainer>
        <GridBackground width={thisGrid.width} $gap={thisGrid.gap}$bottomText={thisGrid.id==='narrow' || thisGrid.id==='wide'}>
          <S.StyledBoldSpan16 style={{height:'60px', lineHeight:'60px'}}>moment film</S.StyledBoldSpan16>
          <InnerGrids>
          {boardImages.map((imageSrc, index) => (
            <GridInner
              key={index}
              onDrop={(imgSrc) => handleDrop(imgSrc, index)}
              imageSrc={imageSrc}
              width={thisGrid.innerWidth}
              height={thisGrid.innerHeight}></GridInner>
            ))}
          </InnerGrids>
        </GridBackground>
      </GridContainer>
      <div style={{textAlign:"center"}}>
      {capturedImages.length > 0 && (
        <CapturedPhotos>
          {capturedImages.length>5 && <MoveButton $hide={currentImgOrder===0} onClick={moveToPrevSlide}><img src={right_arrow} style={{ transform: "scale(-1)" }} /></MoveButton>}
          <SlilderWrap>{/* 전체 슬라이더 영역 범위 밖으로 넘어가면 안보여줄거임*/}
          <ImageSlider ref={slideRef}> {/* 내부 슬라이더 영역 */}
            {capturedImages?.map((image, index) => (
              <ImagePiece
                key={image.id}
                imageSrc={image.src}
                onDrop={handleDrop}
                isPlaced={boardImages.includes(image.src)} />
            ))}
          </ImageSlider>
          </SlilderWrap>
          {capturedImages.length>5 && <MoveButton $hide={currentImgOrder===1} onClick={moveToNextSlide}><img src={right_arrow} /></MoveButton>}
        </CapturedPhotos>
      )}
      </div>
      </div>
      <button onClick={()=>navigate(`../camera/capture/filter`)}>다음으로</button>
    </DndProvider>
  );
};

export default SetCount;