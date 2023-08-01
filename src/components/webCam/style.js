import styled from "styled-components";

const WebcamBody = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  video {
    width: 40%;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  button{
    margin: 0 auto;
    border: none;
    height: 50px;
    width: 200px;
  }
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
  CapturedPhotos,
}