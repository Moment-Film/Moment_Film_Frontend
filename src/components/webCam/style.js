import styled from "styled-components";

const WebcamBody = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 1170px;
  background-color: white;
  overflow: hidden;
`
const WebcamVideo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--lightGray);
  background-color: #fbfbfb;
  padding-top: 31px;
  padding-bottom: 21px;
  z-index: 10;
  margin-bottom: 40px;

  button {
    border: 2px solid var(--black);
    width: 123px;
    height: 39px;
  }
`
const StyledVideo = styled.video`
  object-fit: cover;
  width: ${props => props.width || 300}px;
  height: ${props=> props.height || 356}px;
`
const WindowUI = styled.div`
  width: 767px;
  height: 398px;
  border-radius: 10px;
  border: 2px solid black;
  box-shadow: 0 0 20px rgba(194, 248, 126, 0.35);
  background-color: #5F5F5F;
  overflow: hidden;
`
const WindowHeader = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 3px solid black;
  background-color: #F6FAF0;
  padding-left: 20px;

  div{
    width: 54px;
    height: 20px;
    border-radius: 18px;
    background-color: var(--black);
    color: white;
    line-height: 20px;
  }
`
const PreviewPhotos = styled.div`
  width: 970px;
  margin: 0 auto 60px;
`
const ImageSlider = styled.div`
  display: flex;
  width: 100%;
  height:100%;
  padding: 0 10px;
  gap: 5px;
  max-width: 880px;

  div{
    display:flex;
    position:relative;
    width: 168px;
    padding: 0;

    img{
      width:100%;
      border-right: 3px solid;
      border-left: 3px solid;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    span{
      position: absolute;
      width: 50px;
      height: 27px;
      background-color: rgba(3,3,3,0.8);
      color: white;
      justify-content: center;
      line-height: 27px;
      z-index:100;
      
    }
  }
`
const PreviewTxt = styled.div`
  display: flex;
  justify-content: space-between;
  width: 880px;
  margin: 0 auto;
  height: 28px;
  margin-top: 15px;
`
const CapturedPhotos = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
`
const MoveButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: ${props => props.$hide ? "hidden" : "visible"};
    width: 30px;
    height: 30px;
    border-radius: 30px;
    border: 2px solid var(--black);
    background: none;
`
const SlilderWrap = styled.div`
  max-width: 880px;
  overflow: hidden;
  border-top: 3px solid;
  border-bottom: 3px solid;
  background-color: var(--whiteGray);
`
const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 1170px;
  height: 620px;
  background-color: #fbfbfb;
  border-bottom: 1px solid var(--lightGray);
  box-sizing: border-box;
`
const InnerGrids = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
`
const GridBackground = styled.div`
  display: flex;
  width: ${props => props.width || '150px' };
  height: 447px;
  margin: 0 auto;
  flex-direction: ${props => props.$bottomText ? 'column-reverse': 'column'};
  gap: ${props => props.$gap};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 40px rgba(0,0,0,0.1);
  box-sizing: border-box;
`

export {
  WebcamBody,
  WebcamVideo,
  StyledVideo,
  WindowUI,
  WindowHeader,
  PreviewPhotos,
  MoveButton,
  ImageSlider,
  PreviewTxt,
  CapturedPhotos,
  SlilderWrap,
  InnerGrids,
  GridContainer,
  GridBackground,
}