import './App.css';
import PageLayout from './layout/PageLayout';
import Home from './pages/HomePage';
import Login from './pages/LoginPage'
import MyPage from './pages/MyPage'
import CustomPostPage from './pages/CustomPostPage';
import DetailPage from './pages/DetailPage';
import SearchReseultpage from './pages/SearchReseultpage'
import SignUpPage from './pages/SignUpPage'
import CameraPage from './pages/CameraPage';
import CameraOptionPage from './pages/CameraOptionPage';
import FrameSelectPage from './pages/FrameSelectPage';
import FilterPage from './pages/FilterPage';
import { Route, Routes } from 'react-router-dom';
import Globalstyles from './globalStyle/GlobalStyle';
import FrameCustomPage from './pages/FrameCustomPage';
import CustomFinishPage from './pages/CustomFinishPage';
import PostWritePage from './pages/PostWritePage';
import PrivateRoute from './layout/PrivateRoute'
import RedirectPage from './pages/RedirectPage';

import DrawPage from './pages/DrawPage';
import Test from './pages/Test';
import NotFound from "./pages/NOTFOUND";

function App() {
  return (
    <>
      <Globalstyles />
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/postlist/:id" element={<CustomPostPage />} />
          <Route path="/post/:id" element={<DetailPage />} />
          <Route path="/profile/:id" element={<MyPage />} />
          <Route path='/camera/frameSelect' element={<FrameSelectPage />} />
          <Route path='/camera/capture' element={<CameraPage />} />
          <Route path='/camera/capture/option' element={<CameraOptionPage />} />
          <Route path='/camera/capture/filter' element={<FilterPage />} />
          <Route path='/camera/capture/frame' element={<FrameCustomPage />} />
          <Route path='/camera/capture/finish' element={<CustomFinishPage />} />

          <Route path="/search/reseult/:id" element={<SearchReseultpage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/user/kakao/callback" element={<RedirectPage />} />
          <Route path="/user/google/callback" element={<RedirectPage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/DrawPage" element={<DrawPage />} />

          {/* private Router */}
          <Route element={<PrivateRoute />}>
            <Route
              path="/camera/capture/finish/write"
              element={<PostWritePage />}
            />
          </Route>
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
