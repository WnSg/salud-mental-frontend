"use client";

export default function AnswerButton({ answer }) {
    return (
        <button className="px-4 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition">
            {answer.answer_text}
        </button>
    );
}
