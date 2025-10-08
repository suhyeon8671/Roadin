import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import './Diagnosis.css';
import { surveyData } from '../data/surveyData';

const initialFields = [
  { name: 'IT/개발', emoji: '💻' },
  { name: '디자인', emoji: '🎨' },
  { name: '마케팅', emoji: '📈' },
  { name: '기획', emoji: '📝' },
  { name: '금융', emoji: '💰' },
  { name: '교육', emoji: '🎓' },
];

function Diagnosis() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState('selection'); // selection, questions, results
  const [selectedField, setSelectedField] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  const handleFieldSelect = (fieldName) => {
    if (surveyData[fieldName] && surveyData[fieldName].questions.length > 0) {
      setSelectedField(fieldName);
      setCurrentStep('questions');
    } else {
      alert(`${fieldName} 분야는 현재 준비중입니다.`);
    }
  };

  // 데이터를 덮어쓰지 않고, 배열에 누적하여 저장하는 방식으로 변경
  const saveJobResult = async (jobName, fieldName) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      const newResult = {
        job: jobName,
        field: fieldName,
        date: new Date().toISOString(), // 추천 받은 날짜 기록
      };

      if (userDoc.exists()) {
        // 문서가 존재하면, surveyResults 배열에 새로운 결과를 추가
        await updateDoc(userDocRef, {
          surveyResults: arrayUnion(newResult)
        });
      } else {
        // 문서가 없으면, surveyResults 배열을 새로 만들어 첫 결과 추가
        await setDoc(userDocRef, {
          surveyResults: [newResult]
        });
      }
      console.log('직업 추천 결과 누적 저장 성공:', newResult);
    } catch (error) {
      console.error('결과 누적 저장 중 오류 발생:', error);
    }
  };

  const handleAnswerSelect = (optionIndex) => {
    const questionId = surveyData[selectedField].questions[currentQuestionIndex].id;
    const newAnswers = [...answers, `${questionId}_${optionIndex}`];
    setAnswers(newAnswers);

    const questions = surveyData[selectedField].questions;
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const jobs = surveyData[selectedField].jobs;
      const jobScores = jobs.map(job => {
        const score = job.keywords.reduce((acc, keyword) => {
          return newAnswers.includes(keyword) ? acc + 1 : acc;
        }, 0);
        return { ...job, score };
      });

      const sortedJobs = jobScores.sort((a, b) => b.score - a.score);
      const finalJobs = sortedJobs.filter(job => job.score > 0);
      const topJob = (finalJobs.length > 0 ? finalJobs : sortedJobs)[0];

      setRecommendedJobs(finalJobs.length > 0 ? finalJobs : sortedJobs);
      
      if(topJob) {
        // DB에 결과 저장 (이제는 덮어쓰기가 아닌 누적 방식)
        saveJobResult(topJob.name, selectedField);
      }

      setCurrentStep('results');
    }
  };
  
  const handleGoToMyPage = () => {
      navigate('/mypage');
  };

  const handleReset = () => {
    setCurrentStep('selection');
    setSelectedField(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setRecommendedJobs([]);
  };

  if (loading) {
    return <div className="diagnosis-container centered-message">사용자 정보를 확인 중입니다...</div>;
  }

  if (!user) {
    return (
        <div className="diagnosis-container centered-message">
            <h2>로그인 필요</h2>
            <p>설문 결과를 저장하고 맞춤 직업을 추천받으려면 로그인이 필요합니다.</p>
            <button onClick={() => navigate('/login')} className="cta-button primary">로그인 페이지로 이동</button>
        </div>
    );
  }

  // ... 이하 렌더링 로직은 동일 ...

  const renderSelection = () => (
    <div className="diagnosis-intro">
      <h2>관심있는 취업 분야를 선택해 주세요.</h2>
      <p>하나만 선택해 주세요. 나중에 변경할 수 있습니다.</p>
      <div className="field-options">
        {initialFields.map((field) => (
          <button 
            key={field.name} 
            className="field-button"
            onClick={() => handleFieldSelect(field.name)}
          >
            <span className="field-emoji">{field.emoji}</span>
            <span className="field-name">{field.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderQuestions = () => {
    if (!selectedField) return null;
    const question = surveyData[selectedField].questions[currentQuestionIndex];
    const totalQuestions = surveyData[selectedField].questions.length;
    return (
      <div className="question-container">
        <div className="progress-bar">
            <div className="progress" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}></div>
        </div>
        <h2>{selectedField} 분야 질문</h2>
        <p className="question-text">{`Q${currentQuestionIndex + 1}. ${question.text}`}</p>
        <div className="options-grid">
          {question.options.map((option, index) => (
            <button key={index} className="option-button" onClick={() => handleAnswerSelect(index)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="results-container">
      <h2>'{selectedField}' 분야에 대한 추천 직업</h2>
      <p>설문 결과를 바탕으로 당신의 성향과 가장 잘 맞는 직업을 추천해 드립니다.</p>
      <div className="job-cards">
        {recommendedJobs.slice(0, 3).map((job, index) => (
          <div key={index} className="job-card">
            <h3>{`${index + 1}. ${job.name}`}</h3>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
      <div className="results-actions">
        <button onClick={handleReset} className="cta-button secondary">다시하기</button>
        <button onClick={handleGoToMyPage} className="cta-button primary">마이페이지에서 확인</button>
      </div>
    </div>
  );

  return (
    <div className="diagnosis-container">
      {currentStep === 'selection' && renderSelection()}
      {currentStep === 'questions' && renderQuestions()}
      {currentStep === 'results' && renderResults()}
    </div>
  );
}

export default Diagnosis;
