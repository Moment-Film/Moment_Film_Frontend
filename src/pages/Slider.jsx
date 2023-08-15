import React from 'react';
import { useState, useRef, useEffect } from "react";

const slider = () => {

    const slideRef = useRef(null);

    const [currentImgOrder, setcCurrentImgOrder] = useState(0);


    const MoveSlider = () => {
        if (slideRef.current !== null) {
            slideRef.current.style.transition = "all 0.5s ease-in-out";
            const size = slideRef.current.getBoundingClientRect().width
            slideRef.current.style.transform = `translateX(-${(size) * currentImgOrder}px)`;
        }
    }

    useEffect(() => {
        MoveSlider();

    }, [currentImgOrder]);

    const moveToNextSlide = () => {
        if (currentImgOrder === 12) return;
        setcCurrentImgOrder(currentImgOrder + 1);
    };

    const moveToPrevSlide = () => {
        if (currentImgOrder === 0) return;
        setcCurrentImgOrder(currentImgOrder - 1);
    };

    return (
        <Div>
        <StyledButton onClick={moveToPrevSlide}>{'<'}</StyledButton>
        <Wrapper >
            <SlideWrapper ref={slideRef}>
                {
                    pic.map((item) => {
                        return <Img onClick={() => navigate(`detail/${item.postId}`)} src={item.Thumbnails} key={item.postId}></Img>
                    })
                }

            </SlideWrapper>
        </Wrapper>
        <StyledButton onClick={moveToNextSlide}>{'>'}</StyledButton>
    </Div>
    );
};

export default slider;
export const Div = styled.div`
    display:flex;
    justify-content:center;
    gap :10px;
    padding-bottom:10%;
    
`

export const Wrapper = styled.div`
  width: 85%;
  height: 200px;
  overflow: hidden;
`

export const SlideWrapper = styled.div`
  display: flex;
  width: 100%;
  height:100%;
`
export const Img = styled.img`
  width: 25%;
  height: 200px;
`
export const StyledButton = styled.button`
    background-color:#26282d;
    border:none;
    color:aliceblue;
    font-weight:bold;
    font-size:40px;

    &:hover{
        font-size:50px;
}
`

