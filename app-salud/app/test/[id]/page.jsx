"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import QuestionCard from "../../components/test/QuestionCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Usa la variable de entorno

export default function TestPage() {
    const { id } = useParams();
    const router = useRouter();
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [testResult, setTestResult] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Obtener userId desde localStorage
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(parseInt(storedUserId));
        }

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

    const handleSelectAnswer = (questionId, answerId) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: answerId
        }));
    };

    const handleSubmit = async () => {
        if (!userId) {
            Swal.fire({
                icon: "warning",
                title: "Iniciar sesión requerido",
                text: "Debes iniciar sesión para ver los resultados.",
                confirmButtonText: "Iniciar sesión",
                confirmButtonColor: "#3085d6"
            }).then(() => {
                router.push("/users/login"); // Redirigir al login si no hay usuario autenticado
            });
            return;
        }
    
        if (Object.keys(selectedAnswers).length !== test.Questions.length) {
            Swal.fire({
                icon: "info",
                title: "Completa todas las preguntas",
                text: "Por favor responde todas las preguntas antes de ver los resultados.",
                confirmButtonText: "Entendido",
                confirmButtonColor: "#3085d6"
            });
            return;
        }
    
        const answersArray = Object.values(selectedAnswers);
        const token = localStorage.getItem("authToken");
    
        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "Sesión expirada",
                text: "Por favor inicia sesión nuevamente.",
                confirmButtonText: "Iniciar sesión",
                confirmButtonColor: "#3085d6"
            }).then(() => {
                router.push("/users/login");
            });
            return;
        }
    
        try {
            const response = await axios.post(`${API_URL}/test/responder`, {
                userId,
                testId: id,
                answers: answersArray
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
    
            setTestResult(response.data);
    
            Swal.fire({
                icon: "success",
                title: "Test Completado",
                text: `Tu resultado es: ${response.data.result}`,
                confirmButtonText: "Ver resultado",
                confirmButtonColor: "#3085d6"
            });
    
        } catch (error) {
            console.error("Error al enviar respuestas:", error);
    
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 403) {
                    Swal.fire({
                        icon: "warning",
                        title: "Sesión expirada",
                        text: "Por favor inicia sesión nuevamente.",
                        confirmButtonText: "Iniciar sesión",
                        confirmButtonColor: "#3085d6"
                    }).then(() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("userId");
                        router.push("/users/login");
                    });
                    return;
                }
            }
    
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || "Hubo un problema al enviar tus respuestas. Inténtalo de nuevo.",
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#d33"
            });
        }
    };
      

    if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
    if (!test) return <p className="text-center text-red-500">No se encontró el test.</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-blue-100 text-center py-4 rounded-lg mb-6">
                <h1 className="text-2xl font-bold text-blue-700">Test de {test.title}</h1>
                <p className="text-gray-700">{test.description}</p>
            </div>

            <div className="space-y-6">
                {test.Questions?.map((question) => (
                    <QuestionCard 
                        key={question.id} 
                        question={question} 
                        selectedAnswer={selectedAnswers[question.id]} // Ahora pasamos la respuesta seleccionada globalmente
                        onSelectAnswer={handleSelectAnswer} // La función se pasa desde aquí
                    />
                ))}
            </div>

            <div className="text-center mt-6">
                <button 
                    onClick={handleSubmit} 
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Ver Resultados
                </button>
            </div>

            {testResult && (
                <div className="mt-6 p-4 bg-teal-500 text-white rounded-lg text-center">
                    <h2 className="text-xl font-bold">Resultado: {testResult.result}</h2>
                    <p className="text-sm mt-2">Test completado el {new Date(testResult.completed_at).toLocaleDateString()}</p>
                </div>
            )}
        </div>
    );
}
