import './App.css';
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
import { Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Header />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/post' element={<CustomPostPage />} />
        <Route path='/post/:id' element={<CustomDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path='/camera' element={<CameraPage />} />
        <Route path='/camera/option' element={<CameraOptionPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/searchreseult" element={<SearchReseultpage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
