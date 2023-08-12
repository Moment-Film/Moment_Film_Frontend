import React from 'react'
import styled from 'styled-components'
import * as S from '../common/styles/StyledSpan'
import { useNavigate } from 'react-router'

function PointModal() {
  const navigate = useNavigate();
  return (
    <ModalBackLayer>
      <ModalContainer>
        <img src={null} alt='폭죽 아이콘' />
        <S.StyledBoldSpan20>+ 10P</S.StyledBoldSpan20>
        <p>포인트 지급이 완료되었습니다!</p>
        <button onClick={()=>navigate('/post')}>확인</button>
      </ModalContainer>
    </ModalBackLayer>
  )
}

export default PointModal

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
`
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  width: 428px;
  height: 290px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 30px;
  z-index: 51;

  img {
    width: 133.5px;
    height: 117.5px;
    background-color: var(--lightGray);
    border-radius: 5px;
    margin: 0 0 10.5px;
  }
  span {
    line-height: 24px;
    margin: 0 0 5px;
  }
  p {
    font-size: 14px;
    line-height: 17px;
    margin: 0 0 21px;
  }
  button {
    width: 85px;
    height: 30px;
    font-size: 14px;
    border: 2px solid var(--green4);
    background-color: var(--green2);
    color: var(--green5);
  }
`