import styled, {css} from "styled-components";


export const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 1170px;
  overflow: hidden;
  padding-bottom: 121px;
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
  width: 770px;
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
`
export const Video = styled.video`
  object-fit: cover;
  width: ${ props => props.width || 300}px;
  height: ${ props => props.height || 356}px;
  display: ${props => props.show ? "block" : "none"};
`
export const MoveButton = styled.button`
  display: flex;
  justify-content: center;
  background-color: white;
  align-items: center;
  width: 38px;
  height: 38px;
  margin-bottom: 142px;
  border-radius: 19px;
  border: none;
  box-shadow: 0 0 30px rgba(0,0,0,0.15);
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
  background-color: var(--lightGray);
  margin: 0 308.4px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: var(--black);
    opacity: 0.6;
    color: white;
    p{
      margin: 0;
      padding: 0;
      font-size: 13px;
      line-height: 22px;
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
  align-items: center;
  .cam {
    visibility: ${props=>props.view ? "hidden" : "block"};
    margin-left: -24px;
  }
`