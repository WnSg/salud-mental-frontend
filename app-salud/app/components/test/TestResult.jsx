"use client";

export default function TestResult({ score }) {
    const getResultText = () => {
        if (score <= 5) return "Ansiedad leve";
        if (score <= 10) return "Ansiedad moderada";
        return "Ansiedad severa";
    };

    return (
        <div className="max-w-xl mx-auto bg-teal-500 text-white p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold">Su resultado para el test de ansiedad fue</h2>
            <p className="text-3xl font-bold mt-2">{getResultText()}</p>
            
            <div className="mt-4 space-y-2">
                <button className="px-6 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800">
                    Guardar o enviar resultados
                </button>
                <button className="px-6 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200">
                    Tomar otra prueba
                </button>
            </div>

            <p className="mt-4 text-sm">
                Estos resultados indican que presenta con algunos síntomas de ansiedad. 
                No constituyen un diagnóstico médico, consulte con un profesional si lo necesita.
            </p>
        </div>
    );
}
