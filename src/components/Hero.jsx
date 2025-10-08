import { Link } from 'react-router-dom';
import "./Hero.css";
import heroImage from "../assets/hero-bot.png";

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-text">
        <h1 className="hero-title">
          AI가 이끌어주는 <br />
          나의 진로 로드맵, <br />
          <span>Roadin</span>
        </h1>
        <p>
          AI와 함께 개인화된 진로 로드맵을 설계하고, 역량을 강화하여 원하는
          미래를 만들어가세요.
        </p>
        <div className="hero-buttons">
          <Link to="/chat" className="cta-button primary">
            길동이와 대화하기
          </Link>
          <Link to="/diagnosis" className="cta-button secondary">
            간편설문
          </Link>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="진로 로드맵" />
      </div>
    </div>
  );
}

export default Hero;
