import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore'; // onSnapshot으로 변경
import { db } from '../firebase';
import { jobData } from '../data/jobData';
import './RecommendedJobs.css';

function RecommendedJobs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recommendedJob, setRecommendedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      setLoading(true);

      // 실시간 리스너 설정
      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists() && docSnap.data().surveyResults && docSnap.data().surveyResults.length > 0) {
          const latestResult = docSnap.data().surveyResults[docSnap.data().surveyResults.length - 1];
          const jobName = latestResult.job;
          
          if (jobData[jobName]) {
            setRecommendedJob({ title: jobName, ...jobData[jobName] });
          }
        } else {
          setRecommendedJob(null);
        }
        setLoading(false);
      }, (error) => {
        console.error("추천 직업 실시간 로딩 중 오류:", error);
        setLoading(false);
      });

      // 컴포넌트 언마운트 시 리스너 정리
      return () => unsubscribe();
    } else {
      // 사용자가 로그아웃 상태일 때
      setLoading(false);
      setRecommendedJob(null);
    }
  }, [user]);

  const goToMyPage = () => {
      navigate('/mypage');
  }

  if (loading) {
    return (
      <div className="recommended-jobs-container">
        <h2>회원님을 위한 맞춤 직업 탐색 중...</h2>
        <div className="loading-placeholder"></div>
      </div>
    );
  }

  return (
    <div className="recommended-jobs-container">
      <h2>{recommendedJob ? "AI가 추천하는 최신 맞춤 직업" : "나의 미래 직업 찾기"}</h2>
      
      {recommendedJob ? (
        <div className="recommended-list single">
          <div className="recommended-item">
            <div className="job-card-header">
                <span className="job-emoji">{recommendedJob.emoji}</span>
                <h3>{recommendedJob.title}</h3>
            </div>
            <p className="description">{recommendedJob.description.substring(0, 100)}...</p>
            <button onClick={goToMyPage} className="details-button">
              마이페이지에서 자세히 보기
            </button>
          </div>
        </div>
      ) : (
        <div className="no-recommendation">
          <p>아직 추천 직업이 없네요!</p>
          <p>3분 간편 설문을 통해 AI가 추천하는 나의 미래 직업을 알아보세요.</p>
          <Link to="/diagnosis" className="details-button survey-link">
            간편 설문 시작하기
          </Link>
        </div>
      )}
    </div>
  );
}

export default RecommendedJobs;
