"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import TestCard from "../components/test/TestCard"; // Asegura que el componente exista
import LoadingSpinner from "../components/test/LoadingSpinner"; // Componente de carga
import { useRouter } from "next/navigation";

export default function TestSelectionPage() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/test`)
      .then(response => {
        setTests(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener tests:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Contenedor del título */}
      <div className="bg-blue-100 rounded-xl p-8 max-w-4xl mx-auto text-center shadow-md mt-8">
        <h1 className="text-4xl font-bold text-blue-800">Toma un Test de Salud Mental</h1>
        <p className="text-gray-700 mt-2">
          Selecciona un test para evaluar tu bienestar emocional y mental. Estos tests pueden
          ayudarte a comprender mejor tus emociones y encontrar apoyo si lo necesitas.
        </p>
      </div>

      {/* Contenedor de tests o loading */}
      {loading ? (
        <div className="mt-8 flex justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full px-4">
          {tests.map((test) => (
            <TestCard
              key={test.id}
              title={test.title}
              onClick={() => router.push(`/test/${test.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
