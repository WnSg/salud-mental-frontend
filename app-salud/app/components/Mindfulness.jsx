"use client"
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

  if (loading) return <p>Cargando recursos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Mindfulness</h2>
      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>
            <h3>Titulo: {resource.title}</h3>
            <p>Descripcion: {resource.description}</p>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              Visita la página
            </a>
            <p>Fecha de creación:{resource.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mindfulness;
