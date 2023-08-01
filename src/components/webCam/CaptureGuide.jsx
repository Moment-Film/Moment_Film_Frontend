import React, { useState } from 'react'
import styled from 'styled-components'

const guides = [
  {
    id : 1,
    img : null,
    content : "촬영가이드1",
  },
  {
    id : 2,
    img : null,
    content : "촬영가이드2",
  },
  {
    id : 3,
    img : null,
    content : "촬영가이드3",
  },
]

function CaptureGuide() {
  const [guideNum, setGuideNum] = useState(0);
  return (
    <div style={{textAlign: "center"}}>
      <h3>촬영 준비</h3>
      <GuideBox>
        <h4 style={{lineHeight: "100px", margin: "0"}}>촬영 가이드</h4>
        <FlexGuide>
          { guideNum!==0 && <button onClick={()=>setGuideNum(guideNum-1)}> ◀ </button>}
          <div></div>
          { guideNum<guides.lenght && <button onClick={()=>setGuideNum(guideNum+1)}> ▶ </button>}
        </FlexGuide>
      </GuideBox>
    </div>
  )
}

export default CaptureGuide

const GuideBox = styled.div` 
  width: 50%;
  height: 600px;
  margin: 0 auto;
  background-color: #B1B1B1;
`
const FlexGuide = styled.div`
  height: 500px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`