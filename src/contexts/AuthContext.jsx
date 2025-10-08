import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase'; // Firebase 설정 파일에서 auth 객체 가져오기
import { onAuthStateChanged } from 'firebase/auth';

// 1. Context 생성
const AuthContext = createContext();

// 2. Context를 쉽게 사용하기 위한 커스텀 훅
export function useAuth() {
  return useContext(AuthContext);
}

// 3. Context Provider 컴포넌트
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    // onAuthStateChanged: 사용자의 로그인 상태 변경을 실시간으로 감지
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // 인증 상태 확인 후 로딩 완료
    });

    // 컴포넌트가 언마운트될 때 구독 해제
    return unsubscribe;
  }, []);

  // Context를 통해 전달할 값
  const value = {
    user,
    loading, // 로딩 상태도 함께 전달
  };

  // 로딩 중이 아닐 때만 자식 컴포넌트 렌더링
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
