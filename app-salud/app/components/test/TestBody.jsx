import Question from "./QuestionCard";

export default function TestBody({ questions, answers, onAnswerChange }) {
    return (
        <div className="space-y-6">
            {questions.map((q) => (
                <Question
                    key={q.id}
                    question={q}
                    selectedAnswer={answers[q.id]}
                    onSelectAnswer={onAnswerChange}
                />
            ))}
        </div>
    );
}
