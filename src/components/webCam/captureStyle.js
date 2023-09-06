import styled, {css} from "styled-components";


export const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 1170px;
  overflow: hidden;
  padding-bottom: 121px;
  span {
    cursor: pointer;
    &:hover {
      color: var(--warningRed);
    }
  }
`
export const Body = styled.div`
  display: flex;
  gap: 20px;
  align-items: end;
  justify-content: center;
  width: 100%;
  padding-top: 70px;
`
export const WebCamUI = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  max-width: 770px;
  width: 90%;
  background-color: white;
  box-shadow: 0 0 30px rgba(0,0,0,0.1);
  border-radius: 5px;
  margin-bottom: 40px;
`
export const HeadSection = styled.section`
  width: 50%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding-right: 20px;
  span {
    width: 80px;
    text-align: center;
    margin-left: -40px;
  }
`
export const VideoSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 356px;
  background-color: var(--gray4);
  @media (max-width: 870px) {
    ${({gridId})=>gridId==='wide'&&css`
      img{
        width: 100%;
      }
    `}
  }
  @media (max-width: 742px) {
    ${({gridId})=>gridId==='narrow'&&css`
      img{
        width: 100%;
      }
    `}
  }
  @media (max-width: 302px) {
    ${({gridId})=>gridId==='up'&&css`
      img{
        width: 100%;
      }
    `}
  }
  @media (max-width: 285px) {
    ${({gridId})=>gridId==='down'&&css`
      img{
        width: 100%;
      }
    `}
  }
`
export const Video = styled.video`
  object-fit: cover;
  width: ${ props => props.width || 300}px;
  height: ${ props => props.height || 356}px;
  display: ${props => props.show ? "block" : "none"};

  @media (max-width: 852px) {
    ${({width, height})=> height<356 && css`
      width: ${width*0.9}px;
      height: ${height*0.9}px;
    `}
  }
  @media (max-width: 766px) {
    ${({width, height})=> height<356 && css`
      width: ${width*0.9}px;
      height: ${height*0.9}px;
    `}
  }
  @media (max-width: 742px) {
    ${({width,height})=>width===668&&css`
      width: ${width*0.9}px;
      height: ${height*0.9}px;
    `}
  }
  @media (max-width: 681px) {
    ${({width, height})=> height<356 && css`
      width: ${width*0.7}px;
      height: ${height*0.7}px;
    `}
  }
  @media (max-width: 668px) {
    ${({width, height})=> width===668 && css`
      width: ${width*0.8}px;
      height: ${height*0.8}px;
    `}
  }
  @media (max-width: 596px) {
    ${({width, height})=> height<356 && css`
      width: ${width*0.6}px;
      height: ${height*0.6}px;
    `}
  }
  @media (max-width: 593px) {
    ${({width, height})=> width===668 && css`
      width: ${width*0.7}px;
      height: ${height*0.7}px;
    `}
  }
  @media (max-width: 520px) {
    ${({width, height})=> width===668 && css`
      width: ${width*0.6}px;
      height: ${height*0.6}px;
    `}
  }
  @media (max-width: 511px) {
    ${({width, height})=> height<356 && css`
      width: ${width*0.5}px;
      height: ${height*0.5}px;
    `}
  }
  @media (max-width: 444px) {
    ${({width, height})=> width===668 && css`
      width: ${width*0.5}px;
      height: ${height*0.5}px;
    `}
  }
  @media (max-width: 426px) {
    ${({width, height})=> height<356 && css`
      width: ${width*0.4}px;
      height: ${height*0.4}px;
    `}
  }
  @media (max-width: 372px) {
    ${({width, height})=> width===668 && css`
      width: ${width*0.4}px;
      height: ${height*0.4}px;
    `}
  }
  @media (max-width: 340px) {
    ${({width, height})=> height<356 && css`
      width: ${width*0.329}px;
      height: ${height*0.329}px;
    `}
  }
  @media (max-width: 317px) {
    ${({width, height})=> width===270 && css`
      width: ${width*0.9}px;
      height: ${height*0.9}px;
    `}
  }
  @media (max-width: 300px) {
    ${({width, height})=> width===257 && css`
      width: ${width*0.933}px;
      height: ${height*0.933}px;
    `}
  }
  @media (max-width: 298px) {
    ${({width, height})=> width===668 && css`
      width: ${width*0.377}px;
      height: ${height*0.377}px;
    `}
  }
  @media (max-width: 288px) {
    ${({width, height})=> width===257 && css`
      width: ${width*0.92}px;
      height: ${height*0.92}px;
    `}
  }
  @media (max-width: 286px) {
    ${({width, height})=> width===270 && css`
      width: ${width*0.876}px;
      height: ${height*0.876}px;
    `}
  }
`
export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 95%;
  max-width: 900px;
  top: ${({top})=>top||660}px;
  justify-content: space-between;
`
export const MoveButton = styled.button`
  display: flex;
  justify-content: center;
  background-color: white;
  align-items: center;
  width: 38px;
  height: 38px;
  border-radius: 19px;
  border: none;
  z-index: 200;
  box-shadow: 0 0 30px rgba(0,0,0,0.15);
  cursor: pointer;
`
export const PreviewSection = styled.section`
  overflow: hidden;
  width: 100%;
  background-color: var(--gray5);
`
export const PreviewSlider = styled.div`
  display: flex;
  gap: 1px;
  width: 1232.6px;
  height: 108px;
  background-color: var(--gray5);
  padding-left: 50%;
  margin-left: -76.6px;
  z-index: 10;
`
export const PreviewImg = styled.div`
  box-sizing: border-box;
  width: 153.2px;
  height: 108px;
  background-color: #333;
  background-image: url(${props=>props.src});
  background-size: cover;
  background-position: center;
  ${({ $type }) =>
    $type && css`
    border: 3px solid var(--green3);
    `};
  div {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: var(--black);
    opacity: 0.6;
    color: white;
    img{
      cursor: pointer;
    }
    p{
      cursor: pointer;
      color: white;
      margin: 0;
      padding: 0;
      font-size: 13px;
      line-height: 150%;
    }
  }
`
export const FootSection = styled.section`
  width: 50%;
  box-sizing: border-box;
  padding-right: 20px;
  height: 68px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  .cam {
    visibility: ${props=>props.view ? "hidden" : "block"};
    margin-left: -24px;
    margin-right: auto;
  }
`