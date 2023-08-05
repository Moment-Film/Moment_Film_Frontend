import Webcam from '../components/webCam/Webcam'

function CameraPage() {
  return(
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "var(--whiteGray)",
    }}>
      <Webcam />
    </div>
  )
}
export default CameraPage;