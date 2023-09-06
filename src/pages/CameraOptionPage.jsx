import SetCount from '../components/webCam/SetCount'

function CameraOptionPage() {
  return (
    <div style={{
      width:'100%',
      display:'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--whiteGray)'
    }}>
      <SetCount/>
    </div>
  )
}
export default CameraOptionPage;