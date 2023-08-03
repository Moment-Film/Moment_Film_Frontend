import React, { useState } from 'react'
import { styled } from 'styled-components'

const guides = [
  {
    img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgE03nncsuxrv_f9QwFbeduBcdBraWQyxxyA&usqp=CAU',
    content : '모멘트 필름에 오신 걸 환영합니다! 집에서 편하게 네컷 사진을 즐겨요~',
  },
  {
    img : 'https://cdn.imweb.me/thumbnail/20220830/8e6c8269713e2.jpg',
    content : "프레임을 선택하고 촬영하러 가기",
  },
  {
    img : 'https://post-phinf.pstatic.net/MjAyMjA5MTlfMTc2/MDAxNjYzNTY2ODEwNzA1.-wbGFh-FFHSnz3zcyNXOMZQlrlsWddY98OMWyDGAaNMg.Aek2Ehevb8idfvEThlXOoUMaPryFjM9krq7hWmUdJw0g.JPEG/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C_%282%29.jpg?type=w1200',
    content : "눈치 볼 필요 없이 재미있고 다양한 포즈로!",
  },
  {
    img : 'https://www.ilovepc.co.kr/news/photo/202004/34185_66288_2224.jpg',
    content : "촬영 후 완성된 이미지를 공유해요.",
  },
]

function CaptureGuide() {
  const [guideNum, setGuideNum] = useState(0);
  return (
    <GuideBox>
      <CloseButton>X</CloseButton>
      <FlexGuide>
        <GuideButton $hide={guideNum===0} onClick={()=>setGuideNum(guideNum-1)}> ◀ </GuideButton>
        <GuideContent>
            <h4>촬영 가이드</h4>
            <div><img src={guides[guideNum].img} alt='Guide Image' /></div>
            <section><p>{guides[guideNum].content}</p></section>
        </GuideContent>
        <GuideButton $hide={guideNum===guides.length-1} onClick={()=>setGuideNum(guideNum+1)}> ▶ </GuideButton>
      </FlexGuide>
    </GuideBox>
  )
}

export default CaptureGuide

const CloseButton = styled.button`
  float: right;
  margin-top: 20px;
  margin-right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 40px;
  background-color: #d9d9d9;
  color: white;
  font-size: 20px;
`
const GuideBox = styled.div` 
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  background-color: #f8f8f8;
  border-radius: 10px;
  overflow: hidden;

  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
`
const FlexGuide = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: -60px;
`
const GuideButton = styled.button`
  border-radius: 100%;
  border: none;
  width: 50px;
  height: 50px;
  line-height: 50px;
  background-color: #d9d9d9;
  color: white;
  visibility: ${props => props.$hide ? "hidden" : "visible"};
`
const GuideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 750px;
  margin: 0 27px;
  overflow: hidden;
  text-align: center;
  
  h4  {
    font-size: 18px;
    line-height: 20px;
  }
  div{
    width: 585px;
    height: 340px;
    background-color: #EBEBEB;
  }
  img {
    height: 340px;
  }
  section {
    width: 100%;
    padding-top: 50px;
    height: 120px;

    p {
      font-size: 16px;
      line-height: 22.4pt;
    }
  }
`