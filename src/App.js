import './App.css';
import PageLayout from './layout/PageLayout';
import Home from './pages/HomePage';
import Login from './pages/LoginPage'
import MyPage from './pages/MyPage'
import CustomPostPage from './pages/CustomPostPage';
import CustomDetail from './pages/CustomDetail';
import SearchPage from './pages/SearchPage'
import SearchReseultpage from './pages/SearchReseultpage'
import SignUpPage from './pages/SignUpPage'
import CameraPage from './pages/CameraPage';
import CameraOptionPage from './pages/CameraOptionPage';
import FrameSelectPage from './pages/FrameSelectPage';
import CamPageLayout from './layout/CamPageLayout';
import FilterPage from './pages/FilterPage';
import { Route, Routes } from 'react-router-dom';
import Globalstyles from './globalStyle/GlobalStyle';
import CustomMakePage from './pages/CustomMakePage';
import CustomFinish from './components/CustomFinishPage/CustomFinish';

function App() {
  return (
    <>
    <Globalstyles/>
    <Routes>
      {/* 안스르륵 */}
      <Route path='/' element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/post' element={<CustomPostPage />} />
        <Route path='/post/:id' element={<CustomDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path='/camera/frameSelect' element={<FrameSelectPage />} />
        <Route path='/camera/capture' element={<CameraPage />} />
        <Route path='/camera/capture/option' element={<CameraOptionPage />} />
        <Route path='/camera/capture/filter' element={<FilterPage />} />
        <Route path='/camera/capture/frame' element={<CustomMakePage />} />
        <Route path='/camera/capture/finish' element={<CustomFinish />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/searchreseult" element={<SearchReseultpage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>

    {/* 스르륵 */}
      <Route path='/camera' element={<CamPageLayout />}>
      </Route>
      
    </Routes>
    </>
  );
}

export default App;