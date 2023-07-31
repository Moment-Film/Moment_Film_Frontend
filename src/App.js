import './App.css';
import Home from './pages/HomePage';
import Login from './pages/LoginPage'
import MyPage from './pages/MyPage'
import SearchPage from './pages/SearchPage'
import SearchReseultpage from './pages/SearchReseultpage'
import SignUpPage from './pages/SignUpPage'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/searchreseult" element={<SearchReseultpage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
