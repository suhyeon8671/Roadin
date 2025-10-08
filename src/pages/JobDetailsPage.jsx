import React from 'react';
import { useParams } from 'react-router-dom';
import { jobDetails } from '../data/jobDetails'; // 우리가 만든 데이터 파일을 import
import './JobDetailsPage.css';

function JobDetailsPage() {
  const { jobId } = useParams(); // URL에서 직업 ID(예: web-developer)를 가져옴
  const job = jobDetails[jobId];

  if (!job) {
    return <div className="job-details-container"><p>해당 직업 정보를 찾을 수 없습니다.</p></div>;
  }

  return (
    <div className="job-details-container">
      <div className="job-header">
        <h1>{job.title}</h1>
        <p className="job-description">{job.description}</p>
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <h2>평균 연봉</h2>
          <p className="salary">{job.avgSalary}</p>
        </div>

        <div className="detail-card">
          <h2>주요 관련 기업</h2>
          <ul>
            {job.relatedCompanies.map(company => <li key={company}>{company}</li>)}
          </ul>
        </div>

        <div className="detail-card long-card">
          <h2>필요 역량</h2>
          <ul>
            {job.requiredSkills.map(skill => <li key={skill}>{skill}</li>)}
          </ul>
        </div>

        <div className="detail-card long-card">
          <h2>추천 자격증</h2>
          <ul>
            {job.requiredCertifications.map(cert => <li key={cert}>{cert}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;
