"use client";

export default function AnswerButton({ answer, isSelected, onClick }) {
    return (
        <button 
            onClick={onClick} 
            className={`px-4 py-2 rounded-full text-lg font-semibold border transition ${
                isSelected ? "bg-teal-500 text-white border-teal-600" : "text-gray-800 border-gray-300 bg-gray-100 hover:bg-teal-500 hover:text-white"
            }`}
        >
            {answer.answer_text}
        </button>
    );
}
