import "./HowToUse.css";
import walkingBot from "../assets/walking-bot.png"; // 임시 경로

function HowToUse() {
  return (
    <div id="how-to-use" className="how-to-use-container">
      <div className="how-to-use-image">
        <img src={walkingBot} alt="AI 챗봇 길동이" />
      </div>
      <div className="how-to-use-content">
        <h2>Roadin, 이렇게 이용해 보세요</h2>
        <div className="steps">
          <div className="step">
            <h3>1단계: 길동이와 대화 시작</h3>
            <p>메인 화면의 버튼을 클릭하여 AI 챗봇 길동이와의 상담을 시작하세요.</p>
          </div>
          <div className="step">
            <h3>2단계: 진로 고민 털어놓기</h3>
            <p>자유롭게 자신의 관심사, 고민, 목표에 대해 이야기해 주세요.</p>
          </div>
          <div className="step">
            <h3>3단계: 맞춤 정보 얻기</h3>
            <p>길동이가 여러분의 이야기를 분석하여 맞춤형 진로 정보와 가이드를 제공합니다.</p>
          </div>
        </div>
        <div className="main-features">
          <h4>주요 기능</h4>
          <ul>
            <li>&#10004; AI 기반 1:1 진로 상담</li>
            <li>&#10004; 사용자 맞춤형 정보 제공</li>
            <li>&#10004; 간편설문을 통한 빠른 진단</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HowToUse;
