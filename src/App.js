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
import CaptureGuidePage from './pages/CaptureGuidePage'
import CameraPage from './pages/CameraPage';
import CameraOptionPage from './pages/CameraOptionPage';
import { Route, Routes } from 'react-router-dom';
import Globalstyles from './globalStyle/GlobalStyle';

function App() {
  return (
    <>
    <Globalstyles/>
    <Routes>
      <Route path='/' element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/post' element={<CustomPostPage />} />
        <Route path='/post/:id' element={<CustomDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path='/camera/guide' element={<CaptureGuidePage />} />
        <Route path='/camera/capture' element={<CameraPage />} />
        <Route path='/camera/capture/option' element={<CameraOptionPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/searchreseult" element={<SearchReseultpage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
