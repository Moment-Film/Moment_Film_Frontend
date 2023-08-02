import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { styled, css } from 'styled-components'

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
    <div style={{display:"flex", width:"100%", flexDirection:"column", alignItems:"center", textAlign:"center"}}>
      <h3>촬영가이드</h3>
      <GuideBox>
          <FlexGuide>
          <GuideButton hide={guideNum===0} onClick={()=>setGuideNum(guideNum-1)}> ◀ </GuideButton>
        <GuideContent>
            <h4>촬영 가이드</h4>
            <img src={guides[guideNum].img} alt='Guide Image' />
            <section><p>{guides[guideNum].content}</p></section>
        </GuideContent>
          <GuideButton hide={guideNum===guides.length-1} onClick={()=>setGuideNum(guideNum+1)}> ▶ </GuideButton>
          </FlexGuide>
      </GuideBox>
      <button onClick={()=>navigate(`../camera/capture`)}>알겠어요</button>
    </div>
  )
}

export default CaptureGuide

const GuideBox = styled.div` 
  display: flex;
  min-width: 50%;
  flex-direction: column;
  background-color: #B1B1B1;
  padding: 0 20px;
`
const FlexGuide = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border: 1px solid blue;
`
const GuideButton = styled.button`
  border-radius: 100%;
  border: none;
  width: 40px;
  height: 40px;
  line-height: 40px;
  background-color: #d9d9d9;
  color: white;
  visibility: ${props => props.hide ? "hidden" : "visible"};
`
const GuideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid green;
  max-width: 60%;
  margin: 0 1%;
  overflow: hidden;
  text-align: center;
  
  h4  {
    font-size: 18px;
    line-height: 20px;
    padding: 20px 0;
  }
  img {
    height: 350px;
  }
  section {
    padding-top: 50px;
    height: 120px;

    p {
      font-size: 16px;
      line-height: 22.4pt;
      color: white;
    }
  }
`