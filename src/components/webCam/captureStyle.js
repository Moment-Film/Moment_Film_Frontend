import styled from "styled-components";


export const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 1170px;
  overflow: hidden;
`
export const Body = styled.div`
  display: flex;
  gap: 20px;
  align-items: end;
  justify-content: center;
  width: 100%;
  padding: 70px 0 121px;
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
  background-color: var(--lightGray);
`
export const PreviewSlider = styled.div`
  display: flex;
  gap: 1px;
  width: 1232.6px;
  height: 108px;
  background-color: var(--lightGray);
`
export const PreviewImg = styled.div`
  width: 153.2px;
  height: 108px;
  background-color: #333;
  span{
    position: relative;
    display: block;
    top: 5px;
    left: 5px;
    width: 36px;
    height: 20px;
    border-radius: 10px;
    font-family: 'Pretendard';
    box-sizing: border-box;
    padding: 2px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    background-color: white;
    opacity: 0.8;
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
    margin-left: -24px;
  }
`