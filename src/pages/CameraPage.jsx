import Webcam from '../components/webCam/Webcam'

function CameraPage() {
  return(
    <div>
       카메라 권한을 허용하면 냅다 갑자기 카메라 화면이 나옵니다. (주의) <br/>
      <Webcam />
    </div>
  )
}
export default CameraPage;