import React, { useMemo } from 'react';
import type { Question } from '../types';

interface ResultsProps {
  questions: Question[];
  userAnswers: (number | null)[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ questions, userAnswers, onRestart }) => {
  const score = useMemo(() => {
    return userAnswers.reduce((acc, answer, index) => {
      return answer === questions[index].answer ? acc + 1 : acc;
    }, 0);
  }, [userAnswers, questions]);

  const scorePercentage = useMemo(() => {
    return Math.round((score / questions.length) * 100);
  }, [score, questions.length]);

  const feedbackMessage = useMemo(() => {
      if (scorePercentage === 100) return '⭐️⭐️⭐️ نتيجة كاملة! مستوى الباشمهندس حقيقي، أنت جاهز للامتحان.';
      if (scorePercentage >= 80) return '💯 مجهود ممتاز! مستوى عالٍ، تحتاج مراجعة بسيطة لأخطائك.';
      if (scorePercentage >= 50) return '✅ جيد. تحتاج للمزيد من التركيز والمراجعة خاصة على الأجزاء غير الصحيحة.';
      return '💡 تحتاج لمراجعة شاملة ومكثفة للمادة. ابدأ فوراً بمراجعة دروس القياس.';
  }, [scorePercentage]);

  const optionLetters = ['أ', 'ب', 'ج', 'د'];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">نتيجتك في الامتحان</h2>
      <div className="text-center mb-8 p-6 bg-indigo-50 rounded-xl border-l-4 border-indigo-500 w-full">
        <p className="text-xl text-gray-700 mb-3">الدرجة النهائية:</p>
        <p className="font-extrabold text-indigo-600 text-5xl">{score} / {questions.length}</p>
        <p className="text-lg font-medium text-gray-800 mt-4">{feedbackMessage}</p>
      </div>


      <div className="w-full my-6">
        <h3 className="text-2xl font-bold mb-4 border-b pb-2 text-slate-800">تفاصيل الإجابات:</h3>
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === question.answer;

          return (
            <div key={question.id} className={`mb-6 p-4 border-2 rounded-xl ${isCorrect ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'}`}>
              <p className="font-bold text-lg mb-3 text-slate-900">
                {index + 1}. {question.question}
              </p>
              <div className="space-y-2 mt-2 p-3 bg-white rounded-md shadow-inner border border-gray-100">
                {question.options.map((option, optIndex) => {
                  const isUserChoice = userAnswer === optIndex;
                  const isCorrectAnswer = question.answer === optIndex;

                  let optionClass = 'text-gray-700';
                  let icon = '□';

                  if (isCorrectAnswer) {
                      optionClass = 'font-extrabold text-green-700';
                      icon = '✅';
                  }
                  if (isUserChoice && !isCorrectAnswer) {
                      optionClass = 'font-bold text-red-700 line-through';
                      icon = '❌';
                  }
                  
                  return (
                    <div key={optIndex} className={`flex items-center gap-3 ${optionClass}`}>
                      <span className="font-mono text-xl">{icon}</span>
                      <span>{option}</span>
                    </div>
                  );
                })}
              </div>
              
               {question.explanation && (
                 <div className="mt-3 p-3 bg-blue-50 border-r-4 border-blue-400 text-blue-800 rounded-md">
                    <p><span className="font-bold">توضيح: </span>{question.explanation}</p>
                 </div>
               )}
            </div>
          );
        })}
      </div>

      <button
        onClick={onRestart}
        className="bg-indigo-600 text-white py-3 px-8 rounded-xl font-extrabold text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-[1.03] shadow-lg shadow-indigo-300"
      >
        إعادة الامتحان
      </button>
    </div>
  );
};

export default Results;
