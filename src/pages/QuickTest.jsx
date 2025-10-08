import { useState } from "react";
import "./QuickTest.css";

const questions = [
  {
    question: "관심 있는 분야는 무엇인가요?",
    options: ["기술", "예술", "과학", "사회"],
  },
  {
    question: "어떤 종류의 일을 선호하시나요?",
    options: ["창의적인 일", "분석적인 일", "실용적인 일", "이론적인 일"],
  },
  // Add more questions here
];

function QuickTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (option) => {
    setAnswers([...answers, option]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Show results
    }
  };

  return (
    <div className="quick-test-container">
      {currentQuestion < questions.length ? (
        <div className="question-container">
          <h2>{questions[currentQuestion].question}</h2>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="results-container">
          <h2>테스트 결과</h2>
          {/* Display results here */}
        </div>
      )}
    </div>
  );
}

export default QuickTest;
