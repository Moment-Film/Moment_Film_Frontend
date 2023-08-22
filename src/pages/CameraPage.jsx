import Capture from '../components/webCam/Capture'

function CameraPage() {
  return(
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "var(--whiteGray)",
    }}>
      <Capture />
    </div>
  )
}
export default CameraPage;