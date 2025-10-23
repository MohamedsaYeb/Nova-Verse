import React, { useState, useEffect } from 'react';
import { quizQuestions } from './constants/quizData';
import QuizCard from './components/QuizCard';
import Results from './components/Results';
import Timer from './components/Timer';
import ProgressBar from './components/ProgressBar';

const TOTAL_TIME = quizQuestions.length * 60; // 60 seconds per question

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<'start' | 'active' | 'finished'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    if (quizState !== 'active') return;

    if (timeLeft <= 0) {
      setQuizState('finished');
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [quizState, timeLeft]);
  
  const startQuiz = () => {
    setQuizState('active');
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(quizQuestions.length).fill(null));
    setTimeLeft(TOTAL_TIME);
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizState('finished');
    }
  };

  const handleRestart = () => {
    startQuiz();
  };

  const renderContent = () => {
    switch (quizState) {
      case 'active':
        const currentQuestion = quizQuestions[currentQuestionIndex];
        return (
          <>
            <Timer timeLeft={timeLeft} />
            <ProgressBar current={currentQuestionIndex + 1} total={quizQuestions.length} />
            <QuizCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={quizQuestions.length}
              selectedAnswer={userAnswers[currentQuestionIndex]}
              onSelectAnswer={handleSelectAnswer}
              onNext={handleNextQuestion}
            />
          </>
        );
      case 'finished':
        return <Results questions={quizQuestions} userAnswers={userAnswers} onRestart={handleRestart} />;
      case 'start':
      default:
        return (
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-slate-800 mb-4">اختبار فيزياء تجريبي</h1>
            <p className="text-lg text-slate-600 mb-8">
              اختبر معلوماتك في أساسيات القياس الفيزيائي.
              <br />
              لديك {TOTAL_TIME / 60} دقيقة لإكمال {quizQuestions.length} سؤال.
            </p>
            <button
              onClick={startQuiz}
              className="bg-indigo-600 text-white py-4 px-10 rounded-xl font-extrabold text-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-[1.05] shadow-lg shadow-indigo-300"
            >
              ابدأ الامتحان الآن
            </button>
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center font-sans p-4" dir="rtl">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 relative">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;