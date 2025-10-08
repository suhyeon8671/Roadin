import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // firebase 설정 파일에서 auth, db 가져오기
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const statusOptions = [
    {
      title: '중, 고등학생',
      description: '자신의 적성과 흥미를 탐색하고, 미래 유망 직업을 추천 받아 진로를 설정합니다.',
    },
    {
      title: '대학생',
      description: '전공과 연계된 커리어 로드맵을 설계하고, 필요한 역량을 강화하여 취업 경쟁력을 높입니다.',
    },
    {
      title: '취업 준비생',
      description: '체계적인 준비를 통해 원하는 기업과 직무에 성공적으로 취업할 수 있도록 돕습니다.',
    },
    {
      title: '직장인',
      description: '새로운 커리어 기회를 탐색하거나, 현재 직무에서 전문성을 강화하여 성장합니다.',
    },
  ];

  const handleNextStep = (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!userStatus) {
      setError('현재 상태를 선택해주세요.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        userStatus: userStatus,
        email: email,
      });
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('이미 사용 중인 이메일입니다.');
      } else if (error.code === 'auth/invalid-email') {
        setError('유효하지 않은 이메일 형식입니다.');
      }
      else {
        setError('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
      console.error('SignUp error:', error);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}>
        <h2>{step === 1 ? '회원가입' : '현재 어떤 상황에 계신가요?'}</h2>
        {error && <p className="error-message">{error}</p>}

        {step === 1 && (
          <>
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">비밀번호 확인</label>
              <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="button" onClick={handleNextStep} className="btn btn-primary">
              다음
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="form-group">
              <div className="job-cards-container">
                {statusOptions.map((option) => (
                  <div
                    key={option.title}
                    className={`job-card ${userStatus === option.title ? 'selected' : ''}`}
                    onClick={() => setUserStatus(option.title)}
                  >
                    {/* <img src={option.imgSrc} alt={option.title} /> */}
                    <h3>{option.title}</h3>
                    <p>{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              회원가입 완료
            </button>
          </>
        )}
        <p>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
