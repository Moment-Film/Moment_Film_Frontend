import React, { useState } from 'react';
import { DndProvider, useDrop, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
      alt="Puzzle Piece"
      style={{
        width: '100px',
        margin: "10px",
        opacity: isDragging ? 0.5 : 1,
        display: isPlaced ? 'none' : 'block',
      }}
    />
  );
};

const PuzzleBoard = ({ onDrop, imageSrc }) => {
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
        width: '384px',
        height: '288px',
        background: 'white',
        margin: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {imageSrc && <img style={{width:"384px"}}src={imageSrc} alt="Puzzle Piece" />}
    </div>
  );
};

const SetCount = () => {
  const [images, setImages] = useState([
    { id: 1, src: localStorage.getItem(`image0`) },
    { id: 2, src: localStorage.getItem(`image1`)  },
    { id: 3, src: localStorage.getItem(`image2`)  },
    { id: 4, src: localStorage.getItem(`image3`)  },
    { id: 5, src: localStorage.getItem(`image4`)  },
    { id: 6, src: localStorage.getItem(`image5`)  },
    { id: 7, src: localStorage.getItem(`image6`)  },
    { id: 8, src: localStorage.getItem(`image7`)  },
  ]);

  const [boardImages, setBoardImages] = useState(Array(4).fill(null));

  const handleDrop = (imageSrc, index) => {
    const newBoardImages = [...boardImages];
    newBoardImages[index] = imageSrc;
    setBoardImages(newBoardImages);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{display:"flex", width:"100%", flexDirection: "column", alignItems:" center", marginTop: "100px"}}>
      <div>
        <div style={{ display: 'flex', width:"830px", justifyContent: "center",flexWrap:"wrap", backgroundColor:"gray", padding: "50px 0 70px 0"}}>
          {boardImages.map((imageSrc, index) => (
            <PuzzleBoard key={index} onDrop={(imgSrc) => handleDrop(imgSrc, index)} imageSrc={imageSrc} />
          ))}
        </div>
      </div>
      <div style={{textAlign:"center"}}>
        <h4>이미지를 프레임에 드래그 하세요.</h4>
        <div style={{ display: 'flex' }}>
          {images.map((image) => (
            <ImagePiece
              key={image.id}
              imageSrc={image.src}
              onDrop={handleDrop}
              isPlaced={boardImages.includes(image.src)}
            />
          ))}
        </div>
      </div>
      </div>
    </DndProvider>
  );
};

export default SetCount;