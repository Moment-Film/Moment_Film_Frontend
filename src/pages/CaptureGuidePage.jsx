import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

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
  const navigate = useNavigate();
  const [guideNum, setGuideNum] = useState(0);
  return (
    <div style={{textAlign: "center"}}>
      <h3>촬영 준비</h3>
      <GuideBox>
        <h4 style={{lineHeight: "100px", margin: "0"}}>촬영 가이드</h4>
        <GuideContent>
          <img src={guides[guideNum].img} alt='Guide Image' />
          <p>{guides[guideNum].content}</p>
        </GuideContent>
        <FlexGuide>
          { guideNum!==0 && <button onClick={()=>setGuideNum(guideNum-1)}> ◀ </button>}
          { guideNum<guides.length-1 && <button onClick={()=>setGuideNum(guideNum+1)}> ▶ </button>}
        </FlexGuide>
      </GuideBox>
      <button onClick={()=>navigate(`../camera/frameSelect`)}>알겠어요</button>
    </div>
  )
}

export default CaptureGuide

const GuideBox = styled.div` 
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  height: 600px;
  margin: 0 auto;
  background-color: #B1B1B1;
`
const GuideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 80%;
  max-width: 600px;
  min-height: 80%;
  margin: 0 auto;
  overflow: hidden;

  img{
    height: 70%;
  }
`
const FlexGuide = styled.div`
  position: absolute;
  height: 500px;
  width: 90%;
  margin: 0 auto;
  flex-direction: row;
`