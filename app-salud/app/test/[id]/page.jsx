"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import QuestionCard from "../../components/test/QuestionCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Usa la variable de entorno

export default function TestPage() {
    const { id } = useParams();
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        axios.get(`${API_URL}/test/${id}`)
            .then(response => {
                console.log("Respuesta de la API:", response.data);
                setTest(response.data);
            })
            .catch(error => {
                console.error("Error al obtener el test:", error);
                setTest(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
    if (!test) return <p className="text-center text-red-500">No se encontró el test.</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center">{test.title}</h1>
            <p className="text-gray-700 text-center mb-6">{test.description}</p>

            <div className="space-y-6">
                {test.Questions?.length > 0 ? (
                    test.Questions.map((question) => (
                        <QuestionCard key={question.id} question={question} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No hay preguntas disponibles.</p>
                )}
            </div>
        </div>
    );
}
