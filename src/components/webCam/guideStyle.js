import styled from "styled-components";


export const ModalBG = styled.div`
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  top: 0;
  background-color: rgba(0,0,0,0.3);
`
export const GuideBox = styled.div` 
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 700px;
  width: 90%;
  height: 400px;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
`
export const GuideHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  box-sizing: border-box;
  padding: 0 20px;
  img{
    margin-left: auto;
    width: 20px;
    height: 20px;
    cursor: pointer;
    z-index: 101;
  }
  span {
    text-align: center;
    margin-top: -10px;
    font-family: "Abril Fatface", cursive;
    font-size: 24px;
  }
`
export const FlexGuide = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  gap: 40px;
  margin-bottom: 15px;
  @media (max-width: 700px) {
      gap: 5px;
  }
  img {
    width: 350px;
    height: 214px;
    border-radius: 5px;
  }
`
export const ButtonBox = styled.div`
  position: absolute;
  display: flex;
  width: 500px;
  justify-content: space-between;
  @media (max-width: 600px) {
    width: 80%;
  }
`
export const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background-color: white;
  box-shadow: 0 0 30px rgba(0,0,0,0.15);
  visibility: ${({visible})=> visible? "hidden" : "visible"};
  cursor: pointer;
  img{
    height: 11px;
  }
  .right{
    scale: -1;
  }
`

export const CommentBox = styled.div`
  width: 400px;
  height: 48px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  gap: 5px;
  span {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray5);
  }
  .green {
    color: var(--green4);
  }
  @media (max-width: 600px) {
    span {
      font-size: 13px;
      letter-spacing: 0.05rem;
    }
  }
`