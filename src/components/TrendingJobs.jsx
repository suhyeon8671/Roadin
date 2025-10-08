import React from 'react';
import './TrendingJobs.css';

const trendingJobsData = [
  {
    rank: 1,
    percentage: 95,
    title: "AI 전문가",
    description: "인공지능 기술을 연구하고 개발하여 다양한 문제에 적용하는 전문가입니다."
  },
  {
    rank: 2,
    percentage: 88,
    title: "데이터 사이언티스트",
    description: "방대한 데이터 속에서 의미 있는 정보를 찾아내 비즈니스 의사결정을 돕습니다."
  },
  {
    rank: 3,
    percentage: 82,
    title: "UI/UX 디자이너",
    description: "사용자에게 편리하고 매력적인 디지털 경험을 제공하기 위해 화면을 설계합니다."
  },
  {
    rank: 4,
    percentage: 78,
    title: "소프트웨어 개발자",
    description: "컴퓨터 언어를 사용하여 웹, 앱, 시스템 등 다양한 소프트웨어를 만듭니다."
  },
  {
    rank: 5,
    percentage: 75,
    title: "정보보안 전문가",
    description: "해킹, 바이러스 등 외부 위협으로부터 조직의 정보 자산을 안전하게 보호합니다."
  },
];

function TrendingJobs() {
  return (
    <div className="trending-jobs-wrapper">
      <h2 className="trending-jobs-title">요즘 뜨는 직업 TOP 5</h2>
      <div className="trending-jobs-list">
        {trendingJobsData.map(job => (
          <div key={job.rank} className="trending-job-item">
            <div className="rank-section">
              <span className="rank-number">{job.rank}</span>
              <div className="percentage-circle">
                <span className="percentage-text">{job.percentage}%</span>
              </div>
            </div>
            <div className="info-section">
              <h3 className="job-title">{job.title}</h3>
              <p className="job-description">{job.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingJobs;
