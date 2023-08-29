import React from 'react'
import styled from 'styled-components'
import * as S from '../styles/StyledSpan'
import xButton from '../../assets/images/xButton.svg'
import WithdrawalBtn from './WithdrawalBtn'

function Modals({onClose,points,type,text,imgSrc,submitFunc}) {
  const modalCloseHandler = () => {
    onClose();
  }
  const texts={
    delete : ["취소", "삭제할래요!"],
    bye : ["떠날래요", "더 써볼래요!"]
  }
  return (
    <ModalBackLayer onClick={
      (e)=>{
        e.stopPropagation()
        modalCloseHandler()}}>
      <ModalContainer>
        <button className='close' onClick={modalCloseHandler}><img src={xButton} alt='' /></button>
        <img src={imgSrc} alt='' />
        <Texts>
          {points && <S.StyledBoldSpan20>{points}</S.StyledBoldSpan20>}
          {<p>{text}</p>}
        </Texts>
        <n />
        
        {type==="confirm" ? <Buttons>
            <button className="submit" onClick={submitFunc}>확인</button>
          </Buttons>
        :
          <Buttons>
            {
              type==="bye" ? <WithdrawalBtn />
              : <button className="gray" onClick={type==="delete"? modalCloseHandler : submitFunc}>{texts[type][0]}</button>
            }
            <button className="green" onClick={type==="delete"? submitFunc : modalCloseHandler}>{texts[type][1]}</button>
          </Buttons>
        }
      </ModalContainer>
    </ModalBackLayer>
  )
}

export default Modals

const ModalBackLayer = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: rgba(0,0,0,0.2);
  align-items: center;
  justify-content: center;
  z-index: 50;
  .close{
    margin-top: 20px;
    margin-right: 10px;
    margin-left: auto;
    border: none;
    background: none;
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
    }
  }
`
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  width: 430px;
  height: 290px;
  border-radius: 5px;
  box-sizing: border-box;
  //padding: 30px;
  z-index: 51;

  img {
    margin-top: -10px;
    height: 50%;
  }
  span {
    line-height: 24px;
  }
  p {
    font-size: 14px;
    line-height: 17px;
  }
  
`
const Texts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60px;
`
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  button {
    width: 145px;
    height: 40px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
  }
  .submit {
    border: 2px solid var(--green4);
    background-color: var(--green2);
    color: var(--green5);
  }
  .gray {
    border: none;
    background-color: var(--gray2_a);
    color: var(--gray4);
  }
  .green {
    border: none;
    background-color: #60a10e;
    color: white;
  }
`