export default function TestFooter({ onSubmit }) {
    return (
        <div className="text-right mt-6">
            <button
                onClick={onSubmit}
                className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
            >
                Siguiente →
            </button>
        </div>
    );
}
