import React, { useState } from 'react'
import { styled } from 'styled-components'
import * as S from '../common/styles/StyledSpan'
import xButton from '../assets/images/xButton.svg'
import leftArrow from '../assets/images/leftArrow.svg'
import guide1 from '../assets/guides/guide1.jpg'
import guide2 from '../assets/guides/guide2.jpg'
import guide3 from '../assets/guides/guide3.jpg'
import guide4 from '../assets/guides/guide4.jpg'
import guide5 from '../assets/guides/guide5.jpg'

const guides = [
  {
    img : guide1,
    content : [
      '원하는 프레임을 설정하세요! 프레임 크기는',
      '추후에 변경이 불가하니 꼭! 신중하게 선택해주세요.'
    ]
  },
  {
    img : guide2,
    content : ["찰칵! 지금의 순간을 기록해요."],
  },
  {
    img : guide3,
    content : [
      "촬영 완료한 사진을",
      "끌어놓아",
      "원하는 위치에 넣어보세요."
    ]
  },
  {
    img : guide4,
    content : [
      "프레임, 필터, 스티커를 이용해",
      "사진 커스텀",
      "을 해주세요!"
    ]
  },
  {
    img : guide5,
    content : [
      "이제 완성!",
      "게시물을 등록",
      "하고 공유해봐요~!"
    ]
  },
]

function CaptureGuidePage({ onClose }) {
  const closeModal = () => {
    onClose();
  }
  const [guideNum, setGuideNum] = useState(0);

  return (
    <ModalBG onClick={closeModal}>
      <GuideBox onClick={(e) => e.stopPropagation()}>
        <GuideHeader>
          <img src={xButton} onClick={closeModal} />
          <span>Step. {guideNum+1}</span>
        </GuideHeader>
        <FlexGuide>
          <button onClick={()=> {if(guideNum>0) setGuideNum(guideNum-1)}}><img src={leftArrow} /></button>
          <img src={guides[guideNum].img} alt='Guide Image' />
          <button onClick={()=> {if(guideNum<guides.length-1) setGuideNum(guideNum+1)}}><img className="right" src={leftArrow}/></button>
        </FlexGuide>
        <CommentBox>
          {guides[guideNum].content.map((com,index)=> index!==1? <span>{com}</span> : <span className='green'>{com}</span>)}
        </CommentBox>
      </GuideBox>
    </ModalBG>
  )
}
export default CaptureGuidePage;

const ModalBG = styled.div`
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
const GuideBox = styled.div` 
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
const GuideHeader = styled.div`
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
const FlexGuide = styled.div`
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
  button{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: none;
    background-color: white;
    box-shadow: 0 0 30px rgba(0,0,0,0.15);
    cursor: pointer;
    img{
      height: 11px;
    }
    .right{
      scale: -1;
    }
  }
`
const CommentBox = styled.div`
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
`