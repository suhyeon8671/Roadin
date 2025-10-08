import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Hero from '../components/Hero';
import ServiceIntroduction from '../components/ServiceIntroduction';
import HowToUse from '../components/HowToUse';
import TrendingJobs from '../components/TrendingJobs';
import RecommendedJobs from '../components/RecommendedJobs';

function Home() {
  // AuthContext에서 user 정보와 로딩 상태를 함께 가져옵니다.
  const { user, loading } = useAuth();

  // 인증 상태를 확인하는 동안 로딩 메시지를 표시합니다.
  // AuthProvider에서 이미 처리하지만, 한 번 더 확인하여 안정성을 높입니다.
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>인증 정보를 확인 중입니다...</div>;
  }

  // 로딩이 완료된 후, user 상태에 따라 다른 컴포넌트를 렌더링합니다.
  return (
    <>
      <Hero />
      {user ? (
        // 로그인 상태일 때
        <>
          <TrendingJobs />
          <RecommendedJobs />
        </>
      ) : (
        // 로그아웃 상태일 때
        <>
          <ServiceIntroduction />
          <HowToUse />
        </>
      )}
    </>
  );
}

export default Home;
