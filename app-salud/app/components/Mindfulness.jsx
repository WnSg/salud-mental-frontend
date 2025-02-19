"use client";
import { useState, useEffect } from "react";

const Mindfulness = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(
          "https://capstone-salud-mental-backend.onrender.com/resources/getlist?category=mindfulness"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los recursos");
        }
        const data = await response.json();
        setResources(data.resources || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) return <p className="text-center text-lg font-semibold text-gray-700">Cargando recursos...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;

  return (
    <div className="gap-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Mindfulness</h2>
      <div className="gap-8">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{resource.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              Visita la página
            </a>
            <p className="text-xs text-gray-400 mt-4">Fecha de creación: {resource.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mindfulness;
