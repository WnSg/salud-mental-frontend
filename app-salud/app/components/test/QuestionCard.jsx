"use client";
import AnswerButton from "./AnswerButton";

export default function QuestionCard({ question, selectedAnswer, onSelectAnswer }) {
    return (
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-md">
            <p className="font-semibold text-lg text-gray-900">{question.question_text}</p>
            <div className="flex flex-wrap gap-2 mt-3">
                {question.Answers.map((answer) => (
                    <AnswerButton 
                        key={answer.id} 
                        answer={answer} 
                        isSelected={selectedAnswer === answer.id} 
                        onClick={() => onSelectAnswer(question.id, answer.id)} 
                    />
                ))}
            </div>
        </div>
    );
}
