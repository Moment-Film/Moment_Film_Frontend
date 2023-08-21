import './App.css';
import PageLayout from './layout/PageLayout';
import Home from './pages/HomePage';
import Login from './pages/LoginPage'
import MyPage from './pages/MyPage'
import CustomPostPage from './pages/CustomPostPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage'
import SearchReseultpage from './pages/SearchReseultpage'
import SignUpPage from './pages/SignUpPage'
import CameraPage from './pages/CameraPage';
import CameraOptionPage from './pages/CameraOptionPage';
import FrameSelectPage from './pages/FrameSelectPage';
import FilterPage from './pages/FilterPage';
import { Route, Routes } from 'react-router-dom';
import Globalstyles from './globalStyle/GlobalStyle';
import CustomMakePage from './pages/CustomMakePage';
import CustomFinishPage from './pages/CustomFinishPage';
import PostWritePage from './pages/PostWritePage';
import PrivateRoute from './layout/PrivateRoute'
import RedirectPage from './pages/RedirectPage';

import DrawPage from './pages/DrawPage';
import Test from './pages/Test';
function App() {
  return (
    <>
      <Globalstyles />
      <Routes>
        {/* 안스르륵 */}
        <Route path='/' element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/postlist/:id' element={<CustomPostPage />} />
          <Route path='/post/:id' element={<DetailPage />} />
          <Route path='/camera/frameSelect' element={<FrameSelectPage />} />
          <Route path='/camera/capture' element={<CameraPage />} />
          <Route path='/camera/capture/option' element={<CameraOptionPage />} />
          <Route path='/camera/capture/filter' element={<FilterPage />} />
          <Route path='/camera/capture/frame' element={<CustomMakePage />} />
          <Route path='/camera/capture/finish' element={<CustomFinishPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/reseult/:id" element={<SearchReseultpage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/api/user/kakao/login" element={<RedirectPage />} />
          <Route path="/api/user/google/callback" element={<RedirectPage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/DrawPage" element={<DrawPage />} />
          
          {/* private Router */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile/:id" element={<MyPage />} />
            <Route path='/camera/capture/finish/write' element={<PostWritePage />} />
          </Route>
        </Route>

        {/* 스르륵 */}


      </Routes>
    </>
  );
}

export default App;