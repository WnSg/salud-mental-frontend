"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DirectorioPage() {
  const [helplines, setHelplines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/helplines/getlist?country=Honduras`)
      .then((response) => {
        setHelplines(response.data.helpLines);
      })
      .catch((error) => {
        console.error("Error al obtener directorio de ayuda:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Directorio de Ayuda
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {helplines.map((help) => (
          <div key={help.id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-800">{help.name}</h2>
            <p className="text-gray-600">Categoría: {help.category}</p>
            <p className="text-gray-600">Teléfono: {help.phone}</p>
            <a
              href={help.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Visitar Sitio Web
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
