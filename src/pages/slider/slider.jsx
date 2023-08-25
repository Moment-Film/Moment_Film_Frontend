import React from "react";
import { styled } from 'styled-components';
import { useState, useRef, useEffect } from "react";

const SlideComponent = ({ data }) => {

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
            <ButtonSection style={{  }}>
                <div>
                    <div style={{}}>
                        <StyledButton onClick={moveToPrevSlide}>{'<'}</StyledButton>
                    </div>
                </div>

                <div>
                    <div style={{}}>
                        <StyledButton onClick={moveToNextSlide}>{'>'}</StyledButton>
                    </div>
                </div>
            </ButtonSection>

            <Wrapper >
                <SlideWrapper ref={slideRef}>
                    {
                        data?.map((item, index) => {
                            var objectURL = window.URL.createObjectURL(item.image);
                            return (
                                <div styled={{ display: "flex" }}>
                                    <button style={{ display: "flex",position: "absolute",marginLeft:"130px", zIndex:"100px" }}>s</button>
                                    <Img src={objectURL} key={index}></Img>
                                </div>
                            )
                        })
                    }
                </SlideWrapper>
            </Wrapper>

        </Div >
    );
};

export default SlideComponent;


export const Div = styled.div`
    display:flex;
    width: 100%;
    justify-content:center;
    gap :10px;
    padding-bottom:10%;
    
`

export const Wrapper = styled.div`
display:flex;
  width: 100%;
  height: 200px;
  overflow: hidden;
`

export const SlideWrapper = styled.div`
  display: flex;
  width: 100%;
  height:100%;

`
export const Img = styled.img`
 width:160px;
 //width: 25%;
  height: 112px;
  
`
export const StyledButton = styled.button`
    background-color:#26282d;
    border:none;
    color:aliceblue;
    font-weight:bold;
    font-size:40px;



`

export const ButtonSection = styled.div`
    display: flex;
    width: 60%;
    height:200px;
    max-width:702px;
    align-items:center;
    justify-content: space-between;
    position: absolute;
    z-index: 100;

`