import React from 'react'
import KakaoShareBtn from '../components/common/component/KakaoShareBtn'
import { useSelector } from 'react-redux'

function CustomFinish() {
  const thisGrid = useSelector((state) => state.ResultImage);
  var objectURL = window.URL.createObjectURL(thisGrid);
  return (
    <div>
      <img src={objectURL} alt="" />
      <KakaoShareBtn/>
    </div>
  )
}

export default CustomFinish