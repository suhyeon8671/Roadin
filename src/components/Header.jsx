import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext'; // useAuth 훅 import
import { FaUser } from 'react-icons/fa';
import './Header.css';

function Header() {
  const { user } = useAuth(); // useAuth 훅을 사용하여 직접 인증 상태를 가져옵니다.
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // 로그아웃 후 홈으로 이동하여 페이지를 새로고침하는 효과를 줍니다.
      window.location.href = '/'; // 가장 확실한 새로고침 방법
    } catch (error) {
      console.error('Logout error:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          Roadin
        </Link>
      </div>
      <nav className="header-nav">
        <ul>
          <li><Link to="/story">Roadin 이야기</Link></li>
          <li><HashLink smooth to="/#how-to-use">서비스 소개</HashLink></li>
          <li><Link to="/chat">길동이와 대화하기</Link></li>
          {user ? (
            // 로그인 상태일 때
            <>
              <li>
                <Link to="/mypage" className="profile-icon" title="마이페이지">
                  <FaUser />
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-button-nav">로그아웃</button>
              </li>
            </>
          ) : (
            // 로그아웃 상태일 때
            <li><Link to="/login" className="login-button-nav">로그인</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
