import React, { useState } from 'react'
import xButton from '../assets/images/xButton.svg'
import leftArrow from '../assets/images/leftArrow.svg'
import guide1 from '../assets/guides/guide1.jpg'
import guide2 from '../assets/guides/guide2.jpg'
import guide3 from '../assets/guides/guide3.jpg'
import guide4 from '../assets/guides/guide4.jpg'
import guide5 from '../assets/guides/guide5.jpg'
import * as G from './guideStyle'

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
    <G.ModalBG onClick={closeModal}>
      <G.GuideBox onClick={(e) => e.stopPropagation()}>
        <G.GuideHeader>
          <img src={xButton} onClick={closeModal} />
          <span>Step. {guideNum+1}</span>
        </G.GuideHeader>
        <G.FlexGuide>
          <G.ButtonBox>
            <G.PageButton visible={guideNum<=0} onClick={()=> {if(guideNum>0) setGuideNum(guideNum-1)}}><img src={leftArrow} /></G.PageButton>
            <G.PageButton visible={guideNum>=guides.length-1} onClick={()=> {if(guideNum<guides.length-1) setGuideNum(guideNum+1)}}><img className="right" src={leftArrow}/></G.PageButton>
          </G.ButtonBox>
          <img src={guides[guideNum].img} alt='Guide Image' />
        </G.FlexGuide>
        <G.CommentBox>
          {guides[guideNum].content.map((com,index)=> index!==1? <span>{com}</span> : <span className='green'>{com}</span>)}
        </G.CommentBox>
      </G.GuideBox>
    </G.ModalBG>
  )
}
export default CaptureGuidePage;