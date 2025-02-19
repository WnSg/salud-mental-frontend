"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 

const UserProfilePage = ({ params }) => {
  const [unwrappedParams, setUnwrappedParams] = useState(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;

      setUnwrappedParams(resolvedParams);
    };
    fetchParams();
  }, [params]);

  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!unwrappedParams) return;

    const { id } = unwrappedParams; // Accedemos al ID

    const fetchUserData = async () => {

      const token = localStorage.getItem("authToken");
      console.log(token)
      if (!token) {
        router.push("/users/login"); // Si no hay token, redirigir al login
        return;
      }

      try {
        const response = await fetch(
          `https://capstone-salud-mental-backend.onrender.com/users/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario.");
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [unwrappedParams, router]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="user-profile">
      <h2>Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {userData.first_name} {userData.last_name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Edad:</strong> {userData.age}</p>
      <p><strong>Género:</strong> {userData.gender}</p>
      <p><strong>Nacionalidad:</strong> {userData.nationality}</p>
      <p><strong>Registrado el:</strong> {new Date(userData.created_at).toLocaleDateString()}</p>

      {/* Enlace para editar los datos del usuario */}
      <Link href={`/users/udp/${userData.id}`} className="btn btn-outline-primary">
        Editar Perfil
      </Link>
    </div>
  );
};

export default UserProfilePage;
