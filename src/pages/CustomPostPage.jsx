import { React } from 'react'
import Post from '../components/customPostPage/Post'

import { useDispatch } from "react-redux";
import { SetBackgroundImg,SetImgFile } from "../redux/modules/FrameInfo";

function CustomPostPage() {

  const dispatch=useDispatch();

  dispatch(SetBackgroundImg(null));
  dispatch(SetImgFile(null));

  return (
    <Post />
  )
}

export default CustomPostPage
