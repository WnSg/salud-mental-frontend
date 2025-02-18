export default function TestCard({ test, onSelect }) {
    return (
        <button
            onClick={onSelect}
            className="p-4 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition-all flex justify-between items-center w-full"
        >
            {test.title}  {/* Asegúrate de que el nombre del test se muestre */}
            <span className="text-2xl font-bold">+</span>
        </button>
    );
}
