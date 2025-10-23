import React from 'react';
import type { Question } from '../types';

interface QuizCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (optionIndex: number) => void;
  onNext: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
}) => {
  const isLastQuestion = questionNumber === totalQuestions;
  const optionLetters = ['أ', 'ب', 'ج', 'د'];

  return (
    <div className="flex flex-col">
      <div className="mb-6 border-b-4 border-indigo-100 pb-4">
        <p className="text-base text-indigo-500 mb-2 font-bold">
          السؤال رقم {questionNumber} من {totalQuestions}
        </p>
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-800" style={{ lineHeight: '1.8' }}>
          {question.question}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`
              w-full text-right p-4 border-2 rounded-xl transition-all duration-300 transform
              text-lg flex items-center gap-4
              ${
                selectedAnswer === index
                  ? 'border-4 border-cyan-500 bg-indigo-50 font-extrabold text-indigo-900 scale-[1.03] shadow-lg'
                  : 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 active:scale-95'
              }
            `}
          >
            <span
              className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold
                ${
                  selectedAnswer === index
                    ? 'bg-white text-indigo-600'
                    : 'bg-slate-100 text-slate-600'
                }
              `}
            >
              {optionLetters[index]}
            </span>
            <span>{option}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onNext}
          className="bg-indigo-600 text-white py-3 px-8 rounded-xl font-extrabold text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-[1.03] shadow-lg shadow-indigo-300 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
          disabled={selectedAnswer === null}
        >
          {isLastQuestion ? 'انهاء الامتحان وعرض النتيجة' : 'التالي'}
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
