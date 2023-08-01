import { useEffect, useState } from 'react';
import CaptureGuide from '../components/webCam/CaptureGuide'
import SetCount from "../components/webCam/SetCount";

function CameraOptionPage() {
  return (
    <>
      <CaptureGuide />
      <SetCount />
    </>
  )
}
export default CameraOptionPage;