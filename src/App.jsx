import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import Story from './pages/Story';
import Chat from './pages/Chat';
import Diagnosis from './pages/Diagnosis';
import JobDetailsPage from './pages/JobDetailsPage'; // JobDetailsPage import
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/story" element={<Story />} /> 
              {/* Job Details 페이지를 위한 동적 라우트 추가 */}
              <Route path="/jobs/:jobId" element={<JobDetailsPage />} /> 
              <Route path="/chat" element={<Chat />} />
              <Route path="/diagnosis" element={<Diagnosis />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
