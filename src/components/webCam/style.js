import styled from "styled-components";

const WebcamBody = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  width: 1170px;
  background-color: white;
`
const WebcamHeader = styled.div`
  width: 100%;
  height: 98px;
`
const WebcamVideo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--lightGray);
  border-bottom: 1px solid var(--lightGray);
  background-color: #fbfbfb;
  padding-top: 31px;
`
const WindowUI = styled.div`
  width: 767px;
  height: 398px;
  border-radius: 10px;
  border: 2px solid black;
  box-shadow: 0 0 20px rgba(194, 248, 126, 0.35);
  overflow: hidden;
`
const WindowHeader = styled.div`
  height: 40px;
  border-bottom: 3px solid black;
  background-color: #F6FAF0;
`
const CapturedPhotos = styled.div`
  margin: 60px 0 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  img {
    width: 100px;
  }
`

export {
  WebcamBody,
  WebcamHeader,
  WebcamVideo,
  WindowUI,
  WindowHeader,
  CapturedPhotos,
}