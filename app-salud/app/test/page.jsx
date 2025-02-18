"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import TestCard from "../components/test/TestCard";

export default function TestSelectionPage() {
    const [tests, setTests] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/test`)
            .then(response => setTests(response.data))
            .catch(error => console.error("Error al obtener tests:", error));
    }, []);

    return (
        <main className="max-w-5xl mx-auto p-8">
            <section className="bg-teal-100 p-6 rounded-lg shadow-lg text-center mb-8">
                <h1 className="text-4xl font-bold text-teal-800">Toma un Test de Salud Mental</h1>
                <p className="text-gray-700 mt-2">
                    Selecciona un test para evaluar tu bienestar emocional y mental. Estos tests pueden ayudarte a comprender mejor tus emociones y encontrar apoyo si lo necesitas.
                </p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {tests.map((test) => (
                    <TestCard key={test.id} test={test} onSelect={() => router.push(`/test/${test.id}`)} />
                ))}
            </div>
        </main>
    );
}
