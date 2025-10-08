import student from '../assets/student.png';
import university from '../assets/university.png';
import jobSeeker from '../assets/job-seeker.png';
import professional from '../assets/professional.png';
import './ServiceIntroduction.css';

const services = [
  { 
    name: '중, 고등학생',
    description: '자신의 적성과 흥미를 탐색하고, 미래 유망 직업을 추천받아 진로를 설정합니다.',
    image: student
  },
  { 
    name: '대학생',
    description: '전공과 연계된 커리어 로드맵을 설계하고, 필요한 역량을 강화하여 취업 경쟁력을 높입니다.',
    image: university
  },
  { 
    name: '취업 준비생',
    description: '체계적인 준비를 통해 원하는 기업과 직무에 성공적으로 취업할 수 있도록 돕습니다.',
    image: jobSeeker
  },
  { 
    name: '직장인',
    description: '새로운 커리어 기회를 탐색하거나, 현재 직무에서 전문성을 강화하여 성장합니다.',
    image: professional
  },
];

function ServiceIntroduction() {
  return (
    <div className="service-introduction-container">
      <h2>Roadin 서비스는 어떤 사람에게 도움이 될까요?</h2>
      <div className="service-cards">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            {service.image && <img src={service.image} alt={service.name} />}
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceIntroduction;
