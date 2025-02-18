"use client";
import AnswerButton from "./AnswerButton"; // Importa el componente de respuestas

export default function QuestionCard({ question }) {
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <p className="font-semibold">{question.question_text}</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {question.Answers.map((answer) => (
                    <AnswerButton key={answer.id} answer={answer} />
                ))}
            </div>
        </div>
    );
}
