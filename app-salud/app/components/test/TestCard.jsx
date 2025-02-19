export default function TestCard({ title, onClick }) {
    return (
      <button
        onClick={onClick}
        className="bg-teal-500 text-white font-semibold rounded-full py-3 px-6 text-lg shadow-md hover:bg-teal-600 transition-all w-full max-w-xs flex justify-between items-center"
      >
        {title} <span className="text-2xl font-bold">+</span>
      </button>
    );
  }
  