"use client";
import { useState, useEffect } from "react";

const Anxiety = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(
          "https://capstone-salud-mental-backend.onrender.com/resources/getlist?category=anxiety"
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

  if (loading) return <p className="loading-text">Cargando recursos...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="anxiety-container">
      <h2 className="anxiety-title">🌀 Ansiedad</h2>
      <div className="resource-grid">
        {resources.map((resource) => (
          <div key={resource.id} className="resource-card">
            <h3 className="resource-title">Titulo: {resource.title}</h3>
            <p className="resource-description">Descripcion: {resource.description}</p>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              🔗 Visita la página →
            </a>
            <p className="resource-date">📅 Fecha de creación: {resource.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Anxiety;
