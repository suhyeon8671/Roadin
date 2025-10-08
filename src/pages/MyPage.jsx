import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore'; // getDoc 대신 onSnapshot을 import
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { jobData } from '../data/jobData';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';

function MyPage() {
  const { user, loading } = useAuth();
  const [jobDetails, setJobDetails] = useState(null);
  const [jobName, setJobName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // user 정보가 있고, 로딩이 끝나면 실시간 리스너를 설정합니다.
    if (!loading && user) {
      const docRef = doc(db, 'users', user.uid);

      // onSnapshot은 실시간으로 데이터 변경을 감지하는 리스너를 설정합니다.
      // 이 함수는 리스너를 중지할 수 있는 unsubscribe 함수를 반환합니다.
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.surveyResults && userData.surveyResults.length > 0) {
            const latestResult = userData.surveyResults[userData.surveyResults.length - 1];
            const latestJobName = latestResult.job;
            
            if (latestJobName && jobData[latestJobName]) {
              setJobDetails(jobData[latestJobName]);
              setJobName(latestJobName);
            } else {
              setJobDetails(null);
            }
          } else {
            setJobDetails(null);
          }
        } else {
          setJobDetails(null); 
        }
      }, (error) => {
        console.error("마이페이지 실시간 데이터 로딩 중 오류:", error);
        setJobDetails(null);
      });

      // useEffect의 cleanup 함수입니다.
      // 컴포넌트가 언마운트될 때 (예: 다른 페이지로 이동할 때) 리스너를 중지하여 메모리 누수를 방지합니다.
      return () => {
        unsubscribe();
      };
    }
  }, [user, loading]); // user나 loading 상태가 바뀔 때마다 이 effect를 재실행합니다.

  const handleStartSurvey = () => {
    navigate('/diagnosis');
  };

  if (loading) {
    return <div className="mypage-container centered-message">사용자 정보를 확인 중입니다...</div>;
  }

  if (!user) {
    return (
        <div className="mypage-container centered-message">
            <p>마이페이지를 보려면 로그인이 필요합니다.</p>
            <button onClick={() => navigate('/login')} className="cta-button primary">로그인 페이지로 이동</button>
        </div>
    );
  }

  if (!jobDetails) {
    return (
        <div className="mypage-container">
            <div className="mypage-header">
                <h2>마이페이지</h2>
                <p className="user-email">{user.email}님, 환영합니다!</p>
            </div>
            <div className="no-job-info">
                <p>아직 추천받은 직업이 없어요.</p>
                <p>간단한 설문에 참여하고 나에게 꼭 맞는 직업을 찾아보세요!</p>
                <button onClick={handleStartSurvey} className="survey-start-button">
                    간편 설문 시작하기
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="mypage-container">
      <div className="mypage-header">
          <h2>마이페이지</h2>
          <p className="user-email">{user.email}님, 환영합니다!</p>
      </div>
      <div className="job-card-container">
          <p className="recommend-title">회원님을 위한 최신 맞춤 직업 추천</p>
          <div className="job-card">
            <div className="job-card-header">
              <span className="job-emoji">{jobDetails.emoji}</span>
              <h3>{jobName}</h3>
            </div>
            <div className="job-card-body">
                <div className="job-section">
                    <h4>어떤 일을 하나요?</h4>
                    <p>{jobDetails.description}</p>
                </div>
                <div className="job-section">
                    <h4>평균 연봉</h4>
                    <p className="salary">{jobDetails.avg_salary}</p>
                </div>
                <div className="job-section">
                    <h4>필요 기술</h4>
                    <div className="skills-container">
                        {jobDetails.related_skills.map(skill => (
                            <span key={skill} className="skill-tag">#{skill}</span>
                        ))}
                    </div>
                </div>
                <div className="job-section">
                    <h4>직업 전망</h4>
                    <p>{jobDetails.prospects}</p>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default MyPage;
