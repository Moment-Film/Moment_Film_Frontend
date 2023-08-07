import { useEffect, useState } from 'react';
import SetCount from "../components/webCam/SetCount";

function CameraOptionPage() {
  return (
    <div style={{width: '100%', backgroundColor:'var(--whiteGray)'}}>
      <SetCount />
    </div>
  )
}
export default CameraOptionPage;